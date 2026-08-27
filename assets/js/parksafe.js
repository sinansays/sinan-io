(function () {
  'use strict';

  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const EXAMPLES = {
    cleaning: 'NO PARKING\n8AM TO 10AM\nMON WED FRI\nSTREET CLEANING',
    limit: '2 HOUR PARKING\n8AM TO 6PM\nMON THRU SAT',
    permit: 'NO PARKING\nEXCEPT PERMIT 12\n7AM TO 7PM\nMON THRU FRI'
  };

  const signText = document.querySelector('#sign-text');
  const count = document.querySelector('#sign-count');
  const dayInput = document.querySelector('#parking-day');
  const timeInput = document.querySelector('#parking-time');
  const checkButton = document.querySelector('#check-sign');
  let currentRules = parseSigns(signText.value);

  function parseHour(value, meridiem) {
    let hour = Number(value);
    if (meridiem === 'PM' && hour !== 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
    return hour * 60;
  }

  function parseRule(text, timeMatch) {
    const normalized = text.toUpperCase().replace(/\s+/g, ' ').trim();
    const start = timeMatch ? parseHour(timeMatch[1], timeMatch[3]) + Number(timeMatch[2] || 0) : 0;
    const end = timeMatch ? parseHour(timeMatch[4], timeMatch[6]) + Number(timeMatch[5] || 0) : 1440;
    let days = [0, 1, 2, 3, 4, 5, 6];
    const dayNumbers = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };
    const rangeMatch = normalized.match(/\b(SUN|MON|TUE|WED|THU|FRI|SAT)\s+(?:THRU|TO|-)\s+(SUN|MON|TUE|WED|THU|FRI|SAT)\b/);
    if (rangeMatch) {
      days = [];
      for (let candidate = dayNumbers[rangeMatch[1]]; ; candidate = (candidate + 1) % 7) {
        days.push(candidate);
        if (candidate === dayNumbers[rangeMatch[2]]) break;
      }
    } else {
      const listedDays = Array.from(normalized.matchAll(/\b(SUN|MON|TUE|WED|THU|FRI|SAT)\b/g), match => dayNumbers[match[1]]);
      if (listedDays.length) days = [...new Set(listedDays)];
    }

    let type = 'no_parking';
    let title = 'No parking';
    let detail = normalized.includes('STREET CLEANING') ? 'Street cleaning restriction' : 'Posted parking restriction';
    const limitMatch = normalized.match(/(\d+)\s*(?:HOUR|HR)/);
    if (limitMatch && !normalized.includes('NO PARKING')) {
      type = 'time_limit';
      title = `${limitMatch[1]}-hour parking`;
      detail = `Parking is limited to ${limitMatch[1]} hours during posted times`;
    } else if (normalized.includes('PERMIT')) {
      type = 'permit_only';
      title = 'Permit only';
      const permit = normalized.match(/PERMIT\s+(\w+)/);
      detail = `Permit ${permit ? permit[1] : ''} required during posted times`.replace('  ', ' ');
    }
    return { type, title, detail, days, start, end, limitMinutes: limitMatch ? Number(limitMatch[1]) * 60 : null };
  }

  function parseSigns(text) {
    const normalized = text.toUpperCase().replace(/\s+/g, ' ').trim();
    const timePattern = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*(?:TO|–|-|UNTIL)\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/g;
    const matches = Array.from(normalized.matchAll(timePattern));
    if (!matches.length) return [parseRule(normalized, null)];

    return matches.map((match, index) => {
      const previousEnd = index ? matches[index - 1].index + matches[index - 1][0].length : 0;
      const nextStart = index + 1 < matches.length ? matches[index + 1].index : normalized.length;
      let before = normalized.slice(previousEnd, match.index);
      const heading = /(?:NO PARKING|\d+\s*(?:HOUR|HR)[^\d]*PARKING|PERMIT(?:\s+ONLY)?)(?!.*(?:NO PARKING|\d+\s*(?:HOUR|HR)[^\d]*PARKING|PERMIT(?:\s+ONLY)?))/;
      const headingMatch = before.match(heading);
      if (headingMatch) before = before.slice(headingMatch.index);
      let after = normalized.slice(match.index + match[0].length, nextStart);
      const nextHeading = after.match(/(?:NO PARKING|\d+\s*(?:HOUR|HR)[^\d]*PARKING|PERMIT(?:\s+ONLY)?)/);
      if (nextHeading) after = after.slice(0, nextHeading.index);
      const context = `${before} ${match[0]} ${after}`;
      return parseRule(context, match);
    });
  }

  function formatTime(minute) {
    const hour24 = Math.floor(minute / 60) % 24;
    const minutePart = minute % 60;
    const hour = hour24 % 12 || 12;
    return `${hour}:${String(minutePart).padStart(2, '0')} ${hour24 < 12 ? 'AM' : 'PM'}`;
  }

  function daysLabel(days) {
    if (days.length === 7) return 'Every day';
    return days.map(day => DAYS[day].slice(0, 3)).join(', ');
  }

  function ruleTiming(rule, day, minute) {
    const crossesMidnight = rule.start > rule.end;
    const previousDay = (day + 6) % 7;
    const active = crossesMidnight
      ? (rule.days.includes(day) && minute >= rule.start) || (rule.days.includes(previousDay) && minute < rule.end)
      : rule.days.includes(day) && minute >= rule.start && minute < rule.end;
    let minutesUntil = Infinity;
    for (let offset = 0; offset < 8; offset += 1) {
      const candidateDay = (day + offset) % 7;
      if (!rule.days.includes(candidateDay)) continue;
      const candidate = offset * 1440 + rule.start - minute;
      if (candidate >= 0) { minutesUntil = candidate; break; }
    }

    return { active, minutesUntil, endsTomorrow: crossesMidnight && minute >= rule.start };
  }

  function evaluate(rules, day, minute) {
    const timedRules = rules.map(rule => ({ rule, timing: ruleTiming(rule, day, minute) }));
    const prohibited = timedRules.find(({ rule, timing }) => timing.active && rule.type !== 'time_limit');
    if (prohibited) {
      const { rule, timing } = prohibited;
      const endDay = timing.endsTomorrow ? 'tomorrow' : 'today';
      return { status: 'red', label: rule.title, icon: '×', headline: "You can't park here right now.", why: `${rule.detail} is in effect until ${formatTime(rule.end)}.`, deadlineLabel: 'Restriction ends', deadline: `${formatTime(rule.end)} ${endDay}` };
    }
    const limited = timedRules.find(({ rule, timing }) => timing.active && rule.type === 'time_limit');
    if (limited) {
      const { rule, timing } = limited;
      const endDay = timing.endsTomorrow ? 'tomorrow' : 'today';
      return { status: 'green', label: 'Parking allowed', icon: '✓', headline: `You can park here for up to ${rule.limitMinutes / 60} hours.`, why: `The posted time limit applies until ${formatTime(rule.end)}. Remember when you arrived.`, deadlineLabel: 'Posted hours end', deadline: `${formatTime(rule.end)} ${endDay}` };
    }
    const next = timedRules.reduce((soonest, item) => item.timing.minutesUntil < soonest.timing.minutesUntil ? item : soonest, timedRules[0]);
    const { rule, timing: { minutesUntil } } = next;
    if (minutesUntil <= 30) {
      return { status: 'amber', label: 'Move soon', icon: '!', headline: 'You can park—but not for long.', why: `${rule.detail} begins in ${minutesUntil} minutes.`, deadlineLabel: 'Move by', deadline: `${formatTime(rule.start)} today` };
    }
    const nextDay = minutesUntil < 1440 ? 'today' : DAYS[(day + Math.floor((minute + minutesUntil) / 1440)) % 7];
    return { status: 'green', label: 'Safe to park', icon: '✓', headline: 'You can park here right now.', why: 'No posted restriction is active at the selected time.', deadlineLabel: 'Next restriction', deadline: `${formatTime(rule.start)} ${nextDay}` };
  }

  function render() {
    const [hour, minute] = timeInput.value.split(':').map(Number);
    const selectedMinute = hour * 60 + minute;
    const result = evaluate(currentRules, Number(dayInput.value), selectedMinute);
    const verdict = document.querySelector('#verdict');
    verdict.className = `parksafe-verdict parksafe-verdict--${result.status}`;
    document.querySelector('#verdict-icon').textContent = result.icon;
    document.querySelector('#verdict-label').textContent = result.label;
    document.querySelector('#verdict-moment').textContent = `${DAYS[dayInput.value]}, ${formatTime(selectedMinute)}`;
    document.querySelector('#verdict-headline').textContent = result.headline;
    document.querySelector('#verdict-why').textContent = result.why;
    document.querySelector('#verdict-deadline small').textContent = result.deadlineLabel;
    document.querySelector('#verdict-deadline strong').textContent = result.deadline;
    document.querySelector('#active-rule').textContent = currentRules.map(rule => `${rule.title.toUpperCase()} · ${daysLabel(rule.days).toUpperCase()} · ${formatTime(rule.start)}–${formatTime(rule.end)}`).join(' | ');
    document.querySelector('#rule-list').innerHTML = currentRules.map((rule, index) => `<div class="parksafe-rule-item"><span>${index + 1}</span><div><strong>${rule.title}: ${formatTime(rule.start)}–${formatTime(rule.end)}</strong><small>${rule.detail} · ${daysLabel(rule.days)}</small></div></div>`).join('');
  }

  function setNow() {
    const now = new Date();
    dayInput.value = String(now.getDay());
    timeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    render();
  }

  document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => {
    signText.value = EXAMPLES[button.dataset.example];
    count.textContent = `${signText.value.length} / 2000`;
    currentRules = parseSigns(signText.value);
    render();
  }));
  signText.addEventListener('input', () => { count.textContent = `${signText.value.length} / 2000`; });
  checkButton.addEventListener('click', () => {
    if (signText.value.trim().length < 3) { signText.focus(); return; }
    checkButton.disabled = true;
    checkButton.firstChild.textContent = 'Reading sign… ';
    window.setTimeout(() => {
      currentRules = parseSigns(signText.value);
      render();
      checkButton.disabled = false;
      checkButton.firstChild.textContent = 'Check this sign ';
      document.querySelector('#verdict').focus();
    }, 350);
  });
  dayInput.addEventListener('change', render);
  timeInput.addEventListener('input', render);
  document.querySelector('#back-to-now').addEventListener('click', setNow);
  setNow();
}());
