import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Gamepad2, Anchor } from 'lucide-react';
import { Island } from '@/data/projects';

interface ProjectCardProps {
  project: Island | null;
  onInteract: (project: Island) => void;
}

const GENRE_COLORS: Record<string, string> = {
  'RPG / Narrativo':  '#7c3aed',
  'Ação / Shooter':   '#dc2626',
  'Tooling / Shaders':'#059669',
  'Links':            '#f59e0b',
};

const cardVariants = {
  hidden:  { y: 20, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'tween', ease: [0.25, 0.1, 0.25, 1], duration: 0.22 } },
  exit:    { y: 14, opacity: 0, scale: 0.96, transition: { duration: 0.16 } },
};

const promptVariants = {
  animate: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' } },
};

export default function ProjectCard({ project, onInteract }: ProjectCardProps) {
  const genreColor = project ? (GENRE_COLORS[project.genre] ?? '#3B82F6') : '#3B82F6';
  const isLink = project?.type === 'link';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute bottom-6 right-6 w-80 z-50"
          style={{
            borderRadius: '12px',
            background: 'hsla(222, 47%, 4%, 0.90)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 10px 15px -3px rgba(0,0,0,0.6)',
            border: `1px solid ${genreColor}22`,
          }}
        >
          {/* Accent bar */}
          <div
            className="h-0.5 w-full rounded-t-[12px]"
            style={{ background: `linear-gradient(90deg, ${genreColor}, transparent)` }}
          />

          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: '130px' }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) saturate(0.85)' }}
            />
            <div className="absolute top-3 left-3">
              <span className="badge-tech" style={{ borderColor: `${genreColor}44`, color: genreColor }}>
                {project.genre}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start gap-2 mb-1.5">
              <h2 className="text-lg font-semibold tracking-tight text-slate-50 leading-tight flex-1">
                {project.title}
              </h2>
              <motion.div variants={promptVariants} animate="animate" className="shrink-0 mt-0.5">
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#93C5FD' }}
                >
                  SPACE
                </div>
              </motion.div>
            </div>

            {project.year && (
              <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: '#4B6A8A' }}>
                {project.year}
              </p>
            )}

            <p className="text-sm leading-relaxed mb-4" style={{ color: '#94A3B8', maxWidth: '28ch' }}>
              {project.description}
            </p>

            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map(t => (
                  <span key={t} className="badge-tech">{t}</span>
                ))}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => onInteract(project)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-150"
              style={{ background: `${genreColor}22`, border: `1px solid ${genreColor}44`, color: genreColor }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = `${genreColor}33`;
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${genreColor}88`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = `${genreColor}22`;
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${genreColor}44`;
              }}
            >
              {isLink ? <Anchor size={14} /> : <Gamepad2 size={14} />}
              {isLink ? `Visitar ${project.title}` : 'Jogar no itch.io'}
              <ExternalLink size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
