# Who Wakes at Five: research and model

Source material behind [`/labs/who-wakes-at-five`](https://sinan.io/labs/who-wakes-at-five). The page itself lives at `labs/who-wakes-at-five.html`; this folder is its evidence base. Compiled October 2026.

## Research reports

Each report covers findings, plottable tables, gaps and a full source list. Every number is checked against its source and graded for quality.

| File | Covers |
|---|---|
| `01-distributions.md` | How chronotype is measured; MCTQ/MEQ distributions; US time-use (ATUS) "% awake by hour"; European time-use (HETUS); country wake times; self-identification polls |
| `02-determinants.md` | Genetics (twin and GWAS), intrinsic circadian period, light, geography, age and sex, lark vs. owl physiology |
| `03-correlates.md` | Who rises early (occupation, commute, family); exercise; health outcomes and Mendelian randomization; difficulty waking |
| `04-shifting.md` | Interventions that shift chronotype, how fast shifts revert, long-term stability, how people felt about it |

## Data and model

- `data/`: the tables the page and model use. ATUS 2025 % sleeping by hour, Fischer 2017 US weekend mid-sleep by age and sex, the digitized MCTQ histogram, and HETUS time-of-day.
- `model.py`: the "body clock says get up" estimate (labeled **Modeled** on the page). Natural wake is free-day mid-sleep + 4 h, with US mid-sleep by age weighted to the US adult population and a trait SD of 1.45 h (range 1.2–1.8). Run `python3 model.py` to regenerate `model.json`.
- `model.json`: model output (cumulative % with natural wake by each half-hour, US base/low/high and Europe MCTQ; US by age band).

The page embeds these numbers directly, so updating the model does **not** update the page. Copy any changed values into `labs/who-wakes-at-five.html` by hand.
