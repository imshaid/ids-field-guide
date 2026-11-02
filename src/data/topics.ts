export type WeekId = 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | 'bonus';
export type Priority = 'high' | 'mid' | 'low';

export interface Week {
  id: WeekId;
  label: string;
  title: string;
  blurb: string;
}

export interface Topic {
  id: string;
  week: WeekId;
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  mins: number;
  pri: Priority;
  glance: string[];
  formulas?: { label: string; tex: string }[];
  lab?: string;
  prereq?: string[];
}

export interface Lab {
  id: string;
  week: WeekId;
  title: string;
  question: string;
  summary: string;
  topics: string[];
}

export const WEEKS: Week[] = [
  { id: 'w1', label: 'Week 1', title: 'Data Science কী ও কেন', blurb: 'Data science কেন লাগে, পুরো process টা কেমন, আর big data এর চ্যালেঞ্জ গুলো কী।' },
  { id: 'w2', label: 'Week 2', title: 'Data চেনা', blurb: 'Data কী, DIKW pyramid, variable এর ধরন আর measurement scale — যেকোনো analysis এর ভিত।' },
  { id: 'w3', label: 'Week 3', title: 'Sampling আর Data এর কেন্দ্র', blurb: 'Population-sample, ৮টা sampling method, mean-median-mode, quartile আর IQR দিয়ে outlier ধরা।' },
  { id: 'w4', label: 'Week 4', title: 'Spread, সম্পর্ক আর আকার', blurb: 'Variance, SD, covariance-correlation, normal distribution, আর skewness-kurtosis।' },
  { id: 'w5', label: 'Week 5', title: 'Inference আর Probability', blurb: 'Sample দেখে population নিয়ে সিদ্ধান্ত: estimation, hypothesis test, z/t test আর Bayes theorem।' },
  { id: 'bonus', label: 'Bonus', title: 'Syllabus এর বাইরে, কিন্তু পুরনো প্রশ্নে এসেছে', blurb: 'Naive Bayes, linear regression আর pandas — আগের semester এর প্রশ্নে এসেছে, এবারের slide এ নেই। সময় থাকলে দেখো।' },
];

export const TOPICS: Topic[] = [
  // Week 1
  {
    id: 'why-ds', week: 'w1', slug: 'why-data-science', title: 'Data Science কী, আর কেন লাগে', kicker: 'Foundations',
    summary: 'Data থেকে কাজের pattern খুঁজে বের করে ভালো সিদ্ধান্ত নেওয়ার technique গুলোর নামই data science।',
    mins: 5, pri: 'mid',
    glance: ['Data science = data থেকে value বের করার technique এর সমষ্টি', 'তিনটা বড় কাজ: better decision, prediction, pattern discovery', 'ML হলো data science এর একটা tool, পুরোটা না', 'Model = input X আর output y দেখে শেখা একটা নিয়ম'],
  },
  {
    id: 'ds-process', week: 'w1', slug: 'process', title: 'Data Science Process: ৭টা ধাপ', kicker: 'The pipeline',
    summary: 'Problem বোঝা → data আনা → পরিষ্কার → explore → model → জানানো → deploy, এই order এ কাজ হয়।',
    mins: 7, pri: 'high', lab: 'process-sorter', prereq: ['why-ds'],
    glance: ['সবচেয়ে জরুরি ধাপ: problem টা ঠিকমতো define করা', 'Clean এর আগে explore হয় না, explore এর আগে model না', 'Model train এর পরে evaluate, তারপর communicate', 'Process টা iterative — দরকারে আগের ধাপে ফেরা যায়'],
  },
  {
    id: 'big-data', week: 'w1', slug: 'big-data', title: 'Big Data, 5 V আর Data রাখার জায়গা', kicker: 'Beyond the slides',
    summary: 'Volume, Velocity, Variety, Veracity, Value — big data এর ৫টা চ্যালেঞ্জ; format বদলালেও data রাখতে data lake।',
    mins: 6, pri: 'mid', prereq: ['ds-process', 'dikw'],
    glance: ['5V: Volume, Velocity, Variety, Veracity, Value', 'Structured data → warehouse (schema-on-write)', 'Raw, মিশ্র data → data lake (schema-on-read)', 'Format বদলালেও data lake এ নতুন data জমা রাখা যায়'],
  },
  // Week 2
  {
    id: 'dikw', week: 'w2', slug: 'data-and-dikw', title: 'Data, Information আর DIKW Pyramid', kicker: 'What is data',
    summary: 'কাঁচা data → অর্থ পেলে information → বুঝলে knowledge → কাজে লাগালে wisdom।',
    mins: 5, pri: 'mid',
    glance: ['Data = কাঁচা fact (100)', 'Information = context সহ data (100 miles)', 'Knowledge = মানে বোঝা (100 miles অনেক দূর)', 'Wisdom = কী করা উচিত (হেঁটে না, গাড়িতে যাও)', 'Format: structured বনাম unstructured'],
  },
  {
    id: 'variables', week: 'w2', slug: 'variable-types', title: 'Variable এর ধরন', kicker: 'Types of data',
    summary: 'Variable দুই রকম: qualitative (category) আর quantitative (সংখ্যা); সংখ্যা গোনা গেলে discrete, মাপা গেলে continuous।',
    mins: 5, pri: 'high', lab: 'scale-classifier', prereq: ['dikw'],
    glance: ['Qualitative / categorical: রং, নাম, blood group', 'Quantitative / numerical: বয়স, ওজন', 'Discrete = গোনা যায় (৪ জন মানুষ)', 'Continuous = মাপা যায়, ভগ্নাংশ হয় (৫.৪ ফুট)'],
  },
  {
    id: 'scales', week: 'w2', slug: 'measurement-scales', title: 'Measurement Scale: N-O-I-R', kicker: 'Scales of measurement',
    summary: 'Nominal (শুধু নাম) → Ordinal (ক্রম আছে) → Interval (সমান দূরত্ব) → Ratio (আসল শূন্য আছে)।',
    mins: 7, pri: 'high', lab: 'scale-classifier', prereq: ['variables'],
    glance: ['Nominal: শুধু label — গোনা আর mode', 'Ordinal: ক্রম আছে — median চলে', 'Interval: সমান gap, কিন্তু 0 মানে "নেই" না (°C)', 'Ratio: আসল শূন্য — গুণ-ভাগ চলে (ওজন)'],
  },
  {
    id: 'ds-pipeline', week: 'w2', slug: 'data-scientist', title: 'Data Scientist, Pipeline আর Domain Knowledge', kicker: 'The craft',
    summary: 'Data science = computer science + math/stats + domain knowledge; data কোথা থেকে কীভাবে আসে সেটা জানাই domain knowledge।',
    mins: 5, pri: 'low', prereq: ['ds-process'],
    glance: ['Venn: CS + Math/Stats + Domain expertise', 'Pipeline: raw → processed → clean → EDA/model → communicate → decision', 'Domain knowledge = data কীভাবে তৈরি ও মাপা হয় জানা', 'Iris: 150 sample, 4 feature, 3 class'],
  },
  // Week 3
  {
    id: 'stats-basics', week: 'w3', slug: 'statistics-basics', title: 'Statistics, Population আর Sample', kicker: 'Statistics 101',
    summary: 'পুরো দল (population) না মেপে ছোট একটা representative অংশ (sample) দেখে সিদ্ধান্ত নেওয়া।',
    mins: 5, pri: 'mid',
    glance: ['Descriptive = data বর্ণনা করা', 'Inferential = sample দেখে population নিয়ে সিদ্ধান্ত', 'Census = population এর সবার data', 'Sample representative না হলে result biased'],
  },
  {
    id: 'sampling', week: 'w3', slug: 'sampling-methods', title: 'Sampling Methods: ৮টা উপায়', kicker: 'Sampling',
    summary: 'Probability (random mechanism) আর non-probability (researcher এর বিচার) — দুই পরিবারের ৮টা sampling method।',
    mins: 9, pri: 'high', lab: 'sampling-sim', prereq: ['stats-basics'],
    glance: ['Simple random: সবার সমান সুযোগ (lottery)', 'Stratified: একরকম group এ ভাগ করে প্রতিটা থেকে নেওয়া', 'Cluster: এলাকা ধরে পুরো cluster নেওয়া', 'Systematic: প্রতি k-তম জন', 'Snowball: একজন আরেকজনকে refer করে', 'Judgmental, convenience, quota: non-probability'],
  },
  {
    id: 'central-tendency', week: 'w3', slug: 'central-tendency', title: 'Mean, Median, Mode', kicker: 'Central tendency',
    summary: 'Data এর "মাঝখান" মাপার তিন উপায়; outlier থাকলে mean সরে যায়, median প্রায় নড়ে না।',
    mins: 6, pri: 'high', lab: 'mean-median', prereq: ['stats-basics'],
    formulas: [{ label: 'Mean', tex: '\\bar{x}=\\dfrac{\\sum x}{n}' }, { label: 'Median position', tex: '\\left(\\tfrac{n+1}{2}\\right)^{\\text{th}}' }],
    glance: ['Mean = যোগফল ÷ সংখ্যা', 'Median = সাজালে ঠিক মাঝের মান', 'Mode = সবচেয়ে বেশিবার আসা মান', 'Outlier mean কে টানে, median কে না'],
  },
  {
    id: 'quartiles', week: 'w3', slug: 'spread-and-quartiles', title: 'Range, Quartile, IQR আর Box Plot', kicker: 'Data spread',
    summary: 'Data কতটা ছড়ানো: range = max − min, quartile data কে ৪ ভাগ করে, IQR = Q3 − Q1।',
    mins: 6, pri: 'high', lab: 'iqr-boxplot', prereq: ['central-tendency'],
    formulas: [{ label: 'Range', tex: '\\text{Range}=\\text{Max}-\\text{Min}' }, { label: 'IQR', tex: 'IQR=Q_3-Q_1' }],
    glance: ['Range = Max − Min', 'Q1, Q2 (= median), Q3 data কে ৪ ভাগে ভাগ করে', 'IQR = Q3 − Q1 = মাঝের 50% data এর বিস্তার', 'Box plot: min, Q1, median, Q3, max, outlier এক ছবিতে'],
  },
  {
    id: 'outliers', week: 'w3', slug: 'outliers-iqr', title: 'IQR Method দিয়ে Outlier ধরা', kicker: 'Outliers',
    summary: 'Q1 − 1.5×IQR এর নিচে বা Q3 + 1.5×IQR এর উপরে কোনো মান থাকলে সেটা outlier।',
    mins: 8, pri: 'high', lab: 'iqr-boxplot', prereq: ['quartiles'],
    formulas: [{ label: 'Lower fence', tex: 'Q_1-1.5\\times IQR' }, { label: 'Upper fence', tex: 'Q_3+1.5\\times IQR' }],
    glance: ['১. Data sort করো', '২. Q1 আর Q3 বের করো', '৩. IQR = Q3 − Q1', '৪. Fence: Q1 − 1.5·IQR আর Q3 + 1.5·IQR', '৫. Fence এর বাইরের মান = outlier'],
  },
  // Week 4
  {
    id: 'variance', week: 'w4', slug: 'variance-and-sd', title: 'Variance আর Standard Deviation', kicker: 'Variation',
    summary: 'প্রতিটা মান গড় থেকে গড়ে কতটা দূরে; SD ছোট মানে data stable, বড় মানে ওঠানামা বেশি।',
    mins: 8, pri: 'high', lab: 'variance-table', prereq: ['central-tendency'],
    formulas: [
      { label: 'Population variance', tex: '\\sigma^2=\\dfrac{\\sum(x-\\mu)^2}{N}' },
      { label: 'Sample variance', tex: 's^2=\\dfrac{\\sum(x-\\bar{x})^2}{n-1}' },
      { label: 'Coefficient of variation', tex: 'CV=\\dfrac{s}{\\bar{x}}\\times 100\\%' },
    ],
    glance: ['Variance = (x − mean)² এর গড়', 'Population: ÷ N, sample: ÷ (n − 1)', 'SD = √variance, unit data এর মতই', 'গড় আলাদা হলে তুলনার জন্য CV'],
  },
  {
    id: 'correlation', week: 'w4', slug: 'covariance-and-correlation', title: 'Covariance আর Correlation', kicker: 'Relationships',
    summary: 'দুইটা variable একসাথে কীভাবে বাড়ে-কমে; correlation r সবসময় −1 থেকে +1 এর মধ্যে থাকে।',
    mins: 8, pri: 'high', lab: 'correlation', prereq: ['variance'],
    formulas: [
      { label: 'Sample covariance', tex: '\\text{Cov}(X,Y)=\\dfrac{\\sum(x-\\bar{x})(y-\\bar{y})}{n-1}' },
      { label: 'Pearson r', tex: 'r=\\dfrac{\\sum(x-\\bar{x})(y-\\bar{y})}{\\sqrt{\\sum(x-\\bar{x})^2\\,\\sum(y-\\bar{y})^2}}' },
    ],
    glance: ['Covariance এর sign দিক বলে, কিন্তু কোনো scale নেই', 'r সবসময় −1 থেকে +1', 'r ≈ 0 মানে linear সম্পর্ক নেই', 'Correlation ≠ causation'],
  },
  {
    id: 'normal', week: 'w4', slug: 'normal-distribution', title: 'Normal Distribution আর 68–95–99.7', kicker: 'The bell curve',
    summary: 'ঘণ্টার মত দুই পাশে সমান curve; mean ± 1, 2, 3 SD এর মধ্যে যথাক্রমে 68%, 95%, 99.7% data থাকে।',
    mins: 5, pri: 'mid', lab: 'shape', prereq: ['variance'],
    formulas: [{ label: 'Empirical rule', tex: '\\mu\\pm1\\sigma\\to68\\%,\\;\\mu\\pm2\\sigma\\to95\\%,\\;\\mu\\pm3\\sigma\\to99.7\\%' }],
    glance: ['Bell-shaped আর symmetric', 'Mean = Median = Mode, ঠিক মাঝখানে', '±1 SD → 68%, ±2 SD → 95%, ±3 SD → 99.7%'],
  },
  {
    id: 'shape', week: 'w4', slug: 'skewness-and-kurtosis', title: 'Skewness আর Kurtosis', kicker: 'Shape of data',
    summary: 'Skewness = curve কোন দিকে লম্বা লেজ টানছে; kurtosis = চূড়া কতটা সরু আর লেজ কতটা ভারী।',
    mins: 7, pri: 'high', lab: 'shape', prereq: ['normal', 'central-tendency'],
    formulas: [{ label: "Pearson's skewness", tex: 'Sk=\\dfrac{3(\\bar{x}-\\text{Median})}{s}' }],
    glance: ['লম্বা লেজ ডানে → positive skew (mean > median)', 'লম্বা লেজ বামে → negative skew (mean < median)', 'Leptokurtic = সরু চূড়া, ভারী লেজ', 'Platykurtic = চ্যাপ্টা চূড়া, হালকা লেজ'],
  },
  // Week 5
  {
    id: 'inference', week: 'w5', slug: 'inference-and-estimation', title: 'Inference আর Estimation', kicker: 'Sample to population',
    summary: 'Sample এর statistic দিয়ে population এর parameter আন্দাজ করা — এক সংখ্যায় (point) বা একটা range এ (interval)।',
    mins: 6, pri: 'mid', prereq: ['stats-basics', 'normal'],
    formulas: [{ label: 'Interval estimate', tex: '\\bar{x}\\pm z\\cdot\\dfrac{\\sigma}{\\sqrt{n}}' }],
    glance: ['Statistic (x̄, s) আসে sample থেকে', 'Parameter (μ, σ) হলো population এর আসল মান', 'Point estimate = একটা মান; interval = point ± margin', 'σ জানা → z; σ অজানা → t'],
  },
  {
    id: 'hypothesis', week: 'w5', slug: 'hypothesis-testing', title: 'Hypothesis Testing আর p-value', kicker: 'Testing a claim',
    summary: 'H0 কে সত্য ধরে দেখি data কতটা অস্বাভাবিক; p-value < α হলে H0 reject করি।',
    mins: 9, pri: 'high', lab: 'hypothesis', prereq: ['inference'],
    formulas: [{ label: 'Decision rule', tex: 'p<\\alpha\\;\\Rightarrow\\;\\text{reject }H_0' }],
    glance: ['H0 তে থাকে =, ≤, ≥; Ha তে ≠, <, >', 'p < α → reject H0', 'p ≥ α → fail to reject (accept বলা যায় না)', 'Type I = সত্য H0 reject; Type II = মিথ্যা H0 রেখে দেওয়া', '≠ হলে two-tail; < বা > হলে one-tail'],
  },
  {
    id: 'z-t-tests', week: 'w5', slug: 'z-and-t-tests', title: 'z-test আর t-test: হাতে-কলমে', kicker: 'Worked tests',
    summary: 'σ জানা থাকলে z = (x̄ − μ)/(σ/√n), না জানলে t = (x̄ − μ)/(s/√n) আর df = n − 1।',
    mins: 10, pri: 'high', lab: 'hypothesis', prereq: ['hypothesis'],
    formulas: [
      { label: 'z statistic', tex: 'z=\\dfrac{\\bar{x}-\\mu}{\\sigma/\\sqrt{n}}' },
      { label: 't statistic', tex: 't=\\dfrac{\\bar{x}-\\mu}{s/\\sqrt{n}},\\;df=n-1' },
    ],
    glance: ['৪ ধাপ: hypothesis → distribution → p-value → decision', 'σ known → z; σ unknown → t', 'Two-tail হলে এক পাশের p কে দ্বিগুণ করো', 'শেষে decision টা বাস্তব ভাষায় লেখো'],
  },
  {
    id: 'bayes', week: 'w5', slug: 'probability-and-bayes', title: 'Probability আর Bayes Theorem', kicker: 'Probability',
    summary: 'নতুন তথ্য (B) পেলে কোনো ঘটনার (A) probability কীভাবে update হয়: P(A|B) = P(A)·P(B|A)/P(B)।',
    mins: 7, pri: 'mid', lab: 'bayes',
    formulas: [{ label: 'Bayes theorem', tex: 'P(A\\mid B)=\\dfrac{P(A)\\,P(B\\mid A)}{P(B)}' }],
    glance: ['Probability = favorable ÷ total, মান 0 থেকে 1', 'Experiment, outcome, sample space, event', 'P(A|B) = P(A)·P(B|A) / P(B)', 'মেঘ দেখলেও বৃষ্টির chance মাত্র 12.5%'],
  },
  // Bonus
  {
    id: 'naive-bayes', week: 'bonus', slug: 'naive-bayes', title: 'Naive Bayes Classifier', kicker: 'Bonus · Classification',
    summary: 'Bayes theorem + "সব feature একে অপরের থেকে স্বাধীন" ধরে নিয়ে কোনো item কোন class এর সেটা predict করা।',
    mins: 9, pri: 'low', prereq: ['bayes'],
    formulas: [{ label: 'Naive Bayes', tex: 'P(C\\mid x_1,\\dots,x_n)\\propto P(C)\\prod_i P(x_i\\mid C)' }],
    glance: ['Prior = প্রতিটা class কত শতাংশ', 'Likelihood = class এর ভেতরে feature কতবার আসে', 'Score = prior × সব likelihood এর গুণফল', 'যার score বড়, prediction সেটা'],
  },
  {
    id: 'regression', week: 'bonus', slug: 'linear-regression', title: 'Simple Linear Regression', kicker: 'Bonus · Prediction',
    summary: 'Data এর মধ্য দিয়ে সবচেয়ে মানানসই সরল রেখা y = a + bx টেনে নতুন x এর জন্য y predict করা।',
    mins: 6, pri: 'low', prereq: ['correlation'],
    formulas: [
      { label: 'Slope', tex: 'b=\\dfrac{\\sum(x-\\bar{x})(y-\\bar{y})}{\\sum(x-\\bar{x})^2}' },
      { label: 'Intercept', tex: 'a=\\bar{y}-b\\,\\bar{x}' },
    ],
    glance: ['Line: ŷ = a + b·x', 'b = slope: x এক বাড়লে y কত বাড়ে', 'a = intercept: x = 0 হলে y', 'Least squares: error² এর যোগফল সবচেয়ে কম'],
  },
  {
    id: 'pandas', week: 'bonus', slug: 'pandas-basics', title: 'Pandas এর একদম বেসিক', kicker: 'Bonus · Python',
    summary: 'Dictionary থেকে DataFrame বানানো, head() দিয়ে প্রথম কয়েক row দেখা, আর mean() দিয়ে গড় বের করা।',
    mins: 4, pri: 'low',
    glance: ['import pandas as pd', 'pd.DataFrame(dict) → table', 'df.head(2) → প্রথম ২ row', "df['Salary'].mean() → গড়"],
  },
];

export const LABS: Lab[] = [
  { id: 'process-sorter', week: 'w1', title: 'Process Sorter', question: 'Data science এর ধাপগুলো কোন order এ আসে?', summary: 'এলোমেলো step card গুলো সঠিক order এ সাজাও, প্রতিটার কেন-টাও দেখো।', topics: ['ds-process'] },
  { id: 'scale-classifier', week: 'w2', title: 'Scale Classifier', question: 'এই variable টা কোন type, কোন scale?', summary: 'প্রতিটা variable কে qualitative/quantitative আর N-O-I-R এ বসাও, সাথে সাথে feedback।', topics: ['variables', 'scales'] },
  { id: 'sampling-sim', week: 'w3', title: 'Sampling Simulator', question: 'কোন method এ sample কতটা representative হয়?', summary: '১২০ জনের একটা population থেকে ৯টা method এ sample নাও, চোখের সামনে।', topics: ['sampling'] },
  { id: 'mean-median', week: 'w3', title: 'Mean vs Median', question: 'একটা outlier আসলে mean কেন সরে যায়?', summary: 'একটা মান টেনে বড়-ছোট করো — mean দৌড়ায়, median প্রায় দাঁড়িয়ে থাকে।', topics: ['central-tendency'] },
  { id: 'iqr-boxplot', week: 'w3', title: 'IQR + Box Plot', question: 'এই data তে কোনো outlier আছে?', summary: 'যেকোনো data দাও — sort, Q1, Q3, fence, outlier আর box plot, পুরো exam working সহ।', topics: ['quartiles', 'outliers'] },
  { id: 'variance-table', week: 'w4', title: 'Variance & SD Table', question: 'কোনটা বেশি stable?', summary: 'একাধিক data set এর variance, SD আর CV — পুরো working table সহ পাশাপাশি তুলনা।', topics: ['variance'] },
  { id: 'correlation', week: 'w4', title: 'Correlation Lab', question: 'দুইটা variable কতটা একসাথে চলে?', summary: 'Scatter plot, প্রতিটা point এর contribution, আর r এর পুরো হিসাব।', topics: ['correlation'] },
  { id: 'shape', week: 'w4', title: 'Shape Lab', question: 'Skew হলে mean, median, mode কোথায় যায়?', summary: 'Slider দিয়ে curve বাঁকাও, kurtosis বদলাও, 68–95–99.7 rule দেখো।', topics: ['normal', 'shape'] },
  { id: 'hypothesis', week: 'w5', title: 'Hypothesis Stepper', question: 'এই claim টা reject করব কি না?', summary: 'z না t, test statistic, p-value, decision — exam এর ৪ step format এ।', topics: ['hypothesis', 'z-t-tests'] },
  { id: 'bayes', week: 'w5', title: 'Bayes Grid', question: 'নতুন তথ্য পেলে probability কতটা বদলায়?', summary: '১০০টা দিনের grid দিয়ে Bayes theorem চোখে দেখা।', topics: ['bayes'] },
];

export function getWeek(id: string): Week {
  const w = WEEKS.find((x) => x.id === id);
  if (!w) throw new Error(`Unknown week: ${id}`);
  return w;
}

export function getTopic(id: string): Topic {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown topic id: "${id}"`);
  return t;
}

export function getLab(id: string): Lab {
  const l = LABS.find((x) => x.id === id);
  if (!l) throw new Error(`Unknown lab id: "${id}"`);
  return l;
}

export const topicUrl = (t: Topic) => `/${t.week}/${t.slug}/`;
export const labUrl = (id: string) => `/labs/${getLab(id).id}/`;
export const weekTopics = (w: string) => TOPICS.filter((t) => t.week === w);

export function neighbors(id: string) {
  const i = TOPICS.findIndex((t) => t.id === id);
  return { prev: i > 0 ? TOPICS[i - 1] : undefined, next: i < TOPICS.length - 1 ? TOPICS[i + 1] : undefined };
}

export const PRI_LABEL: Record<Priority, string> = { high: '●●● High', mid: '●●○ Medium', low: '●○○ Low' };
