// Global client behaviour: prefs, dialogs, search, previews, reveal, progress.
const KEY = 'idsfg:';
export const store = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem(KEY + k);
      return v == null ? d : (JSON.parse(v) as T);
    } catch {
      return d;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(KEY + k, JSON.stringify(v));
    } catch {}
  },
};

const root = document.documentElement;
const prefs = store.get<Record<string, string>>('prefs', {});
const CYCLE: Record<string, string[]> = { size: ['s', 'm', 'l', 'xl'], lead: ['t', 'n', 'l'], width: ['nr', 'n', 'w'] };
const NAMES: Record<string, Record<string, string>> = {
  size: { s: 'S', m: 'M', l: 'L', xl: 'XL' },
  lead: { t: 'Tight', n: 'Normal', l: 'Loose' },
  width: { nr: 'Narrow', n: 'Normal', w: 'Wide' },
};
const DEF: Record<string, string> = { size: 'm', lead: 'n', width: 'n', flash: 'on', motion: 'on' };

function applyPrefs() {
  for (const k of Object.keys(DEF)) root.dataset[k] = prefs[k] || DEF[k];
  document.querySelectorAll<HTMLButtonElement>('[data-cycle]').forEach((b) => {
    const k = b.dataset.cycle!;
    const v = root.dataset[k]!;
    const el = b.querySelector('b');
    if (el) el.textContent = NAMES[k][v];
  });
  document.querySelectorAll<HTMLElement>('[data-pref]').forEach((g) => {
    const k = g.dataset.pref!;
    g.querySelectorAll<HTMLButtonElement>('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === root.dataset[k])));
  });
}
function setPref(k: string, v: string) {
  prefs[k] = v;
  store.set('prefs', prefs);
  applyPrefs();
}
applyPrefs();

export const motionOK = () =>
  root.dataset.motion !== 'off' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- progress ---------- */
const done = new Set(store.get<string[]>('done', []));
const flags = new Set(store.get<string[]>('flags', []));
function paintProgress() {
  document.querySelectorAll<HTMLElement>('[data-done-mark]').forEach((m) => m.classList.toggle('on', done.has(m.dataset.doneMark!)));
  document.querySelectorAll<HTMLButtonElement>('[data-done]').forEach((b) => {
    const on = done.has(b.dataset.done!);
    b.setAttribute('aria-pressed', String(on));
    b.textContent = on ? '✓ বুঝেছি' : 'বুঝেছি — mark করো';
  });
  document.querySelectorAll<HTMLButtonElement>('[data-flag]').forEach((b) => {
    const on = flags.has(b.dataset.flag!);
    b.setAttribute('aria-pressed', String(on));
    b.textContent = on ? '⚑ Revision list এ আছে' : '⚑ পরে revise করব';
  });
  document.querySelectorAll<HTMLElement>('[data-progress]').forEach((el) => {
    const ids = el.dataset.progress!.split(',').filter(Boolean);
    const n = ids.filter((i) => done.has(i)).length;
    const pct = ids.length ? Math.round((n / ids.length) * 100) : 0;
    el.style.setProperty('--p', pct + '%');
    const lbl = el.parentElement?.querySelector('[data-progress-label]');
    if (lbl) lbl.textContent = `${n}/${ids.length}`;
  });
}
paintProgress();

const topicId = document.body.dataset.topic;
if (topicId) {
  const h1 = document.querySelector('h1');
  store.set('last', { id: topicId, url: location.pathname, title: h1?.textContent?.trim() ?? '' });
}
document.querySelectorAll<HTMLAnchorElement>('[data-continue]').forEach((a) => {
  const last = store.get<{ url: string; title: string } | null>('last', null);
  if (last) {
    a.href = last.url;
    const s = a.querySelector('[data-continue-title]');
    if (s) s.textContent = last.title;
    a.hidden = false;
  }
});

/* ---------- countdown ---------- */
document.querySelectorAll<HTMLElement>('[data-countdown]').forEach((el) => {
  const exam = new Date(el.dataset.countdown + 'T00:00:00+06:00').getTime();
  const now = Date.now();
  const day = 86400000;
  if (now < exam) {
    const d = Math.ceil((exam - now) / day);
    el.textContent = d <= 1 ? 'Exam কালকে — শেষ revision এর সময়' : `Exam আর ${d} দিন পরে`;
  } else if (now < exam + day) {
    el.textContent = 'আজকেই exam — all the best!';
  } else {
    el.textContent = 'Midterm শেষ — final এর জন্য রেখে দাও';
  }
});

/* ---------- dialogs ---------- */
function openDialog(id: string) {
  const d = document.getElementById(id) as HTMLDialogElement | null;
  if (!d) return;
  if (!d.open) d.showModal();
  if (id === 'dlg-search') setTimeout(() => (document.getElementById('q-search') as HTMLInputElement)?.focus(), 30);
}
document.querySelectorAll('dialog').forEach((d) => {
  d.addEventListener('click', (e) => {
    if (e.target === d) d.close();
  });
});

/* ---------- clicks ---------- */
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const cyc = t.closest<HTMLElement>('[data-cycle]');
  if (cyc) {
    const k = cyc.dataset.cycle!;
    const list = CYCLE[k];
    setPref(k, list[(list.indexOf(root.dataset[k]!) + 1) % list.length]);
    return;
  }
  const pb = t.closest<HTMLButtonElement>('[data-pref] button');
  if (pb) {
    setPref(pb.parentElement!.dataset.pref!, pb.dataset.v!);
    return;
  }
  const op = t.closest<HTMLElement>('[data-open]');
  if (op) {
    openDialog(op.dataset.open!);
    return;
  }
  const cl = t.closest<HTMLElement>('[data-close]');
  if (cl) {
    cl.closest('dialog')?.close();
    return;
  }
  const db = t.closest<HTMLButtonElement>('[data-done]');
  if (db) {
    const id = db.dataset.done!;
    done.has(id) ? done.delete(id) : done.add(id);
    store.set('done', [...done]);
    paintProgress();
    return;
  }
  const fb = t.closest<HTMLButtonElement>('[data-flag]');
  if (fb) {
    const id = fb.dataset.flag!;
    flags.has(id) ? flags.delete(id) : flags.add(id);
    store.set('flags', [...flags]);
    paintProgress();
    return;
  }
  const cp = t.closest<HTMLButtonElement>('[data-copy]');
  if (cp) {
    const text = cp.dataset.copy!;
    navigator.clipboard?.writeText(text).then(() => {
      const old = cp.textContent;
      cp.textContent = 'Copied ✓';
      setTimeout(() => (cp.textContent = old), 1200);
    });
    return;
  }
  const aa = t.closest<HTMLButtonElement>('[data-answers]');
  if (aa) {
    const open = aa.dataset.answers === 'open';
    document.querySelectorAll<HTMLDetailsElement>('details.answer').forEach((d) => (d.open = open));
    return;
  }
});

document.addEventListener('keydown', (e) => {
  const tag = (e.target as HTMLElement).tagName;
  const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
    e.preventDefault();
    openDialog('dlg-search');
  }
});

/* ---------- search (Pagefind) ---------- */
const qInput = document.getElementById('q-search') as HTMLInputElement | null;
const qOut = document.getElementById('q-results');
let pf: any = null;
let timer = 0;
async function loadPagefind() {
  if (pf) return pf;
  const p = '/pagefind/pagefind.js';
  pf = await import(/* @vite-ignore */ p);
  await pf.init?.();
  return pf;
}
qInput?.addEventListener('input', () => {
  clearTimeout(timer);
  timer = window.setTimeout(async () => {
    const q = qInput.value.trim();
    if (!qOut) return;
    if (!q) {
      qOut.innerHTML = '';
      return;
    }
    try {
      const api = await loadPagefind();
      const res = await api.search(q);
      const items = await Promise.all(res.results.slice(0, 9).map((r: any) => r.data()));
      qOut.innerHTML = items.length
        ? items.map((d: any) => `<li><a href="${d.url}"><strong>${d.meta?.title ?? d.url}</strong><p>${d.excerpt}</p></a></li>`).join('')
        : '<li class="muted" style="padding:.8rem .2rem">কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করো।</li>';
    } catch {
      qOut.innerHTML = '<li class="muted" style="padding:.8rem .2rem">Search index load হয়নি (build এর পরে কাজ করবে)।</li>';
    }
  }, 140);
});

/* ---------- term previews ---------- */
const tip = document.getElementById('tip')!;
let tipFor: HTMLAnchorElement | null = null;
let hideT = 0;
function showTip(a: HTMLAnchorElement) {
  clearTimeout(hideT);
  tipFor = a;
  tip.style.setProperty('--acc', getComputedStyle(a).getPropertyValue('--acc'));
  tip.innerHTML = `<b>${a.dataset.tipTitle ?? ''}</b>${a.dataset.tip ?? ''}<br><a href="${a.href}">পুরোটা পড়ো →</a>`;
  tip.hidden = false;
  if (motionOK()) {
    tip.classList.remove('ink-in');
    void tip.offsetWidth;
    tip.classList.add('ink-in');
  }
  const r = a.getBoundingClientRect();
  const w = tip.offsetWidth;
  const h = tip.offsetHeight;
  let x = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
  let y = r.bottom + 8;
  if (y + h > window.innerHeight - 8) y = r.top - h - 8;
  tip.style.left = x + 'px';
  tip.style.top = y + 'px';
}
function hideTip() {
  hideT = window.setTimeout(() => {
    tip.hidden = true;
    tipFor = null;
  }, 160);
}
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (finePointer) {
  document.addEventListener('pointerover', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-tip]');
    if (a && a !== tipFor) showTip(a);
    if ((e.target as HTMLElement).closest('#tip')) clearTimeout(hideT);
  });
  document.addEventListener('pointerout', (e) => {
    const from = (e.target as HTMLElement).closest('a[data-tip], #tip');
    if (from) hideTip();
  });
} else {
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-tip]');
      if (a && tipFor !== a) {
        e.preventDefault();
        showTip(a);
      } else if (!(e.target as HTMLElement).closest('#tip')) {
        tip.hidden = true;
        tipFor = null;
      }
    },
    true,
  );
}
window.addEventListener('scroll', () => {
  if (!tip.hidden) {
    tip.hidden = true;
    tipFor = null;
  }
}, { passive: true });

/* ---------- ink reveal ---------- */
if (motionOK() && 'IntersectionObserver' in window) {
  const els = document.querySelectorAll<HTMLElement>('.prose > *, [data-ink]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          const el = en.target as HTMLElement;
          el.classList.remove('pre-ink');
          el.classList.add('ink-in');
          io.unobserve(el);
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px' },
  );
  const vh = window.innerHeight;
  els.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top > vh * 0.92) {
      el.classList.add('pre-ink');
      io.observe(el);
    } else if (el.classList.contains('pen')) {
      el.classList.add('ink-in');
    }
  });
}

/* ---------- answers: stagger children ---------- */
document.querySelectorAll<HTMLElement>('details.answer > .ans').forEach((ans) => {
  Array.from(ans.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(Math.min(i, 12))));
});

/* ---------- revise page ---------- */
const rv = document.querySelector<HTMLElement>('[data-revise]');
if (rv) {
  const index = JSON.parse(document.getElementById('topic-index')!.textContent!) as { id: string; title: string; url: string; week: string; summary: string }[];
  const render = () => {
    const list = index.filter((t) => flags.has(t.id));
    rv.innerHTML = list.length
      ? `<ul class="tlist">${list
          .map((t, i) => `<li data-week="${t.week}"><a href="${t.url}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span><h3>${t.title}</h3><p class="muted">${t.summary}</p></span><span class="pri">${t.week.toUpperCase()}</span></a></li>`)
          .join('')}</ul>`
      : `<p class="muted">এখনো কিছু flag করোনি। যেকোনো topic এর শেষে "⚑ পরে revise করব" চাপলে সেটা এখানে চলে আসবে।</p>`;
    const stat = document.querySelector('[data-revise-stat]');
    if (stat) stat.textContent = `${done.size} / ${index.length} topic বুঝেছ · ${list.length}টা revise এর জন্য রাখা`;
  };
  render();
}
