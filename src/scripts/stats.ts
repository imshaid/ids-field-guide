// Shared math + animation helpers for labs.
export const parseNums = (s: string) =>
  s.split(/[\s,;]+/).map((x) => Number(x)).filter((n) => Number.isFinite(n) && String(n) !== '');
export const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
export const mean = (a: number[]) => sum(a) / a.length;
export const sorted = (a: number[]) => [...a].sort((x, y) => x - y);
export function median(a: number[]) {
  const s = sorted(a);
  const n = s.length;
  const m = n >> 1;
  return n % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
export function quartiles(a: number[]) {
  const s = sorted(a);
  const n = s.length;
  const m = n >> 1;
  const lo = s.slice(0, m);
  const hi = n % 2 ? s.slice(m + 1) : s.slice(m);
  return { s, lo, hi, q1: median(lo), q2: median(s), q3: median(hi) };
}
export function modes(a: number[]) {
  const c = new Map<number, number>();
  a.forEach((x) => c.set(x, (c.get(x) ?? 0) + 1));
  const top = Math.max(...c.values());
  if (top === 1) return [];
  return [...c.entries()].filter(([, v]) => v === top).map(([k]) => k);
}
export const ss = (a: number[]) => {
  const m = mean(a);
  return sum(a.map((x) => (x - m) ** 2));
};
export const pvar = (a: number[]) => ss(a) / a.length;
export const svar = (a: number[]) => ss(a) / (a.length - 1);

export function fmt(x: number, d = 2) {
  if (!Number.isFinite(x)) return '—';
  if (Number.isInteger(x)) return String(x);
  const r = Math.round(x * 10 ** d) / 10 ** d;
  return String(r);
}
export const fmtP = (p: number) => (p < 0.0001 ? '< 0.0001' : fmt(p, 4));

// ---- distributions ----
export function erf(x: number) {
  const s = Math.sign(x);
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
export const normPdf = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
export const normCdf = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));
export function normInv(p: number) {
  // Acklam's approximation
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pl = 0.02425;
  let q: number, r: number;
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  q = p - 0.5;
  r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
export function lnGamma(z: number): number {
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
function betacf(a: number, b: number, x: number) {
  const MAXIT = 200, EPS = 3e-12, FPMIN = 1e-300;
  let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return h;
}
export function ibeta(x: number, a: number, b: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? (bt * betacf(a, b, x)) / a : 1 - (bt * betacf(b, a, 1 - x)) / b;
}
export function tCdf(t: number, df: number) {
  const x = df / (df + t * t);
  const tail = 0.5 * ibeta(x, df / 2, 0.5);
  return t >= 0 ? 1 - tail : tail;
}
export function tPdf(t: number, df: number) {
  return Math.exp(lnGamma((df + 1) / 2) - lnGamma(df / 2) - 0.5 * Math.log(df * Math.PI) - ((df + 1) / 2) * Math.log(1 + (t * t) / df));
}
export function tInv(p: number, df: number) {
  let lo = -50, hi = 50;
  for (let i = 0; i < 90; i++) {
    const mid = (lo + hi) / 2;
    tCdf(mid, df) < p ? (lo = mid) : (hi = mid);
  }
  return (lo + hi) / 2;
}

// ---- animation ----
export const motionOK = () =>
  document.documentElement.dataset.motion !== 'off' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const ease = (t: number) => 1 - Math.pow(1 - t, 3);
export function tween(dur: number, step: (k: number) => void): Promise<void> {
  return new Promise((res) => {
    if (!motionOK() || dur <= 0) {
      step(1);
      res();
      return;
    }
    const t0 = performance.now();
    const f = (now: number) => {
      const k = Math.max(0, Math.min(1, (now - t0) / dur));
      step(ease(k));
      if (k < 1) requestAnimationFrame(f);
      else res();
    };
    requestAnimationFrame(f);
  });
}
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, motionOK() ? ms : 0));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export const NS = 'http://www.w3.org/2000/svg';
export function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}, parent?: Element) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  parent?.appendChild(e);
  return e;
}
export function inkIn(nodes: Iterable<Element>) {
  if (!motionOK()) return;
  let i = 0;
  for (const n of nodes) {
    (n as HTMLElement).style.setProperty('--i', String(i++));
    n.classList.remove('ink-in');
    void (n as HTMLElement).offsetWidth;
    n.classList.add('ink-in');
  }
}
export const param = (k: string) => new URLSearchParams(location.search).get(k);
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
