# 02 — What Determines Chronotype (Larks vs. Owls)

**Scope:** what separates someone who naturally wakes energized around 05:00, someone who naturally wakes around 07:00, and someone who forces a 05:00 wake with difficulty. Covers genetics, intrinsic period (tau), light, geography, age and sex, sleep homeostasis, and the physiology of a "hard" early wake.
**Geography:** United States vs. rest of world, tagged on each finding as **[US]**, **[World: country]** or **[Mixed]**.
**Compiled:** 2026-10-19. Literature searched through Oct 2026 using Europe PMC, journal pages and university press releases.

**How to read the tags:**
- **Verification:**
  - **V-full**: checked against the paper's full text.
  - **V-abs**: checked against the abstract.
  - **V-sec**: checked against a secondary source such as a press release or a review that quotes the primary.
  - **UNVERIFIED**: recalled but not confirmed. Don't plot these without checking.
- **Quality:**
  - **A**: large population sample, or a gold-standard lab protocol (constant routine or forced desynchrony).
  - **B**: moderate N, or a validated survey.
  - **C**: small N, a clinic sample, or a single-day measure.
- **[Derived]** marks a number I computed from published values. **[Speculative]** marks interpretation.

---

## (a) Key findings

### 1. Genetics

#### 1.1 Heritability (twin and family studies)

| Estimate | Population | N | Measure | Source | Verif. | Quality |
|---|---|---|---|---|---|---|
| **49.7%** broad-sense (95% CI 46.4–52.8). Additive 11.7%, dominance 38.0%, the rest non-shared environment | **[World: Finland]** Older Finnish Twin Cohort, 1981 | 2,836 MZ + 5,917 DZ pairs | 4-category self-report diurnal type | Koskenvuo et al. 2007, *J Sleep Res*, doi:10.1111/j.1365-2869.2007.00580.x | V-abs | A |
| **44%** (adolescents, mean age 17.8) and **47%** (parents/older twins). No sex difference. Genetic correlation between generations was below 0.5 | **[World: Netherlands]** twin families | not stated in abstract | 5-point morningness rating | Vink et al. 2001, *Chronobiol Int*, doi:10.1081/cbi-100107516 | V-abs | B |
| **52%** dominance genetic, 48% non-shared environment | **[World: UK]** young adult twins (ages 18–27) | 420 MZ, 773 DZ, 329 siblings | MEQ | Barclay et al. 2010, *Chronobiol Int*, doi:10.3109/07420521003663801 | V-abs | B |
| **0.48** (adjusted for sex and age). **0.38** when also adjusted for rural vs. urban zone | **[World: Brazil]** Baependi family cohort | 825 people in 112 families | MEQ | von Schantz et al. 2015, *Sci Rep*, doi:10.1038/srep09214 | V-abs | B |
| **0.37** MEQ, **0.32** MCTQ, **0.28** single question (MEQ Q19) | **[World: Brazil]** Baependi | 597 | three instruments | Taporoski et al. 2021, *J Biol Rhythms*, doi:10.1177/07487304211030420 | V-abs | B |
| 20 actimetry traits with h² > 0.6 (7 survived Bonferroni) | **[US]** twins aged 16–40 | 33 MZ + 38 DZ complete pairs | wrist actigraphy | Hoffman et al. 2019, *Genes Brain Behav*, doi:10.1111/gbb.12569 | V-abs | C (small N) |
| "12–42%" (twin and family range cited) | review statement | — | — | Lane et al. 2016, *Nat Commun* (intro) | V-full | — |

**Takeaway:** twin heritability is consistently **about 40–50%**. Much of it is non-additive (dominance), which is why it is larger than the SNP-heritability below. Family-based estimates run lower, around 0.28–0.48.

#### 1.2 SNP-heritability and GWAS

| Study | N | Loci | SNP-h² | Notes | Verif. |
|---|---|---|---|---|---|
| Hu et al. 2016, *Nat Commun*, doi:10.1038/ncomms10448 **[US, 23andMe]** | 89,283 | 15 (7 near circadian genes: RGS16, VIP, PER2, HCRTR2, RASD1, PER3, FBXL3) | not found in full text | 43.6% self-identified morning persons | V-full |
| Lane et al. 2016, *Nat Commun*, doi:10.1038/ncomms10889 **[World: UK Biobank]** | 100,420 | 12 new | **19.4%** (continuous) and **37.7%** (extreme), by GCTA | MR suggested eveningness leads to higher educational attainment | V-full |
| Jones et al. 2016, *PLoS Genet* (128,266, UKB) | 128,266 | morningness and sleep-duration loci | — | found in search; details not extracted | listed only |
| **Jones et al. 2019, *Nat Commun*, doi:10.1038/s41467-018-08259-7 [Mixed: UK Biobank 449,734 + 23andMe 248,098, mostly US]** | **697,828** | **351** (24 known, 327 new) | **13.7%** (95% CI 13.3–14.0), BOLT-REML, UKB only | the largest dedicated chronotype GWAS I found | V-full (via journal page) |
| Burns et al. 2023, *Sleep*, doi:10.1093/sleep/zsac287 **[UKB]** | 280,897 | 1 gene-by-daylight locus (ARL14EP rs3847634, β_GxE = −0.03) | — | first "light-sensitivity" GWIS | V-abs |
| Composite sleep-health GWAS, *Commun Biol* 2025, doi:10.1038/s42003-025-07514-0 | 413,904 | 28 new loci (composite score) | 0.094 (additive score) | not chronotype-specific | V-abs |

- **No newer dedicated chronotype GWAS larger than Jones 2019 turned up in 2022–2026.** That covers Europe PMC title and abstract searches plus extended web searches. Multi-ancestry or East Asian chronotype GWAS are cited in 2026 MR papers, but I couldn't confirm their N or loci. See Gaps.
- **Morning-type share by cohort (Jones 2019 counts) [Derived]:**
  - 23andMe: 48.6% morning (120,478 vs 127,622).
  - UK Biobank: 62.6% (252,287 vs 150,908).
  - Meta-analysis: 57.2%.
- **US vs. world point:** the US 23andMe cohort is less morning-leaning than UK Biobank. Part of that is age: UKB participants are 40–69 at recruitment.

#### 1.3 Effect sizes (minutes of shift)

| Contrast | Shift | Measure | Source | Verif. |
|---|---|---|---|---|
| **Top 5% vs. bottom 5%** of a 292-variant morningness genetic score | **25.1 min earlier** (95% CI 22.5–27.6). Mean L5 time 03:06 vs 03:32 | accelerometer L5 timing (least-active 5 h), N ≈ 85,000 UKB | Jones 2019 | V-full |
| Same score vs. sleep duration and fragmentation | little or no association | accelerometer | Jones 2019 | V-full |
| PER3 missense variants (strongest single common signal) | OR 1.44 per minor allele; **~8 min** earlier sleep timing. The original FASP family showed **4.2 h** | accelerometer | Jones 2019 | V-full |
| RGS16 missense (minor allele freq. 3%) | OR 1.26 per minor allele | self-report | Jones 2019 | V-full |
| **FASP (PER2 S662G, autosomal dominant)** | sleep, temperature and melatonin rhythms **~4 h advanced** | lab | Toh et al. 2001, *Science*, doi:10.1126/science.1057499 | V-abs |
| FASP kindreds (3 families) | "profound" advance; review cites **3–4 h**; "very short tau" | lab | Jones et al. 1999, *Nat Med*, doi:10.1038/12502; review PMC9099045 | V-abs / V-sec |
| **CRY1 Δ11 (c.1657+3A>C, rs184039278), dominant** | proband DLMO **02:32** vs typical 20:00–22:00 (about 4.5–6.5 h late). Proband free-running tau 24.5 h (sleep-wake) and 24.8 h (temperature) vs a control's 24.2 h. Cell-model period about 0.5 h longer. Authors estimate a 0.5 h change in tau gives a 2–2.5 h shift in sleep relative to melatonin | lab | Patke et al. 2017, *Cell*, doi:10.1016/j.cell.2017.03.027 | V-full (via PMC page) |
| CRY1 Δ11 allele frequency | "up to **0.6%**". ExAC non-Finnish European **0.65%** (0.006537), ExAC total 0.43%, 1000 Genomes 0.12%. 28 carriers in Turkish databases. Carrier vs. non-carrier OR = 1,928 (95% CI 76–48,904) in 6 families | — | Patke 2017 | V-full |
| PER3 VNTR (4/5 repeat) | longer allele goes with morningness. 75% of DSPS patients were homozygous for the short allele | candidate gene | Archer et al. 2003, *Sleep*, doi:10.1093/sleep/26.4.413 | V-abs |
| CACNA1D (5 variants in 5 families) | new FASP gene. Mouse model has normal tau but altered light phase-shifting at CT16 and CT22 | — | PNAS 2025, doi:10.1073/pnas.2424387122 | V-abs |
| Other ASP genes in review tables | CK1δ T44A (Xu 2005), CRY2 A260T (Hirano 2016), TIMELESS | — | Frontiers Genet 2022 review, PMC9099045 | V-sec |

**Takeaway [Speculative]:** common variants shift timing by minutes each and about 25 min combined across the top and bottom 5% of genetic score. Only rare Mendelian variants (FASP, CRY1 Δ11) move timing by hours. A genuine natural "05:00 waker" is therefore either a rare-variant carrier, an older adult, or someone with a strongly early light environment on top of a modestly early genetic background.

#### 1.4 Advanced phase (ASP / FASP / ASWPD) prevalence

| Value | Population | N | Source | Verif. | Quality |
|---|---|---|---|---|---|
| **ASP 0.33% (about 1 in 300); FASP 0.21% (1 in 475); ASWPD ≥ 0.04% (1 in 2,500)** | **[US]** new patients at one North American sleep clinic over 9.8 years. **Clinic sample, not general population** | 2,422 | Curtis et al. 2019, *Sleep*, doi:10.1093/sleep/zsz148 | V-abs | C (clinic) |
| ASPD **0.25% to 7.13%**, depending on definition. Higher in men and rising with age | **[World: New Zealand]** adults 20–59 | 9,100 mailed, 54% response | Paine et al. 2014, *Chronobiol Int*, doi:10.3109/07420528.2014.885036 | V-abs | B |
| **0 cases** of ASPS under strict ICSD criteria | **[World: Norway]** adults 18–67 | 10,000 sampled, 77% response | Schrader et al. 1993, *J Sleep Res*, doi:10.1111/j.1365-2869.1993.tb00061.x | V-abs | B |
| ~1% in middle-aged adults (ICSD-3); Ando et al. 1995 ~0.33% (ages 40–64) | — | — | ICSD-3; Ando 1995 (abstract-book only) | **UNVERIFIED** | — |

**Conflict:** the oft-quoted "1 in 300" is ASP prevalence among sleep-clinic patients, not in the general population and not FASP. Population estimates range from 0% under strict criteria to 7% under loose self-report definitions.

#### 1.5 Delayed sleep-wake phase disorder (DSWPD) prevalence

| Value | Population | N | Source | Verif. |
|---|---|---|---|---|
| **0.17%** (95% CI 0.10–0.28). Mean onset age 15.4 y. Another 0.72% had socially or psychologically induced delay | **[World: Norway]** adults 18–67 | ~7,700 responders | Schrader 1993 | V-abs |
| **1.51% to 8.90%**, depending on definition | **[World: New Zealand]** adults 20–59 | ~4,900 | Paine 2014 | V-abs |
| **3.3%** (girls 3.7%, boys 2.7%). Over half also met insomnia criteria | **[World: Norway]** adolescents 16–18 | 10,220 | Sivertsen et al. 2013, *BMC Public Health*, doi:10.1186/1471-2458-13-1163 | V-abs |
| Delayed sleep phase **8.4%**; 5.7% with functional consequences | **[World: Norway]** high school 16–19 | 1,285 | Saxvig et al. 2012, *Sleep Med*, doi:10.1016/j.sleep.2011.10.024 | V-abs |
| DSP 4.6%; **DSPD 4.0%** (DSM-5) | **[World: Sweden]** ages 16–26 | 680 (68% of 1,000) | Danielsson et al. 2016, *Chronobiol Int*, doi:10.1080/07420528.2016.1217002 | V-abs |
| **3.3%** (men 4.7%, women 2.7%) | **[World: Norway]** university students 18–35 | 50,054 | Sivertsen et al. 2021, *Sleep Med*, doi:10.1016/j.sleep.2020.09.028 | V-abs |
| **57%** of clinically diagnosed DSPD had DLMO at or after desired bedtime ("circadian DSPD"). In 43%, the DLMO came before desired bedtime | **[World: Australia]** clinic, ages 16–64 | 182 | Murray et al. 2017, *Sleep*, doi:10.1093/sleep/zsw002 | V-abs |
| ICSD-3 adolescent range 7–16% | — | — | ICSD-3 | **UNVERIFIED** |

**US gap:** I found no US population-based DSWPD prevalence study with ICSD-3 criteria.

### 2. Intrinsic circadian period (tau)

| Value | Population | N | Source | Verif. | Quality |
|---|---|---|---|---|---|
| **24.18 h**, same in young and older people, "tight distribution" | **[US]** Boston forced desynchrony | small (young and older) | Czeisler et al. 1999, *Science*, doi:10.1126/science.284.5423.2177 | V-abs | A |
| **24.15 ± 0.20 h** (24 h 9 min ± 12 min) overall | **[US]** Boston, month-long inpatient, ages 18–74 | 157 (52 F, 105 M) | Duffy et al. 2011, *PNAS*, doi:10.1073/pnas.1010666108 | V-abs | A |
| **Women 24.09 ± 0.2 h vs men 24.19 ± 0.2 h** (p < 0.01) | same | same | Duffy 2011 | V-abs | A |
| **tau < 24.0 h: 35% of women vs 14% of men** | same | same | Duffy 2011 | V-abs | A |
| African Americans **24.07 h** vs non-Hispanic European Americans **24.33 h**. EA women 24.24 vs EA men 24.41; no sex difference in AA (24.07 for both) | **[US]** Chicago | (JSR 2017 pooled sample; N not extracted) | Eastman et al. 2017, *J Sleep Res*, doi:10.1111/jsr.12521 | V-abs | B |
| Earlier sample: AA ~24.07 vs EA ~24.36 h. Overall 24.21 ± 0.23 (range 23.79–24.77). **tau < 24 h: 4/19 AA (21%) vs 0/17 EA** | **[US]** | 36 | Eastman et al. 2015, *Sci Rep*, doi:10.1038/srep08381 | V-full (journal page) | B |
| Evening types ~**24.3 h** vs morning types ~**24.1 h** (forced desynchrony). tau correlates with MEQ, circadian phase and wake time | **[US]** | — | Duffy et al. 2001, *Behav Neurosci*, doi:10.1037//0735-7044.115.4.895 (numbers as cited in Lack 2009) | V-abs + V-sec | A |
| Extreme evening type (with DSPD) 25.4 h vs controls 24.4 h (self-selected bedtimes, time isolation) | case | 1 vs 3 | cited in Lack 2009 | V-sec | C |
| Shorter tau goes with larger phase advances, longer tau with larger delays (r = −0.56) | **[US]** | 36 | Eastman 2015 | V-full | B |

**Mechanism:**
- A longer tau means the clock must be advanced every day by morning light to stay entrained. It settles at a later phase relative to the light-dark cycle.
- Per Patke's estimate, about 0.5 h of tau difference translates to roughly 2–2.5 h of phase difference.
- A shorter tau, especially below 24 h, which is more common in women and in some ancestries, produces earlier entrainment.

**Conflicts:**
- EA tau is 24.33 (2017) vs 24.36 (2015) in the same lab with overlapping samples. Use 2017.
- EA men at 24.41 is longer than Duffy's Boston men at 24.19. Different protocols: Eastman used ultradian light-dark cycles, Duffy used forced desynchrony. Don't mix them on one axis without a note.

### 3. Light

| Finding | Value | Population / N | Source | Verif. |
|---|---|---|---|---|
| Natural light-dark summer camping vs. modern electric lighting | **all circadian markers ~2 h earlier** after one week | **[US: Colorado, 40°N]** N = 8 (2 F), age 30.3 ± 8.5 | Wright et al. 2013, *Curr Biol*, doi:10.1016/j.cub.2013.06.039 | V-full |
| Light dose, modern vs. camping | waking average **979 ± 352 lux** vs **4,487 ± 552 lux** (more than 4×). First 2 h awake: 934 vs 3,074 lux. Sunset to sleep: 21 vs 8 lux | same | Wright 2013 | V-full |
| Melatonin offset vs. wake | modern: offset **after** wake (~08:00, sleep start ~00:30). Camping: offset **>50 min before** wake | same | Wright 2013 | V-full |
| Chronotype vs. shift size | later chronotypes advanced more. Natural light **reduced individual differences** in phase. Chronotype vs DLMO r = 0.83 under electric light | same | Wright 2013 | V-full |
| Winter camping, 1 week | melatonin rise **2.6 h earlier**; **~13×** more daytime light | **[US: Colorado]** N = 5 | Stothard et al. 2017, *Curr Biol*, doi:10.1016/j.cub.2016.12.041 (numbers via CU Boulder release) | V-abs + V-sec |
| Summer weekend camping | **1.4 h earlier**, about **69%** of the week-long shift | **[US: Colorado]** N = 14 (9 camped, 5 controls) | Stothard 2017 | V-abs + V-sec |
| Evening light sensitivity | group ED50 for melatonin suppression **24.6 lux**. Individual ED50 ranged **6 to 350 lux** (CV 26%). Evening light of 10, 30 and 50 lux delayed apparent melatonin onset by **22, 77 and 109 min** | **[World: Australia]** N = 55, ages 18–30 | Phillips et al. 2019, *PNAS*, doi:10.1073/pnas.1901824116 | V-abs |
| Evening light-emitting e-reader vs printed book | longer sleep latency (about 10 min), less evening sleepiness, less melatonin, **later circadian phase**, worse next-morning alertness. 90% of US adults use electronics within 1 h of bed (survey of 1,508) | **[US]** N = 12; 4 h reading (18:00–22:00), 5 nights per condition | Chang et al. 2015, *PNAS*, doi:10.1073/pnas.1418490112 | V-abs + V-sec |
| Chang 2015 melatonin suppression ~55% and DLMO delay ~1.5 h | — | — | Chang 2015 | **UNVERIFIED (PNAS full text blocked)** |
| Light needed for a saturating phase delay (lab) | 550 lux saturates; 100 lux gives half of max (vs ~9,100 lux) | lab | cited in Wright 2013 (Zeitzer 2000) | V-sec |
| Expert recommendations (melanopic EDI at the eye) | **daytime ≥ 250 lux**; **evening ≤ 10 lux** from 3 h before bed; **sleep ≤ 1 lux** | consensus | Brown et al. 2022, *PLoS Biol*, doi:10.1371/journal.pbio.3001571 | V-full |
| Time indoors, US | **87%** of time in enclosed buildings, **6%** in vehicles | **[US]** NHAPS, N = 9,386 | Klepeis et al. 2001, *J Expo Anal Environ Epidemiol*, doi:10.1038/sj.jea.7500165 | V-abs (EPA HERO) |
| Gene × daylight | ARL14EP variant strengthens the morningness effect of daytime light. Greater genetic light sensitivity correlates with later chronotype | **[UK]** N = 280,897 | Burns 2023 | V-abs |
| DLMO vs. sleep onset | phase angle stays about **2 h** (DLMO ~2 h before sleep onset). A 2 h later schedule shifted DLMO 1.75 h later. DLMO range 4.5 h in late sleepers vs 2.4 h in early sleepers | **[World: Australia]** N = 28 | Sletten et al. 2010, *Front Neurol*, doi:10.3389/fneur.2010.00137 | V-abs |
| Evening types' light exposure relative to circadian phase | higher ratio of advancing to delaying light, consistent with longer tau | **[US: Oregon]** N = 66 | Emens et al. 2009, *Chronobiol Int*, PMC2699216 | V-abs |

**Reference illuminance (generic, for axis labels):** outdoor daylight runs roughly 1,000 lux (heavy overcast) to about 100,000 lux (direct sun). Typical indoor light is about 100–500 lux. Phillips 2019 frames it as pre-electric exposure of ">300 lux or <30 lux", with modern evenings at 30–300 lux. Treat this as an order-of-magnitude reference, not a measured dataset. Wright 2013's measured values above are the plottable ones.

### 4. Geography: sun clock vs. social clock

| Finding | Value | Source | Verif. |
|---|---|---|---|
| Position within a time zone | chronotype tracks sun time. In rural areas and small towns, coupling "exactly replicat[es] the sun's **4-minute delay per [degree of] longitude**". Coupling is weaker in big cities | Roenneberg et al. 2007, *Curr Biol*, doi:10.1016/j.cub.2006.12.011 (N > 21,000 Germany); quoted in Roenneberg et al. 2019, *Biology*, doi:10.3390/biology8030054 | V-full (2019 review); 2007 V-sec |
| Germany east–west span [Derived] | about 9° of longitude (≈6°E to 15°E), so about **36 min** of predicted sun-time shift across the country | derived from 4 min/° | [Derived] |
| City size | chronotype later with larger population; gradient strongest in towns of ≤ 300,000 | Roenneberg 2007 (ScienceDaily summary) | V-sec |
| **US time-zone position** | each extra hour of evening natural light (later sunset, i.e. western edge of a zone) cuts average sleep by **19 min**. Linked to obesity, diabetes, CVD, breast cancer and lower income | Giuntella & Mazzonna 2019, *J Health Econ* (CDC + Census data) **[US]** | V-abs |
| US zone width [Derived] | US time zones span about 15–20° of longitude, i.e. about **60–80 min** of sun-time difference between eastern and western edges of the same zone | derived | [Derived] |
| Latitude (Brazil, one time zone, 0–32°S) | morning-to-evening cline toward higher latitude, but the effect is tiny: **Cohen's f² = 0.004** | Leocadio-Miguel et al. 2017, *Sci Rep*, doi:10.1038/s41598-017-05797-w, N = 12,884 | V-full |
| Latitude meta-analysis (87 datasets, 28 countries) | eveningness goes with higher latitude, longer days and later sunset. **Sunset time was the best predictor**. Contradictory results across the USA, where higher morningness went with higher latitude | Randler & Rahafar 2017, *Sci Rep*, doi:10.1038/srep39976, N = 35,589 | V-full |
| Rural vs urban, same town | MEQ **70.2 rural vs 62.6 urban** | Baependi, Brazil (von Schantz 2015) | V-abs |
| DST | free-day sleep follows seasonal dawn under standard time but **not under DST**. Activity timing doesn't adjust to the spring transition, especially in late chronotypes | Kantermann et al. 2007, *Curr Biol*, doi:10.1016/j.cub.2007.10.025, N = 55,000 survey + 50 tracked | V-abs |
| Global smartphone data | a country's average bedtime, not wake time, predicts sleep duration. Outdoor-light users sleep earlier and longer. "Age is the primary determinant of sleep timing" | Walch et al. 2016, *Sci Adv*, doi:10.1126/sciadv.1501705 | V-abs (country values not extracted; see Gaps) |

### 5. Age and sex

**US lifespan curve (the main plottable series):** Fischer et al. 2017, *PLoS One*, doi:10.1371/journal.pone.0178782.
- **[US]** American Time Use Survey 2003–2014, nationally representative, **N = 53,689**. Measure: weekend mid-sleep (MSF_We), single-day diary. V-full.
- **Overall:** 03:26 ± 2.31 h. The middle 50% fall between 02:24 and 04:15. Range is 00:00 to 09:53.
- **Peak lateness (smoothed):**
  - Women: **18.4 y**, MSF_We 04:27.
  - Men: **19.2 y**, 04:40.
- **Steepest change:** between ages 15 and 25.
  - Women: total swing **1.85 h** (0.76 h delay, then 1.09 h advance).
  - Men: **1.89 h** (1.01 h delay, then 0.88 h advance).
  - This window holds 64% (women) and 55% (men) of lifetime chronotype change.
- **Sex crossover:**
  - Largest sex gap is **16 min at age 21.6** (men later).
  - The gap disappears at **41.4 y**. After 41, women are later by about 16 min. The gap disappears again at 79.1 y.
- **Variability:** SD of mid-sleep peaks at ages 20–24 (women 2.36 h, men 2.65 h). Minimum is 1.66 h (women 75–79) and 1.57 h (men 80+).
- **Older vs younger:** 70-year-olds have MSF_We 02:49, similar to 10-year-olds (03:09, extrapolated).
- **School start:** 17–18-year-olds average about **04:30** mid-sleep.
- **Full by-age, by-sex table extracted** to `research/fischer2017_us_msfwe_by_age.csv`: 66 rows (ages 15–79 plus 80+), with N, mean and SD for women, men and total. Times are decimal hours.

**Rest of world:**
- **[World: Central Europe]** Roenneberg et al. 2004, *Curr Biol*, doi:10.1016/j.cub.2004.11.039. About **25,000** people aged 8–90. Peak lateness **19.5 y (women)** and **20.9 y (men)**. V-sec (Nature News). Per Fischer's summary, women are earlier for most of adulthood and the difference disappears after about **50** (attributed to menopause).
- **[World: Italy]** Tonetti et al. N = 8,972. Peak lateness about 21 y in men and about 17 y in women. No sex difference after 55. V-sec (cited in Fischer 2017).
- **[World: Germany]** Randler 2011, N = 7,480. Turn from delaying to advancing at about 21 y, earlier in females. V-sec.

**US self-report "morning person" share by age and sex:** Hu 2016, 23andMe **[US-majority]**, N = 89,283, V-full.

| Group | % morning persons |
|---|---|
| All | 43.6% |
| Men | 39.7% |
| Women | **48.4%** |
| Age < 30 | **24.2%** |
| 30–45 | 31.2% |
| 45–60 | 52.5% |
| > 60 | **63.1%** |

**Sex and circadian phase:**
- Women's melatonin and temperature rhythms sit earlier relative to sleep, even at the same clock sleep times. Cain et al. 2010, *J Biol Rhythms*, doi:10.1177/0748730410374943, **[US]**, 28 F + 28 M. V-abs.
- Tmin is about 30 min later in men than women. Baehr et al. 2000, *J Sleep Res*, doi:10.1046/j.1365-2869.2000.00196.x, **[US]**, 101 M + 71 F. V-abs.
- MEQ: men 64.6 vs women 62.8 in Baependi, Brazil. That runs opposite to most Northern samples; the population is older and rural.

**Conflict on the sex-difference crossover:**
- Fischer (US): about 41 y.
- Roenneberg (Europe): about 50 y.
- Tonetti (Italy): about 55 y.
- Paine (New Zealand) and Duarte (Brazil): reversal after 45.
- Measures and populations differ. Plot the US curve as US and the European figure as "rest of world".

**Older adults:**
- Earlier circadian phase, but they wake at an **earlier point relative to their own phase**. Duffy et al. 1998, *Am J Physiol*, doi:10.1152/ajpregu.1998.275.5.r1478: 44 older vs 101 young men. V-abs.
- Older "morning types" have a shorter phase-to-wake interval, the opposite of young morning types. Duffy et al. 1999, *J Investig Med*, PMC8530273: 68 young + 40 older. V-abs.
- So early waking in old age is not purely a clock advance.

### 6. Sleep homeostasis and phase angle: larks vs owls

| Finding | Source | Verif. |
|---|---|---|
| Morning types show **faster exponential decay of slow-wave activity** in NREM sleep (frontal), i.e. they dissipate sleep pressure faster. 12 M-types vs 12 E-types | Mongrain et al. 2006, *Eur J Neurosci*, doi:10.1111/j.1460-9568.2005.04561.x **[World: Canada]** | V-abs |
| Sleep pressure **builds more slowly in evening types** (subjective sleepiness slope, waking EEG theta-alpha time constant). Temperature phase 1.5 h later and sleepiness phase 2 h later in E-types. 9 M vs 9 E men | Taillard et al. 2003, *J Sleep Res*, doi:10.1046/j.0962-1105.2003.00369.x **[World: France]** | V-abs |
| Eveningness goes with **greater self-reported sleep need**, shorter weekday time in bed, weekend catch-up and more caffeine. N = 617 | Taillard et al. 1999, *J Sleep Res*, doi:10.1046/j.1365-2869.1999.00176.x **[World: France]** | V-abs |
| Chronotype is independent of sleep duration in the US population (b = −0.0004, n.s.) | Fischer 2017 **[US]** | V-full |
| Morningness genetic score does not predict sleep duration | Jones 2019 | V-full |
| PER3 5/5 vs 4/4: more slow-wave sleep and SWA, larger cognitive decline after sleep loss. Melatonin and cortisol rhythms unchanged. N = 24 | Viola et al. 2007, *Curr Biol*, doi:10.1016/j.cub.2007.01.073 **[World: UK]** | V-abs |
| Heritability of the MEQ "dissipation of sleep pressure" factor **0.32**; "build-up" factor **0.28** | Taporoski 2021 | V-abs |

**Phase angle (interval between circadian markers and sleep):**
- **Baehr 2000 [US]** (N = 172, ambulatory):
  - Mean Tmin was **03:50 for morning types, 05:02 for intermediates, 06:01 for evening types**.
  - Tmin fell around the **middle of the 8 h sleep**, but closer to wake for later types. So evening types sleep on an earlier part of their temperature cycle.
- **Duffy 1999 [US]:** morning types have a **longer** phase-to-wake interval. "Morning types actually woke at a later circadian phase."
- **Lack 2009 [World: Australia]** (habitual home sleep vs. lab-measured Tmin):
  - Tmin to wake: M-types **2.6 h**, E-types **2.9 h** [Derived].
- **Conflict:** Lack's small sample doesn't show Duffy and Baehr's pattern. Direction is agreed in the two larger US studies: owls wake closer to Tmin. Practical rule: **Tmin ≈ 2–3 h before habitual wake** in young adults on their own schedule.
- **DLMO ≈ 2 h before habitual sleep onset:**
  - Sletten 2010: ~2 h.
  - Lack 2009 [Derived]: M 21:48 → 23:24 (1.6 h); E 00:36 → 01:59 (1.4 h).

### 7. "Naturally" vs. "with difficulty": the physiology of a forced early wake

1. **Waking near or before Tmin, in the biological night.**
   - Endogenous sleep inertia is **3.6× larger** when waking in the biological night (circadian bin around 300°) than in the biological day. Scheer et al. 2008, *J Biol Rhythms*, doi:10.1177/0748730408318081, N = 12, forced desynchrony. V-abs.
   - For the Lack 2009 E-type (Tmin 07:28, melatonin peak 06:20), a 05:00 alarm lands about **2.5 h before Tmin and 1.3 h before peak melatonin**. That is deep in the biological night [Derived].
   - For the M-type (Tmin 05:13), 05:00 is right at Tmin. That is still difficult; this "lark" naturally wakes at 07:48.
   - **[Speculative]** A truly natural 05:00 waker would need Tmin around 02:00–03:00. That matches FASP, roughly 3–4 h advanced, or an extreme early chronotype.
2. **Melatonin still elevated.**
   - Under modern lighting, melatonin offset comes **after** habitual wake (~08:00). After natural light it comes more than 50 min **before** wake (Wright 2013). The modern environment makes even a 07:00 wake partly "biological night" for many.
3. **Subjective alertness rhythm diverges more than physiology.**
   - Lack 2009: core markers differ by **2–3 h** between M and E types, but subjective sleepiness peaks differ by **5.5 h** and alertness peaks by **9.2 h**.
   - E-type maximum sleepiness comes at 09:22, about an hour before their habitual 10:20 wake.
   - M-type maximum sleepiness (03:52) precedes Tmin by 1.35 h. In E-types it follows Tmin by 1.91 h.
4. **Social jetlag.**
   - Late chronotypes show the biggest workday vs. free-day gap and build weekday sleep debt (Wittmann et al. 2006, *Chronobiol Int*, doi:10.1080/07420520500545979, N = 501, V-abs).
   - A review cites a gap of at least 1 h affecting "approximately **87%** of Northern Europeans" (Potter et al. 2016, *Endocr Rev*, PMC5142605). V-sec. The primary source wasn't identified.
   - The commonly cited "~69% have ≥ 1 h, about one-third ≥ 2 h" (Roenneberg 2012 *Curr Biol* / Wittmann 2006) is **UNVERIFIED**; the full text was inaccessible. ScienceDaily's summary of Roenneberg 2012 says "two thirds of the population".
   - **[US]:** in the US ATUS sample, 17–18-year-olds have a 04:30 mid-sleep while 82.3% of US public schools start at or before 08:30 (Fischer 2017 citing CDC). V-full.
5. **Sex adds to the effect.** Women sleep at a later biological time for the same clock time (Cain 2010). [Speculative] A forced 05:00 wake is physiologically closer to Tmin for men than for women at the same habitual schedule.

---

## (b) Plottable data

### P1. Variance decomposition of chronotype

**Caveat:** these components come from different studies, measures and populations. They overlap and are **not additive**. Use as a "range bar" chart, not a pie.

| Component | Share of variance | Basis | Confidence |
|---|---|---|---|
| Genetics, twin broad-sense | **44–52%** | Koskenvuo 2007 (49.7%), Vink 2001 (44–47%), Barclay 2010 (52%) | High |
| Genetics, family-based | 28–48% | Baependi 2015/2021 | Medium |
| Genetics, SNP-based (common variants) | **13.7–19.4%** | Jones 2019; Lane 2016 | High |
| Common-variant genetic score explains, in minutes | top vs bottom 5% = 25 min (about 0.2 SD of a ~2 h SD trait) [Derived] | Jones 2019; SD from Fischer 2017 | Medium |
| Age (US, single-day diary) | **~5.3%** (η² from age-group means) [Derived] | Fischer 2017 Table 1 | Medium. A single-day measure inflates within-group variance; true share is likely higher |
| Sex (US, main effect) | **≈ 0%** (weighted means 3.34 vs 3.35 h) [Derived]; the age × sex interaction matters (±16 min) | Fischer 2017 | Medium |
| Age × sex cells combined (US) | ~5.5% [Derived] | Fischer 2017 | Medium |
| Latitude (Brazil, one time zone) | **~0.4%** (Cohen's f² = 0.004) | Leocadio-Miguel 2017 | Medium |
| Longitude within time zone | about 4 min per degree; 36 min across Germany, 60–80 min across a US zone [Derived] | Roenneberg 2007/2019 | Medium |
| Light environment (camping vs modern) | shifts the group mean about 2 h and shrinks between-person spread; no variance share published | Wright 2013 | Not estimable |
| Non-shared environment + measurement error | ~48–56% | twin models | High |

### P2. Tau distribution (for an animated histogram)

**Source parameters:** Duffy 2011, overall N(24.15, 0.20). Women N(24.09, 0.20), men N(24.19, 0.20).

**Normal-model bin percentages [Derived].** Observed "<24 h" shares are 35% (F) and 14% (M); the normal model gives 32.6% and 17.1%, so the model is roughly right.

| tau bin (h) | All % | Women % | Men % |
|---|---|---|---|
| 23.6–23.7 | 0.9 | 1.8 | 0.6 |
| 23.7–23.8 | 2.8 | 4.8 | 1.8 |
| 23.8–23.9 | 6.6 | 9.8 | 4.8 |
| 23.9–24.0 | 12.1 | 15.5 | 9.8 |
| 24.0–24.1 | 17.5 | 19.4 | 15.5 |
| 24.1–24.2 | 19.7 | 18.9 | 19.4 |
| 24.2–24.3 | 17.5 | 14.4 | 18.9 |
| 24.3–24.4 | 12.1 | 8.6 | 14.4 |
| 24.4–24.5 | 6.6 | 4.0 | 8.6 |
| 24.5–24.6 | 2.8 | 1.5 | 4.0 |
| 24.6–24.7 | 0.9 | 0.4 | 1.5 |
| 24.7–24.8 | 0.2 | 0.1 | 0.4 |

**Annotation points:**

| Marker | tau (h) | Source |
|---|---|---|
| Czeisler 1999 mean | 24.18 | Czeisler 1999 |
| African American (US) | 24.07 | Eastman 2017 |
| European American (US) | 24.33 | Eastman 2017 |
| Morning types | ~24.1 | Duffy 2001 |
| Evening types | ~24.3 | Duffy 2001 |
| CRY1 Δ11 proband | 24.5–24.8 | Patke 2017 |
| Extreme evening/DSPD case | 25.4 | Lack 2009 citation |
| FASP | "very short" | Jones 1999; exact value not verified |

### P3. Polygenic and variant effects (bar chart, minutes of shift)

| Contrast | Shift (min) | Direction | Source |
|---|---|---|---|
| PER3 common missense (per allele, accelerometer) | 8 | earlier | Jones 2019 |
| Genetic score top 5% vs bottom 5% (L5 03:06 vs 03:32) | 25.1 (CI 22.5–27.6) | earlier | Jones 2019 |
| Women vs men, peak gap at age 21.6 (US) — non-genetic comparator | 16 | earlier (women) | Fischer 2017 |
| Weekend camping | 84 (1.4 h) | earlier | Stothard 2017 |
| Week of summer camping | ~120 | earlier | Wright 2013 |
| Week of winter camping | 156 (2.6 h) | earlier | Stothard 2017 |
| FASP (PER2 S662G) | ~240 (4 h) | earlier | Toh 2001 |
| CRY1 Δ11 proband DLMO vs 20:00–22:00 norm | ~270–390 | later | Patke 2017 |

### P4. US age curve (line chart, two series)

The full dataset is in `fischer2017_us_msfwe_by_age.csv`. Key points (MSF_We as clock time):

| Age | Women | Men | Total |
|---|---|---|---|
| 15 | 04:07 | 04:01 | 04:04 |
| 19 | 04:32 | 05:02 | 04:47 |
| 20 | 04:52 | 04:52 | 04:52 |
| 25 | 03:47 | 04:09 | 03:58 |
| 30 | 03:32 | 03:59 | 03:47 |
| 40 | 03:22 | 03:16 | 03:19 |
| 50 | 03:15 | 03:07 | 03:11 |
| 60 | 03:10 | 02:56 | 03:02 |
| 70 | 03:04 | 02:47 | 02:55 |
| 80+ | 02:52 | 02:46 | 02:50 |

**Companion series, US self-report "% morning persons" (Hu 2016):**

| Age band | % morning |
|---|---|
| < 30 | 24.2 |
| 30–45 | 31.2 |
| 45–60 | 52.5 |
| > 60 | 63.1 |

**Rest-of-world overlay (Roenneberg 2004, Europe):** peak at 19.5 y (F) and 20.9 y (M); sex difference gone by ~50.

### P5. 24 h timeline of physiological markers, lark vs owl

**Primary measured data:** Lack et al. 2009, *Nat Sci Sleep*, doi:10.2147/nss.s6234, PMC3630920. **[World: Australia]**. 10 morning types (8 F) and 12 evening types (8 F), young good sleepers, 27 h modified constant routine. V-full (Tables 1–2).

| Marker | Morning type (lark) | Evening type (owl) | Difference |
|---|---|---|---|
| DLMO | **21:48** | **00:36** | 2.80 h |
| Habitual sleep onset | **23:24** | **01:59** | 2.58 h |
| Max subjective sleepiness | 03:52 | 09:22 | 5.50 h |
| Melatonin peak | 04:20 | 06:20 | 2.00 h |
| Core temperature minimum (Tmin) | **05:13** | **07:28** | 2.25 h |
| Habitual wake | **07:48** | **10:20** | 2.53 h |
| Sleep propensity max | 07:59 | 11:20 | 3.35 h (n.s.) |
| **Peak alertness** (min subjective sleepiness) | **13:18** | **22:29** | **9.18 h** |
| Sleep propensity min (wake-maintenance zone) | 21:28 | 23:34 | 2.10 h (n.s.) |
| Total sleep time | 8.15 h | 8.20 h | n.s. |

**Cross-check (US, Baehr 2000):** Tmin 03:50 for morning types, 05:02 intermediate, 06:01 evening (ambulatory, N = 172).

**Extreme lark (FASP), [Derived and Speculative]:** shift intermediate-type markers about 3–4 h earlier (Jones 1999; Toh 2001). For example, with an intermediate Tmin of about 05:00 (Baehr):

| Marker | FASP estimate |
|---|---|
| Tmin | ~01:00–02:00 |
| DLMO | ~18:00–19:00 |
| Sleep onset | ~19:30–20:30 |
| Wake | ~03:30–05:00 |

The exact FASP clock times weren't verified from the Jones 1999 full text.

**Scenario overlay, "owl forced to 05:00" [Derived]:** a 05:00 alarm for the Lack E-type lands 2 h 28 min before Tmin and 1 h 20 min before melatonin peak. Sleep onset would have to move to about 21:00 (a 5 h advance) to keep 8 h of sleep. That is 3.6 h *before* their DLMO, inside the evening wake-maintenance zone (sleep propensity minimum 23:34), so they can't fall asleep.

**Light-environment overlay (Wright 2013, US):**

| Condition | Sleep start | Melatonin offset | Circadian markers |
|---|---|---|---|
| Modern | ~00:30 | ~08:00 (after wake) | baseline |
| Camping | — | >50 min before wake | all ~2 h earlier |

---

## (c) Gaps and caveats

1. **Newest GWAS:**
   - No dedicated chronotype GWAS larger than Jones 2019 (N = 697,828; 351 loci) was found for 2022–2026.
   - East Asian and multi-ancestry chronotype GWAS appear to exist (cited in a 2026 *Sleep Medicine* MR paper on East Asians), but I couldn't access their N or loci.
   - 23andMe's later, larger internal analyses aren't published as standalone chronotype GWAS.
   - Recommend one more targeted pass (GWAS Catalog, EFO "chronotype").
2. **Hu 2016 SNP-heritability:** I couldn't find it in the full text. Don't quote "21%" without the source.
3. **FASP clock times and tau:** the Jones 1999 *Nat Med* full text was inaccessible. "3–4 h" (review) and "4 h" (Toh 2001) are verified; exact times and the "23.3 h" tau are not.
4. **Chang 2015 magnitudes:** the "55% melatonin suppression" and "~1.5 h delay" are unverified; the PNAS and PMC pages were blocked.
5. **Stothard 2017 magnitudes** (2.6 h, 1.4 h, 13×) come from the CU Boulder press release, not the paper text. N is small (5 and 14).
6. **Social jetlag prevalence:**
   - "69% ≥ 1 h / one-third ≥ 2 h" is unverified.
   - I found no US population estimate with MCTQ. NHANES 2017–2020 papers exist (e.g., *Sleep Science and Practice* 2025) but weren't accessible.
   - Social jetlag numbers probably belong to another workstream; flag for cross-checking.
7. **ASWPD and DSWPD general-population prevalence in the US:** none found. Curtis 2019 is a single US sleep clinic. ICSD-3 figures (ASWPD ~1% middle-aged; DSWPD 7–16% adolescents) are unverified.
8. **Variance decomposition:** no study partitions chronotype variance jointly across genetics, age, sex, light and geography. P1 stitches separate estimates. The age η² comes from a single-day diary, which inflates error variance.
9. **Duffy 1999 numeric phase-to-wake intervals** and the **Duffy 2001 r values** weren't extracted (PMC blocked); only directions are verified.
10. **Measures differ:** MEQ (trait preference), MCTQ (free-day mid-sleep), ATUS diary (one weekend day), accelerometer L5, and lab DLMO/Tmin aren't interchangeable. Label each plotted series with its measure.
11. **US vs world:**
    - Lab tau and phase data are overwhelmingly US (Boston, Chicago, Colorado).
    - Population chronotype and prevalence data are mostly European (Germany, Norway, Finland) plus Brazil and New Zealand.
    - The US has one strong population chronotype dataset (ATUS, Fischer 2017) and one large self-report genetic cohort (23andMe).
    - Walch 2016 country-level values (smartphone app) weren't extracted. That would be the best US vs. other-countries comparison for timing; recommend pulling its supplementary table.
12. **Menopause:**
    - No direct within-person study of chronotype change at menopause was found.
    - The "convergence at ~50" is cross-sectional (Roenneberg 2004). The US data put the crossover at 41.

---

## (d) Sources

### Genetics
- Jones SE et al. 2019. Genome-wide association analyses of chronotype in 697,828 individuals provides insights into circadian rhythms. *Nat Commun* 10:343. https://doi.org/10.1038/s41467-018-08259-7 · https://www.nature.com/articles/s41467-018-08259-7
- Hu Y et al. 2016. GWAS of 89,283 individuals identifies genetic variants associated with self-reporting of being a morning person. *Nat Commun* 7:10448. https://doi.org/10.1038/ncomms10448 · PMC4740817
- Lane JM et al. 2016. Genome-wide association analysis identifies novel loci for chronotype in 100,420 individuals from the UK Biobank. *Nat Commun* 7:10889. https://doi.org/10.1038/ncomms10889 · PMC4786869
- Jones SE et al. 2016. GWAS in 128,266 individuals identifies new morningness and sleep duration loci. *PLoS Genet*. https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1006125
- Kalmbach DA et al. 2017. Genetic basis of chronotype in humans: insights from three landmark GWAS. *Sleep* 40. https://doi.org/10.1093/sleep/zsw048 · PMC6084759
- Burns AC et al. 2023. Genome-wide gene by environment study of time spent in daylight and chronotype. *Sleep* 46. https://doi.org/10.1093/sleep/zsac287 · PMC9995784
- Genome-wide association analysis of composite sleep health scores in 413,904 individuals. 2025. *Commun Biol*. https://doi.org/10.1038/s42003-025-07514-0 · PMC11760956
- Patke A et al. 2017. Mutation of the human circadian clock gene CRY1 in familial delayed sleep phase disorder. *Cell* 169:203. https://doi.org/10.1016/j.cell.2017.03.027 · PMC5479574
- Toh KL et al. 2001. An hPer2 phosphorylation site mutation in familial advanced sleep phase syndrome. *Science* 291:1040. https://doi.org/10.1126/science.1057499
- Jones CR et al. 1999. Familial advanced sleep-phase syndrome: a short-period circadian rhythm variant in humans. *Nat Med* 5:1062. https://doi.org/10.1038/12502
- CACNA1D is a circadian gene and causes familial advanced sleep phase. 2025. *PNAS*. https://doi.org/10.1073/pnas.2424387122 · PMC12167976
- Archer SN et al. 2003. A length polymorphism in Per3 is linked to delayed sleep phase syndrome and extreme diurnal preference. *Sleep* 26:413. https://doi.org/10.1093/sleep/26.4.413
- Viola AU et al. 2007. PER3 polymorphism predicts sleep structure and waking performance. *Curr Biol* 17:613. https://doi.org/10.1016/j.cub.2007.01.073
- Liu C et al. 2022. Circadian rhythm sleep disorders: genetics, mechanisms, and adverse effects on health. *Front Genet*. https://doi.org/10.3389/fgene.2022.875342 · PMC9099045
- Koskenvuo M et al. 2007. Heritability of diurnal type: 8753 adult twin pairs. *J Sleep Res* 16:156. https://doi.org/10.1111/j.1365-2869.2007.00580.x
- Vink JM et al. 2001. Genetic analysis of morningness and eveningness. *Chronobiol Int* 18:809. https://doi.org/10.1081/cbi-100107516
- Barclay NL et al. 2010. Diurnal preference and sleep quality: same genes? *Chronobiol Int* 27:278. https://doi.org/10.3109/07420521003663801
- von Schantz M et al. 2015. Distribution and heritability of diurnal preference in the Baependi study. *Sci Rep* 5:9214. https://doi.org/10.1038/srep09214 · PMC4363835
- Taporoski TP et al. 2021. Compared heritability of chronotype instruments. *J Biol Rhythms* 36:483. https://doi.org/10.1177/07487304211030420 · PMC8442136
- Hoffman et al. 2019. Twin-based heritability of actimetry traits. *Genes Brain Behav* 18:e12569. https://doi.org/10.1111/gbb.12569 · PMC7199794

### Prevalence
- Curtis BJ et al. 2019. Extreme morning chronotypes are often familial and not exceedingly rare. *Sleep* 42:zsz148. https://doi.org/10.1093/sleep/zsz148 · PMC6783886
- Paine SJ et al. 2014. Identifying advanced and delayed sleep phase disorders in the general population (New Zealand). *Chronobiol Int* 31:627. https://doi.org/10.3109/07420528.2014.885036
- Schrader H et al. 1993. The prevalence of delayed and advanced sleep phase syndromes. *J Sleep Res* 2:51. https://doi.org/10.1111/j.1365-2869.1993.tb00061.x
- Sivertsen B et al. 2013. Delayed sleep phase syndrome in adolescents. *BMC Public Health* 13:1163. https://doi.org/10.1186/1471-2458-13-1163 · PMC3878844
- Saxvig IW et al. 2012. Prevalence and correlates of delayed sleep phase in high school students. *Sleep Med* 13:193. https://doi.org/10.1016/j.sleep.2011.10.024
- Danielsson K et al. 2016. Delayed sleep phase disorder in a Swedish cohort. *Chronobiol Int* 33:1331. https://doi.org/10.1080/07420528.2016.1217002
- Sivertsen B et al. 2021. DSWPD in young adults (SHoT). *Sleep Med* 77:184. https://doi.org/10.1016/j.sleep.2020.09.028
- Murray JM et al. 2017. Prevalence of circadian misalignment in DSPD. *Sleep* 40:zsw002. https://doi.org/10.1093/sleep/zsw002

### Tau and phase
- Czeisler CA et al. 1999. Stability, precision, and near-24-hour period of the human circadian pacemaker. *Science* 284:2177. https://doi.org/10.1126/science.284.5423.2177
- Duffy JF et al. 2011. Sex difference in the near-24-hour intrinsic period of the human circadian timing system. *PNAS* 108:15602. https://doi.org/10.1073/pnas.1010666108
- Duffy JF, Rimmer DW, Czeisler CA. 2001. Association of intrinsic circadian period with morningness–eveningness, usual wake time, and circadian phase. *Behav Neurosci* 115:895. https://doi.org/10.1037//0735-7044.115.4.895
- Eastman CI et al. 2015. Circadian rhythm phase shifts and endogenous free-running circadian period differ between African-Americans and European-Americans. *Sci Rep* 5:8381. https://www.nature.com/articles/srep08381
- Eastman CI et al. 2017. Sex and ancestry determine the free-running circadian period. *J Sleep Res* 26:547. https://doi.org/10.1111/jsr.12521 · PMC5591035
- Duffy JF et al. 1998. Later endogenous circadian temperature nadir relative to an earlier wake time in older people. *Am J Physiol* 275:R1478. https://doi.org/10.1152/ajpregu.1998.275.5.r1478
- Duffy JF et al. 1999. Relationship of endogenous circadian melatonin and temperature rhythms to self-reported preference for morning or evening activity in young and older people. *J Investig Med* 47:141. PMC8530273
- Baehr EK, Revelle W, Eastman CI. 2000. Individual differences in the phase and amplitude of the human circadian temperature rhythm. *J Sleep Res* 9:117. https://doi.org/10.1046/j.1365-2869.2000.00196.x
- Lack L et al. 2009. Chronotype differences in circadian rhythms of temperature, melatonin, and sleepiness. *Nat Sci Sleep* 1:1. https://doi.org/10.2147/nss.s6234 · PMC3630920
- Cain SW et al. 2010. Sex differences in phase angle of entrainment and melatonin amplitude in humans. *J Biol Rhythms* 25:288. https://doi.org/10.1177/0748730410374943 · PMC3792014
- Sletten TL et al. 2010. Timing of sleep and its relationship with the endogenous melatonin rhythm. *Front Neurol* 1:137. https://doi.org/10.3389/fneur.2010.00137 · PMC3008942
- Emens JS et al. 2009. Phase angle of entrainment in morning- and evening-types under naturalistic conditions. *Chronobiol Int* 26:474. https://doi.org/10.1080/07420520902821077 · PMC2699216
- Scheer FAJL et al. 2008. An endogenous circadian rhythm in sleep inertia. *J Biol Rhythms* 23:353. https://doi.org/10.1177/0748730408318081 · PMC3130065

### Homeostasis
- Mongrain V et al. 2006. Difference in sleep regulation between morning and evening circadian types. *Eur J Neurosci* 23:497. https://doi.org/10.1111/j.1460-9568.2005.04561.x
- Taillard J et al. 2003. The circadian and homeostatic modulation of sleep pressure during wakefulness differs between morning and evening chronotypes. *J Sleep Res* 12:275. https://doi.org/10.1046/j.0962-1105.2003.00369.x
- Taillard J et al. 1999. Morningness/eveningness and the need for sleep. *J Sleep Res* 8:291. https://doi.org/10.1046/j.1365-2869.1999.00176.x

### Light
- Wright KP Jr et al. 2013. Entrainment of the human circadian clock to the natural light-dark cycle. *Curr Biol* 23:1554. https://doi.org/10.1016/j.cub.2013.06.039 · PMC4020279
- Stothard ER et al. 2017. Circadian entrainment to the natural light-dark cycle across seasons and the weekend. *Curr Biol* 27:508. https://doi.org/10.1016/j.cub.2016.12.041 · PMC5335920. Press release: https://www.colorado.edu/today/2017/02/01/cant-get-sleep-wilderness-weekend-can-help
- Phillips AJK et al. 2019. High sensitivity and interindividual variability in the response of the human circadian system to evening light. *PNAS* 116:12019. https://doi.org/10.1073/pnas.1901824116 · PMC6575863
- Chang AM et al. 2015. Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness. *PNAS* 112:1232. https://doi.org/10.1073/pnas.1418490112 · PMC4313820. Press release: https://www.psu.edu/news/research/story/light-emitting-e-readers-detrimentally-shift-circadian-clock
- Brown TM et al. 2022. Recommendations for daytime, evening, and nighttime indoor light exposure. *PLoS Biol* 20:e3001571. https://doi.org/10.1371/journal.pbio.3001571 · PMC8929548
- Klepeis NE et al. 2001. The National Human Activity Pattern Survey (NHAPS). *J Expo Anal Environ Epidemiol* 11:231. https://doi.org/10.1038/sj.jea.7500165 · https://hero.epa.gov/reference/2437

### Geography, age, sex and social timing
- Roenneberg T, Kumar CJ, Merrow M. 2007. The human circadian clock entrains to sun time. *Curr Biol* 17:R44. https://doi.org/10.1016/j.cub.2006.12.011 · https://www.sciencedaily.com/releases/2007/01/070122122447.htm
- Roenneberg T et al. 2019. Chronotype and social jetlag: a (self-) critical review. *Biology* 8:54. https://doi.org/10.3390/biology8030054 · PMC6784249
- Roenneberg T et al. 2007. Epidemiology of the human circadian clock. *Sleep Med Rev* 11:429. https://doi.org/10.1016/j.smrv.2007.07.005
- Roenneberg T et al. 2004. A marker for the end of adolescence. *Curr Biol* 14:R1038. https://doi.org/10.1016/j.cub.2004.11.039 · https://www.nature.com/news/2004/041229/full/news041229-5.html
- Kantermann T et al. 2007. The human circadian clock's seasonal adjustment is disrupted by daylight saving time. *Curr Biol* 17:1996. https://doi.org/10.1016/j.cub.2007.10.025
- Giuntella O, Mazzonna F. 2019. Sunset time and the economic effects of social jetlag. *J Health Econ* 65:210. https://search.usi.ch/publications/36772
- Leocadio-Miguel MA et al. 2017. Latitudinal cline of chronotype. *Sci Rep* 7:5437. https://doi.org/10.1038/s41598-017-05797-w · PMC5511182
- Randler C, Rahafar A. 2017. Latitude affects morningness-eveningness. *Sci Rep* 7:39976. https://doi.org/10.1038/srep39976 · PMC5206670
- Walch OJ, Cochran A, Forger DB. 2016. A global quantification of "normal" sleep schedules using smartphone data. *Sci Adv* 2:e1501705. https://doi.org/10.1126/sciadv.1501705 · PMC4928979
- Fischer D et al. 2017. Chronotypes in the US – influence of age and sex. *PLoS One* 12:e0178782. https://doi.org/10.1371/journal.pone.0178782 · PMC5479630
- Wittmann M et al. 2006. Social jetlag: misalignment of biological and social time. *Chronobiol Int* 23:497. https://doi.org/10.1080/07420520500545979
- Roenneberg T et al. 2012. Social jetlag and obesity. *Curr Biol* 22:939. https://doi.org/10.1016/j.cub.2012.03.038
- Potter GDM et al. 2016. Circadian rhythm and sleep disruption: causes, metabolic consequences, and countermeasures. *Endocr Rev* 37:584. PMC5142605

### Data file produced
- `data/fischer2017_us_msfwe_by_age.csv`: Fischer 2017 Table 1. US weekend mid-sleep by single year of age (15–79, 80+), by sex, with N and SD. Times are decimal hours.
