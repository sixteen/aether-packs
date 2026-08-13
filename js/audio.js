/** Web Audio ticks + land stingers. No external files. */

let ctx = null;
let muted = false;
let master = null;

function audioCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);
  }
  return ctx;
}

export function setMuted(value) {
  muted = value;
  if (master) master.gain.value = muted ? 0 : 0.22;
}

export function isMuted() {
  return muted;
}

export async function resume() {
  try {
    const c = audioCtx();
    if (c.state === 'suspended') await c.resume();
  } catch {
    /* autoplay policies */
  }
}

function burst(freq, dur = 0.03, type = 'square', gain = 0.09, slide = 0) {
  if (muted) return;
  const c = audioCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), c.currentTime + dur);
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0008, c.currentTime + dur);
  osc.connect(g);
  g.connect(master);
  osc.start();
  osc.stop(c.currentTime + dur + 0.01);
}

/** Short click that slows naturally as the reel decelerates. */
export function tick(progress = 0) {
  const p = Math.min(1, Math.max(0, progress));
  const freq = 920 - p * 280;
  const g = 0.055 + (1 - p) * 0.025;
  burst(freq, 0.022, 'square', g);
}

export function packThump() {
  burst(90, 0.12, 'sine', 0.14, -40);
  setTimeout(() => burst(180, 0.06, 'triangle', 0.06), 80);
}

export function land(rarity = 'common') {
  const big = rarity === 'mythic' || rarity === 'legendary';
  const epic = rarity === 'epic' || big;
  burst(140, 0.18, 'sine', 0.16, -50);
  burst(big ? 880 : 620, 0.22, 'triangle', epic ? 0.12 : 0.07, big ? 400 : 180);
  if (big) {
    setTimeout(() => burst(1320, 0.35, 'sine', 0.08, 200), 90);
    setTimeout(() => burst(70, 0.4, 'sine', 0.12), 40);
  }
}

export function slam() {
  burst(200, 0.08, 'square', 0.07);
  burst(520, 0.16, 'triangle', 0.08, 240);
}

export function deny() {
  burst(140, 0.12, 'sawtooth', 0.08, -80);
}
