import { getTopic } from './topics';

export interface QRef {
  id: string;
  label: string;
  marks: string;
  co?: string;
  title: string;
  topics: string[];
  lab?: string;
}

export interface Paper {
  id: string;
  title: string;
  exam: string;
  code: string;
  batch: string;
  note?: string;
  questions: QRef[];
}

export const PAPERS: Paper[] = [
  {
    id: 'spring-2026', title: 'Spring 2026', exam: 'Midterm', code: 'CSE328', batch: '65 Batch',
    note: 'সবচেয়ে নতুন paper, আর তোমার course code এর সাথে মেলে। এটা দিয়েই শুরু করো।',
    questions: [
      { id: 's26-q1a', label: 'Q1 (a)', marks: '5 (Q1)', co: 'CO1', title: 'Bank fraud detection — steps এর সঠিক sequence', topics: ['ds-process'], lab: 'process-sorter' },
      { id: 's26-q1b', label: 'Q1 (b)', marks: 'Q1 এর অংশ', co: 'CO1', title: 'Agri-Tech: data storage architecture আর 5 V', topics: ['big-data', 'dikw'] },
      { id: 's26-q2a', label: 'Q2 (a)', marks: '5', co: 'CO2', title: 'Patient data: variable type আর measurement scale', topics: ['variables', 'scales'], lab: 'scale-classifier' },
      { id: 's26-q3', label: 'Q3 (a)', marks: '5', co: 'CO2', title: 'Rohingya research: sampling technique প্রয়োগ', topics: ['sampling', 'stats-basics'], lab: 'sampling-sim' },
      { id: 's26-q4a', label: 'Q4 (a)', marks: '10 (Q4)', co: 'CO3', title: 'Saif Hasan: mean বনাম median', topics: ['central-tendency'], lab: 'mean-median' },
      { id: 's26-q4b', label: 'Q4 (b)', marks: 'Q4 এর অংশ', co: 'CO3', title: 'Box plot, IQR outlier আর skewness', topics: ['quartiles', 'outliers', 'shape'], lab: 'iqr-boxplot' },
      { id: 's26-q4c', label: 'Q4 (c)', marks: 'Q4 এর অংশ', co: 'CO3', title: 'Hypothesis test: p = 0.03 এর মানে', topics: ['hypothesis'], lab: 'hypothesis' },
    ],
  },
  {
    id: 'fall-2025', title: 'Fall 2025', exam: 'Midterm', code: 'CSE328', batch: '63 Batch',
    questions: [
      { id: 'f25-q1', label: 'Q1', marks: '5', co: 'CO1', title: 'CEO এর লক্ষ্য পূরণে step-by-step data science plan', topics: ['ds-process', 'why-ds'], lab: 'process-sorter' },
      { id: 'f25-q2', label: 'Q2', marks: '5', co: 'CO2', title: 'IT professionals: তিনটা sampling approach বিশ্লেষণ', topics: ['sampling'], lab: 'sampling-sim' },
      { id: 'f25-q3', label: 'Q3', marks: '5', title: 'Support ticket data: outlier আর তার প্রভাব', topics: ['outliers', 'central-tendency'], lab: 'iqr-boxplot' },
      { id: 'f25-q4', label: 'Q4', marks: '10', co: 'CO3', title: 'চারটা company: কোনটা সবচেয়ে stable investment', topics: ['variance'], lab: 'variance-table' },
    ],
  },
  {
    id: 'fall-2024', title: 'Fall 2024', exam: 'Midterm', code: 'CSE315', batch: '62 & 63 Batch',
    note: 'পুরনো course code (CSE315)। এর কয়েকটা প্রশ্ন (pandas, regression, Naive Bayes) এবারের slide এ নেই — Bonus অংশে দেখো।',
    questions: [
      { id: 'f24-q1a', label: 'Q1 (a)', marks: '2', co: 'CO1', title: 'Telecom churn predict করতে variable গুলো কীভাবে কাজে লাগাবে', topics: ['why-ds', 'ds-process'] },
      { id: 'f24-q1b', label: 'Q1 (b)', marks: '3', co: 'CO1', title: 'University satisfaction survey: কোন sampling', topics: ['sampling'], lab: 'sampling-sim' },
      { id: 'f24-q2a', label: 'Q2 (a)', marks: '3', co: 'CO2', title: 'Pandas DataFrame code', topics: ['pandas'] },
      { id: 'f24-q2b', label: 'Q2 (b)', marks: '3', co: 'CO2', title: 'বয়সের data: Q1, Q3, IQR দিয়ে outlier', topics: ['outliers'], lab: 'iqr-boxplot' },
      { id: 'f24-q2c', label: 'Q2 (c)', marks: '4', co: 'CO2', title: 'Training hours বনাম performance: linear regression', topics: ['regression', 'correlation'], lab: 'correlation' },
      { id: 'f24-q3a', label: 'Q3 (a)', marks: '2', co: 'CO2', title: 'Generalized Bayes বনাম Naive Bayes', topics: ['naive-bayes', 'bayes'] },
      { id: 'f24-q3b', label: 'Q3 (b)', marks: '3', title: 'Naive Bayes কেন ভালো option', topics: ['naive-bayes'] },
      { id: 'f24-q3c', label: 'Q3 (c)', marks: '5', title: 'Spam email: Naive Bayes হিসাব', topics: ['naive-bayes'] },
    ],
  },
  {
    id: 'spring-2024', title: 'Spring 2024', exam: 'Midterm', code: 'CSE315', batch: '61 Batch',
    note: 'পুরনো course code (CSE315), scan কিছু জায়গায় ঝাপসা। অস্পষ্ট জায়গাগুলো আলাদা করে mark করা আছে।',
    questions: [
      { id: 's24-q1a', label: 'Q1 (a)', marks: '5', title: 'Coding issue resolve time: hypothesis test (α = 0.02)', topics: ['hypothesis', 'z-t-tests'], lab: 'hypothesis' },
      { id: 's24-q1b', label: 'Q1 (b)', marks: '3', title: 'Retail store customer satisfaction: sampling strategy', topics: ['sampling'], lab: 'sampling-sim' },
      { id: 's24-q2a', label: 'Q2 (a)', marks: '2.5 + 2.5', title: '৪০ জনের exam score: outlier আর mean/SD এর উপর প্রভাব', topics: ['outliers', 'variance'], lab: 'iqr-boxplot' },
      { id: 's24-q2b', label: 'Q2 (b)', marks: '4', title: 'Monthly sales বনাম advertising: correlation', topics: ['correlation'], lab: 'correlation' },
      { id: 's24-q3', label: 'Q3', marks: '8', title: 'Pet dataset: Naive Bayes prediction', topics: ['naive-bayes'] },
    ],
  },
];

// Validate topic references at build time.
for (const p of PAPERS) for (const q of p.questions) for (const t of q.topics) getTopic(t);

export function getPaper(id: string) {
  const p = PAPERS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown paper: ${id}`);
  return p;
}

export function findQuestion(id: string) {
  for (const p of PAPERS) {
    const q = p.questions.find((x) => x.id === id);
    if (q) return { paper: p, q, url: `/questions/${p.id}/#${q.id}` };
  }
  throw new Error(`Unknown question id: "${id}"`);
}

export function questionsForTopic(topicId: string) {
  const out: { paper: Paper; q: QRef; url: string }[] = [];
  for (const p of PAPERS) for (const q of p.questions) if (q.topics.includes(topicId)) out.push({ paper: p, q, url: `/questions/${p.id}/#${q.id}` });
  return out;
}

export function questionsForLab(labId: string) {
  const out: { paper: Paper; q: QRef; url: string }[] = [];
  for (const p of PAPERS) for (const q of p.questions) if (q.lab === labId) out.push({ paper: p, q, url: `/questions/${p.id}/#${q.id}` });
  return out;
}
