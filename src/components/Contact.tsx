import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "senra.gabreusoares@gmail.com",
      href: "mailto:senra.gabreusoares@gmail.com"
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "+55 (32) 9 9130-9741",
      href: "https://wa.me/+5532991309741?text=Ei! Vamos conversar sobre um novo projeto?"
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Juiz de Fora, MG",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/GabreuSenra",
      color: "hover:text-primary"
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/devgabrielsenra/",
      color: "hover:text-primary"
    },
    {
      icon: FaWhatsapp,
      label: "Whatsapp", 
      href: "https://wa.me/+5532991309741?text=Ei! Vamos conversar sobre um novo projeto?",
      color: "hover:text-primary"
    }
  ];

  return (
    <section id="contato" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Vamos <span className="text-gradient-primary">Conversar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tem um projeto em mente? Está buscando um desenvolvedor para sua equipe? 
            Entre em contato e vamos transformar suas ideias em realidade!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6 text-gradient-primary">
              Envie uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Título *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none"
                  placeholder="Conte-me sobre seu projeto, suas necessidades ou qualquer dúvida que tenha..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-all duration-300 glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gradient-secondary">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      className="flex items-center gap-4 p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8">
              <h4 className="text-xl font-semibold mb-6">Conecte-se Comigo</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-background/30 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
                      aria-label={social.label}
                    >
                      <IconComponent className={`h-6 w-6 text-muted-foreground ${social.color} transition-colors`} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="glass rounded-2xl p-8 text-center">
              <h4 className="text-xl font-semibold mb-4 text-gradient-primary">
                Pronto para Começar?
              </h4>
              <p className="text-muted-foreground mb-6">
                Vamos discutir seu projeto e encontrar a melhor solução juntos.
              </p>
              <Button
                size="lg"
                className="bg-gradient-secondary text-secondary-foreground hover:scale-105 transition-all duration-300 glow-secondary"
                onClick={() => document.getElementById('name')?.focus()}
              >
                Começar Conversa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};