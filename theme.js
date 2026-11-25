/* =========================================================
   MODUL TEMA v2 — dipakai bersama oleh index.html & admin.html
   Berisi preset warna & huruf, penghitung palet TERANG + GELAP,
   serta pengelola tombol ganti mode.
   ========================================================= */

window.COLOR_PRESETS = {
  registry: {
    name: 'Registry Klasik',
    desc: 'Biru arsip, kertas krem, aksen kuningan — formal dan berkarakter arsip.',
    c: { dark:'#10192B', bg:'#F2ECDF', ink:'#1C2230', accent:'#B98B4E', green:'#3F6B58', rust:'#A64B3E', slate:'#8B93A3' }
  },
  korporat: {
    name: 'Korporat Biru',
    desc: 'Kombinasi paling umum untuk situs korporat dan institusi — netral, aman, profesional.',
    c: { dark:'#12263F', bg:'#F4F7FA', ink:'#1B2733', accent:'#2A6FB0', green:'#2E7D6B', rust:'#B4543A', slate:'#7A8899' }
  },
  petrol: {
    name: 'Petrol Profesional',
    desc: 'Biru petrol dalam dengan latar sejuk — tenang, modern, nyaman dibaca lama.',
    c: { dark:'#0B2F40', bg:'#F7F9FB', ink:'#16222B', accent:'#0B6E8F', green:'#1B998B', rust:'#B05A3C', slate:'#788B98' }
  },
  abu: {
    name: 'Abu Profesional',
    desc: 'Abu arang dengan aksen biru lembut — sangat netral, cocok untuk dokumen teknis.',
    c: { dark:'#1F2328', bg:'#F6F7F8', ink:'#24292F', accent:'#4A6FA5', green:'#2E7D57', rust:'#A8492F', slate:'#848D97' }
  },
  hijau: {
    name: 'Hijau Institusi',
    desc: 'Hijau tua dengan aksen emas — kesan mapan, sering dipakai lembaga dan BUMN.',
    c: { dark:'#12291F', bg:'#F4F6F2', ink:'#1D2A22', accent:'#C08A3E', green:'#2F6B4F', rust:'#A0522D', slate:'#7E8B82' }
  },
  marun: {
    name: 'Marun Formal',
    desc: 'Marun dan krem — berwibawa, sering dipakai lembaga pendidikan dan hukum.',
    c: { dark:'#2A1418', bg:'#F8F3EF', ink:'#241A1C', accent:'#A6763C', green:'#4A6B55', rust:'#8C3B3B', slate:'#8B8082' }
  },
  indigo: {
    name: 'Biru Malam Modern',
    desc: 'Indigo bersih dengan latar terang — kesan modern namun tetap formal.',
    c: { dark:'#131A2B', bg:'#F5F6FA', ink:'#1E2433', accent:'#4C6FCF', green:'#3A7D6B', rust:'#B25A45', slate:'#7F869A' }
  },
  teal: {
    name: 'Teal Tenang',
    desc: 'Teal gelap dengan latar sejuk — mudah dibaca lama, cocok materi pelatihan.',
    c: { dark:'#0F2A2E', bg:'#F3F7F7', ink:'#1A2B2E', accent:'#2F7E86', green:'#337A63', rust:'#A9553F', slate:'#78898C' }
  }
};

window.FONT_PRESETS = {
  'source-sans': {
    name: 'Source Sans 3',
    desc: 'Sans bersih dan sangat terbaca di segala ukuran. (Bawaan)',
    display:'Source Sans 3', body:'Source Sans 3', mono:'Anonymous Pro',
    google:'family=Anonymous+Pro:wght@400;700&family=Source+Sans+3:wght@400;500;600;700'
  },
  'inter': {
    name: 'Inter',
    desc: 'Grotesk modern yang rapat dan tegas — kesan teknis dan presisi.',
    display:'Inter', body:'Inter', mono:'Anonymous Pro',
    google:'family=Anonymous+Pro:wght@400;700&family=Inter:wght@400;500;600;700'
  },
  'fraunces-inter': {
    name: 'Fraunces + Inter',
    desc: 'Judul serif berkarakter, isi sans yang sangat terbaca.',
    display:'Fraunces', body:'Inter', mono:'IBM Plex Mono',
    google:'family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600'
  },
  'playfair-source': {
    name: 'Playfair Display + Source Sans 3',
    desc: 'Judul elegan berkontras tinggi, isi netral — kesan editorial formal.',
    display:'Playfair Display', body:'Source Sans 3', mono:'IBM Plex Mono',
    google:'family=Playfair+Display:wght@500;600;700&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600'
  },
  'merriweather-inter': {
    name: 'Merriweather + Inter',
    desc: 'Serif tebal yang mantap untuk judul — cocok untuk materi bacaan panjang.',
    display:'Merriweather', body:'Inter', mono:'IBM Plex Mono',
    google:'family=Merriweather:wght@400;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600'
  },
  'plex': {
    name: 'IBM Plex Serif + IBM Plex Sans',
    desc: 'Satu keluarga huruf yang konsisten — sangat rapi untuk dokumen teknis.',
    display:'IBM Plex Serif', body:'IBM Plex Sans', mono:'IBM Plex Mono',
    google:'family=IBM+Plex+Serif:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600'
  },
  'lora-opensans': {
    name: 'Lora + Open Sans',
    desc: 'Kombinasi klasik yang hangat dan mudah dibaca di segala ukuran layar.',
    display:'Lora', body:'Open Sans', mono:'IBM Plex Mono',
    google:'family=Lora:wght@500;600;700&family=Open+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600'
  }
};

/* ================= BANTUAN WARNA ================= */
function hexToRgb(hex){
  const h = String(hex).replace('#','').trim();
  const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return { r: parseInt(f.slice(0,2),16), g: parseInt(f.slice(2,4),16), b: parseInt(f.slice(4,6),16) };
}
function toHex(r,g,b){
  const m = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2,'0');
  return '#' + m(r) + m(g) + m(b);
}
function mixHex(hex, target, amount){
  const a = hexToRgb(hex), b = hexToRgb(target);
  return toHex(a.r + (b.r-a.r)*amount, a.g + (b.g-a.g)*amount, a.b + (b.b-a.b)*amount);
}
function rgbaOf(hex, alpha){
  const c = hexToRgb(hex);
  return `rgba(${c.r},${c.g},${c.b},${alpha})`;
}
function luminance(hex){
  const c = hexToRgb(hex);
  const f = v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
  return 0.2126*f(c.r) + 0.7152*f(c.g) + 0.0722*f(c.b);
}
function contrast(a, b){
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1,l2) + 0.05) / (Math.min(l1,l2) + 0.05);
}
/* Geser warna ke arah gelap/terang sampai kontras terhadap latar memadai */
function ensureContrast(color, bg, target, towards){
  let c = color;
  for (let i = 0; i < 24 && contrast(c, bg) < target; i++) c = mixHex(c, towards, 0.07);
  return c;
}

window.DEFAULT_THEME = { colorPreset:'petrol', fontPreset:'source-sans', custom:null };
window.THEME_MODES = ['light','dark'];

/* ================= MEMBACA & MENYIMPAN MODE ================= */
window.getThemeMode = function(){
  try {
    const saved = localStorage.getItem('am-theme-mode');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch(e){}
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch(e){}
  return 'light';
};
window.setThemeMode = function(mode){
  try { localStorage.setItem('am-theme-mode', mode); } catch(e){}
};

/* ================= MENGHITUNG SELURUH TOKEN ================= */
window.computeTokens = function(c, mode){
  const dark = mode === 'dark';
  const t = {};

  if (!dark){
    /* ---------- TERANG ---------- */
    t['--bg']         = c.bg;
    t['--bg-soft']    = mixHex(c.bg, c.ink, 0.045);
    t['--surface']    = mixHex(c.bg, '#FFFFFF', 0.72);
    t['--surface-2']  = mixHex(c.bg, c.ink, 0.03);
    t['--glass']      = rgbaOf(c.bg, 0.92);
    t['--ink']        = c.ink;
    t['--body']       = mixHex(c.ink, c.bg, 0.30);
    t['--slate']      = c.slate;
    t['--deep']       = c.dark;
    t['--deep-soft']  = mixHex(c.dark, '#FFFFFF', 0.10);
    t['--on-deep']    = mixHex(c.bg, '#FFFFFF', 0.55);
    t['--brand']      = ensureContrast(c.accent, c.bg, 4.6, c.dark);
    t['--brand-2']    = ensureContrast(c.accent, c.bg, 6.5, c.dark);
    t['--accent']     = c.accent;
    t['--green']      = ensureContrast(c.green, c.bg, 4.0, '#000000');
    t['--rust']       = ensureContrast(c.rust, c.bg, 4.0, '#000000');
    t['--line']       = mixHex(c.bg, c.ink, 0.13);
    t['--line-soft']  = mixHex(c.bg, c.ink, 0.07);
    t['--hairline']   = rgbaOf(c.accent, 0.25);
    t['--tint-brand'] = mixHex(c.bg, c.accent, 0.11);
    t['--tint-green'] = mixHex(c.bg, c.green, 0.12);
    t['--tint-rust']  = mixHex(c.bg, c.rust, 0.10);
    t['--tint-slate'] = mixHex(c.bg, c.slate, 0.14);
    t['--shadow']     = rgbaOf(c.dark, 0.10);
    t['--shadow-lg']  = rgbaOf(c.dark, 0.16);
  } else {
    /* ---------- GELAP ---------- */
    const base = mixHex(c.dark, '#000000', 0.18);       // latar halaman, lebih dalam dari sidebar
    const ink  = mixHex(c.bg, '#FFFFFF', 0.55);
    t['--bg']         = base;
    t['--bg-soft']    = mixHex(base, '#FFFFFF', 0.035);
    t['--surface']    = mixHex(base, '#FFFFFF', 0.055);
    t['--surface-2']  = mixHex(base, '#FFFFFF', 0.085);
    t['--glass']      = rgbaOf(base, 0.90);
    t['--ink']        = ink;
    t['--body']       = mixHex(ink, base, 0.26);
    t['--slate']      = mixHex(c.slate, '#FFFFFF', 0.14);
    t['--deep']       = mixHex(c.dark, '#000000', 0.34);
    t['--deep-soft']  = mixHex(c.dark, '#FFFFFF', 0.06);
    t['--on-deep']    = ink;
    t['--brand']      = ensureContrast(c.accent, base, 4.6, '#FFFFFF');
    t['--brand-2']    = ensureContrast(c.accent, base, 6.0, '#FFFFFF');
    t['--accent']     = mixHex(c.accent, '#FFFFFF', 0.16);
    t['--green']      = ensureContrast(c.green, base, 4.2, '#FFFFFF');
    t['--rust']       = ensureContrast(c.rust, base, 4.2, '#FFFFFF');
    t['--line']       = rgbaOf(mixHex(c.slate,'#FFFFFF',0.3), 0.20);
    t['--line-soft']  = rgbaOf(mixHex(c.slate,'#FFFFFF',0.3), 0.11);
    t['--hairline']   = rgbaOf(c.accent, 0.30);
    t['--tint-brand'] = rgbaOf(c.accent, 0.15);
    t['--tint-green'] = rgbaOf(c.green, 0.17);
    t['--tint-rust']  = rgbaOf(c.rust, 0.16);
    t['--tint-slate'] = rgbaOf(c.slate, 0.17);
    t['--shadow']     = 'rgba(0,0,0,0.34)';
    t['--shadow-lg']  = 'rgba(0,0,0,0.46)';
  }

  /* --- Nama token lama, supaya admin.html versi sebelumnya tetap berjalan --- */
  t['--navy-deep']      = t['--deep'];
  t['--navy-mid']       = t['--deep-soft'];
  t['--parchment']      = t['--bg'];
  t['--parchment-dim']  = t['--bg-soft'];
  t['--brass']          = t['--brand'];
  t['--brass-bright']   = dark ? t['--accent'] : mixHex(c.accent, '#FFFFFF', 0.24);
  t['--ledger-green']   = t['--green'];
  t['--line-strong']    = t['--line'];
  t['--line-slate']     = t['--line'];
  t['--line-ink']       = t['--line'];
  t['--line-ink-strong']= t['--line'];
  t['--tint-brass']     = t['--tint-brand'];
  t['--tint-rust-2']    = t['--tint-rust'];
  t['--tint-rust-3']    = t['--tint-rust'];

  return t;
};

/* ================= PENERAPAN ================= */
window.applyTheme = function(theme, mode){
  theme = theme || window.DEFAULT_THEME;
  mode  = mode || window.getThemeMode();

  const preset = window.COLOR_PRESETS[theme.colorPreset] || window.COLOR_PRESETS[window.DEFAULT_THEME.colorPreset];
  const c = (theme.colorPreset === 'kustom' && theme.custom) ? theme.custom : preset.c;
  const f = window.FONT_PRESETS[theme.fontPreset] || window.FONT_PRESETS[window.DEFAULT_THEME.fontPreset];

  const root = document.documentElement;
  const tokens = window.computeTokens(c, mode);
  Object.keys(tokens).forEach(k => root.style.setProperty(k, tokens[k]));

  root.style.setProperty('--font-display', `'${f.display}', Georgia, serif`);
  root.style.setProperty('--font-body',    `'${f.body}', system-ui, sans-serif`);
  root.style.setProperty('--font-mono',    `'${f.mono}', ui-monospace, monospace`);

  root.setAttribute('data-mode', mode);
  root.style.colorScheme = mode;

  let link = document.getElementById('themeFonts');
  if (!link){
    link = document.createElement('link');
    link.id = 'themeFonts';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  const href = 'https://fonts.googleapis.com/css2?' + f.google + '&display=swap';
  if (link.href !== href) link.href = href;

  window.__theme = theme;
  window.__mode = mode;
};

/* ================= MEMUAT TEMA DARI DATABASE ================= */
window.loadTheme = async function(client){
  const mode = window.getThemeMode();
  try{
    if (!client){ window.applyTheme(window.DEFAULT_THEME, mode); return window.DEFAULT_THEME; }
    const { data } = await client.from('site_settings').select('value').eq('key','theme').maybeSingle();
    const theme = (data && data.value) ? JSON.parse(data.value) : window.DEFAULT_THEME;
    window.applyTheme(theme, mode);
    return theme;
  } catch(e){
    console.warn('Tema tidak dapat dimuat, memakai bawaan.', e);
    window.applyTheme(window.DEFAULT_THEME, mode);
    return window.DEFAULT_THEME;
  }
};

/* ================= TOMBOL GANTI MODE ================= */
/* Memasang tombol terang/gelap. btn = elemen tombolnya. */
window.initModeToggle = function(btn, onChange){
  if (!btn) return;
  const paint = () => {
    const dark = (window.__mode || window.getThemeMode()) === 'dark';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('title', dark ? 'Ganti ke tampilan terang' : 'Ganti ke tampilan gelap');
    btn.setAttribute('aria-label', btn.getAttribute('title'));
    const ic = btn.querySelector('[data-icon]');
    if (ic) ic.textContent = dark ? '☀' : '☾';
    const lb = btn.querySelector('[data-label]');
    if (lb) lb.textContent = dark ? 'Terang' : 'Gelap';
  };
  btn.addEventListener('click', () => {
    const next = (window.__mode === 'dark') ? 'light' : 'dark';
    window.setThemeMode(next);
    window.applyTheme(window.__theme || window.DEFAULT_THEME, next);
    paint();
    if (typeof onChange === 'function') onChange(next);
  });
  paint();
  window.__paintModeToggle = paint;
};
