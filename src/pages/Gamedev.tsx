import React from "react";
import { GamesProjects } from "@/components/GamesProjects";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { SiArtstation, SiItchdotio  } from 'react-icons/si';
import { FaWhatsapp } from 'react-icons/fa';
import { ContactGames } from "@/components/ContactGames";

const skills = {
    gameDev: [
        "Unity (15+ years)",
        "Gameplay Systems Architecture",
        "Gameplay Design & Balancing",
        "Performance Optimization",
        "AI & Game Mechanics",
        "Prototyping & Rapid Iteration",
    ],
    programming: [
        "C#",
        "Software Architecture",
        "Data Structures & Algorithms",
        "Clean Code Practices",
        "Technical Problem Solving",
    ],
    artTools: [
        "Adobe Photoshop",
        "Toon Boom Harmony",
        "Aseprite",
        "VFX (Postgraduate - in progress)",
    ],
};

const GameDevPage: React.FC = () => {
    return (
        <div className="bg-[#0f0f14] text-white min-h-screen font-sans">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-primary rounded-full p-1 animate-glow-pulse">
                    <img
                        src="/assets/images/profile.png"
                        alt="Gabriel Senra"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl opacity-40" />
                <h1 className="text-5xl md:text-6xl font-bold mb-6 z-10">
                    Game Developer & Technical Game Designer
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mb-8 z-10">
                    Building interactive systems and immersive gameplay experiences for
                    over 15 years.
                </p>
                <div className="flex gap-4 flex-wrap justify-center z-10">
                    <a
                        href="#games"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition"
                    >
                        View Games
                    </a>
                    <a
                        href="https://gabreu-senra.itch.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center gap-2 p-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
                    >
                        <SiItchdotio className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                            Itch.io
                        </span>
                    </a>
                    <a
                        href="https://www.artstation.com/gabreusenra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center gap-2 p-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
                    >
                        <SiArtstation className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                            ArtStation
                        </span>
                    </a>
                    <a
                        href="mailto:senra.gabreusoares@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center gap-2 p-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group"
                    >
                        <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                            Contact
                        </span>
                    </a>
                </div>

            </section>

            {/* ABOUT */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">About</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                    I started developing games at a young age, driven by curiosity and a
                    deep passion for interactive systems. With over 15 years of experience
                    using Unity, I have built everything from experimental prototypes to
                    commercial titles.
                    <br />
                    <br />
                    My background in Computer Science allows me to design scalable,
                    maintainable architectures while crafting engaging gameplay
                    experiences. I have worked as a Game Developer & Project Lead,
                    balancing technical implementation, game design, and production
                    planning.
                    <br />
                    <br />
                    I have also taught Game Development at university level and in public
                    schools, strengthening my leadership, mentorship, and communication
                    skills.
                </p>
            </section>

            {/* SKILLS */}
            <section className="py-20 px-6 bg-[#14141c]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12">Skills</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {Object.entries(skills).map(([category, items]) => (
                            <div
                                key={category}
                                className="bg-[#1b1b25] p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/10 transition"
                            >
                                <h3 className="text-xl font-semibold mb-4 capitalize">
                                    {category === "gameDev"
                                        ? "Game Development"
                                        : category === "programming"
                                            ? "Programming"
                                            : "Art & Tools"}
                                </h3>
                                <ul className="space-y-2 text-gray-300">
                                    {items.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EXPERIENCE */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
                <div className="bg-[#1b1b25] p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-semibold">
                        Bloom Effect Studios
                    </h3>
                    <p className="text-gray-400 mb-4">
                        Game Developer & Project Lead (2019–2026) – Hybrid, Brazil
                    </p>
                    <ul className="space-y-2 text-gray-300">
                        <li>• Designed and implemented scalable game systems</li>
                        <li>• Gameplay balancing and mechanic design</li>
                        <li>• Scope planning and milestone organization</li>
                        <li>• Performance optimization and complex debugging</li>
                        <li>• Publishing and testing commercial and prototype games</li>
                    </ul>
                </div>
            </section>

            {/* TEACHING */}
            <section className="py-20 px-6 bg-[#14141c]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Teaching Experience</h2>
                    <ul className="space-y-4 text-gray-300 text-lg">
                        <li>
                            • Game Development Instructor – Federal University of Juiz de
                            Fora
                        </li>
                        <li>
                            • Game Development Instructor – Public Schools (Brazil)
                        </li>
                    </ul>
                </div>
            </section>

            {/* EDUCATION */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Education</h2>
                <ul className="space-y-4 text-gray-300 text-lg">
                    <li>• Bachelor's Degree in Game Development – Harvard University</li>
                    <li>
                        • Bachelor's Degree in Computer Science – Federal University of
                        Juiz de Fora (Brazil)
                    </li>
                    <li>• Postgraduate Specialization in VFX (in progress)</li>
                </ul>
            </section>

            {/* GAMES */}
            <section id="games" className="py-20 px-6 bg-[#14141c]">
                <GamesProjects />
            </section>

            {/* CTA FOOTER */}
            <section
                id="contact"
                className="py-24 text-center px-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"
            >
                <h2 className="text-4xl font-bold mb-6">
                    Let’s build the next great game together.
                </h2>
                <a
                    href="mailto:senra.gabreusoares@gmail.com"
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-lg transition"
                >
                    Get in Touch
                </a>
            </section>
            <ContactGames />
        </div>
    );
};

export default GameDevPage;