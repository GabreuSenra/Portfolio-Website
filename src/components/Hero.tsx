import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-primary rounded-full p-1 animate-glow-pulse">
            <img 
              src={`${import.meta.env.BASE_URL}/assets/images/profile.png`}
              alt="Gabriel Senra" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient-primary">Gabriel</span>{" "}
            <span className="text-gradient-secondary">Senra</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Desenvolvedor Full Stack & Game Developer
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Sou apaixonado por tecnologia e inovação, trabalhando para criar soluções que conectam pessoas 
            e transformam ideias em realidade. Com experiência em diversas áreas de desenvolvimento, 
            adoro explorar novos desafios e aplicar meu conhecimento em projetos criativos e funcionais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:scale-105 transition-all duration-300 glow-primary text-primary-foreground font-semibold px-8 py-3"
              onClick={() => scrollToSection('contato')}
            >
              <Mail className="mr-2 h-5 w-5" />
              Entre em Contato
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/50 text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 px-8 py-3"
              onClick={() => scrollToSection('projetos')}
            >
              Ver Projetos
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-16">
            <a 
              href="https://github.com/GabreuSenra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
            >
              <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/in/devgabrielsenra/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
            >
              <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://wa.me/+5532991309741?text=Ei! Vamos conversar sobre um novo projeto?" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
            >
              <FaWhatsapp className="h-6 w-6 text-muted-foreground group-hover:text-secondary transition-colors" />
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection('sobre')}
            className="animate-bounce hover:text-primary transition-colors cursor-pointer"
            aria-label="Scroll para próxima seção"
          >
            <ArrowDown className="h-8 w-8 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};