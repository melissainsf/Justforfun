# Customer Success KPI Dashboard

Example dashboard for customer success metrics. **All data is fictional** — companies, CSMs and numbers are generated in `data.js`.

## What's on it
- **NRR** — net revenue retention, trailing 12 months: `(start ARR + expansion − contraction − churn) / start ARR`
- **GRR** — gross revenue retention: `(start ARR − contraction − churn) / start ARR`
- Pie charts of **industries** and **verticals** by health score (filter by Healthy / Neutral / At risk; legend shows average health)
- **Renewals in the next 90 days** with CSM, health score, renewal date, contract value and last contact date (click headers to sort; contact older than 30 days is flagged)

The retention cohort is customers who had ARR twelve months ago; new logos are excluded.

## Run it
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.
