# AETHER

**Open packs. Pull heat.**

A demo mystery-pack opening site. Fake balance, fictional prizes, no accounts, no payments, no real gambling.

Live: https://sixteen.github.io/aether-packs/

## Demo disclaimer

- Starting balance is $2500 of play money.
- Nothing here can be bought, sold, or withdrawn.
- Odds are made up. Fairness chrome is cosmetic.
- Demo opens are free and do not charge the fake balance.

## Run locally

No build step. python3 -m http.server 8080
ES modules need HTTP, not file://

## Stack

Vanilla HTML CSS JS. See index.html css/styles.css js/*
Balance and inventory persist in localStorage.

## Open animation

Horizontal reel with white triangle pointers. Open or Space spends demo balance. Winner planted near index 70. Decelerates ~5.5s (Fast 1.8s). Tick audio. Name and price fade in on land. Legendary/mythic get flash, shockwave, particles. Then Sell or Keep.
