import { useState } from "react";
import { ExternalLink, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos os Projetos" },
    { id: "websites", label: "Websites" },
    //{ id: "landing", label: "Landing Pages" },
    { id: "ecommerce", label: "E-commerce/SaaS" },
    { id: "jogos", label: "Jogos" },
    { id: "portfolios", label: "Portfólios" }
  ];

  const projects = [
    {
      id: 3,
      title: "Cozy Littlequarium",
      description: "Cozy Littlequarium é um simulador de aquário relaxante que fica na parte inferior da sua tela! Cuide, acasale-os, colecione e decore!",
      category: "jogos",
      technologies: ["Unity", "C#", "Photoshop", "Aseprite"],
      image: "src/images/projects/projeto3.png",
      liveUrl: "https://store.steampowered.com/app/3420070/Cozy_Littlequarium/",
      githubUrl: "#",
      gameUrl: "https://store.steampowered.com/app/3420070/Cozy_Littlequarium/",
      playable: true,
      featured: true,
      codeAccess: false
    },
    {
      id: 4,
      title: "Osmar Advocacia",
      description: "Site de advocacia trabalhista responsivo com Wordpress e otimizações SEO.",
      category: "websites",
      technologies: ["Wordpress", "Javascript"],
      image: "src/images/projects/projeto4.png",
      liveUrl: "https://osmartalaricoadvocacia.com.br/",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Este Portfólio!",
      description: "Showcase interativo de portfólios profissionais. Como este!",
      category: "portfolios",
      technologies: ["React", "Vite.js", "Typescript"],
      image: "src/images/projects/projeto5.png",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "While(True)",
      description: "Vencedor do prêmio de melhor arte do 2° DevJam por Crie Seus Jogos. While(true) é um 'infite runner' desenvolvido para a game jam 'DevJam', com o tema 'Loop Infinito'.",
      category: "jogos",
      technologies: ["C#", "Unity", "Photoshop"],
      image: "src/images/projects/whiletrue.png",
      liveUrl: "https://gabreu-senra.itch.io/whiletrue",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/whiletrue",
      playable: true,
      featured: true,
    }
  ];

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const filteredProjects = selectedCategory === "todos"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projetos" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O Que Eu Já <span className="text-gradient-primary">Fiz</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Uma seleção dos meus projetos mais recentes, organizados por categoria.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-300 ${selectedCategory === category.id
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "border-primary/30 text-primary hover:bg-primary/10"
                  }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`glass rounded-2xl overflow-hidden hover-lift group animate-fade-in ${project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Imagem do projeto */}
              <div className="relative h-48 bg-gradient-card overflow-hidden">
                <div className="w-full h-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                  <img src={project.image}></img>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button onClick={() => openLink(project.liveUrl)} size="sm" className="bg-gradient-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Site
                  </Button>
                  {project.playable ? (
                    <Button onClick={() => openLink(project.gameUrl)} size="sm" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Jogar
                    </Button>
                  ) : (
                    project.codeAccess && (
                      <Button onClick={() => openLink(project.githubUrl)} size="sm" variant="outline">
                        <Github className="h-4 w-4 mr-2" />
                        Código
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-gradient-primary transition-all duration-300">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge variant="outline" className="border-secondary text-secondary">
                      Destaque
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={() => openLink(project.liveUrl)} variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Projeto
                  </Button>
                  {project.codeAccess && (
                    <Button onClick={() => openLink(project.githubUrl)} variant="outline" size="sm">
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                  
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-8">
            Gostou do que viu? Vamos conversar sobre seu próximo projeto!
          </p>
          <Button
            size="lg"
            className="bg-gradient-secondary text-secondary-foreground hover:scale-105 transition-all duration-300 glow-secondary"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Iniciar Projeto
          </Button>
        </div>
      </div>
    </section>
  );
};