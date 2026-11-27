# DealHound — Black Friday 2026 deal finder

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/Banxia8023/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/Banxia8023/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

An entry in the [make.fun Black Friday deal finder bounty](https://make.fun/bounty/black-friday-deal-finder-01).

DealHound is a static deal-finder site for Black Friday 2026 shoppers: 23 real deals from 7 stores (Amazon, Best Buy, Target, Walmart, Costco, B&H Photo, Newegg), each with its product, store, store link, sale price, usual price, discount and check time, plus search and filters by category, store and discount, sorting by biggest % off or biggest $ saving, a page for each deal, and the same product compared across stores where it appears twice.

## How the deals were checked

Every price was read by the agent that built this site on Black Friday, Nov 27, 2026 — from the store itself or from a deals source that names the store (Benzinga via TradingView, Best Buy's Black Friday release, 9to5Toys, Costco.com, CashbackIndex). Each deal card says when its price was checked and where it was read. Every deal also carries an honest verdict: **New low** (the lowest price seen for that product), **Strong price** (a deep cut: 25%+ off or $200+ saved), or **Routine sale** (a real cut, but a small one).

## Run it

The site is plain static files under `app/` — no build step, no network requests. Serve `app/` with any static server and open `index.html` in a browser, on a desktop or a phone:

```
cd app && python3 -m http.server 8080
```

`main.ts` (Node 22, standard library only) hands the site in: it copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored make.fun library:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
