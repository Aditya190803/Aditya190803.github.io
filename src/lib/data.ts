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
  title: "Independent web designer & developer",
  resumeTitle: "Full-stack Developer & ML Engineer",
  location: "Mumbai, India",
  email: "adityamer.work@gmail.com",
  portfolio: "https://adityamer.dev",
  resumeUrl: "/Aditya_Mer_Resume.pdf",
  github: "https://github.com/aditya190803",
  linkedin: "https://www.linkedin.com/in/adityamer/",
  availability: "Taking on new projects",
  responseTime: "I reply within one working day.",
  tagline: "Websites people trust. Software a hospital relies on.",
  intro:
    "I'm Aditya, an independent designer and developer in Mumbai. I design, build and look after fast, custom websites and web apps for organisations and brands, and add AI where it saves you real time.",
  bio: "Full-stack developer and ML engineer who designs and ships websites, e-commerce stores and web apps for organisations and businesses, with a background in applied AI research published at IEEE and Taylor & Francis.",
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
/* Freelance work                                                      */
/* ------------------------------------------------------------------ */

export interface ClientWork {
  slug: string;
  client: string;
  domain: string;
  url: string;
  sector: string;
  year?: string;
  kind: string;
  summary: string;
  scope: string[];
  /** Background colour of the project's cover tile. */
  tone: string;
}

export const work: ClientWork[] = [
  {
    slug: "iascc",
    client: "IASCC",
    domain: "iascc.in",
    url: "https://iascc.in",
    sector: "Cancer care nonprofit",
    year: "2025",
    kind: "Website + custom CMS",
    summary:
      "The Integrated Association of Supportive Care in Cancer is India's national affiliate of MASCC. I designed and built their site from scratch, with a CMS their team uses to publish events, news, newsletters and research without a developer.",
    scope: [
      "Visual design and information architecture",
      "Custom CMS for events, news, newsletters and research",
      "Membership and join flow",
      "Performance and accessibility work",
    ],
    tone: "#DCE6E1",
  },
  {
    slug: "younique",
    client: "Younique India",
    domain: "youniqueindia.co.in",
    url: "https://www.youniqueindia.co.in",
    sector: "Jewellery retail",
    kind: "E-commerce store + admin",
    summary:
      "A jewellery storefront built to make the pieces look as good on screen as they do in hand, plus an admin panel so the owners can manage products, stock and orders themselves.",
    scope: [
      "Storefront design and development",
      "Product catalogue and checkout",
      "Admin panel for products, stock and orders",
      "Mobile-first product pages",
    ],
    tone: "#EADFD6",
  },
  {
    slug: "theska",
    client: "Shah Kapadia & Associates",
    domain: "theska.in",
    url: "https://theska.in",
    sector: "Chartered accountants",
    kind: "Firm website",
    summary:
      "SKA is a fast-growing firm of chartered accountants covering audit, tax, compliance and business set-up. Their site had to read as established and trustworthy, and make six service lines easy to scan.",
    scope: [
      "Website design and build",
      "Service pages for audit, tax, compliance and set-up",
      "Partner and team profiles",
      "Mobile-friendly layout",
    ],
    tone: "#E1E2EA",
  },
];

export const featured = {
  name: "Flier",
  domain: "sendflier.tech",
  url: "https://sendflier.tech",
  github: "https://github.com/Aditya190803/EchoMail",
  usedBy: "Tata Memorial Hospital",
  headline: "Personalised email campaigns, sent from your own Gmail.",
  summary:
    "Flier is a mail-merge product I designed and built end to end. Upload a spreadsheet, write one message, and every recipient gets an email addressed to them, sent through Google's official Gmail API. It is in use at Tata Memorial Hospital.",
  points: [
    { title: "Spreadsheet in, personal emails out", body: "Columns in a CSV become {{variables}} automatically, and every email can be previewed before it goes." },
    { title: "Sent from the sender's own Gmail", body: "Google OAuth and the official Gmail API, so messages land like normal email and sender reputation stays intact." },
    { title: "Built for teams", body: "Shared workspaces with roles, scheduled sending, open and click tracking, audit logs and GDPR tools." },
  ],
  stack: ["Next.js", "TypeScript", "Gmail API", "PostgreSQL", "Appwrite", "Playwright"],
  demoRecipients: [
    { name: "Priya", event: "the workshop on 14 Nov" },
    { name: "Rahul", event: "next week's webinar" },
    { name: "Meera", event: "the annual meet-up" },
    { name: "Arjun", event: "Saturday's session" },
  ],
};

export interface Service {
  title: string;
  pitch: string;
  includes: string[];
}

export const services: Service[] = [
  {
    title: "Websites for organisations and firms",
    pitch:
      "A site that explains what you do in seconds, looks credible to the people you want to reach, and that your team can update without calling me.",
    includes: ["Design and copy structure", "Content management you can edit", "SEO and analytics set-up", "Hosting and launch"],
  },
  {
    title: "Online stores",
    pitch:
      "Product pages that sell, a checkout that doesn't get in the way, and an admin panel that matches how you actually run the shop.",
    includes: ["Catalogue and checkout", "Payments and shipping", "Order and stock admin", "Mobile-first design"],
  },
  {
    title: "Web apps and internal tools",
    pitch:
      "When a spreadsheet and a lot of copy-pasting is holding your team back, I build the tool that replaces it, the way Flier did for email.",
    includes: ["Dashboards and portals", "Logins, roles and permissions", "Integrations with Google, payments, CRMs", "Automated tests"],
  },
  {
    title: "Useful AI, not gimmicks",
    pitch:
      "Assistants that answer from your own documents, automatic data extraction from PDFs and forms, and workflows that run themselves. I've published research in this area, so I'll tell you honestly when AI isn't the answer.",
    includes: ["Chat over your documents", "Document and form processing", "Workflow automation", "Model evaluation"],
  },
];

export const steps = [
  {
    title: "A short call",
    body: "We talk through what you need, who it's for and what success looks like. No cost, no obligation.",
  },
  {
    title: "A clear proposal",
    body: "You get a written scope, timeline and fixed price, so there are no surprises later.",
  },
  {
    title: "Design you can react to",
    body: "I design the key pages first and we refine them together before anything is built.",
  },
  {
    title: "Build and review",
    body: "I build in small steps on a private preview link, so you see progress every week.",
  },
  {
    title: "Launch and handover",
    body: "I launch, show your team how to update everything, and stay on hand for fixes and new features.",
  },
];

export const faqs = [
  {
    q: "How much does a website cost?",
    a: "It depends on the number of pages, features and how much content needs writing. After a short call I send a fixed price, so you know the full cost before we start.",
  },
  {
    q: "Can my team update the site after launch?",
    a: "Yes. Every site comes with an editor for the content you change often, like news, events, products or team members, and I'll walk your team through it.",
  },
  {
    q: "Do you work with clients outside Mumbai?",
    a: "Yes. Most of the work happens over calls and shared previews, so location doesn't matter.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short description of your business and goals, any branding you have, and examples of sites you like. If you don't have copy or photos yet, we can plan those together.",
  },
  {
    q: "Do you look after the site once it's live?",
    a: "If you'd like me to. I can handle hosting, updates, backups and small changes on a monthly basis, or you can take it over completely.",
  },
];
