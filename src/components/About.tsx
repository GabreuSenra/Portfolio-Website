import { Code, Gamepad2, Globe, Smartphone } from "lucide-react";

export const About = () => {
  const technologies = [
    { category: "Front-end", skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js"], icon: Globe },
    { category: "Back-end", skills: ["Node.js", "Express", "MongoDB", "SQL"], icon: Code },
    { category: "Game Dev", skills: ["Unity", "C#"], icon: Gamepad2 },
    { category: "Design", skills: ["UX/UI", "Design Responsivo"], icon: Smartphone }
  ];

  const services = [
    {
      title: "Desenvolvimento de Websites Profissionais",
      description: "Sites modernos, responsivos e otimizados para performance e SEO.",
      gradient: "bg-gradient-primary"
    },
    {
      title: "Criação de Landing Pages",
      description: "Páginas de conversão focadas em resultados e experiência do usuário.",
      gradient: "bg-gradient-secondary"
    },
    {
      title: "E-commerces e Plataformas SaaS", 
      description: "Soluções completas para vendas online e aplicações web robustas.",
      gradient: "bg-gradient-primary"
    },
    {
      title: "Design e Desenvolvimento de Jogos",
      description: "Jogos interativos e experiências digitais envolventes.",
      gradient: "bg-gradient-secondary"
    },
    {
      title: "Portfólios Personalizados",
      description: "Showcases únicos que destacam sua marca e trabalhos.",
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <section id="sobre" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O Que Eu <span className="text-gradient-primary">Faço</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformo ideias em soluções digitais completas, desde websites profissionais até jogos interativos.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div 
                key={tech.category}
                className="glass rounded-2xl p-6 hover-lift group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gradient-primary">
                    {tech.category}
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tech.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="glass rounded-2xl p-8 hover-lift interactive-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-full h-2 ${service.gradient} rounded-full mb-6 group-hover:h-3 transition-all duration-300`} />
              <h3 className="text-xl font-semibold mb-4 group-hover:text-gradient-primary transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Formation */}
        <div className="mt-20 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-gradient-secondary">
              Formação Acadêmica
            </h3>
            <p className="text-lg text-muted-foreground">
              <strong className="text-foreground">Ciência da Computação</strong> pela <strong className="text-primary">UFJF</strong>
            </p>
            <p className="text-muted-foreground mt-2">
              Universidade Federal de Juiz de Fora
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};