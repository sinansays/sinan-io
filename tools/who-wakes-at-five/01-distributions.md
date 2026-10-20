# 01 — Population distributions of chronotype and sleep/wake timing (US vs. rest of world)

Compiled 2026-10-19. Scope: measurement basics, MSF/MSFsc distributions, age and sex curves, US time-use and poll data, international wearable, app and time-use data, and self-identification shares.

Machine-readable tables are in `data/`:

| File | Content |
|---|---|
| `bls_atus_pct_sleeping_by_hour.csv` | BLS ATUS Table A-3: % of US population (15+) sleeping at each clock hour, for 2025, 2024 and 2007–11; also % awake = 100 − sleeping |
| `fischer2017_msfwe_by_age.csv` | US chronotype (mid-sleep on weekends) by single year of age × sex, with N and SD (ATUS 2003–14, N = 53,689) |
| `mctq_2017_msf_msfsc_hist_digitized.csv` | MCTQ database (N = 221,480 MSF; 185,333 MSFsc) half-hour histograms, digitized from Roenneberg 2019 Fig. 1 |
| `hetus_pct_in_personal_care_by_clock_time.csv` | Eurostat HETUS: % of population in "personal care except eating" (sleep plus washing/dressing) at clock times, by country, for the 2000, 2010 and 2020 waves |

Quality legend: **High** = peer-reviewed or official statistics, large or representative sample, number read directly from source text or table. **Medium** = peer-reviewed but convenience sample, values digitized from a figure, or a reputable poll with thin methods. **Low** = company press release or media relay, methods undisclosed.

---

## (a) Key findings

1. **Chronotype is a near-normal, slightly right-skewed trait.**
   - In the MCTQ database (Central Europe-dominated, online, N = 185,333 for MSFsc), sleep-corrected mid-sleep on free days (MSFsc) has an approximate mean of **04:06**, SD **≈1.46 h** and skew **≈+0.7**; the modal half-hour bin is 03:30. Uncorrected MSF has an approximate mean of **04:38**, SD **≈1.6 h**. These moments are computed from the digitized Roenneberg 2019 Fig. 1; the digitized bins reproduce the figure's printed category shares to within 0.1 pp.
   - In the US (ATUS diaries, N = 53,689), mid-sleep on weekends (MSFWe) has mean **03:26** (3.43 h), SD **2.31 h**, interquartile range **02:24–04:15**, and a total range of about 10 h (00:00–09:53) (Fischer et al. 2017).
   - The US value is earlier and wider. ATUS mid-sleep is not sleep-corrected and has no alarm-free filter, and it comes from a single diary day. It also uses sleep times rather than MCTQ self-report, and samples a nationally representative population that includes many retirees.

2. **Age curve.** Chronotype delays through adolescence, is latest at about 19–21 years, then advances steadily.
   - MCTQ (Roenneberg 2004, N ≈ 25,000): the peak is at **19.5 y in women** and **20.9 y in men**.
   - US ATUS (Fischer 2017): the peak is at **18.4 y in women (MSFWe 04:27)** and **19.2 y in men (04:40)**, from smoothed fits. The latest single-year group mean is about 04:52 (age 20).
   - By age 70 the US mean is about 02:49, similar to 10-year-olds. More than 50% of the lifetime change happens between 15 and 25 (64% in women, 55% in men).
   - Variability also falls with age: the SD is largest at 20–24 (2.36 h in women, 2.65 h in men) and smallest at 75+ (about 1.6 h).

3. **Sex.** Men are later than women before about 40 (max difference 16 min at 21.6 y, US). In the US the gap reverses after about 41 (women about 15 min later) and disappears by about 79. MCTQ Europe reports that women are earlier for most of adulthood, with no difference after about 50. Duarte (Brazil, MEQ) finds a reversal after 45, as in the US. The pattern is therefore population-dependent, and this is a flagged conflict.

4. **US clock-time distribution (the core "awake by" curve).** BLS ATUS Table A-3 for 2025 (people 15+, all days of the week):

   | Time | % awake |
   |---|---|
   | 4:00 | 8.6 |
   | 5:00 | 15.7 |
   | 6:00 | 34.1 |
   | 7:00 | 57.5 |
   | 8:00 | 75.0 |
   | 9:00 | 86.4 |

   - The curve is remarkably stable: 2007–11, 2024 and 2025 differ by no more than 1.5 pp in the morning.
   - Edison Research (2025, ages 13+, method not disclosed) independently reports **31.3% awake by 6 a.m.** on weekdays.
   - **No official published weekday-vs-weekend split by clock time was found** (see Gaps). Weekend wake-ups are about 60–80 min later than midweek in large wearable datasets.

5. **Self-identification depends heavily on question wording and population.**
   - US, YouGov 2022 (N = 6,833): **36% early bird vs. 50% night owl** (8% neither, 6% not sure).
   - US, CivicScience 2017: 38% morning vs. 48% night owl.
   - US, Gallup 2007: **55%** say they are "at their best" in the morning, vs. 26% evening or late night. This is a performance question, not an identity question.
   - UK Biobank (aged 40–69, N = 449,732): **56% morning-leaning** (24% "definitely", 32% "more morning"), **34% evening-leaning** (26% / 8%), 10% don't know.
   - 23andMe (customers): **~49% morning** among people who expressed a preference; 24% gave neutral answers.
   - Morning identification rises steeply with age: 23andMe shows 24% under 30 vs. 63% over 60.

6. **Type shares depend on cutoffs.** On the same MEQ data, Horne–Östberg cutoffs give about 50–62% morning and 2–6% evening types in middle-aged samples. Age-adjusted cutoffs (Taillard 2004: evening < 53, morning > 64) give about 25–28% morning and 20–26% evening.
   - MCTQ MSFsc (Roenneberg 2019 seven-group scheme): 29% early, 30% intermediate, 41% late. Note the "intermediate" band there is only 1 h wide.
   - US ATUS with the conventional cutoffs of < 03:00 / 03:00–05:00 / > 05:00: 40% early, 44% intermediate, 16% late.

7. **Countries.** Bedtime varies more than wake time between countries (Walch 2016; Ong 2019; Willoughby 2023). East and Southeast Asia have the latest bedtimes and shortest sleep; Oceania and North America have the earliest bed and wake times; Southern Europe is latest in Europe.
   - HETUS (ages 20–74, all days) shows the share still in "sleep or personal care" at 07:00 ranges from **~50% (Hungary, Slovenia)** to **~86% (Spain)**.

---

## (b) Plottable data tables

### B1. US — % of people 15+ sleeping vs. awake by clock hour (BLS ATUS Table A-3)
Source: BLS, ATUS Tables A-3A/A-3B: 2025 (a3-2025.pdf), 2024 (a3-2024.pdf) and 2007–11 (a3_0711.htm). These are snapshots at the stated time, averaged over all days of the year. "Sleeping" includes naps and spells of sleeplessness. Quality: **High** (official, nationally representative; about 7,500–9,000 diaries per year).

| Clock | Sleeping 2025 | Sleeping 2024 | Sleeping 2007–11 | **Awake 2025** | Awake 2024 | Awake 2007–11 |
|---|---|---|---|---|---|---|
| 00:00 | 86.8 | 86.2 | 82.6 | 13.2 | 13.8 | 17.4 |
| 01:00 | 92.4 | 92.6 | 90.5 | 7.6 | 7.4 | 9.5 |
| 02:00 | 94.4 | 95.0 | 93.7 | 5.6 | 5.0 | 6.3 |
| 03:00 | 94.9 | 95.7 | 94.9 | 5.1 | 4.3 | 5.1 |
| 04:00 | 91.4 | 92.0 | 91.8 | 8.6 | 8.0 | 8.2 |
| 05:00 | 84.3 | 84.6 | 85.4 | **15.7** | 15.4 | 14.6 |
| 06:00 | 65.9 | 67.1 | 66.0 | **34.1** | 32.9 | 34.0 |
| 07:00 | 42.5 | 43.1 | 42.1 | **57.5** | 56.9 | 57.9 |
| 08:00 | 25.0 | 24.5 | 24.5 | 75.0 | 75.5 | 75.5 |
| 09:00 | 13.6 | 14.3 | 13.6 | 86.4 | 85.7 | 86.4 |
| 10:00 | 7.2 | 7.5 | 7.6 | 92.8 | 92.5 | 92.4 |
| 11:00 | 4.6 | 4.8 | 4.9 | 95.4 | 95.2 | 95.1 |
| 12:00 | 3.5 | 3.8 | 3.6 | 96.5 | 96.2 | 96.4 |
| 13:00–19:00 | 2.9–4.8 | 2.9–4.4 | 2.5–4.2 | ~95–97 | | |
| 20:00 | 7.6 | 7.3 | 5.0 | 92.4 | 92.7 | 95.0 |
| 21:00 | 21.1 | 21.1 | 14.5 | 78.9 | 78.9 | 85.5 |
| 22:00 | 47.1 | 47.2 | 37.2 | 52.9 | 52.8 | 62.8 |
| 23:00 | 72.8 | 72.2 | 65.1 | 27.2 | 27.8 | 34.9 |

Notes:
- 05:30 is **not published**; hourly snapshots only. Linear interpolation gives about 25% awake at 05:30 (derived, not a source value).
- The evening side shifted earlier between 2007–11 and 2024–25: 47% asleep at 22:00 vs. 37%. The morning side did not change.
- Cross-check: Edison Research 2025 (ages 13+) reports 31.3% awake by 6 a.m., 14.5% rising between 6:00 and 6:30, 13.3% between 7:00 and 7:30, and 4.7% not up until the 9 a.m. hour (InsideRadio / SSRS). Quality: **Low–Medium** (no N or method disclosed).
- US working adults aged 25–65 on workdays (Mathura et al. 2025, ATUS 2017–2023, N = 18,249): model-adjusted mean wake-up is about **06:45 pre-COVID vs. 06:56 since May 2020** (+0.12 h), and mean bedtime is about 22:37 vs. 22:31. These are regression intercepts, not raw means. Quality: **High/Medium**.

### B2. US chronotype by age and sex — MSFWe (Fischer, Lombardi, Marucci-Wellman & Roenneberg 2017, PLoS ONE)
ATUS 2003–2014, N = 53,689 (30,226 women and 23,463 men; employed, unemployed or retired). Values are survey-weighted means of the weekend mid-sleep from a one-day diary. 5-year bins were computed by me as N-weighted averages of the paper's single-year means (Table 1); the full single-year table is in the CSV. Quality: **High** (nationally representative, published table). The bin Ns match the paper's own figure counts for 20–24 (2,479) and 70–74 (2,266).

| Age | Women | Men | Total | N |
|---|---|---|---|---|
| 15–19 | 04:20 | 04:29 | 04:24 | 3,507 |
| 20–24 | 04:18 | 04:32 | 04:25 | 2,479 |
| 25–29 | 03:44 | 03:56 | 03:50 | 3,769 |
| 30–34 | 03:25 | 03:42 | 03:34 | 5,072 |
| 35–39 | 03:21 | 03:24 | 03:22 | 5,603 |
| 40–44 | 03:17 | 03:15 | 03:16 | 5,697 |
| 45–49 | 03:15 | 03:08 | 03:12 | 5,380 |
| 50–54 | 03:10 | 03:04 | 03:07 | 4,750 |
| 55–59 | 03:09 | 02:55 | 03:02 | 4,261 |
| 60–64 | 03:05 | 02:52 | 02:58 | 3,580 |
| 65–69 | 03:04 | 02:47 | 02:56 | 3,062 |
| 70–74 | 03:02 | 02:44 | 02:54 | 2,266 |
| 75–79 | 02:52 | 02:53 | 02:52 | 1,900 |
| 80+ | 02:52 | 02:46 | 02:50 | 2,363 |
| **All** | **03:25 (SD 2.14 h)** | **03:27 (SD 2.44 h)** | **03:26 (SD 2.31 h)** | 53,689 |

Other values from the paper:
- Distribution shape: 25th percentile 02:24, 75th percentile 04:15.
- Smoothed peaks: 18.4 y (women, 04:27) and 19.2 y (men, 04:40).
- Single-year maximum: age 20, total 4.87 h ≈ 04:52.
- SD by age: largest at 20–24 (women 2.36 h, men 2.65 h); smallest is women 75–79 at 1.66 h and men 80+ at 1.57 h.
- The Saturday→Sunday night is 13 min later than the Friday→Saturday night.
- Cutoff classification: 40% early (< 03:00), 44% intermediate (03:00–05:00), 16% late (> 05:00).

### B3. MCTQ database — histogram of MSF and MSFsc (Roenneberg, Pilz, Zerbini & Winnebeck 2019, Biology 8:54, Fig. 1)
The database holds entries as of July 2017, with roughly 300,000 total entries worldwide, predominantly Central Europe (German-speaking and the Netherlands). Inclusion: complete core MCTQ, no alarm clock on free days, within ±3σ. N = **221,480 (MSF)** and **185,333 (MSFsc)**. I digitized the half-hour bins (bin centers listed) from the published PNG by measuring bar pixel lengths. The digitized bins sum to 99.3% / 99.6%, and the derived category sums match the printed legend to within 0.1 pp. Quality: **High source / Medium for exact bin values** (±0.1 pp).

| Bin center | MSF % | MSFsc % |
|---|---|---|
| 23:30 | 0.01 | 0.04 |
| 00:00 | 0.07 | 0.12 |
| 00:30 | 0.17 | 0.29 |
| 01:00 | 0.43 | 0.67 |
| 01:30 | 1.06 | 1.72 |
| 02:00 | 2.54 | 4.13 |
| 02:30 | 5.31 | 8.75 |
| 03:00 | 9.10 | 13.51 |
| 03:30 | 12.04 | **15.47** |
| 04:00 | **13.38** | 14.36 |
| 04:30 | 12.75 | 11.74 |
| 05:00 | 11.12 | 9.24 |
| 05:30 | 9.07 | 6.93 |
| 06:00 | 7.01 | 4.72 |
| 06:30 | 5.12 | 3.14 |
| 07:00 | 3.56 | 1.83 |
| 07:30 | 2.40 | 1.14 |
| 08:00 | 1.62 | 0.70 |
| 08:30 | 0.98 | 0.43 |
| 09:00 | 0.61 | 0.30 |
| 09:30 | 0.44 | 0.16 |
| 10:00 | 0.31 | 0.13 |
| 10:30 | 0.14 | 0.07 |
| 11:00 | 0.08 | 0.03 |

Derived moments (my computation from the digitized bins; treat as approximate):
- MSF: mean 04:38, SD 1.61 h, skewness +0.57.
- MSFsc: mean **04:06**, SD **1.46 h**, skewness +0.68.

Printed category shares, exact from the figure legend. Category edges, inferred by matching the sums: ≤01:15, 01:15–02:15, 02:15–03:15, 03:15–04:15, 04:15–05:15, 05:15–06:15, ≥06:15.

| Category | MSF | MSFsc |
|---|---|---|
| Extremely early | 0.8% | 1.2% |
| Moderately early | 3.7% | 5.9% |
| Slightly early | 14.4% | 22.3% |
| Intermediate | 25.5% | 29.8% |
| Slightly late | 23.9% | 21.0% |
| Moderately late | 16.1% | 11.7% |
| Extremely late | 15.7% | 8.2% |

Social jetlag (SJL = MSF − MSW), same database and same Fig. 4 legend: negative SJL 1.7%; no SJL 12.4%; up to 1 h 39.8%; 1–2 h 29.1%; 2–3 h 11.7%; more than 3 h 5.3%. That puts **46.1% above 1 h of SJL and 17.0% above 2 h**.

**Conflict:** The 2012 press release for Roenneberg et al. (Current Biology, "Social jetlag and obesity") stated that about two-thirds of people have significant SJL. That figure depends on the threshold used (≥1 h vs. >1 h) and on the sample.

Other MCTQ samples:
- Lifelines, northern Netherlands, aged 60+, N = 16,757 (Wenzler et al. 2026). Five-group MSFsc split with an intermediate band of 03:30–04:30: **2% extremely early, 20% slightly early, 56% intermediate, 19% slightly late, 3% extremely late**. Quality: **High**.

### B4. Self-identified chronotype shares

| Population | Question / instrument | Morning | Neither / DK | Evening | N | Year | Source | Quality |
|---|---|---|---|---|---|---|---|---|
| US adults | "Are you more of an early bird or a night owl?" | **36%** (17% total + 19% somewhat) | 8% neither, 6% not sure | **50%** (28% somewhat + 22% total) | 6,833 | 2022 (May 27) | YouGov Daily | Medium-High |
| US adults | Morning person vs. night owl | 38% (35% in 2016) | — | 48% (52% in 2016) | n/r | 2017 | CivicScience | Low-Medium |
| US adults | "At what hour are you at your best?" | 55% morning (5am–noon) | 15% afternoon, 4% no opinion | 20% evening + 6% late night | 1,019 | 2007 | Gallup | Medium (old) |
| US adults | Best time of day | 28% morning + 20% mid-day | 18% afternoon | 16% evening + 10% night | n/r | 2011 | YouGov | Low-Medium |
| UK adults | Best time of day | 43% | 20% afternoon | 27% evening/night | n/r | 2011 | YouGov GB | Low-Medium |
| UK, aged 40–69, European ancestry | UKB field 1180 "Do you consider yourself to be…" | **23.9% definitely + 32.2% more morning = 56.1%** | 10.3% don't know | **25.6% more evening + 8.0% definitely = 33.6%** | 449,732 | 2006–10 | Jones et al. 2019 Nat Commun Table 1 | High (non-representative, healthy volunteers) |
| 23andMe customers (mostly US, European ancestry) | Naturally a morning or night person? | 48.6% of decided (120,478 vs. 127,622) | ~24% neutral (32,842 of 135,447 in the 2016 sample) | 51.4% of decided | 248,100 | ≤2018 | Jones 2019; Hu et al. 2016 | Medium (customer sample) |
| — by sex / age (23andMe 2016, N = 89,283) | same | M 39.7%, F 48.4%; <30y 24.2%, >60y 63.1% | | | | | Hu 2016 | Medium |
| US, by age (Gallup 2007) | at best in morning | 18–34: 43%; 35–54: 58%; 55+: 59% | | 18–34: 28% evening + 9% late night | | | Gallup | Medium |
| US, by age (YouGov 2011) | best in morning | 18–34: 12%; 35–54: 31%; 55+: 40% | | | | | YouGov | Low-Medium |
| UK, by age (YouGov 2011) | morning | 18–24: 22%; 60+: 58% | | 18–24: 38%; 60+: 20% | | | YouGov GB | Low-Medium |

AASM: the Sleep Prioritization Survey (Atomik Research, online, N = 2,006, May 2024) publishes a **bedtime** distribution, not chronotype. Of the 1,057 who answered: ≤6 pm 1%, 7 pm 3%, 8 pm 8%, 9 pm 21%, 10 pm 31%, 11 pm 25%, midnight or later 12%. Quality: Medium. **No AASM, NSF Sleep in America or CDC/NHIS question on "morning person vs. night owl" was found.**

### B5. MEQ / rMEQ cutoffs and how type shares change with them

| Instrument | Definite evening | Moderate evening | Neither | Moderate morning | Definite morning | Source |
|---|---|---|---|---|---|---|
| MEQ, 19 items (score 16–86) | 16–30 | 31–41 | 42–58 | 59–69 | 70–86 | Horne & Östberg 1976 (cutoffs derived in ages 18–32); verified via UPenn and ATS scoring sheets |
| MEQ, middle-aged cutoffs (3 groups) | ≤52 evening | | 53–64 | ≥65 morning | | Taillard et al. 2004 |
| rMEQ, 5 items (score 4–25) | 4–7 | 8–11 | 12–17 | 18–21 | 22–25 | Adan & Almirall 1991. The ≤7 / ≥22 extremes are corroborated by Wilson et al. 2025; the inner cutoffs are not re-verified against the primary source (Medium) |

Cutoff sensitivity, using the same data with different cutoffs:

| Sample | N | Standard H-Ö: M / N / E | Adjusted cutoffs: M / N / E | Source |
|---|---|---|---|---|
| French workers, non-shift, mean age 51 | 566 | 62.1 / 36.6 / 2.2% | 28.1 / 51.7 / 20.2% | Taillard 2004, J Biol Rhythms |
| New Zealand electoral roll, aged 30–49 | 2,526 | 49.8% M / — / 5.6% E | 24.7% M / — / 26.4% E | Paine et al. 2006, J Biol Rhythms |
| Finland FINRISK 2007, women aged 25–74 (short MEQ) | 2,501 | 45.8 / 48.7 / 5.6% | — | Toffol et al. 2013 |
| Japan civil servants, aged 18–69 (rMEQ) | 4,410 | — / — / 12.0% evening (18.3% if ≤39 y; 8.5% if ≥40 y) | — | Ishihara et al. 2025 |

The rule of thumb that "about 60% are neither type and about 40% are morning or evening" (Adan et al. 2012 review) only holds for young or student samples with H-Ö cutoffs. In middle-aged samples, H-Ö cutoffs classify half or more as morning types.

### B6. Country wake and bed times

**B6a. Walch, Cochran & Forger 2016 (Sci Adv), ENTRAIN app.** Self-reported "normal" wake and bed times, rounded to the hour, N = 5,450 after cleaning (8,070 submitted; 45% US). Values are **digitized by me from Fig. 1E** (the top-20 countries by N) and are good to about ±3 min. Quality: **Medium** (small app sample; positions read from flag centres).

| Country | Wake | Bed |
|---|---|---|
| Australia | 06:53 | 22:48 |
| United States | 06:51 | 22:57 |
| Belgium | 06:57 | 22:53 |
| New Zealand (flag partly hidden) | 07:01 | 22:52 |
| Denmark | 06:54 | 23:06 |
| Switzerland | 06:58 | 23:08 |
| Canada | 07:03 | 23:03 |
| UK | 07:06 | 23:11 |
| Netherlands | 07:14 | 23:08 |
| Germany | 07:06 | 23:21 |
| France | 07:24 | 23:20 |
| Japan | 06:58 | 23:29 |
| Mexico | 07:19 | 23:32 |
| China | 07:27 | 23:36 |
| Unidentified (dark red/green flag behind Mexico) | 07:24 | 23:33 |
| Brazil | 07:11 | 23:36 |
| Singapore | 07:15 | 23:49 |
| Italy | 07:39 | 23:46 |
| UAE | 07:43 | 23:42 |
| Spain | 07:40 | 23:51 |

Text findings from the same paper:
- Bedtime, not wake time, predicts country sleep duration.
- Age is the main determinant of midsleep, while sex has no significant effect on midsleep.
- Press figures: Netherlands sleep 8 h 12 min, longest; Japan and Singapore about 7.4–7.5 h, shortest (WEF / press; Low-Medium).

**B6b. Sleep Cycle app (phone accelerometer).** Company data relayed by the press. Quality: **Low**.
- 2014–15, N = 941,329 users. Earliest average wake-ups: South Africa 06:24, Colombia 06:31, Costa Rica 06:38, Indonesia 06:55, Japan 07:09, Mexico 07:09, New Zealand 07:11, Switzerland 07:13, Australia 07:13, Czech Republic 07:15, Slovakia 07:18, Denmark 07:19, Austria 07:20, **United States 07:20**, Sweden 07:21.
- 2018 data, more than 920,000 users in 60+ countries. Latest: Saudi Arabia 08:22, Greece 08:18, Portugal 08:10 (Portugal bedtime 00:47). Iran is latest to bed, about 25 min after Portugal.

**B6c. Wearables (objective).**

| Study | Device | N | Countries | Key timing values | Quality |
|---|---|---|---|---|---|
| Scott et al. 2025, *Sleep* 48(9) zsaf099 | Withings under-mattress sensor, 2020–23 | 116,879 people, ~73 M nights; 77% male; mean age 49 | 41 | **Overall: bed 23:30 ± 1:30, midpoint 03:30 ± 1:20, out of bed 07:55 ± 1:25**, duration 7.1 h. Latitude 0–30°: bed 23:55, mid 03:50, up 08:05. Latitude 30–90°N: 23:30 / 03:30 / 07:55. −30–0°: 23:05 / 03:20 / 07:50. −90 to −30°: 23:30 / 03:10 / 07:30. Weekends: bed 30–37 min later, out of bed **62–80 min later** than midweek. Northern winter: up ~25 min later than summer | High (biased sample) |
| Willoughby et al. 2023, *Sleep Med* | Oura Gen 2 | ~220,000 users, >50 M nights | 35 | Asia has the latest onset and shortest sleep; North America and Oceania earliest to bed and to wake. Weekend bedtime 15–35 min later and wake 30–60 min later (Oura blog). Country values are in the supplement only (not retrieved) | High / Medium |
| Ong et al. 2019, *Sci Rep* | Fitbit, March 2017 | 23,680 users aged 15–80 | AU, NZ, SG, HK, KR | East Asians go to bed **59–84 min later** on weekdays but wake only 18–50 min later than Oceanians. ≥7 h on weekdays: AU 61%, NZ 66%, SG 27%, HK 34%, KR 29% | High |
| Jonasdottir, Minor & Lehmann 2021, *Sleep* | Wrist wearables | 69,650 non-shift workers aged 19–67, 11.1 M nights | 47 | Onset and offset advance with age; women sleep longer (abstract only) | High |

**B6d. Eurostat HETUS — % of population in "personal care except eating" (sleep + washing/dressing/other personal care) at each clock time, all days.**
- The 2000 and 2010 waves cover ages **20–74** (Eurostat metadata).
- The 2020 wave covers about 10+ per guidelines; the exact age filter of the table was not confirmed.
- Values were read directly from Eurostat datasets `tus_00startime` and `tus_20startime` (participation rate, 10-min slots). Sleep is not a separate category in these tables, so these values are an **upper bound** on "% asleep", and 100 − value is a lower bound on "% up". Quality: **High** (official).

2010 wave (data collected 2008–2015 depending on country):

| Country | 05:00 | 06:00 | 06:30 | 07:00 | 07:30 | 08:00 | 09:00 | 22:00 | 23:00 | 00:00 |
|---|---|---|---|---|---|---|---|---|---|---|
| Spain | 97.5 | 96.0 | 92.3 | **86.2** | 75.2 | 62.2 | 37.5 | 10.9 | 32.1 | 68.6 |
| Greece | 98.2 | 94.9 | 89.5 | 81.9 | 59.4 | 46.1 | 23.6 | 13.0 | 35.5 | 71.1 |
| Netherlands | 97.8 | 94.9 | 89.8 | 80.1 | 65.0 | 51.4 | 29.4 | 21.3 | 52.0 | 80.1 |
| Belgium | 97.2 | 92.7 | 86.7 | 75.8 | 62.7 | 48.6 | 28.1 | 32.3 | 63.8 | 83.9 |
| Italy | 98.1 | 93.7 | 87.1 | 74.2 | 54.3 | 38.3 | 18.9 | 29.6 | 62.4 | 86.6 |
| France | 95.5 | 90.5 | 84.5 | 73.3 | 60.3 | 45.7 | 27.2 | 26.6 | 65.7 | 85.4 |
| Turkey | 91.1 | 86.5 | 81.0 | 72.8 | 57.7 | 48.0 | 32.0 | 31.9 | 58.3 | 83.9 |
| Estonia | 96.6 | 92.4 | 85.0 | 72.7 | 58.3 | 46.7 | 27.2 | 39.2 | 65.1 | 86.6 |
| Luxembourg | 96.9 | 91.7 | 83.5 | 70.3 | 56.4 | 43.9 | 27.2 | 31.2 | 61.2 | 85.6 |
| UK | 92.8 | 87.5 | 81.2 | 70.0 | 58.0 | 45.0 | 26.1 | 37.8 | 64.7 | 82.8 |
| Norway | 96.8 | 91.2 | 82.0 | 69.8 | 55.9 | 45.1 | 28.3 | 18.1 | 46.9 | 77.2 |
| Romania | 98.6 | 92.1 | 80.6 | 65.9 | 42.6 | 29.6 | 13.5 | 53.1 | 85.4 | 96.0 |
| Finland | 94.3 | 85.7 | 76.3 | 65.6 | 53.1 | 40.6 | 24.1 | 36.5 | 64.4 | 83.7 |
| Germany | 95.2 | 85.4 | 75.7 | 63.7 | 51.5 | 39.6 | 21.5 | 39.8 | 67.2 | 85.7 |
| Poland | 94.4 | 83.2 | 71.2 | 59.3 | 45.9 | 35.0 | 17.4 | 54.1 | 79.4 | 93.0 |
| Serbia | 96.7 | 85.5 | 72.7 | 59.3 | 39.0 | 30.1 | 15.4 | 45.2 | 68.2 | 85.6 |
| Hungary | 91.7 | 78.0 | 64.5 | **49.7** | 35.3 | 25.9 | 13.1 | 62.4 | 86.4 | 94.4 |

The 2020 wave (AT, BG, DE, EE, FI, HR, HU, NL, NO, PL, RS) and the 2000 wave (also includes SI, LT, LV, BG) are in the CSV. 2020 wave values at 07:00: NL 78.7, EE 73.5, BG 70.4, NO 68.1, FI 66.2, DE 64.6, RS 64.1, PL 59.6, AT 57.9, HR 55.3, HU 49.6.

US comparison (different definition: sleeping only, ages 15+): **42.5% asleep at 07:00 in 2025.** The US is therefore earlier than every HETUS country even before allowing for the washing/dressing inflation in the HETUS figures. **Caveat:** the two definitions are not identical. HETUS "personal care except eating" at 07:00 includes perhaps 5–10 pp of washing and dressing (my estimate, not sourced).

### B7. Summary of central values for animation

| Quantity | Value | Source |
|---|---|---|
| Global/European chronotype (MSFsc) | mean ~04:06, SD ~1.46 h, mode 03:30–04:00 | MCTQ 2017 (digitized) |
| US chronotype (MSFWe, not corrected) | mean 03:26, SD 2.31 h, IQR 02:24–04:15 | Fischer 2017 |
| Age of peak lateness | women 18.4–19.5 y; men 19.2–20.9 y | Fischer 2017; Roenneberg 2004 |
| Mean "normal" wake / bed, wearable (Europe/N. America–heavy) | out of bed 07:55, bed 23:30, mid 03:30 | Scott 2025 |
| US % awake at 5 / 6 / 7 / 8 am (all days) | 15.7 / 34.1 / 57.5 / 75.0 | BLS ATUS 2025 |
| US self-ID early bird / night owl | 36% / 50% | YouGov 2022 |
| UK (40–69) morning / evening / DK | 56% / 34% / 10% | UK Biobank |

---

## (c) Gaps, uncertainties and conflicts

1. **US weekday vs. weekend % awake by clock time: not found in published form.** BLS Table A-3 publishes all-days averages only (checked for 2007–11, 2024 and 2025). The ATUS microdata (activity file with start and stop times, plus TUDIARYDAY and TUFINLWGT weights) would allow a direct computation. However, **bls.gov blocked scripted downloads from this session** (Akamai bot policy, 403), and the CRAN `atus` package only has aggregated durations. Recipe for someone with access: take the stop time of the first sleep episode (activity 0101xx) after 04:00, merging episodes with gaps of 30 min or less (as in Mathura 2025). Weight by TUFINLWGT, split TUDIARYDAY ∈ {1, 7} vs. 2–6, and compute the weighted cumulative share. As a proxy, wearable data put weekend wake times **~60–80 min later** (Scott 2025) and 30–60 min later (Oura). Edison's "31.3% up by 6 a.m." is described as a weekday figure.
2. **No AASM, NSF Sleep in America, CDC/NHIS or Gallup (post-2007) "morning person vs. night owl" item was found.** The NSF polls did not surface a chronotype share in searches; NSF poll PDFs were not reviewed page by page. The Gallup question (2007) is about peak performance time, not identity.
3. **Roenneberg 2007 and 2012 full texts were not readable** (Cell / Elsevier paywalls). Exact mean and SD of MSFsc are not printed in the 2019 review either, so the MSFsc moments here are **my computations from a digitized histogram**. The 2004 peak ages come from the Nature news report and the Fischer 2017 literature summary.
4. **The "two-thirds have social jetlag" claim conflicts** with the 2017 MCTQ figure, where 46% have more than 1 h. The difference depends on the threshold and the sample.
5. **US vs. MCTQ chronotype are not directly comparable.** ATUS MSFWe has no sleep correction and no alarm exclusion, includes retirees, and uses a one-day diary; MCTQ is a self-selected online sample using self-report. US mid-sleep is about 40 min earlier with a wider SD. Some of that gap is methodological, not geographic.
6. **Sex-difference direction after 40 conflicts:** the US and Brazil show women later after 40–45, while the MCTQ (Europe) and Tonetti (Italy) show no difference after about 50–55.
7. **Self-identification shares are not comparable across polls.** Wording (identity vs. "best time"), forced choice vs. neutral options, and age structure all matter. A US–UK comparison is not like-for-like: YouGov US 2022 covers all adults, while UK Biobank covers ages 40–69 with healthy-volunteer bias. Both effects push UK Biobank toward morning.
8. **Country wake and bed times** come from convenience samples (app or wearable users: wealthier, health-conscious, male-skewed in Withings at 77%). The ENTRAIN values are digitized from a small figure (±3 min), and one flag is unidentified. The Sleep Cycle data are company press data with undisclosed methods.
9. **HETUS time-of-day tables do not isolate sleep.** "Personal care except eating" overstates "% asleep" in the 06:30–08:00 window. Fieldwork years differ by country (2008–2015 and 2019–2023).
10. **Not found or not reviewed:** a numeric MEQ distribution for a nationally representative US adult sample; numeric outputs from the Apple Heart & Movement Study, Polar or Google/Fitbit 2024–26 on sleep timing by country; Akhtar et al. 2026 (npj Biol Timing Sleep), which covers duration and was not mined; the Rose et al. 2025 bioRxiv paper (not reviewed); INSEE wake-time distributions; and the Willoughby 2023 country table (supplementary).
11. The ABA article "What Time Do Americans Wake Up?" (Oct–Nov 2026) could not be read because the fetch failed.

---

## (d) Sources

Primary and peer-reviewed:
- Fischer D, Lombardi DA, Marucci-Wellman H, Roenneberg T. Chronotypes in the US – Influence of age and sex. *PLoS ONE* 2017;12:e0178782. doi:10.1371/journal.pone.0178782 — https://pmc.ncbi.nlm.nih.gov/articles/PMC5479630
- Roenneberg T, Pilz LK, Zerbini G, Winnebeck EC. Chronotype and social jetlag: a (self-)critical review. *Biology* 2019;8:54. doi:10.3390/biology8030054 — https://pmc.ncbi.nlm.nih.gov/articles/PMC6784249 ; Fig. 1 https://pub.mdpi-res.com/biology/biology-08-00054/article_deploy/html/images/biology-08-00054-g001.png ; Fig. 4 …-g004.png
- Roenneberg T et al. A marker for the end of adolescence. *Curr Biol* 2004;14:R1038. doi:10.1016/j.cub.2004.11.039 (supplement: https://pure.rug.nl/ws/files/6682390/2004CurrBiolRoennebergSupp.pdf ; peak ages via https://www.nature.com/news/2004/041229/full/news041229-5.html)
- Roenneberg T et al. Epidemiology of the human circadian clock. *Sleep Med Rev* 2007;11:429. doi:10.1016/j.smrv.2007.07.005 (abstract only)
- Roenneberg T, Allebrandt KV, Merrow M, Vetter C. Social jetlag and obesity. *Curr Biol* 2012;22:939. doi:10.1016/j.cub.2012.03.038 (press release: https://www.sciencedaily.com/releases/2012/05/120510132637.htm)
- Walch OJ, Cochran A, Forger DB. A global quantification of "normal" sleep schedules using smartphone data. *Sci Adv* 2016;2:e1501705. doi:10.1126/sciadv.1501705 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4928979 (figures via Europe PMC supplementaryFiles)
- Jones SE et al. Genome-wide association analyses of chronotype in 697,828 individuals. *Nat Commun* 2019;10:343. doi:10.1038/s41467-018-08259-7 — https://pmc.ncbi.nlm.nih.gov/articles/PMC6351539
- Hu Y et al. GWAS of 89,283 individuals identifies genetic variants associated with self-reporting of being a morning person. *Nat Commun* 2016;7:10448. doi:10.1038/ncomms10448 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4740817
- Scott H et al. Variations in sleep duration and timing… 73 million nights. *Sleep* 2025;48(9):zsaf099. doi:10.1093/sleep/zsaf099 — https://pmc.ncbi.nlm.nih.gov/articles/PMC12417015
- Willoughby AR, Alikhani I, Karsikas M, Chua XY, Chee MWL. Country differences in nocturnal sleep variability. *Sleep Med* 2023. doi:10.1016/j.sleep.2023.08.010 — https://pubmed.ncbi.nlm.nih.gov/37595432/
- Ong JL et al. Large-scale data from wearables reveal regional disparities in sleep patterns. *Sci Rep* 2019;9:3415. doi:10.1038/s41598-019-40156-x — https://pmc.ncbi.nlm.nih.gov/articles/PMC6399225
- Jonasdottir SS, Minor K, Lehmann S. Gender differences in nighttime sleep patterns… *Sleep* 2021;44:zsaa169. doi:10.1093/sleep/zsaa169 (abstract)
- Mathura E et al. Sleep timing and duration for working adults in the US before and since COVID-19. *Sleep Adv* 2025. doi:10.1093/sleepadvances/zpaf040 — https://pmc.ncbi.nlm.nih.gov/articles/PMC12418940
- Paine SJ, Gander PH, Travier N. The epidemiology of morningness/eveningness… *J Biol Rhythms* 2006;21:68. doi:10.1177/0748730405283154
- Taillard J et al. Validation of Horne and Östberg MEQ in a middle-aged population of French workers. *J Biol Rhythms* 2004;19:76. doi:10.1177/0748730403259849
- Toffol E et al. *Chronobiol Int* 2013. doi:10.3109/07420528.2012.763043 (FINRISK 2007 type shares)
- Adan A et al. Circadian typology: a comprehensive review. *Chronobiol Int* 2012;29:1153. doi:10.3109/07420528.2012.719971
- Wenzler AN et al. Chronotype and incident dementia (Lifelines). *Epidemiol Psychiatr Sci* 2026. doi:10.1017/s2045796026100687 — https://pmc.ncbi.nlm.nih.gov/articles/PMC13150776
- Ishihara K et al. *Fujita Med J* 2025 (rMEQ eveningness in Japanese civil servants) — https://pmc.ncbi.nlm.nih.gov/articles/PMC12040487
- MEQ scoring: https://www.med.upenn.edu/cbti/assets/user-content/documents/Morningness-Eveningness%20Questionnaire.pdf ; https://site.thoracic.org/assemblies/srn/sleep-related-questionnaires/meq

Official statistics:
- BLS ATUS Table A-3, 2025: https://www.bls.gov/tus/tables/a3-2025.pdf ; 2024: https://www.bls.gov/tus/tables/a3-2024.pdf ; 2007–11: https://www.bls.gov/tus/tables/a3_0711.htm
- Eurostat HETUS datasets `tus_00startime` and `tus_20startime` (API: https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/tus_00startime?format=TSV) ; metadata https://ec.europa.eu/eurostat/cache/metadata/en/tus_00_esms.htm

Polls and industry (lower quality):
- YouGov US Daily, 27 May 2022, "early bird or night owl" (N = 6,833): https://yougov.com/en-us/daily-results/20220527-59eb7-2
- Gallup 2007, "Majority of Americans… at their best in the morning": https://news.gallup.com/poll/101866/majority-americans-personal-best-morning.aspx
- YouGov US 2011: https://yougov.com/en-us/articles/1938-nearly-half-say-they-function-best-morning-or-mid- ; YouGov GB 2011: https://yougov.com/en-gb/articles/2046-night-owls-and-early-birds
- CivicScience 2017: https://civicscience.com/?p=14902
- AASM Sleep Prioritization Survey 2024 (bedtime): https://aasm.org/wp-content/uploads/2024/12/sleep-prioritization-survey-2024-bedtime.pdf
- Edison Research / SSRS 2025 wake-up times: https://ssrs.com/insights/what-time-do-americans-wake-up/ ; https://www.insideradio.com/free/edison-research-finds-americans-up-early-many-before-morning-shows-begin/article_82941b03-5f1a-4848-8ccf-64c169fb7a17.html
- Sleep Cycle 2015 (BusinessTech): https://businesstech.co.za/news/lifestyle/86268/south-africans-are-the-earliest-risers-in-the-world/ ; 2018 (Portugal News): https://www.theportugalnews.com/news/portuguese-among-the-latest-risers-in-the-world/48739
- Oura global study blog: https://ouraring.com/blog/nl/global-sleeping-patterns-study/ ; NUS release: https://medicine.nus.edu.sg/wp-content/uploads/2023/08/Greater-Sleep-Variability-in-Asia-Less-Weekend-compensation-Media-Release.pdf
- WEF on Walch 2016: https://www.weforum.org/stories/all/which-country-is-getting-the-least-sleep/
