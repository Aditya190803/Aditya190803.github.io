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
  title: "ML/DL Engineer & Gen AI Developer",
  location: "Mumbai, India",
  email: "adityamer.work@gmail.com",
  portfolio: "https://adityamer.dev",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/aditya190803",
  linkedin: "https://www.linkedin.com/in/adityamer/",
  tagline: "Building scalable ML & GenAI systems from research to production",
  bio: "I am an ML/DL Engineer and Gen AI Developer passionate about building intelligent systems that solve real-world problems. With a strong foundation in AI research and full-stack development, I bridge the gap between cutting-edge research and production-ready applications.",
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
    location: "Hydrid",
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
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Jane Smith",
    role: "Senior Research Scientist",
    company: "AI Research Lab",
    content: "Aditya is an exceptional engineer with a deep understanding of ML fundamentals. His work on LLM inference optimization was truly impressive.",
  },
  {
    name: "John Doe",
    role: "Lead Developer",
    company: "Tech Solutions Inc.",
    content: "Working with Aditya was a pleasure. He bridges the gap between research and production seamlessly.",
  },
];

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
