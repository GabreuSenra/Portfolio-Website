export default function CompassHUD() {
  return (
    <div
      className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-4 py-2 rounded-xl"
      style={{
        background: 'hsla(222, 47%, 4%, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(59,130,246,0.1)',
      }}
    >
      {[
        { dir: 'N', label: 'RPG / Narrativo', active: false },
        { dir: 'C', label: 'Hub', active: true },
        { dir: 'S', label: 'Tooling', active: false },
        { dir: 'E', label: 'Ação', active: false },
      ].map(({ dir, label, active }) => (
        <div key={dir} className="flex items-center gap-1.5">
          <span
            className="font-mono text-[11px] font-semibold w-4 text-center"
            style={{ color: active ? '#3B82F6' : '#2D4A66' }}
          >
            {dir}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: '#2D4A66' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
