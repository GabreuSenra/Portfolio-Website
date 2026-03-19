import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, Gamepad, Palette } from 'lucide-react';

interface LinksPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  {
    label: 'itch.io',
    description: 'My Games',
    url: 'https://gabreu-senra.itch.io/',
    icon: Gamepad,
    color: '#FA5C5C',
  },
  {
    label: 'ArtStation',
    description: 'Real-Time VFX',
    url: 'https://www.artstation.com/gabreusenra',
    icon: Palette,
    color: '#13AFF0',
  },
  {
    label: 'Resume',
    description: 'Download PDF',
    url: '/Gabriel Senra Resume.pdf',
    icon: FileText,
    color: '#34D399',
  },
];

export default function LinksPanel({ isOpen, onClose }: LinksPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: 'tween', ease: [0.25, 0.1, 0.25, 1], duration: 0.25 }}
            className="absolute top-0 right-0 h-full w-72 z-50 flex flex-col"
            style={{
              background: 'hsla(222, 47%, 5%, 0.95)',
              backdropFilter: 'blur(16px)',
              borderLeft: '1px solid rgba(59,130,246,0.15)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid rgba(59,130,246,0.1)' }}
            >
              <div>
                <h3 className="text-base font-semibold tracking-tight text-slate-100">
                  Links
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest mt-0.5" style={{ color: '#4B6A8A' }}>
                  Profiles and Resources
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#4B6A8A' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4B6A8A')}
              >
                <X size={16} />
              </button>
            </div>

            {/* Info */}
            <div className="px-6 pt-5 pb-3">
              <p className="text-xs leading-relaxed" style={{ color: '#4B6A8A' }}>
               Game Developer, Programmer and Game Designer. Especialist in Unity and VFX Artist.
              </p>
            </div>

            {/* Links */}
            <div className="flex-1 px-4 py-2 flex flex-col gap-2">
              {links.map(link => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-150"
                    style={{
                      background: `${link.color}0d`,
                      border: `1px solid ${link.color}1a`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = `${link.color}1a`;
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = `${link.color}44`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = `${link.color}0d`;
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = `${link.color}1a`;
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${link.color}18`, color: link.color }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-200 leading-none mb-1">
                        {link.label}
                      </p>
                      <p className="font-mono text-[10px] truncate" style={{ color: '#4B6A8A' }}>
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink size={12} style={{ color: '#4B6A8A' }} />
                  </a>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4"
              style={{ borderTop: '1px solid rgba(59,130,246,0.08)' }}
            >
              <p className="font-mono text-[10px] text-center" style={{ color: '#2D4A66' }}>
                Press <span style={{ color: '#3B82F6' }}>Tab</span> to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
