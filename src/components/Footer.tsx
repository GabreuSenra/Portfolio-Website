import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Início", href: "#" },
    { label: "Sobre", href: "#sobre" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/GabreuSenra", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/devgabrielsenra/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:senra.gabreusoares@gmail.com", label: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    if (href === "#") {
      scrollToTop();
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-background-secondary border-t border-border/30">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-gradient-primary">Gabriel</span>{" "}
                <span className="text-gradient-secondary">Senra</span>
              </h3>
              <p className="text-muted-foreground">
                Desenvolvedor Full Stack & Game Developer
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Transformando ideias em soluções digitais inovadoras. 
              Especializado em desenvolvimento web moderno e criação de jogos interativos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gradient-primary">
              Navegação
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gradient-secondary">
              Contato
            </h4>
            <div className="space-y-3">
              <p className="text-muted-foreground">senra.gabreusoares@gmail.com</p>
              <p className="text-muted-foreground">Juiz de Fora, MG</p>
              <p className="text-muted-foreground">+55 (32) 9 9130-9741</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/30">
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card/50 border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {currentYear} Gabriel Senra. Feito com</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>e muito código.</span>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-all duration-300 group"
          aria-label="Voltar ao topo"
        >
          <svg 
            className="w-5 h-5 text-primary-foreground group-hover:animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};