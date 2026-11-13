// Site content. Edit here; every page reads from this file.

export interface ClientWork {
  slug: string;
  client: string;
  sector: string;
  kind: string;
  url: string;
  domain: string;
  summary: string;
  image?: string;
  /** Pixel height of the (1600px wide) capture; taller than 1000 means it scrolls inside its frame. */
  imageHeight?: number;
  /** Short label over the screenshot, for when the picture needs explaining. */
  imageNote?: string;
  year?: string;
  /** Private work: left out of the résumé's public list. Without an image it shows as a text tile. */
  private?: boolean;
  tileLabel?: string;
}

export interface Service {
  title: string;
  body: string;
  example: { label: string; href: string };
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  /** One line for the home page; omitted roles only appear on the résumé. */
  summary?: string;
  note?: string;
  highlights: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Shorter line used on the home page cards. */
  short?: string;
  /** Position in the home page "Projects" section (1-based). */
  homeOrder?: number;
  featured?: boolean;
  stat?: { value: string; label: string };
  note?: "flier";
  technologies: string[];
  features: string[];
  lesson?: string;
  demo?: string;
  github?: string;
  pypi?: string;
}

export interface Author {
  name: string;
  url?: string;
}

export interface Paper {
  slug: string;
  title: string;
  venue: string;
  venueShort: string;
  kind: string;
  year: string;
  status: string;
  url: string;
  readOn: string;
  abstract: string;
  highlights: string[];
  authors: Author[];
  tags: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export const profile = {
  name: "Aditya Mer",
  role: "Full-stack and AI developer",
  resumeTitle: "Full-stack Developer & ML Engineer",
  location: "Mumbai, India",
  intro: "Full-stack and AI developer in Mumbai. I build websites, online stores and internal tools that teams run themselves.",
  bio: "I build software that teams use every day,",
  bioMuted: "with a background in AI research.",
  email: "adityamer.work@gmail.com",
  github: "https://github.com/aditya190803",
  linkedin: "https://www.linkedin.com/in/adityamer/",
  resumePdf: "/Aditya_Mer_Resume.pdf",
  url: "https://www.adityamer.dev",
  availability: "Taking on new projects",
  current: {
    title: "Senior Associate, IT Team",
    company: "Shah Kapadia & Associates",
    url: "https://theska.in",
  },
} as const;

export const flier = {
  name: "Flier",
  domain: "sendflier.tech",
  url: "https://sendflier.tech",
  github: "https://github.com/Aditya190803/EchoMail",
  usedBy: "Tata Memorial Hospital",
  tagline: "Personal emails from a spreadsheet, sent from your own Gmail.",
  summary: "Flier is a mail merge product I designed and built from start to finish. Upload a spreadsheet, write one message, and every recipient gets an email addressed to them, sent through Google's official Gmail API. It is in use at Tata Memorial Hospital.",
  image: "/work/flier-tall.webp",
  imageMobile: "/work/flier-mobile-tall.webp",
} as const;

export const clientWork: ClientWork[] = [
  {
    slug: "iascc",
    client: "IASCC",
    sector: "Cancer-care nonprofit",
    kind: "Website and custom CMS",
    url: "https://iascc.in",
    domain: "iascc.in",
    summary: "India's national affiliate of MASCC. The team publishes events, news and research grants themselves through the CMS I built.",
    image: "/work/iascc-tall.webp",
    imageHeight: 2600,
    year: "2025",
  },
  {
    slug: "younique",
    client: "Younique India",
    sector: "Jewellery retail",
    kind: "Online store",
    url: "https://www.youniqueindia.co.in",
    domain: "youniqueindia.co.in",
    summary: "A jewellery store that ships across India, with collections, customer sign-in and order tracking.",
    image: "/work/younique-tall.webp",
    imageHeight: 1500,
  },
  {
    slug: "ska",
    client: "Shah Kapadia & Associates",
    sector: "Chartered accountants",
    kind: "Freelance work",
    url: "https://theska.in",
    domain: "theska.in",
    summary: "Started in April 2026 and led to a full-time role in the firm's IT team.",
    image: "/work/ska-tall.webp",
    imageHeight: 2600,
    imageNote: "Their site. My work is internal.",
    private: true,
    tileLabel: "SKA",
  },
];

export const services: Service[] = [
  {
    title: "Websites for organisations and firms",
    body: "Clear, credible sites your team can update without calling me.",
    example: {
      label: "IASCC",
      href: "/#work",
    },
  },
  {
    title: "Online stores",
    body: "Product pages that sell, a simple checkout, and an admin that fits how you run the shop.",
    example: {
      label: "Younique India",
      href: "/#work",
    },
  },
  {
    title: "Web apps and internal tools",
    body: "Tools that replace spreadsheets and copy-pasting.",
    example: {
      label: "Flier",
      href: "/#top",
    },
  },
  {
    title: "AI and data work",
    body: "Assistants over your documents, data pulled from PDFs and forms, and dashboards. I'll tell you when AI isn't the answer.",
    example: {
      label: "FastWrite",
      href: "/projects#fastwrite",
    },
  },
];

export const steps = [
  {
    title: "A short call",
    body: "Free, with no obligation. We talk through what you need.",
  },
  {
    title: "A written proposal",
    body: "Scope, timeline and a fixed quote.",
  },
  {
    title: "Build on a preview link",
    body: "You see progress every week.",
  },
  {
    title: "Launch and handover",
    body: "I train your team and stay on hand for fixes.",
  },
];

export const experience: Experience[] = [
  {
    role: "Senior Associate, IT Team",
    company: "Shah Kapadia & Associates",
    period: "Apr 2026 – present",
    location: "Mumbai, India",
    note: "Freelance from April 2026, full time from July 2026.",
    highlights: [],
  },
  {
    role: "Web Developer Intern",
    company: "IASCC",
    period: "June 2025 – Sept 2025",
    location: "Hybrid",
    highlights: [
      "Designed and developed IASCC's main website from scratch",
      "Built custom CMS for blogs, newsletters, and research publications",
      "Focused on performance optimization and UI/UX improvements",
    ],
    summary: "Designed and built IASCC's website from scratch, with a custom CMS for news, newsletters and research publications.",
  },
  {
    role: "Research Intern",
    company: "Society for Data Science",
    period: "May 2023 – May 2025",
    location: "Mumbai, India",
    highlights: [
      "Researched misinformation spread using advanced ML techniques",
      "Analyzed 21,000+ news articles for fake news patterns",
      "Developed ColBERT and SVM models for detection",
      "Contributed to IEEE conference paper publication",
    ],
    summary: "Analysed 21,000+ news articles and built misinformation detection models for an IEEE conference paper.",
  },
  {
    role: "Software Development Intern",
    company: "YANISA EXECUTION Pvt Ltd",
    period: "Sep 2023 – Dec 2023",
    location: "Mumbai, India",
    highlights: [
      "Built scalable web applications",
      "Developed a no code CRM for client management",
      "Collaborated on feature delivery and performance optimization",
    ],
  },
  {
    role: "Data Science & ML Intern",
    company: "YBI Foundation",
    period: "July 2023",
    location: "Remote",
    highlights: [
      "Developed ML models using Python, TensorFlow, and PyTorch",
      "Implemented data preprocessing pipelines for large datasets",
      "Applied regression and classification techniques",
    ],
  },
  {
    role: "Azure, Java, and Web Development Intern",
    company: "Claidroid Technologies Pvt Ltd",
    period: "Dec 2022 – Jan 2023",
    location: "Mumbai, India",
    highlights: [
      "Gained experience with Azure cloud services and Java",
      "Built library management app using Azure App Services",
      "Applied enterprise-grade software engineering principles",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Artificial Intelligence & Data Science",
    institution: "K. J. Somaiya Institute of Technology, Mumbai",
    period: "2021–2025",
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "Jai Hind College, Mumbai",
    period: "2019–2021",
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institution: "Chandaramji High School",
    period: "2009–2019",
  },
];

export const projects: Project[] = [
  {
    slug: "ats-system",
    title: "ATS System",
    category: "GenAI",
    description: "Streamlit app functioning as an ATS resume scanner, leveraging Google's Gemini AI to evaluate resumes against job descriptions.",
    short: "Scores a résumé against a job description and finds skill gaps.",
    homeOrder: 4,
    featured: true,
    technologies: ["Gemini AI", "Streamlit", "Python", "NLP"],
    features: [
      "AI-powered resume scanning",
      "Job description matching",
      "Skill gap identification",
      "ATS compatibility scoring",
    ],
    lesson: "Learned to leverage LLMs for structured data extraction from unstructured PDF resumes.",
    demo: "https://ats.adityamer.dev/",
    github: "https://github.com/Aditya190803/ATS-System",
  },
  {
    slug: "fastwrite",
    title: "FastWrite",
    category: "GenAI",
    description: "AI-powered Python module for documentation generation with intelligent code analysis and automated documentation creation.",
    short: "A Python package that writes code documentation with LLMs.",
    homeOrder: 1,
    stat: {
      value: "6,000+",
      label: "downloads on PyPI in its first month",
    },
    featured: true,
    technologies: ["Python", "AI", "PyPI", "LLMs"],
    features: [
      "Context-aware documentation generation",
      "Multiple LLM support (OpenAI, Groq, Gemini, etc.)",
      "BLEU score comparison for quality measurement",
    ],
    lesson: "Learned how to package and distribute Python modules on PyPI, and implemented a robust plugin system for supporting multiple LLM providers.",
    github: "https://github.com/R-G-KJSIT/FastWrite",
    pypi: "https://pypi.org/project/FastWrite/",
  },
  {
    slug: "echomail",
    title: "EchoMail",
    category: "Web",
    description: "Modern email marketing platform built with Next.js and TypeScript, integrating Gmail API to send personalized bulk emails with Gmail-like formatting and high deliverability.",
    note: "flier",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Gmail API", "React"],
    features: [
      "Upload CSVs with unlimited custom fields",
      "Auto-personalize messages with smart placeholders",
      "Craft beautiful emails with a rich text editor",
      "Send directly via Gmail API",
      "Bulk send with real-time progress tracking",
      "Preview every personalized message",
    ],
    lesson: "Mastered OAuth2 flow for Gmail API and optimized large CSV processing in the browser using Web Workers to prevent UI blocking.",
    demo: "https://echomail.adityamer.dev",
    github: "https://github.com/Aditya190803/EchoMail",
  },
  {
    slug: "mini-app-factory",
    title: "Mini App Factory",
    category: "Web",
    description: "AI static website generator for quickly creating mini apps/sites from prompts and templates.",
    featured: true,
    technologies: ["AI", "Web Development", "GenAI", "Templates"],
    features: [
      "Prompt-to-website generation",
      "Template-based quick starting",
      "AI-driven layout creation",
    ],
    lesson: "Learned how to dynamically render code structures from AI prompts.",
    demo: "https://mini-app-factory.adityamer.dev",
    github: "https://github.com/Aditya190803/mini-app-factory",
  },
  {
    slug: "verify-news",
    title: "Verify News",
    category: "Research",
    description: "Modern news verification platform built with React, TypeScript, LangSearch and Gemini AI to detect misinformation across text, images, audio, and video.",
    short: "Checks text, images, audio and video for misinformation.",
    homeOrder: 2,
    featured: true,
    technologies: ["React", "TypeScript", "LangSearch", "Gemini AI"],
    features: [
      "Multi-media misinformation detection",
      "Real-time fact-checking",
      "AI-powered content verification",
    ],
    lesson: "Implemented multi-modal AI pipelines and handled complex state management for real-time verification results.",
    demo: "https://verify-news.adityamer.dev",
    github: "https://github.com/Aditya190803/Verify-News",
  },
  {
    slug: "ai-research-agent",
    title: "AI Research Agent",
    category: "Research",
    description: "Developed an autonomous AI agent using CrewAI to perform automated literature reviews, synthesize findings, and generate research summaries.",
    short: "Runs literature reviews and writes research summaries with CrewAI.",
    homeOrder: 3,
    featured: true,
    technologies: ["CrewAI", "Python", "Autonomous Agents", "LLMs"],
    features: [
      "Automated literature reviews",
      "Findings synthesis",
      "Research summary generation",
      "Autonomous web action",
    ],
    lesson: "Mastered building autonomous multi-agent systems using CrewAI for reliable research execution.",
    demo: "https://ai-research-agent.adityamer.dev",
    github: "https://github.com/Aditya190803/AI-Research-Agent",
  },
  {
    slug: "osfm-net",
    title: "OSFM-Net",
    category: "Networking",
    description: "A powerful Python module designed for network system management, operating in both Server and Client modes.",
    technologies: ["Python", "Network Management", "Remote Desktop"],
    features: [
      "Dual-mode operation (Server and Client)",
      "Remote Desktop Access",
      "Application Management via Winget",
      "Centralized System Administration",
    ],
    lesson: "Deepened understanding of socket programming and remote system administration protocols in Python.",
    github: "https://github.com/Aditya190803/osfm/tree/osfm-net",
    pypi: "https://pypi.org/project/osfm/",
  },
  {
    slug: "chat-with-pdf",
    title: "Chat With PDF",
    category: "GenAI",
    description: "Intelligent PDF interaction system combining Gemini AI and Langchain for natural document conversations.",
    technologies: ["Gemini", "Langchain", "Streamlit", "RAG"],
    features: [
      "Natural language PDF interaction",
      "Context-aware document Q&A",
      "RAG-based information retrieval",
    ],
    lesson: "Mastered Retrieval-Augmented Generation (RAG) concepts and vector database integration.",
    demo: "https://adityamer.dev/Chat-with-PDF/",
    github: "https://github.com/Aditya190803/Chat-with-PDF",
  },
  {
    slug: "handwritten-digit-recognition",
    title: "Handwritten Digit Recognition",
    category: "ML",
    description: "A simple Streamlit application for recognizing handwritten digits using a pre-trained TensorFlow model.",
    technologies: ["TensorFlow", "Streamlit", "Python", "Computer Vision"],
    features: [
      "Draw a Digit on canvas",
      "Real-time model prediction",
      "Processed image display",
    ],
    lesson: "Gained hands-on experience with CNNs and deploying ML models via Streamlit.",
    demo: "https://adityamer.dev/Handwritten-Digit-Recognition/",
    github: "https://github.com/Aditya190803/Handwritten-Digit-Recognition",
  },
  {
    slug: "chat-with-website",
    title: "Chat with Website",
    category: "GenAI",
    description: "RAG-based website chatbot leveraging ChatGroq for intelligent web content interaction and analysis.",
    technologies: ["RAG", "ChatGroq", "Streamlit", "Web Scraping"],
    features: [
      "Real-time website content scraping",
      "Intelligent web content Q&A",
      "Multi-page website analysis",
    ],
    demo: "https://adityamer.dev/Chat-with-Website",
    github: "https://github.com/aditya190803/Chat-with-Website",
  },
];

export const homeProjects = projects
  .filter((p) => p.homeOrder)
  .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

export const papers: Paper[] = [
  {
    slug: "tensymp-24",
    title: "Towards Mitigating Misinformation: A Structured Dataset of Fact-Checked Claims from News Media",
    venue: "IEEE Region 10 Symposium (TENSYMP), 2024",
    venueShort: "TENSYMP '24",
    kind: "Conference paper",
    year: "2024",
    status: "Published",
    url: "https://ieeexplore.ieee.org/document/10752132",
    readOn: "IEEE Xplore",
    abstract: "Presents a structured dataset of fact-checked claims from news media to support misinformation detection research.",
    highlights: [
      "Curated fact-checked claims for misinformation research",
      "Focus on text-based news content",
      "Enables benchmarking for detection models",
    ],
    authors: [
      {
        name: "Oam Bhanushali",
        url: "https://www.linkedin.com/in/oambhanushali/",
      },
      {
        name: "Aditya Mer",
        url: "https://www.linkedin.com/in/adityamer/",
      },
      {
        name: "Rishikesh Giridhar",
        url: "https://www.linkedin.com/in/rishikesh-giridhar/",
      },
      {
        name: "Bhavormi Somaiya",
        url: "https://www.linkedin.com/in/bhavormi-somaiya/",
      },
      {
        name: "Arish Manasia",
        url: "https://www.linkedin.com/in/arish-manasia/",
      },
      {
        name: "Shivam Singh",
        url: "https://www.linkedin.com/in/shivamsingh21022003/",
      },
    ],
    tags: ["Misinformation Detection", "Dataset", "NLP", "Machine Learning"],
  },
  {
    slug: "taylor-francis",
    title: "FastWrite: Automation in Code Documentation",
    venue: "Automation in Code Documentation, Taylor & Francis (CRC Press), 2025",
    venueShort: "Taylor & Francis",
    kind: "Book chapter",
    year: "2025",
    status: "Published",
    url: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003774679-63/fastwrite-automation-code-documentation-rishikesh-giridhar-sravan-kotta-aditya-mer-oam-bhanushali-sejal-shah",
    readOn: "Taylor & Francis",
    abstract: "A book chapter on FastWrite, an AI-powered Python module for automated code documentation generation with intelligent code analysis and multiple LLM support.",
    highlights: [
      "AI-powered automated code documentation",
      "Intelligent code analysis across multiple LLM providers",
      "Published as a book chapter in Taylor & Francis (CRC Press)",
    ],
    authors: [
      {
        name: "Rishikesh Giridhar",
        url: "https://www.linkedin.com/in/rishikesh-giridhar/",
      },
      {
        name: "Sravan Kotta",
        url: "https://www.linkedin.com/in/sravan-kotta/",
      },
      {
        name: "Aditya Mer",
        url: "https://www.linkedin.com/in/adityamer/",
      },
      {
        name: "Oam Bhanushali",
        url: "https://www.linkedin.com/in/oambhanushali/",
      },
    ],
    tags: ["Code Documentation", "Automation", "GenAI", "LLMs", "Software Engineering"],
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "TypeScript", "C++", "Java", "SQL", "HTML/CSS"],
  "Machine Learning": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Keras",
    "PyTorch Lightning",
    "Pandas",
    "NumPy",
    "Computer Vision",
    "GANs",
  ],
  "Generative AI": ["LLMs", "RAG", "Prompt Engineering", "Langchain", "CrewAI", "Transformers", "Fine-tuning", "NLP"],
  "Web Development": ["React", "Next.js", "Node.js", "Streamlit", "Tailwind CSS", "REST APIs", "GraphQL"],
  "Cloud & DevOps": ["Azure", "AWS", "Docker", "Kubernetes", "Git", "CI/CD", "GCP"],
  "Data & Tools": [
    "PostgreSQL",
    "NoSQL",
    "Apache Spark",
    "Statistical Modeling",
    "Time Series Analysis",
    "Linux",
  ],
};

export const certifications: Certification[] = [
  {
    title: "Large Language Models Specialization",
    issuer: "H2O.ai",
    date: "July 2025",
    url: "https://www.coursera.org/account/accomplishments/specialization/QKTOLUC5EZ7J",
  },
  {
    title: "Natural Language Processing",
    issuer: "Stanford University",
    date: "January 2025",
    url: "https://www.coursera.org/account/accomplishments/specialization/Z93W2EAHBXFE",
  },
  {
    title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    issuer: "Oracle",
    date: "June 2024",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University",
    date: "April 2024",
    url: "https://www.coursera.org/account/accomplishments/specialization/EATQ4RWFDR6A",
  },
  {
    title: "Introduction to web development",
    issuer: "Meta",
    date: "October 2022",
    url: "https://www.coursera.org/account/accomplishments/specialization/EATQ4RWFDR6A",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "October 2022",
    url: "https://www.coursera.org/account/accomplishments/verify/G4E3EE6UKMAX",
  },
  {
    title: "Version Control",
    issuer: "Meta",
    date: "October 2022",
    url: "https://www.coursera.org/account/accomplishments/certificate/ZWQ647BYRZL9",
  },
];

export const faqs = [
  {
    q: "How do you price a project?",
    a: "Each project gets a fixed quote based on its scope. After our call I send a written proposal with deliverables, timeline and price, so you know the full cost first.",
  },
  {
    q: "Can my team update the site after launch?",
    a: "Yes. Content you change often, such as news, events, products or team members, gets an editor, and I walk your team through it.",
  },
  {
    q: "Do you work with clients outside Mumbai?",
    a: "Yes. The work happens over calls and shared preview links, so I work with clients anywhere and overlap with your hours for calls.",
  },
  {
    q: "Who owns the code and the data?",
    a: "You do. Your data stays yours throughout, and once the project is delivered and paid for, the code and documentation are yours too.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. I'm happy to sign one before you share details about your product, data or business.",
  },
  {
    q: "Do you look after the site once it's live?",
    a: "If you'd like me to. I can handle hosting, updates, backups and small changes each month, or hand everything over to your team.",
  },
];
