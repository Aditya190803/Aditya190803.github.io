import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink, Users, Calendar } from "lucide-react"

export default function PublicationsSection() {
  const publications = [
    {
      title: "Towards Mitigating Misinformation: A Structured Dataset of Fact-Checked Claims from News Media",
      authors: [
        "Oam Bhanushali",
        "Aditya Mer",
        "Rishikesh Giridhar",
        "Bhavormi Somaiya",
        "Arish Manasia",
        "Shivam Singh",
      ],
      venue: "2024 IEEE Region 10 Symposium (TENSYMP)",
      year: "2024",
      type: "Conference Paper",
      abstract:
        "False information has become an unavoidable endeavor in the digital world, endangering public discourse and influencing people's decisions. Misinformation comes from a variety of sources and can travel quickly through online networks, drastically altering public perceptions, influencing political beliefs, and escalating audience prejudices. It is possible to come across several types of false information through text, picture, or video recordings. Misinformation has grown to be a significant problem in a world where memes are common, improved technologies are easily accessible, and mind-sharing is unrestrained.",
      url: "https://ieeexplore.ieee.org/document/10752132",
      tags: ["Misinformation Detection", "Dataset", "Fact-Checking", "NLP", "Machine Learning"],
    },
  ]

  return (
    <section id="publications" className="py-20 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      </div>

      <div className="container max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Publications</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Research contributions to the field of Machine Learning and Artificial Intelligence
          </p>
        </div>

        <div className="space-y-8">
          {publications.map((publication, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl leading-tight mb-3 hover:text-primary transition-colors">
                      {publication.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{publication.authors.length} authors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{publication.year}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {publication.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Authors */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Authors</h4>
                  <div className="flex flex-wrap gap-2">
                    {publication.authors.map((author, authorIndex) => (
                      <Badge
                        key={authorIndex}
                        variant={author === "Aditya Mer" ? "default" : "outline"}
                        className={author === "Aditya Mer" ? "bg-primary text-primary-foreground" : ""}
                      >
                        {author}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                    Published In
                  </h4>
                  <p className="text-foreground font-medium">{publication.venue}</p>
                </div>

                {/* Abstract */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Abstract</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{publication.abstract}</p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {publication.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button asChild className="w-full sm:w-auto">
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on IEEE Xplore
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}        </div>
      </div>
    </section>
  )
}
