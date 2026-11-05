export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Project {
  title: string;
  featured?: boolean;
  description: string;
  technologies: string[];
  stats?: string;
  github?: string;
  demo?: string;
  pypi?: string;
  category: string;
  features: string[];
  lessonsLearned?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
  credentialId?: string;
  skills?: string[];
}

export interface Author {
  name: string;
  url?: string;
}

export interface ResearchPaper {
  title: string;
  venue: string;
  venueShort: string;
  year: string;
  status: string;
  url: string;
  abstract: string;
  highlights: string[];
  authors: Author[];
  tags: string[];
}

export const profile = {
  name: "Aditya Mer",
  title: "Freelance web and AI developer",
  resumeTitle: "Full-stack Developer & ML Engineer",
  location: "Mumbai, India",
  email: "adityamer.work@gmail.com",
  portfolio: "https://adityamer.dev",
  resumeUrl: "/Aditya_Mer_Resume.pdf",
  github: "https://github.com/aditya190803",
  linkedin: "https://www.linkedin.com/in/adityamer/",
  tagline: "Websites, online stores and web apps, with AI where it saves time.",
  bio: "Full-stack developer and ML engineer who designs and ships websites, online stores and web apps for organisations and businesses, with applied AI research published at IEEE and Taylor & Francis.",
};

export const education: Education[] = [
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

export const experience: Experience[] = [
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
  },
  {
    role: "Software Development Intern",
    company: "YANISA EXECUTION Pvt Ltd",
    period: "Sep 2023 – Dec 2023",
    location: "Mumbai, India",
    highlights: [
      "Built scalable web applications",
      "Developed no-code CRM for client management",
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

export const projects: Project[] = [
  {
    title: "ATS System",
    featured: true,
    description: "Streamlit app functioning as an ATS resume scanner, leveraging Google's Gemini AI to evaluate resumes against job descriptions.",
    technologies: ["Gemini AI", "Streamlit", "Python", "NLP"],
    github: "https://github.com/Aditya190803/ATS-System",
    demo: "https://ats.adityamer.dev/",
    category: "GenAI",
    features: [
      "AI-powered resume scanning",
      "Job description matching",
      "Skill gap identification",
      "ATS compatibility scoring",
    ],
    lessonsLearned: "Learned to leverage LLMs for structured data extraction from unstructured PDF resumes.",
  },
  {
    title: "FastWrite",
    featured: true,
    description: "AI-powered Python module for documentation generation with intelligent code analysis and automated documentation creation.",
    technologies: ["Python", "AI", "PyPI", "LLMs"],
    stats: "6k+ Downloads in First Month!",
    github: "https://github.com/R-G-KJSIT/FastWrite",
    pypi: "https://pypi.org/project/FastWrite/",
    category: "GenAI",
    features: [
      "Context-aware documentation generation",
      "Multiple LLM support (OpenAI, Groq, Gemini, etc.)",
      "BLEU score comparison for quality measurement",
    ],
    lessonsLearned: "Learned how to package and distribute Python modules on PyPI, and implemented a robust plugin system for supporting multiple LLM providers.",
  },
  {
    title: "EchoMail",
    featured: true,
    description: "Modern email marketing platform built with Next.js and TypeScript, integrating Gmail API to send personalized bulk emails with Gmail-like formatting and high deliverability.",
    technologies: ["Next.js", "TypeScript", "Gmail API", "React"],
    github: "https://github.com/Aditya190803/EchoMail",
    demo: "https://echomail.adityamer.dev",
    category: "Web",
    features: [
      "Upload CSVs with unlimited custom fields",
      "Auto-personalize messages with smart placeholders",
      "Craft beautiful emails with a rich text editor",
      "Send directly via Gmail API",
      "Bulk send with real-time progress tracking",
      "Preview every personalized message",
    ],
    lessonsLearned: "Mastered OAuth2 flow for Gmail API and optimized large CSV processing in the browser using Web Workers to prevent UI blocking.",
  },
  {
    title: "Mini App Factory",
    featured: true,
    description: "AI static website generator for quickly creating mini apps/sites from prompts and templates.",
    technologies: ["AI", "Web Development", "GenAI", "Templates"],
    github: "https://github.com/Aditya190803/mini-app-factory",
    demo: "https://mini-app-factory.adityamer.dev",
    category: "Web",
    features: [
      "Prompt-to-website generation",
      "Template-based quick starting",
      "AI-driven layout creation",
    ],
    lessonsLearned: "Learned how to dynamically render code structures from AI prompts.",
  },
  {
    title: "Verify News",
    featured: true,
    description: "Modern news verification platform built with React, TypeScript, LangSearch and Gemini AI to detect misinformation across text, images, audio, and video.",
    technologies: ["React", "TypeScript", "LangSearch", "Gemini AI"],
    github: "https://github.com/Aditya190803/Verify-News",
    demo: "https://verify-news.adityamer.dev",
    category: "Research",
    features: [
      "Multi-media misinformation detection",
      "Real-time fact-checking",
      "AI-powered content verification",
    ],
    lessonsLearned: "Implemented multi-modal AI pipelines and handled complex state management for real-time verification results.",
  },
  {
    title: "AI Research Agent",
    featured: true,
    description: "Developed an autonomous AI agent using CrewAI to perform automated literature reviews, synthesize findings, and generate research summaries.",
    technologies: ["CrewAI", "Python", "Autonomous Agents", "LLMs"],
    github: "https://github.com/Aditya190803/AI-Research-Agent",
    demo: "https://ai-research-agent.adityamer.dev",
    category: "Research",
    features: [
      "Automated literature reviews",
      "Findings synthesis",
      "Research summary generation",
      "Autonomous web action",
    ],
    lessonsLearned: "Mastered building autonomous multi-agent systems using CrewAI for reliable research execution.",
  },
  {
    title: "OSFM-Net",
    description: "A powerful Python module designed for network system management, operating in both Server and Client modes.",
    technologies: ["Python", "Network Management", "Remote Desktop"],
    github: "https://github.com/Aditya190803/osfm/tree/osfm-net",
    pypi: "https://pypi.org/project/osfm/",
    category: "Networking",
    features: [
      "Dual-mode operation (Server and Client)",
      "Remote Desktop Access",
      "Application Management via Winget",
      "Centralized System Administration",
    ],
    lessonsLearned: "Deepened understanding of socket programming and remote system administration protocols in Python.",
  },
  {
    title: "Chat With PDF",
    description: "Intelligent PDF interaction system combining Gemini AI and Langchain for natural document conversations.",
    technologies: ["Gemini", "Langchain", "Streamlit", "RAG"],
    github: "https://github.com/Aditya190803/Chat-with-PDF",
    demo: "https://adityamer.dev/Chat-with-PDF/",
    category: "GenAI",
    features: [
      "Natural language PDF interaction",
      "Context-aware document Q&A",
      "RAG-based information retrieval",
    ],
    lessonsLearned: "Mastered Retrieval-Augmented Generation (RAG) concepts and vector database integration.",
  },
  {
    title: "Handwritten Digit Recognition",
    description: "A simple Streamlit application for recognizing handwritten digits using a pre-trained TensorFlow model.",
    technologies: ["TensorFlow", "Streamlit", "Python", "Computer Vision"],
    github: "https://github.com/Aditya190803/Handwritten-Digit-Recognition",
    demo: "https://adityamer.dev/Handwritten-Digit-Recognition/",
    category: "ML",
    features: [
      "Draw a Digit on canvas",
      "Real-time model prediction",
      "Processed image display",
    ],
    lessonsLearned: "Gained hands-on experience with CNNs and deploying ML models via Streamlit.",
  },
  {
    title: "Chat with Website",
    description: "RAG-based website chatbot leveraging ChatGroq for intelligent web content interaction and analysis.",
    technologies: ["RAG", "ChatGroq", "Streamlit", "Web Scraping"],
    github: "https://github.com/aditya190803/Chat-with-Website",
    demo: "https://adityamer.dev/Chat-with-Website",
    category: "GenAI",
    features: [
      "Real-time website content scraping",
      "Intelligent web content Q&A",
      "Multi-page website analysis",
    ],
  },
];

export const skills = {
  "Languages": ["Python", "JavaScript", "TypeScript", "C++", "Java", "SQL", "HTML/CSS"],
  "Machine Learning": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "PyTorch Lightning", "Pandas", "NumPy", "Computer Vision", "GANs"],
  "Generative AI": ["LLMs", "RAG", "Prompt Engineering", "Langchain", "CrewAI", "Transformers", "Fine-tuning", "NLP"],
  "Web Development": ["React", "Next.js", "Node.js", "Streamlit", "Tailwind CSS", "REST APIs", "GraphQL"],
  "Cloud & DevOps": ["Azure", "AWS", "Docker", "Kubernetes", "Git", "CI/CD", "GCP"],
  "Data & Tools": ["PostgreSQL", "NoSQL", "Apache Spark", "Statistical Modeling", "Time Series Analysis", "Linux"]
};
export const research: { papers: ResearchPaper[] } = {
  papers: [
    {
      title: "Towards Mitigating Misinformation: A Structured Dataset of Fact-Checked Claims from News Media",
      venue: "IEEE Region 10 Symposium (TENSYMP), 2024",
      venueShort: "TENSYMP '24",
      year: "2024",
      status: "Published",
      url: "https://ieeexplore.ieee.org/document/10752132",
      abstract:
        "Presents a structured dataset of fact-checked claims from news media to support misinformation detection research.",
      highlights: [
        "Curated fact-checked claims for misinformation research",
        "Focus on text-based news content",
        "Enables benchmarking for detection models",
      ],
      authors: [
        { name: "Oam Bhanushali", url: "https://www.linkedin.com/in/oambhanushali/" },
        { name: "Aditya Mer", url: profile.linkedin },
        { name: "Rishikesh Giridhar", url: "https://www.linkedin.com/in/rishikesh-giridhar/" },
        { name: "Bhavormi Somaiya", url: "https://www.linkedin.com/in/bhavormi-somaiya/" },
        { name: "Arish Manasia", url: "https://www.linkedin.com/in/arish-manasia/" },
        { name: "Shivam Singh", url: "https://www.linkedin.com/in/shivamsingh21022003/" },
      ],
      tags: ["Misinformation Detection", "Dataset", "NLP", "Machine Learning"],
    },
    {
      title: "FastWrite: Automation in Code Documentation",
      venue: "Automation in Code Documentation, Taylor & Francis (CRC Press), 2025",
      venueShort: "Taylor & Francis",
      year: "2025",
      status: "Published",
      url: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003774679-63/fastwrite-automation-code-documentation-rishikesh-giridhar-sravan-kotta-aditya-mer-oam-bhanushali-sejal-shah",
      abstract:
        "A book chapter on FastWrite, an AI-powered Python module for automated code documentation generation with intelligent code analysis and multiple LLM support.",
      highlights: [
        "AI-powered automated code documentation",
        "Intelligent code analysis across multiple LLM providers",
        "Published as a book chapter in Taylor & Francis (CRC Press)",
      ],
      authors: [
        { name: "Rishikesh Giridhar", url: "https://www.linkedin.com/in/rishikesh-giridhar/" },
        { name: "Sravan Kotta", url: "https://www.linkedin.com/in/sravan-kotta/" },
        { name: "Aditya Mer", url: profile.linkedin },
        { name: "Oam Bhanushali", url: "https://www.linkedin.com/in/oambhanushali/" },
      ],
      tags: ["Code Documentation", "Automation", "GenAI", "LLMs", "Software Engineering"],
    },
  ],
};

export const certifications: Certification[] = [
  {
    title: "Large Language Models Specialization",
    issuer: "H2O.ai",
    date: "July 2025",
    credentialId: "QKTOLUC5EZ7J",
    url: "https://www.coursera.org/account/accomplishments/specialization/QKTOLUC5EZ7J",
    skills: ["Large Language Models ", "Generative AI", "Fine Tuning", "Prompt Engineering"],
  },
  {
    title: "Natural Language Processing",
    issuer: "Stanford University",
    date: "January 2025",
    credentialId: "Z93W2EAHBXFE",
    url: "https://www.coursera.org/account/accomplishments/specialization/Z93W2EAHBXFE",
    skills: ["NLP", "Transformers", "Sequence Models", "Attention Mechanism"],
  },
  {
    title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    issuer: "Oracle",
    date: "June 2024",
    credentialId: "100690232OCI2024GAIOCP",
    skills: ["Fine Tuning", "Large Language Models ", "Generative AI"],
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University",
    date: "April 2024",
    credentialId: "EATQ4RWFDR6A",
    url: "https://www.coursera.org/account/accomplishments/specialization/EATQ4RWFDR6A",
    skills: ["Machine Learning", "Artificial Neural Networks"],
  },
  {
    title: "Introduction to web development",
    issuer: "Meta",
    date: "October 2022",
    credentialId: "W993KKKHASNW",
    url: "https://www.coursera.org/account/accomplishments/specialization/EATQ4RWFDR6A",
    skills: ["Cascading Style Sheets (CSS)", "HTML"],
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "October 2022",
    credentialId: "G4E3EE6UKMAX",
    url: "https://www.coursera.org/account/accomplishments/verify/G4E3EE6UKMAX",
    skills: ["JavaScript"],
  },
  {
    title: "Version Control",
    issuer: "Meta",
    date: "October 2022",
    credentialId: "ZWQ647BYRZL9",
    url: "https://www.coursera.org/account/accomplishments/certificate/ZWQ647BYRZL9",
    skills: ["Git", "GitHub"],
  },
];

/* ------------------------------------------------------------------ */
/* Freelance content                                                   */
/* Only facts that can be checked go here. Each fact appears once.     */
/* ------------------------------------------------------------------ */

/**
 * Site-wide settings.
 * - `cta`: the one wording for the main action, used in the header, hero and contact.
 * - `bookingUrl`: paste a Cal.com / Calendly link to add a "Book a call" option to the contact section.
 * - `availability`: the status line in the hero and contact section.
 */
export const site = {
  brand: "Aditya Mer",
  cta: "Start a project",
  availability: "Taking on new projects",
  bookingUrl: "",
  city: "Mumbai, India",
};

export interface ClientWork {
  slug: string;
  client: string;
  /** What kind of project it was, e.g. "Website and custom CMS". */
  kind: string;
  sector: string;
  year?: string;
  summary: string;
  scope: string[];
  url?: string;
  domain?: string;
  /** Screenshot in /public/work, 1600x1000 (16:10). Omit for private work. */
  image?: string;
  /** Private work has no public URL; details are shared on request. */
  private?: boolean;
}

export const clientWork: ClientWork[] = [
  {
    slug: "iascc",
    client: "IASCC",
    kind: "Website and custom CMS",
    sector: "Cancer-care nonprofit",
    year: "2025",
    summary:
      "India's national affiliate of MASCC. I designed and built the site from scratch, with a CMS the team uses to publish events, news, newsletters and research grants themselves.",
    scope: ["Design and build", "Custom CMS", "Membership and contact pages"],
    url: "https://iascc.in",
    domain: "iascc.in",
    image: "/work/iascc.webp",
  },
  {
    slug: "younique",
    client: "Younique India",
    kind: "Online store",
    sector: "Jewellery retail",
    summary:
      "A storefront for an 18k gold-plated, anti-tarnish jewellery brand that ships across India, with search, collections, customer sign-in and order tracking.",
    scope: ["Storefront design", "Catalogue and collections", "Accounts and order tracking"],
    url: "https://www.youniqueindia.co.in",
    domain: "youniqueindia.co.in",
    image: "/work/younique.webp",
  },
  {
    slug: "theska",
    client: "Theska",
    kind: "Internal software",
    sector: "Private project",
    summary:
      "Internal software built for the company's own team. The project is private, so I share the details on a call rather than here.",
    scope: ["Internal tool", "Built to the team's workflow"],
    private: true,
  },
];

export const flier = {
  name: "Flier",
  domain: "sendflier.tech",
  url: "https://sendflier.tech",
  github: "https://github.com/Aditya190803/EchoMail",
  image: "/work/flier.webp",
  /** From the owner's own records; remove this line if it should not be public. */
  usedBy: "Tata Memorial Hospital",
  summary:
    "Flier is a mail-merge product I designed and built end to end. Upload a spreadsheet, write one message, and every recipient gets an email addressed to them, sent from your own Gmail.",
  points: [
    {
      title: "Spreadsheet in, personal emails out",
      body: "CSV columns become {{variables}}, and every message can be previewed before it goes.",
    },
    {
      title: "Sent through the official Gmail API",
      body: "Google sign-in and Gmail's own API, so messages arrive like normal email from your address.",
    },
    {
      title: "Progress and results you can see",
      body: "Live sending progress, scheduled sends, and open and click tracking for every campaign.",
    },
  ],
  stack: ["Next.js", "TypeScript", "Gmail API", "Google OAuth"],
  demo: {
    subject: "{{name}}, your seat for {{event}}",
    body: [
      "Hi {{name}},",
      "Thanks for registering for {{event}}. Your seat is confirmed, and the joining link will reach this inbox the day before.",
      "See you there,",
      "The events team",
    ],
    recipients: [
      { name: "Priya", email: "priya@…", event: "the workshop on 14 Nov" },
      { name: "Rahul", email: "rahul@…", event: "next week's webinar" },
      { name: "Meera", email: "meera@…", event: "the annual meet-up" },
      { name: "Arjun", email: "arjun@…", event: "Saturday's session" },
    ],
  },
};

export interface Service {
  id: string;
  title: string;
  pitch: string;
  includes: string[];
}

export const services: Service[] = [
  {
    id: "websites",
    title: "Websites for organisations and firms",
    pitch:
      "A site that explains what you do in seconds, looks credible to the people you want to reach, and that your team can update without calling me.",
    includes: ["Design and page structure", "A CMS your team can edit", "SEO and analytics", "Hosting and launch"],
  },
  {
    id: "stores",
    title: "Online stores",
    pitch:
      "Product pages that sell, a checkout that stays out of the way, and an admin that matches how you actually run the shop.",
    includes: ["Catalogue and checkout", "Payments and shipping", "Orders and stock admin", "Mobile-first design"],
  },
  {
    id: "apps",
    title: "Web apps and internal tools",
    pitch:
      "When spreadsheets and copy-pasting slow your team down, I build the tool that replaces them, the way Flier replaced manual email.",
    includes: ["Dashboards and portals", "Logins, roles and permissions", "Google, payment and CRM integrations", "Automated tests"],
  },
  {
    id: "ai",
    title: "AI and data work",
    pitch:
      "Assistants that answer from your own documents, data pulled out of PDFs and forms, and dashboards built on data you already have. I'll tell you plainly when AI isn't the answer.",
    includes: ["Chat over your documents", "Document and form processing", "ML models and evaluation", "Dashboards and reports"],
  },
];

export const steps = [
  {
    title: "A short call",
    body: "We talk through what you need, who it's for and what a good result looks like. No cost and no obligation.",
  },
  {
    title: "A written proposal",
    body: "You get the scope, milestones, timeline and a fixed quote in writing before any work starts.",
  },
  {
    title: "Build on a preview link",
    body: "I design the key screens first, then build in small steps on a private link, so you see progress every week.",
  },
  {
    title: "Launch and handover",
    body: "I launch, show your team how to update everything, and stay on hand for fixes and new features.",
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
