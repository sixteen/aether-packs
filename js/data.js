/** AETHER pack catalog — fictional brands only. */

export const RARITY = {
  common:     { key: 'common',     label: 'Common',     color: '#9ca3af', glow: 'rgba(156,163,175,.45)' },
  uncommon:   { key: 'uncommon',   label: 'Uncommon',   color: '#3b82f6', glow: 'rgba(59,130,246,.55)' },
  rare:       { key: 'rare',       label: 'Rare',       color: '#a855f7', glow: 'rgba(168,85,247,.55)' },
  epic:       { key: 'epic',       label: 'Epic',       color: '#ec4899', glow: 'rgba(236,72,153,.6)' },
  legendary:  { key: 'legendary',  label: 'Legendary',  color: '#ef4444', glow: 'rgba(239,68,68,.7)' },
  mythic:     { key: 'mythic',     label: 'Mythic',     color: '#fbbf24', glow: 'rgba(251,191,36,.8)' },
};

export const CATEGORIES = [
  { id: 'all',     label: 'All' },
  { id: 'street',  label: 'Street' },
  { id: 'tech',    label: 'Tech' },
  { id: 'time',    label: 'Time' },
  { id: 'luxury',  label: 'Luxury' },
  { id: 'apex',    label: 'Apex' },
];

const I = {
  sneaker: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M8 40c8-2 14-10 22-12 6-1.5 10 2 16 3 6 1 12-1 14 4 1 3-2 7-8 8H14c-6 0-10-1-6-3z" fill="currentColor" opacity=".9"/><path d="M10 38c6-1 12-8 20-9M32 29c4 2 10 3 16 2" stroke="currentColor" stroke-width="1.6" opacity=".5"/><path d="M18 42h28" stroke="#fff" stroke-width="1.2" opacity=".25"/></svg>`,
  buds: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M22 18c-7 0-12 6-12 14 0 10 6 16 12 16 2 0 4-1 4-4V32c0-8-1-14-4-14z" fill="currentColor"/><path d="M42 18c7 0 12 6 12 14 0 10-6 16-12 16-2 0-4-1-4-4V32c0-8 1-14 4-14z" fill="currentColor"/><circle cx="18" cy="30" r="3" fill="#fff" opacity=".35"/><circle cx="46" cy="30" r="3" fill="#fff" opacity=".35"/></svg>`,
  display: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="8" y="12" width="48" height="32" rx="3" stroke="currentColor" stroke-width="2.4"/><rect x="12" y="16" width="40" height="24" rx="1" fill="currentColor" opacity=".25"/><path d="M24 48h16M32 44v4" stroke="currentColor" stroke-width="2"/></svg>`,
  gpu: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="6" y="18" width="52" height="28" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="32" r="8" stroke="currentColor" stroke-width="1.8"/><circle cx="22" cy="32" r="3" fill="currentColor"/><circle cx="42" cy="32" r="8" stroke="currentColor" stroke-width="1.8"/><circle cx="42" cy="32" r="3" fill="currentColor"/><path d="M10 22h8M10 42h8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  deck: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="6" y="16" width="52" height="34" rx="4" stroke="currentColor" stroke-width="2"/><rect x="10" y="20" width="34" height="22" rx="2" fill="currentColor" opacity=".3"/><rect x="46" y="22" width="8" height="18" rx="1" fill="currentColor" opacity=".5"/><circle cx="18" cy="46" r="1.6" fill="currentColor"/></svg>`,
  rig: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="14" y="10" width="36" height="46" rx="3" stroke="currentColor" stroke-width="2"/><path d="M20 18h24M20 26h24M20 34h16" stroke="currentColor" stroke-width="1.8" opacity=".7"/><rect x="20" y="42" width="10" height="6" rx="1" fill="currentColor" opacity=".5"/><circle cx="40" cy="45" r="3" fill="currentColor"/></svg>`,
  cluster: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="6" fill="currentColor"/><circle cx="14" cy="20" r="4" fill="currentColor" opacity=".8"/><circle cx="50" cy="20" r="4" fill="currentColor" opacity=".8"/><circle cx="14" cy="46" r="4" fill="currentColor" opacity=".8"/><circle cx="50" cy="46" r="4" fill="currentColor" opacity=".8"/><path d="M32 32L14 20M32 32L50 20M32 32L14 46M32 32L50 46" stroke="currentColor" stroke-width="1.4" opacity=".5"/></svg>`,
  workstation: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="8" y="14" width="30" height="20" rx="2" stroke="currentColor" stroke-width="2"/><rect x="40" y="18" width="16" height="28" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 40h14M23 34v6" stroke="currentColor" stroke-width="2"/><rect x="12" y="46" width="40" height="6" rx="1" fill="currentColor" opacity=".4"/></svg>`,
  watch: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="26" y="4" width="12" height="10" rx="2" fill="currentColor" opacity=".7"/><rect x="26" y="50" width="12" height="10" rx="2" fill="currentColor" opacity=".7"/><circle cx="32" cy="32" r="16" stroke="currentColor" stroke-width="2.4"/><circle cx="32" cy="32" r="2" fill="currentColor"/><path d="M32 32l8-4M32 32v-9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  chrono: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="18" stroke="currentColor" stroke-width="2.4"/><circle cx="32" cy="22" r="4" stroke="currentColor" stroke-width="1.4"/><circle cx="42" cy="36" r="4" stroke="currentColor" stroke-width="1.4"/><circle cx="22" cy="36" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M32 32l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  diver: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="18" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="1.2" opacity=".5"/><path d="M32 18v4M32 42v4M18 32h4M42 32h4" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="2.5" fill="currentColor"/><path d="M32 32h8" stroke="currentColor" stroke-width="2"/></svg>`,
  skeleton: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="18" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="4" stroke="currentColor"/><circle cx="32" cy="22" r="5" stroke="currentColor" stroke-width="1.2" opacity=".7"/><circle cx="41" cy="37" r="5" stroke="currentColor" stroke-width="1.2" opacity=".7"/><circle cx="23" cy="37" r="5" stroke="currentColor" stroke-width="1.2" opacity=".7"/><path d="M32 32l10-8" stroke="currentColor" stroke-width="1.4"/></svg>`,
  tourbillon: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="18" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="38" r="8" stroke="currentColor" stroke-width="1.4"/><circle cx="32" cy="38" r="3" fill="currentColor"/><path d="M32 30V16M28 38h8M32 38l-5-5M32 38l5-5" stroke="currentColor" stroke-width="1.3"/></svg>`,
  tee: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M20 14l12-4 12 4 10 8-8 4v26H18V26l-8-4 10-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  hoodie: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M20 22c0-8 5-14 12-14s12 6 12 14v4l8 6v24H12V32l8-6v-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M26 22c1-4 3-6 6-6s5 2 6 6" stroke="currentColor" stroke-width="1.6"/></svg>`,
  cargo: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M20 8h24l2 18 6 30H12l6-30 2-18z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M20 28h24M22 40h8M34 40h8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  bomber: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M18 20l14-8 14 8 8 6v26c0 4-4 6-10 6H20c-6 0-10-2-10-6V26l8-6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M22 34h20" stroke="currentColor" stroke-width="1.6"/></svg>`,
  coat: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M24 10c2-4 14-4 16 0l6 8 8 4v34H10V22l8-4 6-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M32 12v40M24 28h.01M40 28h.01" stroke="currentColor" stroke-width="1.6"/></svg>`,
  closet: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="10" y="8" width="44" height="48" rx="2" stroke="currentColor" stroke-width="2"/><path d="M32 8v48M18 32h8M38 32h8" stroke="currentColor" stroke-width="1.8"/><circle cx="22" cy="32" r="1.5" fill="currentColor"/><circle cx="42" cy="32" r="1.5" fill="currentColor"/></svg>`,
  goldbar: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M16 26h32l6 16H10l6-16z" fill="currentColor" opacity=".85"/><path d="M20 22h24l-4 4H24l-4-4z" fill="currentColor"/><path d="M22 34h20" stroke="#000" stroke-width="1.2" opacity=".25"/></svg>`,
  chain: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="10" y="26" width="16" height="12" rx="6" stroke="currentColor" stroke-width="2.4"/><rect x="24" y="26" width="16" height="12" rx="6" stroke="currentColor" stroke-width="2.4"/><rect x="38" y="26" width="16" height="12" rx="6" stroke="currentColor" stroke-width="2.4"/></svg>`,
  bracelet: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="16" stroke="currentColor" stroke-width="3.2"/><circle cx="32" cy="16" r="3" fill="currentColor"/><circle cx="46" cy="24" r="3" fill="currentColor"/><circle cx="46" cy="40" r="3" fill="currentColor"/><circle cx="32" cy="48" r="3" fill="currentColor"/><circle cx="18" cy="40" r="3" fill="currentColor"/><circle cx="18" cy="24" r="3" fill="currentColor"/></svg>`,
  ice: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 8l6 14 14 6-14 6-6 14-6-14-14-6 14-6 6-14z" fill="currentColor" opacity=".85"/><path d="M32 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" fill="#fff" opacity=".35"/></svg>`,
  necklace: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M16 12c4 20 10 32 16 32s12-12 16-32" stroke="currentColor" stroke-width="2" fill="none"/><path d="M32 44l-6 10h12l-6-10z" fill="currentColor"/></svg>`,
  jewel: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 8l12 10-12 36L20 18 32 8z" fill="currentColor" opacity=".9"/><path d="M20 18h24M32 8v46" stroke="#000" stroke-width="1" opacity=".2"/><path d="M32 8l12 10H20L32 8z" fill="#fff" opacity=".35"/></svg>`,
  key: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="22" cy="32" r="12" stroke="currentColor" stroke-width="2.4"/><circle cx="22" cy="32" r="4" fill="currentColor"/><path d="M34 32h22v4l-4 4v-4h-4v4h-4v-4h-4" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
  car: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M8 38l6-12c2-4 6-8 12-8h12c6 0 10 3 14 8l6 10c2 2 2 6 0 8H10c-4 0-4-4-2-6z" fill="currentColor"/><circle cx="20" cy="46" r="5" fill="#07070b" stroke="currentColor" stroke-width="1.6"/><circle cx="46" cy="46" r="5" fill="#07070b" stroke="currentColor" stroke-width="1.6"/><path d="M22 22l4 10h18l4-8" stroke="#fff" stroke-width="1.2" opacity=".3"/></svg>`,
  gt: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M6 36l8-8c3-3 8-6 14-6h10c7 0 12 2 16 7l8 9H6z" fill="currentColor"/><path d="M18 22h8l4 8M40 22c4 2 8 6 10 12" stroke="#fff" stroke-width="1.2" opacity=".3"/><circle cx="18" cy="44" r="5" fill="#07070b" stroke="currentColor"/><circle cx="48" cy="44" r="5" fill="#07070b" stroke="currentColor"/></svg>`,
  hyper: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M4 38c8-4 14-16 24-18 4-1 8 0 12 2 8 4 12 10 20 12v6H4v-2z" fill="currentColor"/><path d="M10 36c8-2 16-12 26-12" stroke="#fff" stroke-width="1.2" opacity=".35"/><circle cx="18" cy="46" r="5" fill="#07070b" stroke="currentColor"/><circle cx="48" cy="46" r="5" fill="#07070b" stroke="currentColor"/><path d="M4 30h8M54 28h8" stroke="currentColor" stroke-width="1.4" opacity=".4"/></svg>`,
  voucher: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="8" y="18" width="48" height="28" rx="4" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="32" r="4" fill="#07070b"/><circle cx="56" cy="32" r="4" fill="#07070b"/><path d="M22 28h20M22 36h14" stroke="currentColor" stroke-width="1.8"/></svg>`,
  chip: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="18" stroke="currentColor" stroke-width="2.4"/><circle cx="32" cy="32" r="10" stroke="currentColor" stroke-width="1.6"/><path d="M32 8v8M32 48v8M8 32h8M48 32h8M14 14l6 6M44 44l6 6M14 50l6-6M44 20l6-6" stroke="currentColor" stroke-width="1.8"/></svg>`,
};

function item(id, name, subtitle, value, rarity, odds, icon) {
  return { id, name, subtitle, value, rarity, odds, icon: I[icon] };
}

export const PACKS = [
  {
    id: 'street-heat',
    name: 'Street Heat',
    category: 'street',
    price: 2.49,
    blurb: 'Colorways that cook. Pull a grail off the reel.',
    accent: '#f43f5e',
    accent2: '#fb923c',
    emblem: I.sneaker,
    artFile: 'assets/pack-street.jpg',
    items: [
      item('sh-1', "Apex Low 'Graphite'", 'Daily driver, graphite upper', 12, 'common', 35, 'sneaker'),
      item('sh-2', 'Court 77', 'Heritage court silhouette', 28, 'common', 25, 'sneaker'),
      item('sh-3', "Nova Runner 'Volt'", 'Limited colorway', 55, 'uncommon', 18, 'sneaker'),
      item('sh-4', 'Shadow Dunk', 'After-hours only', 90, 'uncommon', 10, 'sneaker'),
      item('sh-5', 'Infrared High', 'Heat-reactive overlay', 160, 'rare', 7, 'sneaker'),
      item('sh-6', 'Phantom Mag', 'Prototype air system', 420, 'epic', 3.5, 'sneaker'),
      item('sh-7', 'Heat Index 1/1', 'One of one, unsigned', 2200, 'legendary', 1.4, 'sneaker'),
      item('sh-8', 'Sole God', "The grail. Don't blink.", 8500, 'mythic', 0.1, 'sneaker'),
    ],
  },
  {
    id: 'pulse-tech',
    name: 'Pulse Tech',
    category: 'tech',
    price: 7.99,
    blurb: 'Silicon, glass, and machines that should not exist yet.',
    accent: '#22d3ee',
    accent2: '#8b5cf6',
    emblem: I.gpu,
    artFile: 'assets/pack-tech.jpg',
    items: [
      item('pt-1', 'Pulse Buds', 'Spatial audio, no stem', 18, 'common', 32, 'buds'),
      item('pt-2', 'Nova Display 27', 'Mini-LED, 120 Hz', 70, 'common', 24, 'display'),
      item('pt-3', 'Core GPU 4070-class', 'Raster beast, quiet cooler', 280, 'uncommon', 20, 'gpu'),
      item('pt-4', 'Quantum Deck OLED', 'Handheld flagship', 540, 'rare', 12, 'deck'),
      item('pt-5', 'Singularity Rig', 'Full custom loop', 1400, 'epic', 8, 'rig'),
      item('pt-6', 'Orbital Cluster', 'Eight-node render farm', 4800, 'legendary', 3.5, 'cluster'),
      item('pt-7', 'God Mode Workstation', 'Liquid-cooled throne', 18000, 'mythic', 0.5, 'workstation'),
    ],
  },
  {
    id: 'chronos',
    name: 'Chronos',
    category: 'time',
    price: 24.99,
    blurb: 'Complications. Gold. Time you can wear.',
    accent: '#fbbf24',
    accent2: '#64748b',
    emblem: I.watch,
    artFile: 'assets/pack-chrono.jpg',
    items: [
      item('ch-1', 'Tide 40', 'Quartz, brushed steel', 40, 'common', 30, 'watch'),
      item('ch-2', 'Orbit Chrono', 'Panda dial, 10 bar', 95, 'common', 25, 'chrono'),
      item('ch-3', 'Nocturne Diver', 'Helium valve, ceramic', 220, 'uncommon', 20, 'diver'),
      item('ch-4', 'Solaris Gold', '18k case, champagne', 780, 'rare', 14, 'watch'),
      item('ch-5', 'Eternal Skeleton', 'Openworked movement', 2400, 'epic', 7.5, 'skeleton'),
      item('ch-6', 'Midnight Perpetual', 'Moonphase, leap year', 9500, 'legendary', 3.2, 'chrono'),
      item('ch-7', 'Origin Tourbillon', 'Flying cage, platinum', 42000, 'mythic', 0.3, 'tourbillon'),
    ],
  },
  {
    id: 'fog-wardrobe',
    name: 'Fog Wardrobe',
    category: 'street',
    price: 4.49,
    blurb: 'Archive cuts. Fog, chrome, and night fabric.',
    accent: '#e5e7eb',
    accent2: '#6b7280',
    emblem: I.hoodie,
    artFile: 'assets/pack-wardrobe.jpg',
    items: [
      item('fw-1', 'Fog Tee', 'Heavyweight blank', 22, 'common', 34, 'tee'),
      item('fw-2', 'Void Hoodie', '400gsm, dropped shoulder', 65, 'common', 26, 'hoodie'),
      item('fw-3', 'Chrome Cargo', 'Iridescent nylon', 110, 'uncommon', 18, 'cargo'),
      item('fw-4', 'Mirror Bomber', 'Laminated silver shell', 240, 'rare', 12, 'bomber'),
      item('fw-5', 'Myth Coat', 'Floor-length wool', 700, 'epic', 7, 'coat'),
      item('fw-6', 'Archive Piece', 'Sample-room leftover', 2100, 'legendary', 2.7, 'coat'),
      item('fw-7', "Founder's Closet", 'The whole rack', 11000, 'mythic', 0.3, 'closet'),
    ],
  },
  {
    id: 'gold-room',
    name: 'Gold Room',
    category: 'luxury',
    price: 49.99,
    blurb: 'Vault light. Weight you can feel.',
    accent: '#fbbf24',
    accent2: '#b45309',
    emblem: I.jewel,
    artFile: 'assets/pack-gold.jpg',
    items: [
      item('gr-1', '2g Gold Bar', 'LBMA-spec, sealed', 160, 'common', 28, 'goldbar'),
      item('gr-2', 'Cuban Link', '10mm, 14k', 340, 'common', 24, 'chain'),
      item('gr-3', 'Tennis Bracelet', 'Three-prong, full set', 900, 'uncommon', 20, 'bracelet'),
      item('gr-4', 'Ice Chain', 'VVS tennis, 20 inch', 2200, 'rare', 15, 'ice'),
      item('gr-5', 'Vault Watch', 'Integrated bracelet', 6800, 'epic', 8.5, 'watch'),
      item('gr-6', 'Heritage Necklace', 'Estate diamond drop', 19000, 'legendary', 4, 'necklace'),
      item('gr-7', 'Crown Jewel', 'Untouchable stone', 75000, 'mythic', 0.5, 'jewel'),
    ],
  },
  {
    id: 'apex-keys',
    name: 'Apex Keys',
    category: 'apex',
    price: 99.99,
    blurb: 'Track days to one-of-ones. Do not miss the allocation.',
    accent: '#ef4444',
    accent2: '#7f1d1d',
    emblem: I.hyper,
    artFile: 'assets/pack-apex.jpg',
    items: [
      item('ak-1', 'Weekend Rental Voucher', 'Any GT, 48 hours', 180, 'common', 30, 'voucher'),
      item('ak-2', 'Track Day GT', 'Instructor + car', 620, 'common', 24, 'gt'),
      item('ak-3', 'Club Sport Allocation', 'Order slot, street legal', 2400, 'uncommon', 20, 'car'),
      item('ak-4', 'Super GT Keys', 'Numbered build', 8900, 'rare', 14, 'key'),
      item('ak-5', 'Hypercar Deposit', 'Factory allocation hold', 28000, 'epic', 8, 'hyper'),
      item('ak-6', 'Prototype Keys', 'Unreleased chassis', 95000, 'legendary', 3.6, 'key'),
      item('ak-7', 'One of One Hypercar', 'Bespoke, no VIN twin', 410000, 'mythic', 0.4, 'hyper'),
    ],
  },
];

export const FAKE_USERS = [
  'vapor_jay', 'n0cturne', 'chrome.kid', 'orbit_mia', 'hexblade',
  'lowkey.lux', 'reelgod', 'kitedrift', 'goldroom', 'voidwalk',
  'pulse_ana', 'apexonly', 'fogline', 'tourbillon', 'heatcheck',
  'silent.bid', 'nyx.pack', 'cinder', 'quota', 'lumen_x',
];

export function packById(id) {
  return PACKS.find((p) => p.id === id);
}

export function packEV(pack) {
  return pack.items.reduce((sum, it) => sum + it.value * (it.odds / 100), 0);
}

export function formatMoney(n) {
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (n < 0 ? '-$' : '$') + formatted;
}

export function formatOdds(odds) {
  if (odds < 1) return odds.toFixed(2) + '%';
  if (odds % 1 !== 0) return odds.toFixed(1) + '%';
  return odds.toFixed(0) + '%';
}

export function rarityOf(key) {
  return RARITY[key] || RARITY.common;
}
