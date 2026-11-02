// Post-build pass: wrap Bangla runs inside letter-spaced / uppercase labels in
// <span class="bn">, which resets tracking. Latin label text keeps its style;
// tracked Bangla otherwise renders as spaced-out, broken-looking glyphs.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';

const BN = /[ঀ-৿]/;
const RUN = /[ঀ-৿]+(?:[\s,।?!:()\-–—'"]+[ঀ-৿]+)*/g;
const LABEL_CLASSES = ['kicker', 'co-k', 'p-k', 'chip', 'btn', 'meta', 'pri', 'qp-h', 'crumbs', 'pagecount', 'cd'];
const SKIP_TAGS = new Set(['script', 'style', 'svg', 'code', 'pre', 'math', 'textarea']);

const cls = (n) => (Array.isArray(n.properties?.className) ? n.properties.className : []);
function isLabel(node, parent, ancestors) {
  const t = node.tagName;
  if (LABEL_CLASSES.some((c) => cls(node).includes(c))) return true;
  if (t === 'th' || t === 'summary' || t === 'label' || t === 'small') return true;
  if (t === 'h4' && parent && cls(parent).includes('brief')) return true;
  const up = parent ? [...ancestors, parent] : ancestors;
  if (t === 'h2' && up.some((a) => cls(a).includes('t-end'))) return true;
  if (t === 'h3' && up.some((a) => cls(a).includes('toc-w'))) return true;
  if (t === 'button' && parent && cls(parent).includes('seg')) return true;
  if (t === 'a' && parent && cls(parent).includes('lab-h')) return true;
  return false;
}

function splitText(value) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(RUN)) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    out.push({ type: 'element', tagName: 'span', properties: { className: ['bn'] }, children: [{ type: 'text', value: m[0] }] });
    last = m.index + m[0].length;
  }
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

function walk(node, ancestors, inLabel) {
  if (!node.children) return 0;
  let count = 0;
  const next = [];
  for (const child of node.children) {
    if (child.type === 'text') {
      if (inLabel && BN.test(child.value) && !cls(node).includes('bn')) {
        next.push(...splitText(child.value));
        count++;
      } else next.push(child);
      continue;
    }
    if (child.type === 'element') {
      if (SKIP_TAGS.has(child.tagName) || cls(child).includes('katex')) { next.push(child); continue; }
      const lab = inLabel || isLabel(child, node, ancestors);
      count += walk(child, [...ancestors, node], lab);
    } else if (child.type === 'root') count += walk(child, ancestors, inLabel);
    next.push(child);
  }
  node.children = next;
  return count;
}

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

export default function banglaLabels() {
  return {
    name: 'bangla-labels',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let files = 0, runs = 0;
        for (const f of await htmlFiles(root)) {
          const src = await readFile(f, 'utf8');
          if (!BN.test(src)) continue;
          const tree = fromHtml(src);
          const n = walk(tree, [], false);
          if (!n) continue;
          await writeFile(f, toHtml(tree, { allowDangerousHtml: true }));
          files++; runs += n;
        }
        logger.info(`wrapped Bangla in ${runs} label text nodes across ${files} pages`);
      },
    },
  };
}
