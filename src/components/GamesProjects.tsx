import { useState } from "react";
import { ExternalLink, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const GamesProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos os Projetos" },
    { id: "jogos", label: "Jogos" },
  ];

  const projects = [
    {
      id: 1,
      title: "Cozy Littlequarium",
      description: "Cozy Littlequarium is a relaxing aquarium simulator that sits at the bottom of your screen! Take care, breed them, collect and decorate! ",
      category: "jogos",
      technologies: ["Unity", "C#", "Photoshop", "Aseprite"],
      image: "/assets/images/projects/projeto3.png",
      liveUrl: "https://store.steampowered.com/app/3420070/Cozy_Littlequarium/",
      githubUrl: "#",
      gameUrl: "https://store.steampowered.com/app/3420070/Cozy_Littlequarium/",
      playable: true,
      featured: true,
      codeAccess: false
    },
    {
      id: 2,
      title: "While(True)",
      description: "Winner of the best art award at the 2nd DevJam by Crie Seus Jogos. While(true) is an 'infinite runner' developed for the game jam 'DevJam'.",
      category: "jogos",
      technologies: ["C#", "Unity", "Photoshop"],
      image: "/assets/images/projects/whiletrue.png",
      liveUrl: "https://gabreu-senra.itch.io/whiletrue",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/whiletrue",
      playable: true,
      featured: true,
    },
    {
      id: 3,
      title: "Slime Slammer",
      description: "Slime Slammer is an 'Idle Tower Defence' game in the style of Plants vs. Zombies that sits at the bottom of your screen!",
      category: "jogos",
      technologies: ["C#", "Unity", "Photoshop", "Toom Boom Harmony"],
      image: "/assets/images/projects/slimeslammer.png",
      liveUrl: "https://gabreu-senra.itch.io/slime-slammer",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/slime-slammer",
      playable: true,
      featured: true,
    },
    {
      id: 4,
      title: "Super Mario Bros. Wonder Style",
      description: "Fan-made remake of Super Mario Bros (1985), recreated with the vibrant visual style of Super Mario Bros. Wonder (2023)",
      category: "jogos",
      technologies: ["C#", "Unity", "Photoshop"],
      image: "/assets/images/projects/mariowonder.png",
      liveUrl: "https://gabreu-senra.itch.io/super-mario-bros-wonder-style",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/super-mario-bros-wonder-style",
      playable: true,
      featured: true,
    },
    {
      id: 5,
      title: "Celeste Remake",
      description: "Project created for the course 'Game Development' at the Federal University of Juiz de Fora.",
      category: "jogos",
      technologies: ["C#", "Unity", "Aseprite"],
      image: "/assets/images/projects/celeste.png",
      liveUrl: "https://gabreu-senra.itch.io/celeste-educational-recreation",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/celeste-educational-recreation",
      playable: false,
      featured: false,
    },
    {
      id: 6,
      title: "CONNECT",
      description: "A game created to teach pointers! It is my Undergraduate thesis project!",
      category: "jogos",
      technologies: ["C#", "Unity", "Aseprite"],
      image: "/assets/images/projects/connect.png",
      liveUrl: "https://gabreu-senra.itch.io/connect",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/connect",
      playable: true,
      featured: true,
    },
    {
      id: 7,
      title: "Turn On The Light",
      description: "Portrays the cycle of depression, in an abstract way. A game about solving puzzles and unlock colors.",
      category: "jogos",
      technologies: ["C#", "Unity", "Photoshop"],
      image: "/assets/images/projects/turnonthelight.png",
      liveUrl: "https://gabreu-senra.itch.io/turn-on-the-light",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/turn-on-the-light",
      playable: true,
      featured: true,
    },
    {
      id: 8,
      title: "Pazzuru Packing Sushi",
      description: "19th place in Ludum Dare 58! A puzzle game about packing sushi in a box!",
      category: "jogos",
      technologies: ["C#", "Unity", "Aseprite"],
      image: "/assets/images/projects/sushi.png",
      liveUrl: "https://gabreu-senra.itch.io/pazuru-packing-sushi",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/pazuru-packing-sushi",
      playable: true,
      featured: false,
    },
    {
      id: 9,
      title: "Why the chicken DIDNT cross the road?",
      description: "Many dangers, adventures and dumb ways to die. Be ready to die a little bit.",
      category: "jogos",
      technologies: ["C#", "Unity", "Krita"],
      image: "/assets/images/projects/YXSVo1.png",
      liveUrl: "https://gabreu-senra.itch.io/why-the-chicken-didnt-cross-the-road",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/why-the-chicken-didnt-cross-the-road",
      playable: true,
      featured: false,
    },
    {
      id: 10,
      title: "Ashen Survivors",
      description: "Rise from the ashes, chosen one… once more. Ashen Survivors is a top-down action roguelite where you play as a survivor of a world consumed by ash, fighting to reclaim it from the darkness.",
      category: "jogos",
      technologies: ["C#", "Unity", "Aseprite", "Photoshop", "Krita"],
      image: "/assets/images/projects/ashensurvivors.png",
      liveUrl: "https://gabreu-senra.itch.io/ashen-survivors",
      githubUrl: "#",
      gameUrl: "https://gabreu-senra.itch.io/ashen-survivors",
      playable: false,
      featured: false,
    },
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
            Published <span className="text-gradient-primary">Games</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            A selection of my most recent projects
          </p>
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
      </div>
    </section>
  );
};