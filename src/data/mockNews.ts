export type Category =
  | "politics"
  | "business"
  | "sports"
  | "technology"
  | "entertainment"
  | "world"
  | "health";

export interface Article {
  id: string;
  slug: string;
  title: string;
  nepaliTitle?: string;
  excerpt: string;
  body: string[];
  category: Category;
  author: string;
  publishedAt: string;
  readTime: number;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  featured?: boolean;
  breaking?: boolean;
  source?: string;
}

export const categories: { label: string; value: Category }[] = [
  { label: "Politics", value: "politics" },
  { label: "Business", value: "business" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
  { label: "Entertainment", value: "entertainment" },
  { label: "World", value: "world" },
  { label: "Health", value: "health" },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "nepal-budget-2081-record-allocation-education",
    title: "Nepal's 2081 Budget Allocates Record Funds for Education — But Will It Reach Classrooms?",
    nepaliTitle: "नेपालको २०८१ बजेटमा शिक्षाका लागि रेकर्ड रकम",
    excerpt:
      "The government has announced a 35% increase in the education budget for fiscal year 2081/82, but experts warn that without structural reforms, the money risks being swallowed by bureaucracy.",
    body: [
      "Kathmandu — The Nepali government unveiled its biggest-ever education budget on Thursday, allocating NPR 180 billion — a 35% jump from last year — for the 2081/82 fiscal year. Finance Minister Bishnu Paudel framed it as a 'generational investment' in Nepal's human capital.",
      "But the NepaliWave angle cuts through the celebrations: Nepal has heard these promises before. Since 2070, education allocations have grown by over 200%, yet learning outcomes measured by national assessments have barely budged. The classrooms in Humla still lack teachers. The textbooks in Rautahat still arrive three months late.",
      "Independent economist Dr. Sushma Acharya told NepaliWave that the real question isn't the headline number. 'What matters is the expenditure absorption rate. Last year, the education ministry spent only 62% of its allocated budget. Where does the rest go? That's the story nobody is telling.'",
      "The budget does include some structural promises — a new teacher accountability framework, digital learning infrastructure for 5,000 schools, and a merit-based scholarship overhaul that eliminates the quota system that critics say was being gamed.",
      "Youth advocacy group YouthWave Nepal, which NepaliWave has covered since its founding, called the digital school initiative 'the most promising line item in years' — but noted that internet connectivity in hill and mountain districts remains below 30%.",
      "NepaliWave will be tracking the budget's actual disbursement quarter by quarter. Subscribe to our accountability tracker below.",
    ],
    category: "politics",
    author: "NepaliWave Desk",
    publishedAt: "2026-04-18T08:00:00Z",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
    imageAlt: "Nepal parliament building",
    tags: ["budget", "education", "government", "2081"],
    featured: true,
    breaking: false,
    source: "NepaliWave Original",
  },
  {
    id: "2",
    slug: "everest-record-permits-2026-season-overtourism",
    title: "Everest Issues Record 478 Permits This Season. Is the Mountain Paying the Price?",
    excerpt:
      "This spring season has the highest number of Everest climbing permits ever issued, reigniting a fierce debate about overtourism, safety, and who really benefits from the mountain's allure.",
    body: [
      "Solukhumbu — The Department of Tourism has issued 478 climbing permits for Mount Everest this spring season, smashing the previous record of 463 set in 2023. At NPR 1.1 million per permit, it puts over NPR 526 million into government coffers before a single boot hits the South Col.",
      "The NepaliWave take: the permit revenue is a fraction of what Everest actually generates. Foreign guiding companies, luxury lodges, and gear brands capture the lion's share. Local Sherpa communities — who carry the real risk — often see as little as 15-20% of the total economic value the mountain creates.",
      "This season has already seen two weather-window pile-ups at the Hillary Step that produced images circulated globally — hundreds of climbers queuing in the death zone. Three climbers have died so far, all on summit day, all in the summit queue.",
      "Nepal Mountaineering Association president Nima Sherpa is pushing for a hard cap of 350 permits per season, a proposal that has been on the table since 2019 and has been blocked each time by tourism ministry officials citing revenue concerns.",
      "Climber and environmentalist Dawa Yangzum Sherpa told NepaliWave: 'The mountain doesn't care about our revenue projections. But our decisions will determine whether Everest is still worth climbing in 2040.'",
    ],
    category: "world",
    author: "Priya Tamang",
    publishedAt: "2026-04-18T06:30:00Z",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Mount Everest summit in clear sky",
    tags: ["everest", "tourism", "environment", "mountaineering"],
    featured: false,
  },
  {
    id: "3",
    slug: "nepal-startup-ecosystem-dollar-50m-milestone",
    title: "Nepal's Startups Cross $50M in Total Funding — A Milestone and a Warning",
    excerpt:
      "Nepali startups collectively raised over $50 million for the first time, but most of the capital is concentrated in three Kathmandu-based fintechs, leaving the rest of the ecosystem starved.",
    body: [
      "Kathmandu — Nepal's startup ecosystem has crossed a symbolic threshold: total cumulative funding for Nepali companies now stands at $53 million, according to data compiled by NepaliWave from CAN Federation and Startup Nepal reports.",
      "The growth story is real. Fintech, agritech, and e-commerce have all attracted serious capital over the past three years, and the government's Startup Nepal programme has issued over 700 registrations.",
      "But the NepaliWave data cut reveals a concentration problem: three fintech startups account for 61% of all funding. The rest — over 700 registered startups — share the remaining 39%. And of those three dominant fintechs, all three are headquartered in Kathmandu, all three have founders with overseas education backgrounds, and all three have international VCs on their cap tables.",
      "This isn't a criticism of those companies' success. It's a structural observation: the ecosystem is mimicking a pattern seen across South Asia where capital follows familiarity rather than opportunity.",
      "Pokhara-based agritech founder Laxmi Gurung, whose cold-chain logistics startup has been operating profitably for two years without any external funding, told NepaliWave: 'No investor has visited us in person. They see our location and assume we can't scale. We already operate in five districts.'",
    ],
    category: "business",
    author: "Rajesh Shrestha",
    publishedAt: "2026-04-17T14:00:00Z",
    readTime: 7,
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    imageAlt: "Startup team working in Kathmandu office",
    tags: ["startup", "funding", "fintech", "business"],
    featured: false,
  },
  {
    id: "4",
    slug: "nepal-cricket-asia-cup-qualifier-win",
    title: "Nepal Cricket Stuns UAE in Asia Cup Qualifier — Can the Wave Carry Them Through?",
    excerpt:
      "Nepal's national cricket team produced a commanding 7-wicket victory over UAE, but the real test comes against Afghanistan in three days.",
    body: [
      "Dubai — Nepal's cricket team continued their impressive Asia Cup Qualifier campaign with a dominant 7-wicket win over UAE, chasing down a target of 187 with 14 balls to spare.",
      "Opener Kushal Malla top-scored with 87 off 61 balls, playing an innings that reminded observers of why he was named ICC's Emerging Player of the Year. Sandeep Lamichhane, back from his legal battles and bowling with visible hunger, claimed 3 wickets for 28 runs.",
      "The NepaliWave cricket desk notes the atmosphere in Nepal: search trends for 'Nepal cricket' have spiked 340% this week, and #NepaliCricket is trending across all platforms. The national team has never qualified for the Asia Cup main event — this tournament is the closest they've come.",
      "Coach Monty Desai was measured in his post-match assessment: 'UAE was a good win. Afghanistan is a different conversation. We respect what they've built. We're preparing for a 50-over battle.'",
      "Afghanistan have already qualified for the main event from Group A. Sunday's match — technically inconsequential for Afghanistan — is do-or-die for Nepal. If Nepal win, they make history.",
    ],
    category: "sports",
    author: "Aakash Basnet",
    publishedAt: "2026-04-18T10:15:00Z",
    readTime: 4,
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19212a4b423e?w=800&q=80",
    imageAlt: "Cricket match in progress",
    tags: ["cricket", "nepal cricket", "asia cup", "sports"],
    featured: false,
    breaking: true,
  },
  {
    id: "5",
    slug: "ai-nepali-language-model-tribhuvan-university",
    title: "Tribhuvan University Researchers Build Nepal's First Large Language Model for Nepali",
    excerpt:
      "A team at TU's Department of Computer Science and Information Technology has trained a 7-billion parameter model on Nepali text — a potential turning point for digital inclusion.",
    body: [
      "Kathmandu — In a quiet lab at Tribhuvan University's Kirtipur campus, a team of eight researchers has spent 18 months building something that could change how 30 million Nepali speakers interact with technology.",
      "They've named it NepalaLM — a 7-billion parameter large language model trained on over 40GB of Nepali text including news, literature, legal documents, and social media. It runs entirely in Devanagari script and handles the grammatical complexity of Nepali — including its tense-heavy verb system — significantly better than any existing multilingual model.",
      "NepaliWave sat with lead researcher Dr. Bikash Poudel for a hands-on demonstration. The model answered factual questions about Nepali law, wrote grammatically correct formal letters, and — most impressively — recognised and correctly handled the distinct Nepali used in the Terai versus the hills.",
      "The implications go beyond convenience. Nepal's legal system, healthcare records, and government communications operate overwhelmingly in Nepali. An effective Nepali LLM could power court document analysis, medical record summarisation, and agricultural advisory systems that actually work for farmers who've never typed in English.",
      "The team is releasing NepalaLM under an open licence next month. Dr. Poudel told NepaliWave: 'We don't want this locked behind a corporate API. This belongs to the Nepali people.'",
    ],
    category: "technology",
    author: "Sita Karki",
    publishedAt: "2026-04-17T09:00:00Z",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    imageAlt: "AI technology and neural network visualization",
    tags: ["AI", "technology", "nepali language", "research", "TU"],
    featured: false,
  },
  {
    id: "6",
    slug: "nepali-film-kagbeni-2-box-office-record",
    title: "Kagbeni 2 Breaks Nepali Box Office Records in Opening Weekend",
    excerpt:
      "The long-awaited sequel to the cult classic collected NPR 4.2 crore in its opening weekend, the highest-ever opening for a Nepali film.",
    body: [
      "Kathmandu — Kagbeni 2, director Bhusan Dahal's sequel to his 2008 psychological thriller, collected NPR 4.2 crore (NPR 42 million) in its opening weekend, the highest opening weekend gross in Nepali cinema history.",
      "The original Kagbeni — shot in the remote Upper Mustang region — became a cult classic for its atmospheric storytelling and its uncompromising refusal to explain its own mythology. Eighteen years later, the sequel has generated the kind of anticipation rarely seen in the Nepali film industry.",
      "NepaliWave film critic Anjali Thapa called it 'the most technically accomplished Nepali film ever made. Dahal has learned from 18 years of waiting — every frame has weight.' She awarded it 4.5 out of 5.",
      "The film stars Dayahang Rai and introduces Pooja Sharma in a role that early audiences are calling career-defining. It was shot primarily in Mustang and Kathmandu, with a budget of NPR 8 crore — making it one of the most expensive Nepali productions ever.",
      "The box office success comes at a crucial moment for the Nepali film industry, which has struggled to compete with Bollywood and Hollywood releases for cinema screens. Industry insiders hope Kagbeni 2 signals a new era.",
    ],
    category: "entertainment",
    author: "Anjali Thapa",
    publishedAt: "2026-04-17T16:00:00Z",
    readTime: 4,
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    imageAlt: "Film reel and cinema seats",
    tags: ["nepali cinema", "film", "entertainment", "box office"],
    featured: false,
  },
  {
    id: "7",
    slug: "dengue-fever-kathmandu-warning-2026",
    title: "Health Ministry Issues Dengue Alert for Kathmandu Valley as Cases Triple",
    excerpt:
      "Cases of dengue fever in the Kathmandu Valley have tripled compared to the same period last year, prompting an emergency public health advisory.",
    body: [
      "Kathmandu — The Ministry of Health and Population issued a public health alert on Friday after dengue fever cases in the Kathmandu Valley reached 847 confirmed cases in the first quarter of 2026 — triple the 283 cases recorded in the same period in 2025.",
      "Doctors at Bir Hospital, Patan Hospital, and Teaching Hospital report full dengue wards and growing pressure on blood platelet supplies. Dengue's characteristic thrombocytopenia — the dangerous drop in blood platelets — has required transfusions in 12% of admitted cases this year, up from 7% last year.",
      "Public health expert Dr. Aruna Singh told NepaliWave that the outbreak reflects two intersecting failures: urbanisation without drainage infrastructure, and years of cuts to the vector control programme. 'Aedes aegypti mosquitoes breed in clean, stagnant water. Urban Kathmandu has created the perfect environment — construction sites, blocked drains, water storage on rooftops.'",
      "The NepaliWave public health desk has been tracking this for six weeks. We first flagged the unusual case spike in our March 7 data dispatch — three weeks before the Ministry issued any public guidance.",
      "Symptoms: high fever, severe headache, pain behind the eyes, joint and muscle pain, rash. If you suspect dengue, seek care immediately. Do not take ibuprofen or aspirin — paracetamol only. Stay hydrated.",
    ],
    category: "health",
    author: "Dr. Manisha Koirala",
    publishedAt: "2026-04-18T07:45:00Z",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    imageAlt: "Medical health alert concept",
    tags: ["dengue", "health", "kathmandu", "public health", "alert"],
    featured: false,
    breaking: true,
  },
  {
    id: "8",
    slug: "remittance-nepal-2025-record-11-billion",
    title: "Nepal's Remittance Crosses $11 Billion — The Economy That Dare Not Name Itself",
    excerpt:
      "Remittances now account for 27% of Nepal's GDP. This is not a development success story. It is a structural dependency that successive governments have mistaken for one.",
    body: [
      "Kathmandu — Nepal received $11.2 billion in remittances in the fiscal year 2081/82, a new record, according to data released by Nepal Rastra Bank. It represents 27.4% of the country's GDP — one of the highest ratios anywhere in the world.",
      "The official narrative frames this as resilience. The NepaliWave framing: it is a quiet catastrophe being monetised as a success.",
      "Consider what $11 billion in remittance represents in human terms: approximately 3.7 million Nepalis working abroad, mostly in Gulf states and Malaysia, in conditions that range from difficult to dangerous. The money they send home keeps the economy liquid. It pays for school fees, hospital bills, and home construction. It is the real social safety net — not the government, not any institution.",
      "Economist Dr. Devendra Karki has spent a decade studying what he calls 'remittance anesthesia' — the way a steady flow of foreign money reduces political pressure for domestic job creation. 'Every NPR 1,000 that arrives from Qatar is a reason the government doesn't need to create a job in Dang or Surkhet.'",
      "The data shows the youngest migrants are getting younger. The average age of first-time labour migrants fell from 26.4 years in 2015 to 22.1 years in 2025. Nepal is exporting its 20s.",
    ],
    category: "business",
    author: "NepaliWave Analysis Desk",
    publishedAt: "2026-04-16T11:00:00Z",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80",
    imageAlt: "Money transfer and remittance concept",
    tags: ["remittance", "economy", "migration", "GDP", "analysis"],
    featured: false,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getBreakingNews(): Article[] {
  return articles.filter((a) => a.breaking);
}

export function getRecentArticles(exclude?: string, limit = 6): Article[] {
  return articles
    .filter((a) => a.id !== exclude)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return formatDate(dateString);
}
