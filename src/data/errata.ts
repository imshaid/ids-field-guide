import { getTopic } from './topics';

export interface Erratum {
  id: string;
  topic: string;
  where: string;
  wrong: string;
  right: string;
  why?: string;
}

export const ERRATA: Erratum[] = [
  { id: 'range-sum', topic: 'quartiles', where: 'Week 3 ও Week 4 · Data Spread', wrong: 'Range is the sum of the maximum and minimum values.', right: 'Range = Max − Min (বিয়োগফল, যোগফল না)।', why: 'Slide এর নিজের হিসাবেই 17 − 11 = 6 করা আছে, তাই সংজ্ঞার "sum" শব্দটা ভুল।' },
  { id: 'range-18', topic: 'quartiles', where: 'Week 3 · Range example', wrong: 'The maximum value is 18 and the minimum is 11, the difference is 8.', right: '18 − 11 = 7। আর slide এর data তে max আসলে 17, তাই range = 17 − 11 = 6।' },
  { id: 'median-odd', topic: 'central-tendency', where: 'Week 3 · Median', wrong: 'If n is odd, median = (n/2 + 1)th value.', right: 'Odd n হলে median = ((n + 1)/2)-তম মান। n = 9 হলে (9 + 1)/2 = 5-তম।', why: 'n/2 + 1 দিলে 9/2 + 1 = 5.5 আসে, যেটা কোনো position না।' },
  { id: 'q2-label', topic: 'outliers', where: 'Week 3 · Building heights example', wrong: 'So, Q1 = 584, Q2 = 719.5, IQR = 135.5', right: 'Q3 = 719.5 হবে। Q2 (median) = (662 + 678)/2 = 670।' },
  { id: 'quota-pct', topic: 'sampling', where: 'Week 3 · Quota sampling', wrong: 'If 80% of the population is male and 40% female…', right: 'দুইটা মিলে 100% হতে হবে — যেমন 60% male, 40% female। ধারণাটা ঠিক আছে, শুধু সংখ্যায় typo।' },
  { id: 'variance-unit', topic: 'variance', where: 'Week 4 · Variance (dogs)', wrong: 'The height of dogs can vary by 217.04 cm from their average.', right: 'Variance এর unit cm², তাই 217.04 cm² — এটা সরাসরি "কত cm ছড়ানো" বলে না। সেটা বলে SD = 14.73 cm।', why: 'একই slide এ "24.67 mm" লেখা আছে, ওটাও 24.67 cm হবে।' },
  { id: 'income-normal', topic: 'shape', where: 'Week 4 · Examples of normal distribution', wrong: 'Income distribution — an example of normal distribution.', right: 'Income আসলে positively skewed (বেশিরভাগ মানুষের আয় কম-মাঝারি, অল্প কয়েকজনের অনেক বেশি)। Slide নিজেই পরে skewness এ এটাকে positive skew এর example দিয়েছে।' },
  { id: 'skew-direction', topic: 'shape', where: 'Week 4 · Skewness', wrong: 'If the curve is tilted to the right… negative skewed.', right: 'চূড়া কোন দিকে না, লম্বা লেজ কোন দিকে সেটা দেখো। লেজ বামে = negative skew, লেজ ডানে = positive skew।', why: 'Negative skew তে চূড়া ডানে সরে থাকে বলেই slide এ "tilted to the right" লেখা — কিন্তু এভাবে মনে রাখলে গুলিয়ে যায়।' },
  { id: 'test-skew', topic: 'shape', where: 'Week 4 · Negative skew example', wrong: 'In a well-designed test most students score around the average… creates a negative skew.', right: 'সবাই গড়ের কাছে থাকলে সেটা প্রায় symmetric। Negative skew হয় যখন test সহজ — বেশিরভাগ high পায়, অল্প কয়েকজন খুব কম পায় (লেজ বামে)।' },
  { id: 'kurtosis-3', topic: 'shape', where: 'Week 4 · Kurtosis', wrong: 'Table: normal = 0। Example: normal (mesokurtic) এর kurtosis = 3।', right: 'দুইটাই ঠিক, শুধু দুই রকম মাপ। Kurtosis এ normal = 3; excess kurtosis = kurtosis − 3, তাতে normal = 0। Table টা excess kurtosis এর।' },
  { id: 'z1-numbers', topic: 'z-t-tests', where: 'Week 5 · z test example 1', wrong: 'Question: x̄ = 75, σ = 6। Solution এ: x̄ = 85, σ = 7।', right: 'Solution এর সংখ্যায় z = −3.19, two-tail p = 0.0014। Question এর সংখ্যায় z = −11.18, p প্রায় 0। দুই ক্ষেত্রেই p < 0.01, তাই H0 reject।' },
  { id: 'z1-decision', topic: 'z-t-tests', where: 'Week 5 · z test example 1, Step 4', wrong: 'Alpha = .01, p value is greater than .0014 so we reject null hypothesis.', right: 'p = 0.0014 < α = 0.01, তাই reject। "α, p এর চেয়ে বড়" বলা যায়, কিন্তু "p, 0.0014 এর চেয়ে বড়" বাক্যটা অর্থহীন।' },
  { id: 'z2-numbers', topic: 'z-t-tests', where: 'Week 5 · z test example 2', wrong: 'Question: sample mean 26,000, σ = 60,000। Solution: 288,000 আর 80,000।', right: 'Solution এর সংখ্যায় z = −0.75, p = 0.2266 > 0.025 → H0 reject হয় না। আর "mayor claim is right" না বলে বলো "claim টা reject করার মত যথেষ্ট প্রমাণ নেই"।' },
  { id: 't1-numbers', topic: 'z-t-tests', where: 'Week 5 · t test example', wrong: 'Question: μ = 36.6, s = 8। Solution: μ = 36.7, s = 6।', right: 'Solution এর সংখ্যায় t = 2.517, df = 14, 0.01 < p < 0.025। Question এর সংখ্যায় t = 1.94, p ≈ 0.037। দুই ক্ষেত্রেই p < 0.05 → H0 reject।' },
  { id: 'accept-h0', topic: 'hypothesis', where: 'Week 5 · Hypothesis testing', wrong: 'In hypothesis testing, we can reject or accept a null hypothesis.', right: 'আমরা H0 "accept" করি না — হয় reject করি, নয়তো "fail to reject" (যথেষ্ট প্রমাণ নেই) বলি।', why: 'প্রমাণ না পাওয়া মানে H0 সত্য প্রমাণ হওয়া না।' },
  { id: 'n30', topic: 'z-t-tests', where: 'Week 5 · Conditions for z and t test', wrong: 'Follow the normal distribution if the population size is less than 30.', right: 'এখানে sample size হবে। n < 30 হলে population normal ধরে নিতে হয়। আর slide এর নিজের z example গুলোতে n = 20, 25 — সেখানে z চলে কারণ σ জানা আর population normal।' },
  { id: 'bayes-two', topic: 'bayes', where: 'Week 5 · Bayes theorem', wrong: 'A and B are not two events.', right: 'A আর B দুইটা event। Bayes বলে B ঘটেছে জানলে A এর probability কত।' },
];

for (const e of ERRATA) getTopic(e.topic);

export function getErratum(id: string) {
  const e = ERRATA.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown erratum: ${id}`);
  return e;
}
