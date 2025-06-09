import { Brain, Zap, Target, Sparkles } from "lucide-react"

export default function AboutSection() {
  const highlights = [
    {
      icon: Brain,
      title: "Core Expertise",
      description:
        "Proficiency in Machine Learning, Deep Learning, Natural Language Processing (NLP), and Generative AI",
    },
    {
      icon: Zap,
      title: "Passion for Building",
      description: "Enthusiasm for creating intelligent systems like chatbots and prediction models",
    },
    {
      icon: Target,
      title: "Current Focus",
      description: "Active exploration and interest in Generative Adversarial Networks (GANs)",
    },
    {
      icon: Sparkles,
      title: "Key Attributes",
      description: "Strong analytical skills combined with a perfectionist mindset",
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-muted/20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
      </div>

      <div className="container max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {highlights.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-t-2xl" />

                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
