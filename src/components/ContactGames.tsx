import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SiArtstation, SiItchdotio  } from 'react-icons/si';
	import { BsTwitterX } from "react-icons/bs";

export const ContactGames = () => {
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
      href: "https://wa.me/+5532991309741?text=Hey! Let's build a game together?"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Juiz de Fora, Brazil",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: SiItchdotio,
      label: "Itch.io",
      href: "https://gabreu-senra.itch.io/"
    },
    {
      icon: SiArtstation,
      label: "ArtStation",
      href: "https://www.artstation.com/gabreusenra"
    },
    {
      icon: BsTwitterX,
      label: "Twitter/X",
      href: "https://x.com/GabreuSenra"
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: "https://wa.me/5532991309741"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[#0f0f14] text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="text-indigo-500">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Open to collaborations, studio opportunities, and exciting game projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-[#1b1b25] rounded-2xl hover:bg-[#232334] transition"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-xl">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="bg-[#1b1b25] rounded-2xl p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-6">
              Professional Profiles
            </h3>
            <div className="flex gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#232334] rounded-xl hover:bg-indigo-600 transition"
                  >
                    <Icon className="w-6 h-6 text-gray-300 hover:text-white transition" />
                  </a>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};