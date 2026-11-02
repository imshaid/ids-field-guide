# IDS Field Guide

An interactive, e-ink styled study guide for **Introduction to Data Science (CSE328)** at Daffodil International University — Weeks 1–5, written in simple Banglish, with interactive labs and fully solved previous questions.

**A Twilight Crows Field Guide** · [Join Twilight Crows on Telegram](https://t.me/+1DeiHZTQEF9hNWE1)

## What's inside

- 23 topic pages (Week 1–5 + bonus) with step-by-step explanations, worked examples and slide corrections
- 10 interactive labs: process sorter, scale classifier, sampling simulator, mean vs median, IQR + box plot, variance & SD, correlation, shape (skewness/kurtosis), hypothesis stepper, Bayes grid
- 4 previous papers (Spring 2026, Fall 2025, Fall 2024, Spring 2024): full questions, breakdown, model answers, common mistakes
- Cheat sheet, errata, glossary, personal revision list, full-text search

## Stack

Astro 7 (static) · MDX · KaTeX (build-time) · Pagefind · hand-written SVG labs · no client framework.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build + search index into dist/
```

## Editing content

- Topics: `src/content/topics/<id>.mdx`, registered in `src/data/topics.ts`
- Previous questions: `src/content/papers/<paper>.mdx`, registered in `src/data/papers.ts`
- Slide corrections: `src/data/errata.ts`
- Labs: `src/components/labs/*.astro`

Every cross-link (`<T id="…">`, `<QL id="…">`, `<LL id="…">`) is validated at build time, so a broken link fails the build.
