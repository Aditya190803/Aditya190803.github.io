import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, GraduationCap, Calendar } from "lucide-react"

export default function ResumeSection() {
  const education = [
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
  ]

  const experience = [
    {
      position: "Web Developer Intern",
      company: "IASCC",
      period: "June 2025 – Present",
      location: "Remote",
      points: [
        "Designed and developed IASCC's main website from scratch",
        "Built custom CMS for blogs, newsletters, and research publications",
        "Focused on performance optimization and UI/UX improvements"
      ],
      current: true,
    },
    {
      position: "Research Intern",
      company: "Society for Data Science",
      period: "May 2023 – May 2025",
      location: "Mumbai, India",
      points: [
        "Researched misinformation spread using advanced ML techniques",
        "Analyzed 21,000+ news articles for fake news patterns",
        "Developed ColBERT and SVM models for detection",
        "Contributed to IEEE conference paper publication"
      ],
    },
    {
      position: "Software Development Intern",
      company: "YANISA EXECUTION Pvt Ltd",
      period: "Sep 2023 – Dec 2023",
      location: "Mumbai, India",
      points: [
        "Built scalable web applications",
        "Developed no-code CRM for client management",
        "Collaborated on feature delivery and performance optimization"
      ],
    },
    {
      position: "Data Science & ML Intern",
      company: "Ybi Foundation",
      period: "July 2023",
      location: "Remote",
      points: [
        "Developed ML models using Python, TensorFlow, and PyTorch",
        "Implemented data preprocessing pipelines for large datasets",
        "Applied regression and classification techniques"
      ],
    },
    {
      position: "Azure, Java, and Web Development Intern",
      company: "Claidroid Technologies Pvt Ltd",
      period: "Dec 2022 – Jan 2023",
      location: "Mumbai, India",
      points: [
        "Gained experience with Azure cloud services and Java",
        "Built library management app using Azure App Services",
        "Applied enterprise-grade software engineering principles"
      ],
    },
  ]


  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      </div>

      <div className="container max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid gap-12">
          {/* Education Section */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {education.map((item, index) => (
                  <div key={index} className="relative pl-8 pb-8 last:pb-0">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    {index !== education.length - 1 && <div className="absolute left-2 top-4 w-0.5 h-full bg-border" />}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{item.degree}</h3>
                      <p className="text-muted-foreground font-medium">{item.institution}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {item.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <div key={index} className="relative pl-8 pb-8 last:pb-0">
                    <div
                      className={`absolute left-0 top-0 w-4 h-4 rounded-full border-4 border-background shadow-lg ${
                        item.current ? "bg-green-500 animate-pulse" : "bg-primary"
                      }`}
                    />
                    {index !== experience.length - 1 && (
                      <div className="absolute left-2 top-4 w-0.5 h-full bg-border" />
                    )}
                    <div className="space-y-3">                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-lg font-semibold">
                          {item.position} @ {item.company}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {item.period}
                          {item.current && (
                            <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      {item.location && (
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      )}
                      <ul className="space-y-1 text-muted-foreground">
                        {item.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5 text-xs">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
