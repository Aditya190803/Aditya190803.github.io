import { Badge } from "@/components/ui/badge"

export default function SkillsSection() {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "C++", "Java", "HTML", "CSS"],
    },
    {
      category: "ML/DL Frameworks",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "PyTorch Lightning", "Pandas", "NumPy"],
    },
    {
      category: "Generative AI & LLMs",
      skills: [
        "Generative AI",
        "Large Language Models",
        "Natural Language Processing",
        "Prompt Engineering",
        "Langchain",
        "CrewAI",
        "Transformers",
        "Fine-tuning",
        "Model Deployment",
      ],
    },
    {
      category: "Web Development & Tools",
      skills: ["Streamlit", "React", "Next.js", "Git", "Docker", "Kubernetes", "REST APIs", "GraphQL"],
    },
    {
      category: "Cloud Platforms",
      skills: ["Azure", "AWS", "GCP", "Cloud Computing", "Serverless Functions"],
    },
    {
      category: "Data & Database",
      skills: [
        "Data Analysis",
        "Data Visualization",
        "SQL",
        "NoSQL",
        "PostgreSQL",
        "Data Warehousing",
        "Apache Spark",
        "Hadoop",
      ],
    },
    {
      category: "Specialized Skills",
      skills: [
        "Computer Vision",
        "Reinforcement Learning",
        "Time Series Analysis",
        "Statistical Modeling",
        "DevOps",
        "CI/CD",
        "GANs",
        "API Development",
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/5 to-background" />
      </div>

      <div className="container max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive expertise across the AI and software development stack
          </p>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
                <h3 className="text-2xl font-semibold">{category.category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-default hover:scale-105 hover:shadow-md"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
