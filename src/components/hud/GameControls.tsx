import { Link, Map } from 'lucide-react';

interface GameControlsProps {
  linksPanelOpen: boolean;
  onToggleLinks: () => void;
}

export default function GameControls({ linksPanelOpen, onToggleLinks }: GameControlsProps) {
  return (
    <>
      {/* Top-left: Title */}
      <div className="absolute top-5 left-5 z-30">
        <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#2D4A66' }}>
          Archipelago
        </p>
        <h1 className="text-xl font-semibold tracking-tight" style={{ color: '#E2EAF4' }}>
          Gamedev Portfolio
        </h1>
        <div className="flex gap-1.5 mt-2">
          <span className="badge-tech">Unity</span>
          <span className="badge-tech">C# / HLSL</span>
        </div>
      </div>

      {/* Top-right: Links toggle */}
      <div className="absolute top-5 right-5 z-30">
        <button
          onClick={onToggleLinks}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-150 font-mono text-[11px] uppercase tracking-wider"
          style={{
            background: linksPanelOpen ? 'rgba(59,130,246,0.2)' : 'hsla(222, 47%, 6%, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59,130,246,0.2)',
            color: linksPanelOpen ? '#93C5FD' : '#4B6A8A',
          }}
          onMouseEnter={e => {
            if (!linksPanelOpen) {
              (e.currentTarget as HTMLButtonElement).style.color = '#93C5FD';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.4)';
            }
          }}
          onMouseLeave={e => {
            if (!linksPanelOpen) {
              (e.currentTarget as HTMLButtonElement).style.color = '#4B6A8A';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.2)';
            }
          }}
        >
          <Link size={13} />
          Links
          <span className="opacity-50">[Tab]</span>
        </button>
      </div>

      {/* Bottom-left: Controls legend */}
      <div
        className="absolute bottom-5 left-5 z-30 flex flex-col gap-1.5 px-4 py-3 rounded-xl"
        style={{
          background: 'hsla(222, 47%, 4%, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59,130,246,0.1)',
        }}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#2D4A66' }}>
          Controles
        </p>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {['W','A','S','D'].map(k => (
              <kbd
                key={k}
                className="w-5 h-5 flex items-center justify-center rounded text-[9px] font-mono"
                style={{
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  color: '#93C5FD',
                }}
              >
                {k}
              </kbd>
            ))}
          </div>
          <span className="text-[10px]" style={{ color: '#4B6A8A' }}>Navigate</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 h-5 flex items-center justify-center rounded text-[9px] font-mono"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#93C5FD' }}>
            SPACE
          </kbd>
          <span className="text-[10px]" style={{ color: '#4B6A8A' }}>Anchor</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 h-5 flex items-center justify-center rounded text-[9px] font-mono"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#93C5FD' }}>
            TAB
          </kbd>
          <span className="text-[10px]" style={{ color: '#4B6A8A' }}>Links</span>
        </div>
      </div>

      {/* Bottom-center: Genre legend */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5 px-5 py-2.5 rounded-xl"
        style={{
          background: 'hsla(222, 47%, 4%, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59,130,246,0.1)',
        }}
      >
        {[
          { color: '#7c3aed', label: 'Commercials' },
          { color: '#dc2626', label: 'Game Jams' },
          { color: '#059669', label: 'Personal' },
          { color: '#f59e0b', label: 'Links' },
        ].map(g => (
          <div key={g.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm" style={{ background: g.color }} />
            <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: '#4B6A8A' }}>
              {g.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
