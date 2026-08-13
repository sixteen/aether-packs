import {
  PACKS, CATEGORIES, FAKE_USERS, packById, packEV,
  formatMoney, formatOdds, rarityOf,
} from './data.js';
import { pickItem, newClientSeed } from './rng.js';
import * as audio from './audio.js';
import { mountPreview, mountReel, spinReel, burstParticles } from './spin.js';

const STORE = 'aether-state-v1';
const START = 2500;

const ICO = {
  muteOn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m16 9 6 6M22 9l-6 6"/></svg>`,
  muteOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6.5a8.5 8.5 0 0 1 0 11"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 10-14h-7l1-6z"/></svg>`,
  back: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 6 9 12l6 6"/></svg>`,
};

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE));
    if (raw && typeof raw.balance === 'number') {
      return {
        balance: raw.balance,
        inventory: Array.isArray(raw.inventory) ? raw.inventory : [],
        muted: !!raw.muted,
        fast: !!raw.fast,
        clientSeed: raw.clientSeed || newClientSeed(),
        nonce: raw.nonce || 0,
      };
    }
  } catch { /* ignore */ }
  return {
    balance: START,
    inventory: [],
    muted: false,
    fast: false,
    clientSeed: newClientSeed(),
    nonce: 0,
  };
}

const S = load();
let spinning = false;
let qty = 1;
let filter = 'all';
let live = [];
let pending = null; // { pack, item, demo }
let stopFx = null;

function save() {
  localStorage.setItem(STORE, JSON.stringify({
    balance: S.balance,
    inventory: S.inventory,
    muted: S.muted,
    fast: S.fast,
    clientSeed: S.clientSeed,
    nonce: S.nonce,
  }));
}

const app = document.getElementById('app');
const balanceEl = document.getElementById('balance-val');
const balanceChip = document.getElementById('balance-chip');
const muteBtn = document.getElementById('btn-mute');
const flashEl = document.getElementById('flash');
const fx = document.getElementById('fx');

function paintBalance() {
  balanceEl.textContent = formatMoney(S.balance);
}
function paintMute() {
  muteBtn.innerHTML = S.muted ? ICO.muteOn : ICO.muteOff;
  muteBtn.classList.toggle('on', !S.muted);
  muteBtn.title = S.muted ? 'Unmute' : 'Mute';
  audio.setMuted(S.muted);
}
paintBalance();
paintMute();

muteBtn.addEventListener('click', async () => {
  S.muted = !S.muted;
  save();
  paintMute();
  await audio.resume();
});

let searchQuery = '';

const searchInput = document.getElementById('pack-search');
const menuBtn = document.getElementById('btn-menu');
const backdrop = document.getElementById('nav-backdrop');

function setNavOpen(open) {
  document.body.classList.toggle('nav-open', open);
  if (backdrop) backdrop.hidden = !open;
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
}
function closeNav() { setNavOpen(false); }
menuBtn?.addEventListener('click', () => {
  setNavOpen(!document.body.classList.contains('nav-open'));
});
backdrop?.addEventListener('click', closeNav);
document.querySelectorAll('.sidenav-nav a, .logo').forEach((el) => {
  el.addEventListener('click', closeNav);
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});
searchInput?.addEventListener('input', () => {
  searchQuery = searchInput.value;
  const parts = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
  if (!parts.length) renderHome();
});
searchInput?.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const parts = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
  if (parts.length) location.hash = '#/';
});

function route() {
  const h = (location.hash.replace(/^#/, '') || '/');
  const parts = h.split('/').filter(Boolean);
  closeNav();
  document.querySelectorAll('.sidenav-nav a').forEach((a) => a.classList.remove('active'));
  if (!parts.length) {
    document.querySelector('[data-nav="packs"]')?.classList.add('active');
    return renderHome();
  }
  if (parts[0] === 'pack' && parts[1]) {
    document.querySelector('[data-nav="packs"]')?.classList.add('active');
    return renderPack(parts[1]);
  }
  if (parts[0] === 'inventory') {
    document.querySelector('[data-nav="inventory"]')?.classList.add('active');
    return renderInventory();
  }
  if (parts[0] === 'fairness') {
    document.querySelector('[data-nav="fairness"]')?.classList.add('active');
    return renderFairness();
  }
  document.querySelector('[data-nav="packs"]')?.classList.add('active');
  renderHome();
}

function packCard(p) {
  return `<a class="pack-card" href="#/pack/${p.id}">
    <div class="pack-card-art">
      <img src="${p.artFile}" alt="${esc(p.name)} pack" />
    </div>
    <div class="pack-card-meta">
      <div class="pack-card-name">${esc(p.name)}</div>
      <div class="pack-card-price">${formatMoney(p.price)}</div>
    </div>
  </a>`;
}

function liveCard(ev) {
  const r = rarityOf(ev.rarity);
  return `<div class="live-card">
    <div class="live-icon" style="--r:${r.color};--g:${r.glow}">${ev.icon}</div>
    <div class="live-meta">
      <div class="live-name">${esc(ev.name)}</div>
      <div class="live-price">${formatMoney(ev.value)}</div>
    </div>
    <div class="live-user">${esc(ev.user)}</div>
  </div>`;
}

function sidebarHTML() {
  const top = [...live].sort((a, b) => b.value - a.value).slice(0, 4);
  return `<aside class="live-rail">
    <div class="side-panel">
      <h3>Top Opens</h3>
      <div class="live-list">${top.map(liveCard).join('') || '<div class="live-name">Waiting on heat…</div>'}</div>
    </div>
    <div class="side-panel">
      <h3><span class="live-dot" aria-hidden="true"></span> Live Opens</h3>
      <div class="live-list" id="live-list">${live.map(liveCard).join('')}</div>
    </div>
  </aside>`;
}

function renderHome() {
  spinning = false;
  pending = null;
  const q = searchQuery.trim().toLowerCase();
  let packs = filter === 'all' ? PACKS : PACKS.filter((p) => p.category === filter);
  if (q) {
    packs = packs.filter((p) => p.name.toLowerCase().includes(q));
  }
  const featured = PACKS.find((p) => p.id === 'apex-keys') || PACKS[0];
  const hero = q ? '' : `<a class="hero-strip" href="#/pack/${featured.id}">
        <div class="hero-art"><img src="${featured.artFile}" alt="${esc(featured.name)}" /></div>
        <div class="hero-copy">
          <div class="hero-kicker">Featured drop</div>
          <h2>${esc(featured.name)}</h2>
          <p>${esc(featured.blurb)}</p>
          <span class="hero-cta">Open from ${formatMoney(featured.price)}</span>
        </div>
      </a>`;
  app.innerHTML = `<div class="layout">
    <div class="lobby">
      ${hero}
      <div class="section-head">
        <h1>Featured Packs</h1>
      </div>
      <div class="filters">
        ${CATEGORIES.map((c) => `<button class="chip${filter === c.id ? ' active' : ''}" data-filter="${c.id}" type="button">${c.label}</button>`).join('')}
      </div>
      <div class="pack-grid">${packs.map(packCard).join('') || '<div class="empty"><h3>No packs match</h3><p>Try another search.</p></div>'}</div>
    </div>
    ${sidebarHTML()}
  </div>`;
  app.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter;
      renderHome();
    });
  });
}

function renderPack(id) {
  const pack = packById(id);
  if (!pack) { location.hash = '#/'; return; }
  spinning = false;
  pending = null;
  const ev = packEV(pack);
  const cost = pack.price * qty;
  app.innerHTML = `<div class="detail-wrap">
    <a class="back" href="#/">${ICO.back} Back to Packs</a>
    <div class="reel-stage" id="reel-stage">
      <div class="ptr ptr-top"></div>
      <div class="ptr ptr-bot"></div>
      <div class="reel-viewport" id="reel-view"></div>
      <div class="shockwave" id="shock"></div>
    </div>
    <div class="reel-caption" id="reel-caption"></div>
    <div class="control-bar">
      <div class="stepper">
        <button type="button" id="qty-minus" aria-label="Decrease quantity">−</button>
        <div class="qty" id="qty-label">x${qty}</div>
        <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
      </div>
      <button class="btn-open" id="btn-open" type="button">Open for ${formatMoney(cost)}</button>
      <button class="btn-demo" id="btn-demo" type="button">Demo</button>
      <div class="ctrl-right">
        <button class="icon-btn${S.fast ? ' on' : ''}" id="btn-fast" type="button" title="Fast mode">${ICO.bolt}</button>
      </div>
    </div>
    <div class="result-bar" id="result-bar"></div>
    <div class="pack-id-row">
      <img class="pack-thumb" src="${pack.artFile}" alt="" />
      <div>
        <h2>${esc(pack.name)} — ${formatMoney(pack.price)}</h2>
        <div class="sub">${pack.items.length} Items · ${esc(pack.blurb)}</div>
        <div class="ev-line">Expected value ${formatMoney(ev)} · demo odds, fictional brands</div>
      </div>
    </div>
    <div class="items-grid">
      ${pack.items.map((it) => {
        const r = rarityOf(it.rarity);
        return `<article class="item-card" style="--r:${r.color};--g:${r.glow}">
          <div class="item-odds">${formatOdds(it.odds)}</div>
          <div class="item-art">${it.icon}</div>
          <div class="item-name" title="${esc(it.name)}">${esc(it.name)}</div>
          <div class="item-price">${formatMoney(it.value)}</div>
        </article>`;
      }).join('')}
    </div>
  </div>`;

  mountPreview(document.getElementById('reel-view'), pack.items);

  document.getElementById('qty-minus').onclick = () => { qty = Math.max(1, qty - 1); renderPack(id); };
  document.getElementById('qty-plus').onclick = () => { qty = Math.min(4, qty + 1); renderPack(id); };
  document.getElementById('btn-fast').onclick = () => { S.fast = !S.fast; save(); renderPack(id); };
  document.getElementById('btn-open').onclick = () => startOpen(pack, false);
  document.getElementById('btn-demo').onclick = () => startOpen(pack, true);
}

function shakeBalance() {
  balanceChip.classList.remove('shake');
  void balanceChip.offsetWidth;
  balanceChip.classList.add('shake');
  audio.deny();
}

async function startOpen(pack, demo) {
  if (spinning) return;
  await audio.resume();
  const n = demo ? 1 : qty;
  const cost = pack.price * n;
  if (!demo && S.balance < cost) {
    shakeBalance();
    return;
  }
  spinning = true;
  setOpenEnabled(false);
  hideCaption();
  hideResult();

  if (!demo) {
    S.balance -= cost;
    paintBalance();
    save();
  }

  for (let i = 0; i < n; i++) {
    const still = await runSpin(pack, demo);
    if (!still) break;
  }
  spinning = false;
  if (!pending) setOpenEnabled(true);
}

function setOpenEnabled(on) {
  const o = document.getElementById('btn-open');
  const d = document.getElementById('btn-demo');
  if (o) o.disabled = !on;
  if (d) d.disabled = !on;
}

async function runSpin(pack, demo) {
  const view = document.getElementById('reel-view');
  if (!view) return false;
  hideCaption();
  hideResult();

  S.nonce += 1;
  save();
  const { item } = pickItem(pack.items);
  const { reel, winnerIndex } = mountReel(view, pack, item);

  if (!S.fast) {
    view.parentElement?.classList.add('pre-spin');
    audio.packThump();
    await wait(S.fast ? 0 : 280);
    view.parentElement?.classList.remove('pre-spin');
  }

  await spinReel({ reel, viewport: view, winnerIndex, fast: S.fast });

  const r = rarityOf(item.rarity);
  const juicy = item.rarity === 'legendary' || item.rarity === 'mythic';
  const epic = juicy || item.rarity === 'epic';

  audio.land(item.rarity);

  if (epic) {
    flashEl.style.background = r.color;
    flashEl.classList.remove('go', 'big');
    void flashEl.offsetWidth;
    flashEl.classList.add(juicy ? 'big' : 'go');
    if (stopFx) stopFx();
    stopFx = burstParticles(fx, r.color, juicy);
    const shock = document.getElementById('shock');
    if (shock && juicy) {
      shock.style.setProperty('--r', r.color);
      shock.classList.remove('go');
      void shock.offsetWidth;
      shock.classList.add('go');
    }
  }

  const hold = juicy ? 520 : 200;
  await wait(hold);
  showCaption(item);
  pushLive(item);

  if (demo) {
    pending = null;
    return true;
  }

  pending = { pack, item, demo };
  showResult(item);
  await waitChoice();
  return true;
}

function showCaption(item) {
  const el = document.getElementById('reel-caption');
  if (!el) return;
  const r = rarityOf(item.rarity);
  el.innerHTML = `<div class="cap-rarity" style="--r:${r.color}">${r.label}</div>
    <div class="cap-name">${esc(item.name)}</div>
    <div class="cap-price">${formatMoney(item.value)}</div>`;
  el.classList.add('show');
}
function hideCaption() {
  const el = document.getElementById('reel-caption');
  if (el) { el.classList.remove('show'); el.innerHTML = ''; }
}

function showResult(item) {
  const bar = document.getElementById('result-bar');
  if (!bar) return;
  bar.innerHTML = `<span class="hint">You pulled ${esc(item.name)}</span>
    <button class="btn-open" id="btn-sell" type="button">Sell ${formatMoney(item.value)}</button>
    <button class="btn-ghost" id="btn-keep" type="button">Keep</button>`;
  bar.classList.add('show');
  document.getElementById('btn-sell').onclick = () => resolvePending('sell');
  document.getElementById('btn-keep').onclick = () => resolvePending('keep');
}
function hideResult() {
  const bar = document.getElementById('result-bar');
  if (bar) { bar.classList.remove('show'); bar.innerHTML = ''; }
}

let choiceResolve = null;
function waitChoice() {
  return new Promise((res) => { choiceResolve = res; });
}
function resolvePending(action) {
  if (!pending) { if (choiceResolve) choiceResolve(); return; }
  const { item } = pending;
  if (action === 'sell') {
    S.balance += item.value;
    paintBalance();
  } else {
    S.inventory.push({
      uid: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      value: item.value,
      rarity: item.rarity,
      icon: item.icon,
    });
  }
  pending = null;
  save();
  hideResult();
  if (choiceResolve) {
    const r = choiceResolve;
    choiceResolve = null;
    r();
  }
}

function renderInventory() {
  spinning = false;
  const total = S.inventory.reduce((s, i) => s + i.value, 0);
  app.innerHTML = `<div class="layout solo">
    <div>
      <div class="page-head">
        <div>
          <h1>Inventory</h1>
          <p>${S.inventory.length} kept · ${formatMoney(total)} locked value</p>
        </div>
      </div>
      ${S.inventory.length === 0
        ? `<div class="empty"><h3>No heat yet</h3><p>Open a pack and hit Keep.</p></div>`
        : `<div class="inventory-grid">${S.inventory.map((it) => {
            const r = rarityOf(it.rarity);
            return `<div class="inv-card">
              <article class="item-card" style="--r:${r.color};--g:${r.glow}">
                <div class="item-odds">${r.label}</div>
                <div class="item-art">${it.icon}</div>
                <div class="item-name">${esc(it.name)}</div>
                <div class="item-price">${formatMoney(it.value)}</div>
              </article>
              <div class="inv-actions">
                <button class="btn-open" data-sell="${it.uid}" type="button">Sell ${formatMoney(it.value)}</button>
              </div>
            </div>`;
          }).join('')}</div>`}
    </div>
  </div>`;
  app.querySelectorAll('[data-sell]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const uid = btn.dataset.sell;
      const idx = S.inventory.findIndex((x) => x.uid === uid);
      if (idx < 0) return;
      const [it] = S.inventory.splice(idx, 1);
      S.balance += it.value;
      save();
      paintBalance();
      renderInventory();
    });
  });
}

function renderFairness() {
  spinning = false;
  app.innerHTML = `<div class="layout solo">
    <div>
      <div class="page-head">
        <div>
          <h1>Fairness</h1>
          <p>Cosmetic chrome. This demo is not provably fair.</p>
        </div>
      </div>
      <div class="fair-grid">
        <div class="fair-card">
          <h3>Client seed</h3>
          <div class="mono">${esc(S.clientSeed)}</div>
        </div>
        <div class="fair-card">
          <h3>Nonce</h3>
          <div class="mono">${S.nonce}</div>
          <p style="margin-top:10px">Increments on every open, including Demo.</p>
        </div>
        <div class="warn">
          AETHER uses <code>crypto.getRandomValues</code> in your browser. There is no server seed, no HMAC chain, and no way to verify a roll. Demo RNG only — fake balance, no real money, no gambling.
        </div>
        <div class="fair-card">
          <h3>Reset demo</h3>
          <p>Restore $2,500.00 and clear inventory. Seed is regenerated.</p>
          <button class="btn-blue" id="btn-reset" type="button" style="margin-top:12px">Reset demo</button>
        </div>
      </div>
    </div>
  </div>`;
  document.getElementById('btn-reset').onclick = () => {
    S.balance = START;
    S.inventory = [];
    S.nonce = 0;
    S.clientSeed = newClientSeed();
    save();
    paintBalance();
    renderFairness();
  };
}

function pushLive(item) {
  const user = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
  live.unshift({
    name: item.name,
    value: item.value,
    rarity: item.rarity,
    icon: item.icon,
    user,
  });
  live = live.slice(0, 18);
  const list = document.getElementById('live-list');
  if (list) list.innerHTML = live.map(liveCard).join('');
}

function seedLive() {
  live = [];
  for (let i = 0; i < 8; i++) {
    const pack = PACKS[Math.floor(Math.random() * PACKS.length)];
    const { item } = pickItem(pack.items);
    pushLive(item);
  }
}

function fakeTick() {
  const pack = PACKS[Math.floor(Math.random() * PACKS.length)];
  const { item } = pickItem(pack.items);
  const user = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
  live.unshift({ name: item.name, value: item.value, rarity: item.rarity, icon: item.icon, user });
  live = live.slice(0, 18);
  const list = document.getElementById('live-list');
  if (list) list.innerHTML = live.map(liveCard).join('');
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

window.addEventListener('hashchange', route);
window.addEventListener('keydown', (e) => {
  if (e.code !== 'Space') return;
  const packMatch = location.hash.match(/#\/pack\/([^/]+)/);
  if (!packMatch) return;
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
  e.preventDefault();
  const pack = packById(packMatch[1]);
  if (pack && !spinning && !pending) startOpen(pack, false);
});

seedLive();
setInterval(fakeTick, 2800 + Math.random() * 1200);
route();
