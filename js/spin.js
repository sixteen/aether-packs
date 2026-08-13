import { rarityOf } from './data.js';
import { buildReelStrip } from './rng.js';
import * as audio from './audio.js';

const TOTAL = 96;
const WIN_INDEX = 70;
const EASE = 'cubic-bezier(0.12, 0.7, 0.08, 1)';
const SPIN_MS = 5500;
const FAST_MS = 1800;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function tileHTML(item, isWinner) {
  const r = rarityOf(item.rarity);
  return `<div class="reel-item rarity-${item.rarity}${isWinner ? ' is-winner' : ''}" data-rarity="${item.rarity}" data-name="${escapeHtml(item.name)}" data-value="${item.value}" style="--r:${r.color};--g:${r.glow}">
    <div class="reel-glow"></div>
    <div class="reel-item-icon">${item.icon}</div>
  </div>`;
}

function itemStride(reel) {
  const el = reel.querySelector('.reel-item');
  if (!el) return 200;
  const styles = getComputedStyle(reel);
  const gap = parseFloat(styles.columnGap || styles.gap) || 0;
  return el.getBoundingClientRect().width + gap;
}

function targetX(reel, viewport, winnerIndex, jitter) {
  const stride = itemStride(reel);
  const winnerCenter = winnerIndex * stride + stride / 2 + jitter;
  return winnerCenter - viewport.clientWidth / 2;
}

function currentIndex(reel, viewport) {
  const matrix = new DOMMatrix(getComputedStyle(reel).transform);
  const tx = matrix.m41;
  const stride = itemStride(reel);
  const center = -tx + viewport.clientWidth / 2;
  return Math.floor(center / stride);
}

/** Idle preview strip (no planted winner). */
export function mountPreview(viewport, items) {
  const strip = [];
  for (let i = 0; i < 24; i++) strip.push(items[i % items.length]);
  const reel = document.createElement('div');
  reel.className = 'reel';
  reel.innerHTML = strip.map((it) => tileHTML(it, false)).join('');
  viewport.innerHTML = '';
  viewport.appendChild(reel);
  const stride = itemStride(reel);
  const x = 6 * stride - viewport.clientWidth / 2 + stride / 2;
  reel.style.transform = `translate3d(${-x}px,0,0)`;
  return { reel };
}

export function mountReel(viewport, pack, winner) {
  const strip = buildReelStrip(pack.items, winner, TOTAL, WIN_INDEX);
  const reel = document.createElement('div');
  reel.className = 'reel';
  reel.innerHTML = strip.map((it, i) => tileHTML(it, i === WIN_INDEX)).join('');
  viewport.innerHTML = '';
  viewport.appendChild(reel);
  reel.style.transform = 'translate3d(0,0,0)';
  return { reel, strip, winnerIndex: WIN_INDEX };
}

export function spinReel({ reel, viewport, winnerIndex, fast, onTick }) {
  const duration = fast ? FAST_MS : SPIN_MS;
  const stride = itemStride(reel);
  const jitter = (Math.random() - 0.5) * stride * 0.55;
  const x = targetX(reel, viewport, winnerIndex, jitter);

  return new Promise((resolve) => {
    const anim = reel.animate(
      [
        { transform: 'translate3d(0,0,0)' },
        { transform: `translate3d(${-x}px,0,0)` },
      ],
      { duration, easing: EASE, fill: 'forwards' },
    );

    let lastIndex = currentIndex(reel, viewport);
    let raf = 0;

    const watch = () => {
      const t = anim.currentTime || 0;
      const progress = Math.min(1, t / duration);
      const idx = currentIndex(reel, viewport);
      if (idx !== lastIndex) {
        lastIndex = idx;
        audio.tick(progress);
        if (onTick) onTick(idx, progress);
      }
      if (progress < 1) raf = requestAnimationFrame(watch);
    };
    raf = requestAnimationFrame(watch);

    anim.finished.then(() => {
      cancelAnimationFrame(raf);
      const winnerEl = reel.querySelector('.reel-item.is-winner');
      if (winnerEl) winnerEl.classList.add('landed');
      resolve({ winnerEl, duration });
    }).catch(() => {
      cancelAnimationFrame(raf);
      resolve({ winnerEl: reel.querySelector('.reel-item.is-winner'), duration });
    });
  });
}

export function burstParticles(canvas, color, extra = false) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = (canvas.width = Math.floor(canvas.clientWidth * dpr));
  const h = (canvas.height = Math.floor(canvas.clientHeight * dpr));
  const n = extra ? 120 : 56;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 3 + Math.random() * (extra ? 18 : 11);
    parts.push({
      x: w / 2,
      y: h * 0.38,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - (extra ? 2 : 0),
      life: 1,
      decay: 0.012 + Math.random() * 0.02,
      size: (2 + Math.random() * 5) * dpr,
      color,
      spark: Math.random() > 0.65,
    });
  }
  let running = true;
  const frame = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14 * dpr;
      p.life -= p.decay;
      if (p.life <= 0) continue;
      alive = true;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.spark ? '#fff' : p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    if (alive) requestAnimationFrame(frame);
    else {
      ctx.clearRect(0, 0, w, h);
      running = false;
    }
  };
  requestAnimationFrame(frame);
  return () => {
    running = false;
    ctx.clearRect(0, 0, w, h);
  };
}

export const TIMING = { SPIN_MS, FAST_MS, WIN_INDEX, TOTAL };
