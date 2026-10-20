/* Social Medium Ecology — self-assessment page */
(function(){
"use strict";
const P = SME.PLATFORMS, byId = SME.byId, CL = SME.CLUSTERS, T = SME.TRAITS, esc = SME.esc, cv = SME.clusterVar;
const IDS = P.map(p => p.id);
const short = id => byId[id].name.replace(" (formerly Twitter)", "");
const app = document.getElementById("app");
const KEY = "sme-quiz-v1";
const VQ = SME.VALUES_Q, PQ = SME.PRESENCE_Q;

const fresh = () => ({ mode:null, step:0, sample:false,
  values:{ ans:Array(VQ.length).fill(null) },
  presence:{ org:true, orgName:"", you:Array(PQ.length).fill(null), org:Array(PQ.length).fill(null) } });
let S = fresh();
const saved = SME.storage.get(KEY);
if (saved && saved.values && saved.values.ans && saved.values.ans.length === VQ.length && saved.presence && saved.presence.you.length === PQ.length) S = saved;
const save = () => SME.storage.set(KEY, S);
const h = html => { const d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; };
const top = () => window.scrollTo({ top:0, behavior:SME.reduce ? "auto" : "smooth" });

function optList(q){ return q.platforms ? P.map(p => [p.name, "", {}]) : q.opts; }
function isOn(a, oi, multi){ return multi ? Array.isArray(a) && a.includes(oi) : a === oi; }
function toggle(a, oi, multi){ if (!multi) return oi; let r = Array.isArray(a) ? a.slice() : []; return r.includes(oi) ? r.filter(x => x !== oi) : r.concat(oi); }

/* ================= routing ================= */
function render(){
  app.innerHTML = "";
  if (!S.mode) return renderHome();
  if (S.mode === "values") return S.step < VQ.length ? renderValuesQ(S.step) : renderValuesResults();
  if (S.step === -1) return renderPresenceIntro();
  return S.step < PQ.length ? renderPresenceQ(S.step) : renderPresenceResults();
}
function go(mode, step){ S.mode = mode; S.step = step; save(); render(); top(); }
window.addEventListener("hashchange", fromHash);
function fromHash(){ const t = location.hash.slice(1); if (t === "values" && S.mode !== "values") go("values", 0); else if (t === "presence" && S.mode !== "presence") go("presence", -1); }

function renderHome(){
  const n = h(`<div class="stack fade">
   <div class="modes">
    <div class="mode"><div class="eyebrow">Mode one · 12 questions · about 4 minutes</div><h2>Where do your values fit?</h2>
      <p>For anyone who uses social media. Your answers on curation, privacy, permanence, governance and attention are compared with how each platform is built. You'll see which platforms align with your values, which pull against them, and how that compares with the ones you actually use.</p>
      <div class="row"><button class="btn primary" id="startV">Start</button><button class="btn" id="sampleV">See a sample result</button></div></div>
    <div class="mode"><div class="eyebrow">Mode two · 17 questions · about 8 minutes</div><h2>Where should you build a presence?</h2>
      <p>For people and organizations deciding where to show up. Answer once for yourself and optionally once for an organization. You'll get a home base, platforms to amplify, an off-platform strategy that fits how you build trust, and notes on what you give up by skipping a platform.</p>
      <div class="row"><button class="btn primary" id="startP">Start</button><button class="btn" id="sampleP">See a sample result</button></div></div>
   </div>
   <p class="muted small">Both modes use the trait codings described in <a href="method.html#scoring">methods</a>. They are structured opinion, not a validated psychometric instrument. Your answers stay in this browser.</p></div>`);
  app.appendChild(n);
  n.querySelector("#startV").onclick = () => { if (S.sample) S = fresh(); S.sample = false; go("values", 0); };
  n.querySelector("#startP").onclick = () => { if (S.sample) S = fresh(); S.sample = false; go("presence", -1); };
  n.querySelector("#sampleV").onclick = () => { S = fresh(); S.sample = true; S.values.ans = JSON.parse(JSON.stringify(SME.SAMPLES.values)); go("values", VQ.length); };
  n.querySelector("#sampleP").onclick = () => { S = fresh(); S.sample = true; const sp = SME.SAMPLES.presence; S.presence = { org:true, orgName:sp.orgName, you:JSON.parse(JSON.stringify(sp.you)), org:JSON.parse(JSON.stringify(sp.org)) }; go("presence", PQ.length); };
}

/* ================= question screens ================= */
function qShell(i, total, q, extraHead = ""){
  return `<div class="qplate fade">
    <div class="row"><span class="eyebrow">Question ${i+1} of ${total}</span><span class="spacer"></span><span class="lens-tag">${esc(q.lens)}${q.cite && q.cite.length ? " " + SME.cites(q.cite) : ""}</span></div>
    <div class="progress"><i style="width:${i / total * 100}%"></i></div>
    <div class="qhead"><h2>${esc(q.t)}</h2>${q.sub ? `<p class="lens-tag" style="font-size:.85rem">${esc(q.sub)}</p>` : ""}</div>
    ${extraHead}
    <div class="opts" role="group" aria-label="${esc(q.t)}"></div>
    <div class="row"><button class="btn" id="back">← Back</button><span id="extraBtns"></span><span class="spacer"></span><button class="btn primary" id="next">${i === total - 1 ? "See results" : "Next →"}</button></div>
  </div>`;
}

function renderValuesQ(i){
  const q = VQ[i], opts = optList(q);
  const n = h(qShell(i, VQ.length, q)); app.appendChild(n);
  const box = n.querySelector(".opts"), nx = n.querySelector("#next");
  opts.forEach((o, oi) => {
    const r = h(`<div class="opt"><div class="label">${esc(o[0])}${o[1] ? `<small>${esc(o[1])}</small>` : ""}</div><div class="picks"><button class="pick you" aria-label="${esc(o[0])}">${q.multi ? "Include" : "Choose"}</button></div></div>`);
    const b = r.querySelector(".pick");
    b.onclick = () => { S.values.ans[i] = toggle(S.values.ans[i], oi, q.multi); save(); refresh(); if (!q.multi) setTimeout(() => nx.focus(), 0); };
    box.appendChild(r);
  });
  function refresh(){
    box.querySelectorAll(".opt").forEach((r, oi) => r.querySelector(".pick").setAttribute("aria-pressed", isOn(S.values.ans[i], oi, q.multi)));
    nx.disabled = !q.multi && S.values.ans[i] === null;
  }
  n.querySelector("#back").onclick = () => i === 0 ? (S.mode = null, S.step = 0, save(), render()) : go("values", i - 1);
  nx.onclick = () => { if (q.multi && !Array.isArray(S.values.ans[i])) S.values.ans[i] = []; go("values", i + 1); };
  refresh();
}

function orgLabel(){ return S.presence.orgName ? S.presence.orgName.split(":")[0].slice(0, 16) : "Organization"; }

function renderPresenceIntro(){
  const n = h(`<div class="qplate fade">
    <div class="qhead"><div class="eyebrow">Before you start</div><h2>One presence or two?</h2>
    <p>Answer each question for yourself, and optionally for an organization you represent. Where the answers differ, the results show it.</p></div>
    <label class="switch"><input type="checkbox" id="orgToggle" ${S.presence.org ? "checked" : ""}> Also answer for an organization</label>
    <label class="field" id="orgField" ${S.presence.org ? "" : "hidden"}>Organization name (optional)<input type="text" id="orgName" value="${esc(S.presence.orgName)}" placeholder="Organization"></label>
    <div class="row"><button class="btn" id="back">← Back</button><span class="spacer"></span><button class="btn primary" id="go">Start the questions →</button></div></div>`);
  app.appendChild(n);
  const t = n.querySelector("#orgToggle"), f = n.querySelector("#orgField");
  t.onchange = () => { S.presence.org = t.checked; f.hidden = !t.checked; save(); };
  n.querySelector("#orgName").oninput = e => { S.presence.orgName = e.target.value; save(); };
  n.querySelector("#back").onclick = () => { S.mode = null; save(); render(); };
  n.querySelector("#go").onclick = () => go("presence", 0);
}

function renderPresenceQ(i){
  const q = PQ[i], opts = optList(q), org = S.presence.org, ol = esc(orgLabel());
  const head = `<div class="colhead"><span></span><div class="picks"><span>You</span>${org ? `<span>${ol}</span>` : ""}</div></div>`;
  const n = h(qShell(i, PQ.length, q, head)); app.appendChild(n);
  const box = n.querySelector(".opts"), nx = n.querySelector("#next");
  if (org) n.querySelector("#extraBtns").appendChild(h(`<button class="btn" id="copy">Same for ${ol}</button>`));
  opts.forEach((o, oi) => {
    const r = h(`<div class="opt"><div class="label">${esc(o[0])}${o[1] ? `<small>${esc(o[1])}</small>` : ""}</div><div class="picks">
      <button class="pick you" data-w="you" aria-label="${esc(o[0])} for you">You</button>
      ${org ? `<button class="pick co" data-w="org" aria-label="${esc(o[0])} for ${ol}">${ol}</button>` : ""}</div></div>`);
    r.querySelectorAll(".pick").forEach(b => b.onclick = () => { const w = b.dataset.w; S.presence[w][i] = toggle(S.presence[w][i], oi, q.multi); save(); refresh(); });
    box.appendChild(r);
  });
  function refresh(){
    box.querySelectorAll(".opt").forEach((r, oi) => r.querySelectorAll(".pick").forEach(b => b.setAttribute("aria-pressed", isOn(S.presence[b.dataset.w][i], oi, q.multi))));
    const ok = S.presence.you[i] !== null && (!org || S.presence.org[i] !== null);
    nx.disabled = !q.multi && !ok;
  }
  n.querySelector("#back").onclick = () => go("presence", i - 1);
  if (org) n.querySelector("#copy").onclick = () => { const a = S.presence.you[i]; S.presence.org[i] = Array.isArray(a) ? a.slice() : a; save(); refresh(); };
  nx.onclick = () => { if (q.multi) { if (!Array.isArray(S.presence.you[i])) S.presence.you[i] = []; if (org && !Array.isArray(S.presence.org[i])) S.presence.org[i] = []; } go("presence", i + 1); };
  refresh();
}

/* ================= shared result pieces ================= */
function blendFrom(scores, sharp){
  const cl = {}; for (const k in CL) cl[k] = Math.max(...IDS.filter(id => byId[id].cluster === k).map(id => scores[id]));
  const mx = Math.max(...Object.values(cl)), w = {}; let tot = 0;
  for (const k in cl) { w[k] = Math.exp((cl[k] - mx) * sharp); tot += w[k]; }
  for (const k in w) w[k] /= tot;
  return { blend:w, cls:Object.keys(w).sort((a, b) => w[b] - w[a]) };
}
function verdict(b){
  const [a, c] = b.cls, ga = b.blend[a], gc = b.blend[c];
  if (ga - gc < .08) return `On the border between <b>${CL[a].name}</b> and <b>${CL[c].name}</b>. Treat both as home ground rather than forcing a choice.`;
  if (ga > .45) return `A clear center of gravity in <b>${CL[a].name}</b>, with <b>${CL[c].name}</b> as the natural second.`;
  return `Mostly <b>${CL[a].name}</b>, overlapping with <b>${CL[c].name}</b> and <b>${CL[b.cls[2]].name}</b>. A spread profile.`;
}
function blendHTML(b){
  return `<div class="blend" aria-hidden="true">${Object.keys(CL).map(k => `<span style="width:${(b.blend[k] * 100).toFixed(1)}%;background:var(${CL[k].color})"></span>`).join("")}</div>
  <div class="blendkey">${b.cls.map(k => `<div><i class="swatch" style="background:var(${CL[k].color})"></i>${CL[k].name}<b>${Math.round(b.blend[k] * 100)}%</b></div>`).join("")}</div>`;
}
function platChips(ids, home){ return `<div class="plats">${ids.map(id => `<span class="plat ${home ? "home" : ""}" style="color:${cv(id)};${home ? `background:${cv(id)};border-color:${cv(id)}` : ""}">${esc(short(id))}</span>`).join("")}</div>`; }
function lensBlocks(clusters, kind){
  return clusters.map(k => { const L = SME.RESULT_LENS[k];
    return `<div class="lensblock" style="border-color:var(${CL[k].color})"><div class="eyebrow" style="color:var(${CL[k].color})">${CL[k].name}</div><h3>${esc(L.t)}</h3><p>${esc(L[kind])}</p><div>${SME.cites(L.cite)}</div></div>`; }).join("");
}
function copyButton(btn, text){
  const done = () => { btn.textContent = "Copied"; setTimeout(() => btn.textContent = "Copy result", 1600); };
  const fallback = () => { const ta = document.createElement("textarea"); ta.value = text; ta.rows = 10; ta.style.width = "100%"; btn.closest(".res").prepend(ta); ta.select(); btn.textContent = "Select and copy the text above"; };
  try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
}
function resultHead(title, eyebrow){
  return `<div class="row"><div><div class="eyebrow">${eyebrow}</div><h2>${title}</h2></div><span class="spacer"></span>
    <button class="btn" id="copyRes">Copy result</button><button class="btn" id="edit">Edit answers</button><button class="btn" id="other">Try the other mode</button><button class="btn" id="redo">Start over</button></div>`;
}
function wireHead(n, mode, text){
  n.querySelector("#copyRes").onclick = e => copyButton(e.currentTarget, text);
  n.querySelector("#edit").onclick = () => go(mode, mode === "presence" ? -1 : 0);
  n.querySelector("#other").onclick = () => { if (S.sample) S = fresh(); go(mode === "values" ? "presence" : "values", mode === "values" ? -1 : 0); };
  n.querySelector("#redo").onclick = () => { S = fresh(); save(); render(); top(); };
}

/* ================= values mode ================= */
function valuesScore(ans){
  const desire = {}; let fmt = [], usage = [], audience = false;
  VQ.forEach((q, i) => {
    const a = ans[i];
    if (q.special === "formats") { fmt = (a || []).map(oi => q.opts[oi][2].f); return; }
    if (q.special === "usage") { usage = (a || []).map(oi => IDS[oi]); return; }
    if (a === null || a === undefined) return;
    if (q.audienceOpt === a) audience = true;
    const w = q.opts[a][2];
    for (const d in w) { const [v, wt] = w[d]; desire[d] = desire[d] || { n:0, w:0 }; desire[d].n += v * wt; desire[d].w += wt; }
  });
  for (const d in desire) desire[d].d = desire[d].n / desire[d].w;
  const score = {};
  for (const p of P) {
    let s = 0, den = 0;
    for (const d in desire) { const W = desire[d].w; s += W * (1 - Math.abs(desire[d].d - p.traits[d]) / 4); den += W; }
    if (fmt.length) { const m = Math.max(...fmt.map(f => p.traits[f])) / 4; s += 1.6 * m; den += 1.6; }
    score[p.id] = den ? s / den : .5;
  }
  const ranked = IDS.slice().sort((a, b) => score[b] - score[a]);
  const tiers = { closest:ranked.slice(0, 3), compatible:ranked.slice(3, 7), neutral:ranked.slice(7, 13), tension:ranked.slice(13) };
  return { desire, fmt, usage, audience, score, ranked, tiers, ...blendFrom(score, 14) };
}
/* Explanation metadata for every scored dimension: the eight structural traits plus the six formats,
   which some answers (attention, purpose) also set. */
const FORMAT_LEVELS = ["absent", "rare", "secondary", "common", "central"];
const DIM = Object.assign({}, T, Object.fromEntries(Object.entries(SME.FORMATS).map(([k, name]) => [k, { name, levels:FORMAT_LEVELS }])));
const lvl = (d, v) => DIM[d].levels[Math.max(0, Math.min(4, Math.round(v)))];
function mismatches(R, id, n = 2){
  const p = byId[id];
  return Object.keys(R.desire).filter(d => DIM[d]).map(d => ({ d, gap:Math.abs(R.desire[d].d - p.traits[d]), w:R.desire[d].w }))
    .filter(x => x.gap >= 1.5).sort((a, b) => b.gap * b.w - a.gap * a.w).slice(0, n)
    .map(x => `${DIM[x.d].name.toLowerCase()} (you: ${lvl(x.d, R.desire[x.d].d)}; ${short(id)}: ${lvl(x.d, p.traits[x.d])})`);
}
function matches(R, id, n = 2){
  const p = byId[id];
  return Object.keys(R.desire).filter(d => DIM[d]).map(d => ({ d, gap:Math.abs(R.desire[d].d - p.traits[d]), w:R.desire[d].w }))
    .filter(x => x.gap <= .75).sort((a, b) => b.w - a.w).slice(0, n)
    .map(x => `${DIM[x.d].name.toLowerCase()} (${lvl(x.d, p.traits[x.d])})`);
}
function valueTensions(R){
  const D = d => R.desire[d] ? R.desire[d].d : null, out = [];
  if (R.audience && D("algo") !== null && D("algo") <= 1.5)
    out.push(["Reach without ranking", "You want to build an audience but prefer feeds you choose yourself. On most large platforms, reach now comes from ranking (see the drift chart in the Atlas). The realistic routes are owned channels such as a newsletter, and protocols with opt-in feeds.", [["doctorow2025"]]]);
  const surveil = R.usage.filter(id => ["fb","ig","tt","yt","th"].includes(id));
  if (D("extract") !== null && D("extract") <= 1 && surveil.length)
    out.push(["Habits versus values on data", `You object to behavioral profiling but use ${surveil.map(short).join(", ")} weekly, which are among the most data-intensive services here. Zuboff's argument is that this gap is the business model: the service is free because your behavior is the product.`, [["zuboff2019"]]]);
  if (D("exit") !== null && D("exit") >= 3 && D("bound") !== null && D("bound") <= 1)
    out.push(["Portability or scale", "You want both a large public audience and the freedom to leave with it. So far those have not coexisted: the portable networks (Bluesky, Mastodon) are small, and the large ones lock your network in.", [["illich1973"],["doctorow2025"]]]);
  if (D("conflict") !== null && D("conflict") <= 1 && D("bound") !== null && D("bound") <= 1)
    out.push(["Public and calm", "You want to speak in public but avoid argument. Context collapse makes that rare: public posts meet every audience at once. Pinterest is the main exception, because it is organized around things rather than people.", [["marwick2011"]]]);
  return out;
}
function profileSVG(R){
  const dims = Object.keys(R.desire).filter(d => T[d]).sort((a, b) => R.desire[b].w - R.desire[a].w);
  const best = R.ranked[0], W = 720, L = 150, Rr = 20, RH = 46, H = 30 + dims.length * RH;
  const X = v => L + (W - L - Rr) * v / 4;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Your value profile compared with ${esc(short(best))}">`;
  dims.forEach((d, i) => { const y = 30 + i * RH;
    s += `<text x="${L - 12}" y="${y + 4}" class="pl" text-anchor="end">${esc(T[d].name)}</text>
      <line x1="${X(0)}" x2="${X(4)}" y1="${y}" y2="${y}" style="stroke:var(--rule)" stroke-width="2"/>
      <text x="${X(0)}" y="${y + 18}" class="axlabel">${esc(T[d].lo)}</text><text x="${X(4)}" y="${y + 18}" class="axlabel" text-anchor="end">${esc(T[d].hi)}</text>
      <circle cx="${X(byId[best].traits[d])}" cy="${y}" r="7" style="fill:var(--plate);stroke:${cv(best)}" stroke-width="2.5"/>
      <circle cx="${X(R.desire[d].d)}" cy="${y}" r="6.5" style="fill:var(--ink)"/>`; });
  s += `<text x="${L}" y="14" class="axlabel">● You   ○ ${esc(short(best))} (your closest fit)</text></svg>`;
  return s;
}
function alignSVG(R){
  const W = 720, L = 110, Rr = 50, RH = 24, H = 20 + P.length * RH, X = v => L + (W - L - Rr) * v;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Alignment by platform">`;
  R.ranked.forEach((id, i) => { const y = 14 + i * RH, v = R.score[id], used = R.usage.includes(id);
    s += `<text x="${L - 10}" y="${y + 4}" class="pl" text-anchor="end">${esc(short(id))}</text>
      <rect x="${X(0)}" y="${y - 6}" width="${X(1) - X(0)}" height="12" rx="2" style="fill:var(--paper)"/>
      <rect x="${X(0)}" y="${y - 6}" width="${(X(v) - X(0)).toFixed(1)}" height="12" rx="2" style="fill:${cv(id)}" fill-opacity="${used ? 1 : .55}"/>
      <text x="${X(v) + 6}" y="${y + 4}" class="axlabel">${Math.round(v * 100)}${used ? " · you use it" : ""}</text>`; });
  return s + `</svg>`;
}
function renderValuesResults(){
  const R = valuesScore(S.values.ans);
  const tens = valueTensions(R);
  const usedTension = R.usage.filter(id => R.tiers.tension.includes(id) || R.tiers.neutral.slice(3).includes(id));
  const usedAligned = R.usage.filter(id => R.tiers.closest.includes(id) || R.tiers.compatible.includes(id));
  const lookAt = R.tiers.closest.concat(R.tiers.compatible).filter(id => !R.usage.includes(id)).slice(0, 3);
  const text = `Social Medium Ecology · Values result\nClusters: ${R.cls.map(k => `${CL[k].name} ${Math.round(R.blend[k] * 100)}%`).join(", ")}\nClosest fit: ${R.tiers.closest.map(short).join(", ")}\nCompatible: ${R.tiers.compatible.map(short).join(", ")}\nIn tension: ${R.tiers.tension.map(short).join(", ")}`;
  const n = h(`<div class="res fade">
    ${resultHead("Where your values fit", S.sample ? "Sample result · example answers" : "Your result · values")}
    <div class="two">
      <div class="card"><h3>Your center of gravity</h3><p>${verdict(R)}</p>${blendHTML(R)}</div>
      <div class="card">
        <div class="tier"><h4>Closest fit</h4>${platChips(R.tiers.closest, true)}<div class="why">${R.tiers.closest.map(id => `${esc(short(id))}: matches you on ${matches(R, id).join(" and ") || "your format and pace"}`).join("<br>")}</div></div>
        <div class="tier"><h4>Compatible</h4>${platChips(R.tiers.compatible)}</div>
        <div class="tier"><h4>In tension with your values</h4>${platChips(R.tiers.tension)}<div class="why">${R.tiers.tension.slice(0, 2).map(id => `${esc(short(id))}: ${mismatches(R, id).join("; ") || "weaker overall fit"}`).join("<br>")}</div></div>
      </div>
    </div>
    ${R.usage.length ? `<div class="callout"><h3>Your values and your habits</h3><ul>
      ${usedAligned.length ? `<li><b>Aligned:</b> ${usedAligned.map(short).join(", ")} fit what you say you value.</li>` : ""}
      ${usedTension.map(id => `<li><b>${esc(short(id))} pulls against you</b> on ${mismatches(R, id).join("; ") || "several dimensions"}.</li>`).join("")}
      ${lookAt.length ? `<li><b>Worth a look:</b> ${lookAt.map(short).join(", ")}, which you don't use but which fit your answers.</li>` : ""}
    </ul></div>` : ""}
    ${tens.length ? `<div style="display:grid;gap:14px"><h2>Where your values pull against each other</h2>${tens.map(([t, b, c]) => `<div class="lensblock"><h3>${esc(t)}</h3><p>${esc(b)}</p><div>${SME.cites(c)}</div></div>`).join("")}</div>` : ""}
    <div class="plate"><h3>Your value profile</h3><div class="svgbox">${profileSVG(R)}</div>
      <p class="muted small">Dimensions are ordered by how much weight your answers put on them. Formats you chose: ${R.fmt.length ? R.fmt.map(f => SME.FORMATS[f]).join(", ") : "none"}.</p></div>
    <div class="plate"><h3>Alignment across all 17 platforms</h3><div class="svgbox">${alignSVG(R)}</div>
      <p class="muted small">Alignment is the weighted closeness between your answers and each platform's trait codes (0–100). Solid bars are platforms you use weekly.</p></div>
    <div style="display:grid;gap:14px"><h2>The theory lens</h2>${lensBlocks(R.cls.slice(0, 2), "values")}</div>
    <p><a class="btn" href="atlas.html#map">See these platforms on the Atlas map →</a></p>
  </div>`);
  app.appendChild(n); wireHead(n, "values", text);
}

/* ================= presence mode ================= */
function presenceScore(ans){
  const s = Object.fromEntries(IDS.map(id => [id, 0])), why = Object.fromEntries(IDS.map(id => [id, []]));
  let excluded = [], archetype = null;
  PQ.forEach((q, i) => {
    const a = ans[i];
    if (a === null || a === undefined) return;
    if (q.special === "exclude") { excluded = a.map(oi => IDS[oi]); return; }
    if (q.special === "archetype") { archetype = q.opts[a][2].a; return; }
    if (q.platforms) { a.forEach(oi => { const id = IDS[oi]; s[id] += q.pts; why[id].push({ w:q.pts, txt:q.lens === "Network effects" ? "your audience is already there" : "you enjoy it" }); }); return; }
    const w = q.opts[a][2];
    for (const id in w) { s[id] += w[id]; if (w[id] > 0) why[id].push({ w:w[id], txt:`“${q.opts[a][0]}”` }); }
  });
  for (const id of IDS) why[id].sort((x, y) => y.w - x.w);
  const fullRanked = IDS.slice().sort((a, b) => s[b] - s[a]);
  const ranked = fullRanked.filter(id => !excluded.includes(id));
  const vals = ranked.map(id => s[id]), mx = Math.max(...vals, 0.001), mn = Math.min(...vals, 0);
  const fit = Object.fromEntries(IDS.map(id => [id, Math.round(Math.max(0, (s[id] - mn) / (mx - mn || 1)) * 100)]));
  const tiers = { home:[], amp:[], test:[], skip:[] };
  ranked.forEach(id => { const r = s[id] / mx;
    if (r >= .85 && tiers.home.length < 3) tiers.home.push(id);
    else if (r >= .6 && tiers.amp.length < 3) tiers.amp.push(id);
    else if (r >= .35 && tiers.test.length < 3) tiers.test.push(id);
    else tiers.skip.push(id); });
  if (!tiers.home.length && ranked.length) tiers.home.push(tiers.amp.shift() || ranked[0]);
  const lost = excluded.filter(id => fullRanked.indexOf(id) < 4);
  const norm = Object.fromEntries(IDS.map(id => [id, excluded.includes(id) ? -1 : s[id] / mx]));
  return { s, fit, why, tiers, excluded, lost, archetype, fullRanked, ...blendFrom(norm, 4) };
}
function whyText(R, id){ const t = [...new Set(R.why[id].map(x => x.txt))].slice(0, 2); return t.length ? `driven by ${t.join(" and ")}` : "no strong signal"; }
function tierHTML(R, label, key){
  if (!R.tiers[key].length) return "";
  return `<div class="tier"><h4>${label}</h4>${platChips(R.tiers[key], key === "home")}${key === "home" || key === "amp" ? `<div class="why">${R.tiers[key].map(id => `${esc(short(id))}: ${whyText(R, id)}`).join("<br>")}</div>` : ""}</div>`;
}
function presenceCard(R, name, color){
  return `<div class="card"><div class="who-h"><i class="swatch" style="background:${color}"></i><h3>${esc(name)}</h3></div>
    <p>${verdict(R)}</p>${blendHTML(R)}
    ${tierHTML(R, "Home base", "home")}${tierHTML(R, "Amplify", "amp")}${tierHTML(R, "Worth a test", "test")}
    <div class="tier"><h4>Low fit</h4><div class="why">${R.tiers.skip.map(short).join(", ") || "None"}</div></div>
    ${R.excluded.length ? `<div class="tier"><h4>Excluded by you</h4><div class="why">${R.excluded.map(short).join(", ")}</div></div>` : ""}</div>`;
}
function infraNote(R, name){
  return R.lost.map(id => {
    const rank = R.fullRanked.indexOf(id) + 1;
    return `<li><b>${esc(short(id))}</b> would have ranked #${rank} for ${esc(name)}. You can skip its feed and still use it as infrastructure: keep a clear profile as a storefront, use search and direct messages to reach specific people, and post only links to work published elsewhere. Most of a platform's value for credibility and outreach sits outside the feed.</li>`;
  }).join("");
}
function archetypeHTML(key, who){
  const A = SME.ARCHETYPES[key]; if (!A) return "";
  return `<div class="card"><div class="eyebrow">${esc(who)}</div><h3>${esc(A.name)}: ${esc(A.motto)}</h3>
    <ul style="margin:0;padding-left:1.2em;display:grid;gap:6px">${A.moves.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
    <p class="small"><b>Where platforms fit:</b> ${esc(A.platforms)}</p><p class="small"><b>Measure:</b> ${esc(A.measure)}</p><div>${SME.cites(A.cite)}</div></div>`;
}
function dumbbell(Y, O){
  const order = IDS.slice().sort((a, b) => Math.max(Y.fit[b], O ? O.fit[b] : 0) - Math.max(Y.fit[a], O ? O.fit[a] : 0));
  const L = 110, Rr = 20, Tp = 26, RH = 26, W = 720, H = Tp + RH * order.length + 10, X = v => L + (W - L - Rr) * v / 100;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Fit by platform">`;
  [0, 50, 100].forEach(v => s += `<line x1="${X(v)}" x2="${X(v)}" y1="${Tp - 8}" y2="${H - 6}" style="stroke:var(--rule)" ${v === 50 ? 'stroke-dasharray="2 4"' : ""}/><text x="${X(v)}" y="14" class="axlabel" text-anchor="middle">${v}</text>`);
  order.forEach((id, i) => { const y = Tp + i * RH + RH / 2, ex = Y.excluded.includes(id);
    s += `<text x="${L - 10}" y="${y + 4}" class="pl" text-anchor="end" opacity="${ex ? .45 : 1}">${esc(short(id))}${ex ? " ✕" : ""}</text><line x1="${X(0)}" x2="${X(100)}" y1="${y}" y2="${y}" style="stroke:var(--rule)"/>`;
    if (O) s += `<line x1="${X(Math.min(Y.fit[id], O.fit[id]))}" x2="${X(Math.max(Y.fit[id], O.fit[id]))}" y1="${y}" y2="${y}" style="stroke:${cv(id)}" stroke-width="4" stroke-opacity=".45" stroke-linecap="round"/>`;
    s += `<circle cx="${X(Y.fit[id])}" cy="${y}" r="6.5" style="fill:var(--you)" opacity="${ex ? .35 : 1}"/>`;
    if (O) s += `<circle cx="${X(O.fit[id])}" cy="${y}" r="6" style="fill:var(--plate);stroke:var(--co)" stroke-width="2.5" opacity="${O.excluded.includes(id) ? .35 : 1}"/>`; });
  return s + `</svg>`;
}
function divergence(Y, O, oname){
  const tierOf = (R, id) => R.tiers.home.includes(id) ? 0 : R.tiers.amp.includes(id) ? 1 : R.tiers.test.includes(id) ? 2 : 3;
  const shared = IDS.filter(id => (tierOf(Y, id) === 0 && tierOf(O, id) <= 1) || (tierOf(O, id) === 0 && tierOf(Y, id) <= 1));
  const youOnly = IDS.filter(id => tierOf(Y, id) <= 1 && tierOf(O, id) >= 3);
  const orgOnly = IDS.filter(id => tierOf(O, id) <= 1 && tierOf(Y, id) >= 3);
  const gaps = IDS.map(id => [id, Math.abs(Y.fit[id] - O.fit[id])]).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const nm = a => a.map(short).join(", "), L = [];
  if (shared.length) L.push(`<p><b>Shared ground: ${nm(shared)}.</b> The person speaks and the organization amplifies. On most platforms a person's account outperforms an organization's page, so lead with people.</p>`);
  if (youOnly.length) L.push(`<p><b>Yours alone: ${nm(youOnly)}.</b> Personal territory the organization should enter only through you, if at all.</p>`);
  if (orgOnly.length) L.push(`<p><b>${esc(oname)} alone: ${nm(orgOnly)}.</b> Run these as organizational channels, or delegate them.</p>`);
  L.push(`<p><b>Widest gaps:</b> ${gaps.map(([id, g]) => `${esc(short(id))} (${g} points)`).join(", ")}. Check that these reflect a real difference rather than a guess.</p>`);
  if (Y.cls[0] !== O.cls[0]) L.push(`<p><b>Different centers of gravity:</b> you lean toward ${CL[Y.cls[0]].name.toLowerCase()}, ${esc(oname)} toward ${CL[O.cls[0]].name.toLowerCase()}. Two presences covering two kinds of medium can be a strength.</p>`);
  return `<div class="plate"><h3>Where you and ${esc(oname)} diverge</h3><div style="display:grid;gap:8px">${L.join("")}</div></div>`;
}
function renderPresenceResults(){
  const org = S.presence.org, oname = S.presence.orgName || "Organization", olab = oname.split(":")[0];
  const Y = presenceScore(S.presence.you), O = org ? presenceScore(S.presence.org) : null;
  const fmt = (R, name) => `${name}\n  Clusters: ${R.cls.map(k => `${CL[k].name} ${Math.round(R.blend[k] * 100)}%`).join(", ")}\n  Home base: ${R.tiers.home.map(short).join(", ")}\n  Amplify: ${R.tiers.amp.map(short).join(", ") || "none"}\n  Worth a test: ${R.tiers.test.map(short).join(", ") || "none"}${R.archetype ? `\n  Off-platform: ${SME.ARCHETYPES[R.archetype].name}` : ""}`;
  const text = `Social Medium Ecology · Presence result\n\n${fmt(Y, "You")}${O ? "\n\n" + fmt(O, olab) : ""}`;
  const infra = infraNote(Y, "you") + (O ? infraNote(O, olab) : "");
  const arch = [];
  if (Y.archetype) arch.push(archetypeHTML(Y.archetype, O && O.archetype === Y.archetype ? `You and ${olab}` : "You"));
  if (O && O.archetype && O.archetype !== Y.archetype) arch.push(archetypeHTML(O.archetype, olab));
  const set = [...new Set(Y.tiers.home.concat(Y.tiers.amp, O ? O.tiers.home.concat(O.tiers.amp) : []))];
  const tag = (R, id) => R.tiers.home.includes(id) ? "Home" : R.tiers.amp.includes(id) ? "Amplify" : null;
  const lensCl = [...new Set([Y.cls[0], Y.cls[1]].concat(O ? [O.cls[0]] : []))];
  const n = h(`<div class="res fade">
    ${resultHead("Where to build a presence", S.sample ? "Sample result · example answers" : "Your result · presence")}
    <div class="two">${presenceCard(Y, "You", "var(--you)")}${O ? presenceCard(O, oname, "var(--co)") : ""}</div>
    ${infra ? `<div class="callout"><h3>What you give up by skipping a platform</h3><ul>${infra}</ul></div>` : ""}
    ${arch.length ? `<div style="display:grid;gap:14px"><h2>Your home base off the platforms</h2><p class="muted small" style="max-width:700px">Platforms change their rules; an audience you reach directly does not. This is the strategy your answer on building trust points to.</p><div class="two">${arch.join("")}</div></div>` : ""}
    <div class="plate"><div class="row"><h3>Fit across all 17 platforms</h3><span class="spacer"></span><span class="mono plain">● You${O ? ` &nbsp; <span style="color:var(--co)">○</span> ${esc(olab.slice(0, 22))}` : ""}</span></div>
      <div class="svgbox">${dumbbell(Y, O)}</div><p class="muted small">Fit is relative within each profile: 100 is that presence's best match. ✕ marks platforms you excluded.</p></div>
    ${O ? divergence(Y, O, olab) : ""}
    <div style="display:grid;gap:14px"><h2>The theory lens</h2>${lensBlocks(lensCl, "presence")}</div>
    <div style="display:grid;gap:14px"><h2>Playbook</h2><p class="muted small">One move and one risk for each platform in a home or amplify tier.</p>
      <div class="grid3">${set.map(id => { const tg = [tag(Y, id) ? `You: ${tag(Y, id)}` : null, O && tag(O, id) ? `${esc(olab.slice(0, 16))}: ${tag(O, id)}` : null].filter(Boolean);
        return `<div class="pb"><div class="tags">${tg.map(t => `<span class="tag">${t}</span>`).join("")}</div><h3 style="color:${cv(id)}">${esc(short(id))}</h3><p>${esc(byId[id].play[0])}</p><p class="muted small">Watch for: ${esc(byId[id].play[1])}</p></div>`; }).join("")}</div></div>
  </div>`);
  app.appendChild(n); wireHead(n, "presence", text);
}

/* init */
if (location.hash === "#values" || location.hash === "#presence") { const m = location.hash.slice(1); if (S.mode !== m) { S.mode = m; S.step = m === "presence" ? -1 : 0; } }
render();
})();
