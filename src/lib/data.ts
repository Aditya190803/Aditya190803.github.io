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
  title: "Freelance Data, AI & Software Engineer",
  location: "Mumbai, India",
  email: "adityamer.work@gmail.com",
  portfolio: "https://adityamer.dev",
  resumeUrl: "/Aditya_Mer_Resume.pdf",
  github: "https://github.com/aditya190803",
  linkedin: "https://www.linkedin.com/in/adityamer/",
  tagline: "Data, AI and software, built to ship.",
  bio: "I help businesses and teams turn raw data into decisions, models into products, and ideas into working software — from analytics and machine learning to LLM apps and full-stack web platforms.",
};

/**
 * Site-wide settings. Everything client-facing reads from here.
 * - `brand`: the business name shown in the nav, footer, titles and structured data.
 *   Change it once you settle on a brand name.
 * - `bookingUrl`: paste a Cal.com / Calendly link to show "Book a call" buttons.
 *   While it's empty, the contact form is the main call to action.
 * - `availability`: the status line in the hero and contact section.
 */
export const site = {
  brand: "Aditya Mer",
  bookingUrl: "",
  availability: "Available for new projects",
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
    description:
      "Resume scanner that uses Gemini to score a resume against a job description and point out missing skills.",
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
    lessonsLearned:
      "Learned to leverage LLMs for structured data extraction from unstructured PDF resumes.",
  },
  {
    title: "FastWrite",
    featured: true,
    description:
      "Python package that reads your code and writes its documentation with the LLM of your choice.",
    technologies: ["Python", "AI", "PyPI", "LLMs"],
    stats: "6k+ PyPI downloads in its first month",
    github: "https://github.com/R-G-KJSIT/FastWrite",
    pypi: "https://pypi.org/project/FastWrite/",
    category: "GenAI",
    features: [
      "Context-aware documentation generation",
      "Multiple LLM support (OpenAI, Groq, Gemini, etc.)",
      "BLEU score comparison for quality measurement",
    ],
    lessonsLearned:
      "Learned how to package and distribute Python modules on PyPI, and implemented a robust plugin system for supporting multiple LLM providers.",
  },
  {
    title: "EchoMail",
    description:
      "The open-source prototype behind SendFlier. Email marketing platform built with Next.js and TypeScript, integrating Gmail API to send personalized bulk emails with Gmail-like formatting and high deliverability.",
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
    lessonsLearned:
      "Mastered OAuth2 flow for Gmail API and optimized large CSV processing in the browser using Web Workers to prevent UI blocking.",
  },
  {
    title: "Mini App Factory",
    featured: true,
    description: "Generates small static websites and apps from a prompt or a starting template.",
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
    description:
      "Checks news claims across text, images, audio and video, using LangSearch for sources and Gemini for analysis.",
    technologies: ["React", "TypeScript", "LangSearch", "Gemini AI"],
    github: "https://github.com/Aditya190803/Verify-News",
    demo: "https://verify-news.adityamer.dev",
    category: "Research",
    features: [
      "Multi-media misinformation detection",
      "Real-time fact-checking",
      "AI-powered content verification",
    ],
    lessonsLearned:
      "Implemented multi-modal AI pipelines and handled complex state management for real-time verification results.",
  },
  {
    title: "AI Research Agent",
    featured: true,
    description:
      "Autonomous research agent built with CrewAI that runs literature reviews, synthesises findings and writes research summaries.",
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
    lessonsLearned:
      "Mastered building autonomous multi-agent systems using CrewAI for reliable research execution.",
  },
  {
    title: "OSFM-Net",
    description:
      "A powerful Python module designed for network system management, operating in both Server and Client modes.",
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
    lessonsLearned:
      "Deepened understanding of socket programming and remote system administration protocols in Python.",
  },
  {
    title: "Chat With PDF",
    featured: true,
    description:
      "Ask questions about a PDF in plain language. Retrieval-augmented answers with Gemini and LangChain.",
    technologies: ["Gemini", "Langchain", "Streamlit", "RAG"],
    github: "https://github.com/Aditya190803/Chat-with-PDF",
    demo: "https://adityamer.dev/Chat-with-PDF/",
    category: "GenAI",
    features: [
      "Natural language PDF interaction",
      "Context-aware document Q&A",
      "RAG-based information retrieval",
    ],
    lessonsLearned:
      "Mastered Retrieval-Augmented Generation (RAG) concepts and vector database integration.",
  },
  {
    title: "Handwritten Digit Recognition",
    description:
      "A simple Streamlit application for recognizing handwritten digits using a pre-trained TensorFlow model.",
    technologies: ["TensorFlow", "Streamlit", "Python", "Computer Vision"],
    github: "https://github.com/Aditya190803/Handwritten-Digit-Recognition",
    demo: "https://adityamer.dev/Handwritten-Digit-Recognition/",
    category: "ML",
    features: ["Draw a Digit on canvas", "Real-time model prediction", "Processed image display"],
    lessonsLearned: "Gained hands-on experience with CNNs and deploying ML models via Streamlit.",
  },
  {
    title: "Chat with Website",
    description:
      "RAG-based website chatbot leveraging ChatGroq for intelligent web content interaction and analysis.",
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
  "Generative AI": [
    "LLMs",
    "RAG",
    "Prompt Engineering",
    "Langchain",
    "CrewAI",
    "Transformers",
    "Fine-tuning",
    "NLP",
  ],
  "Web Development": [
    "React",
    "Next.js",
    "Node.js",
    "Streamlit",
    "Tailwind CSS",
    "REST APIs",
    "GraphQL",
  ],
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
export const research: { papers: ResearchPaper[] } = {
  papers: [
    {
      title:
        "Towards Mitigating Misinformation: A Structured Dataset of Fact-Checked Claims from News Media",
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
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
  stack: string[];
}

export const services: Service[] = [
  {
    id: "analytics",
    title: "Data Analytics & Dashboards",
    summary:
      "Make sense of the data you already have. Clean it, analyse it, and turn it into reports and dashboards your team actually uses.",
    deliverables: [
      "Data cleaning & exploratory analysis",
      "KPI dashboards and automated reports",
      "SQL pipelines and data modelling",
      "Clear write-ups with recommendations",
    ],
    stack: ["Python", "Pandas", "SQL", "PostgreSQL", "Power BI / Streamlit"],
  },
  {
    id: "ml",
    title: "Machine Learning & Deep Learning",
    summary:
      "Prediction, classification, NLP and computer vision models — built, evaluated honestly, and deployed where they can do real work.",
    deliverables: [
      "Problem framing & feasibility check",
      "Model training, tuning and evaluation",
      "NLP, vision and time-series models",
      "Deployment as an API or app",
    ],
    stack: ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "Docker"],
  },
  {
    id: "genai",
    title: "Generative AI & LLM Apps",
    summary:
      "Chatbots over your documents, AI assistants, agents and automations — grounded in your data and built to be reliable.",
    deliverables: [
      "RAG chatbots over docs, sites and databases",
      "AI agents and workflow automation",
      "LLM integration into existing products",
      "Evaluation, guardrails and cost control",
    ],
    stack: ["OpenAI / Gemini / Groq", "LangChain", "CrewAI", "Vector DBs", "FastAPI"],
  },
  {
    id: "software",
    title: "Software & Web Development",
    summary:
      "Websites, web apps, internal tools and MVPs — designed, built and shipped end to end, with a CMS when you need one.",
    deliverables: [
      "Business websites with custom CMS",
      "Full-stack web apps and dashboards",
      "Internal tools and automations",
      "APIs, integrations and hosting setup",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Python"],
  },
];

export interface ClientWork {
  slug: string;
  client: string;
  url?: string;
  /** Short label for the kind of project, e.g. "Website + custom CMS". */
  type: string;
  summary: string;
  highlights: string[];
  services: Service["id"][];
  /** Screenshot in /public, 1440x900. Omit for private work. */
  image?: string;
  /** Optional proof line, e.g. who uses it. */
  badge?: string;
  /** Private work has no public URL; details are shared on request. */
  internal?: boolean;
}

// Only verified facts here. Add numbers (users, emails sent, orders) once the client is happy to share them.
export const clientWork: ClientWork[] = [
  {
    slug: "sendflier",
    client: "SendFlier",
    url: "https://sendflier.tech",
    type: "Open-source SaaS platform",
    image: "/work/sendflier.jpg",
    badge: "Used by Tata Memorial Hospital",
    summary:
      "A bulk email platform: upload a CSV, write with {{variables}}, and send personalised campaigns through Gmail. It grew out of my earlier open-source project, EchoMail.",
    highlights: [
      "CSV upload with personalisation variables",
      "Sending through Gmail with Google OAuth",
      "Live sending progress and campaign analytics",
    ],
    services: ["software"],
  },
  {
    slug: "iascc",
    client: "IASCC",
    url: "https://iascc.in",
    type: "Website + custom CMS",
    image: "/work/iascc.jpg",
    summary:
      "The website for the Integrated Association of Supportive Care in Cancer, India's national affiliate of MASCC. Built from scratch, with a custom CMS so the team publishes their own updates.",
    highlights: [
      "CMS for events, announcements, research grants and newsletters",
      "Membership and contact pages",
      "Designed and built from scratch",
    ],
    services: ["software"],
  },
  {
    slug: "younique-india",
    client: "Younique India",
    url: "https://youniqueindia.co.in",
    type: "E-commerce store",
    image: "/work/younique-india.jpg",
    summary: "An online store for an 18k gold-plated jewellery brand.",
    highlights: ["Shop and product catalogue", "Featured collections", "Offers and promotions"],
    services: ["software"],
  },
  {
    slug: "theska",
    client: "Theska",
    type: "Internal software",
    internal: true,
    summary:
      "Internal software for the company. The project is private, so details are available on request.",
    highlights: [],
    services: ["software"],
  },
];

export const processSteps = [
  {
    title: "Discovery call",
    body: "A short call to understand the problem, your data and what success looks like. No commitment.",
  },
  {
    title: "Scope & proposal",
    body: "A written plan with deliverables, milestones and timeline, so we both know exactly what's being built.",
  },
  {
    title: "Build in milestones",
    body: "Regular updates and working demos. You see progress early and can steer as we go.",
  },
  {
    title: "Handoff & support",
    body: "Deployment, documentation and a walkthrough — plus support after launch so nothing is left hanging.",
  },
];

export const faqs = [
  {
    q: "How do you price projects?",
    a: "Every project is quoted individually, based on its scope. After we talk, I send a written proposal with the deliverables, timeline and quote, so you know the cost before any work starts.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "Data analysis and dashboards, machine learning and deep learning models, generative AI and LLM apps, and general software — websites, web apps, internal tools and MVPs.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. I'm based in Mumbai and work remotely with clients anywhere, and I can overlap with your working hours for calls and updates.",
  },
  {
    q: "Who owns the code and the data?",
    a: "You do. Your data stays yours throughout, and once the project is delivered and paid for, the code, models and documentation are yours too.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. I'm happy to sign an NDA before you share details about your product, data or business.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A rough description of the problem, any existing data or systems I'd be working with, and who the end users are. If you're not sure yet, that's what the first call is for.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Post-launch support is agreed as part of the proposal, and ongoing maintenance can be arranged if you need it.",
  },
];
