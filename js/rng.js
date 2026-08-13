/** Demo RNG — cosmetic fairness chrome only. Not provably fair. */

function bytesToHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function newClientSeed() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

export function rollFloat() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 0x100000000;
}

/** Weighted pick. Odds on items must sum to 100. */
export function pickItem(items, roll = rollFloat()) {
  const target = roll * 100;
  let acc = 0;
  for (const item of items) {
    acc += item.odds;
    if (target < acc) return { item, roll, acc };
  }
  return { item: items[items.length - 1], roll, acc: 100 };
}

/** Fill a reel strip and plant the winner at winnerIndex. */
export function buildReelStrip(items, winner, total = 96, winnerIndex = 72) {
  const strip = new Array(total);
  for (let i = 0; i < total; i++) {
    strip[i] = pickItem(items).item;
  }
  strip[winnerIndex] = winner;
  // Avoid accidental duplicate winner immediately adjacent looking like a "double"
  if (winnerIndex > 0 && strip[winnerIndex - 1].id === winner.id) {
    const alt = items.find((it) => it.id !== winner.id) || items[0];
    strip[winnerIndex - 1] = alt;
  }
  return strip;
}

export function hashPreview(seed, nonce, roll) {
  return `${seed.slice(0, 8)}… · n${nonce} · ${(roll * 100).toFixed(4)}`;
}
