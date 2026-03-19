// ─────────────────────────────────────────────────────────────────
//  ISLAND DATA — add any island here by filling the fields below
//  type: 'project' → game project island
//  type: 'link'    → external link island (itch.io, ArtStation, etc.)
// ─────────────────────────────────────────────────────────────────

export type Genre =
  | 'RPG / Narrativo'
  | 'Ação / Shooter'
  | 'Tooling / Shaders'
  | 'Links';

export type IslandType = 'project' | 'link';

export interface Island {
  id: string;
  type: IslandType;
  title: string;
  description: string;
  genre: Genre;
  year?: string;
  tech?: string[];
  url: string;
  image: string;
  /** World-space position [x, y, z] */
  position: [number, number, number];
}

// ─── Cluster definitions (center determines zone disc position) ───
export const GENRE_CLUSTERS: Record<
  Genre,
  { label: string; color: string; center: [number, number] }
> = {
  'RPG / Narrativo': {
    label: 'RPG / Narrativo',
    color: '#7c3aed',
    center: [-25, -20],
  },
  'Ação / Shooter': {
    label: 'Ação / Shooter',
    color: '#dc2626',
    center: [25, -20],
  },
  'Tooling / Shaders': {
    label: 'Tooling / Shaders',
    color: '#059669',
    center: [0, 28],
  },
  Links: {
    label: 'Links',
    color: '#f59e0b',
    center: [0, -32],
  },
};

// ─────────────────────────────────────────────────────────────────
//  ADD YOUR ISLANDS BELOW — copy any block and fill the fields
// ─────────────────────────────────────────────────────────────────
export const ISLANDS: Island[] = [
  // ── RPG / Narrativo ───────────────────────────────────────────
  {
    id: 'echoes-of-aether',
    type: 'project',
    title: 'Echoes of Aether',
    description:
      'RPG de ação em perspectiva isométrica com sistema de diálogo ramificado e crafting de feitiços.',
    genre: 'RPG / Narrativo',
    year: '2024',
    tech: ['Unity', 'C#', 'FMOD'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop',
    position: [-28, 0, -22],
  },
  {
    id: 'silent-cartographer',
    type: 'project',
    title: 'Silent Cartographer',
    description:
      'Jogo narrativo de exploração. O mapa se revela conforme a história avança. 8h de conteúdo.',
    genre: 'RPG / Narrativo',
    year: '2023',
    tech: ['Unity', 'C#', 'Ink'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&h=225&fit=crop',
    position: [-22, 0, -15],
  },
  {
    id: 'verdant-oath',
    type: 'project',
    title: 'Verdant Oath',
    description:
      'Deck-building RPG inspirado em Slay the Spire com mundo aberto procedimental.',
    genre: 'RPG / Narrativo',
    year: '2023',
    tech: ['Godot 4', 'GDScript'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
    position: [-32, 0, -14],
  },

  // ── Ação / Shooter ────────────────────────────────────────────
  {
    id: 'neon-breach',
    type: 'project',
    title: 'Neon Breach',
    description:
      'Roguelite top-down shooter com mecânicas de ricochete e modificadores de bala em tempo real.',
    genre: 'Ação / Shooter',
    year: '2024',
    tech: ['Unity', 'C#', 'DOTween'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&h=225&fit=crop',
    position: [28, 0, -22],
  },
  {
    id: 'overcharge',
    type: 'project',
    title: 'Overcharge',
    description:
      'Bullet hell 2D com sistema de sobrecarga elétrica. Participação no Global Game Jam 2024.',
    genre: 'Ação / Shooter',
    year: '2024',
    tech: ['Unity', 'C#', 'Shader Graph'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=400&h=225&fit=crop',
    position: [22, 0, -15],
  },
  {
    id: 'void-runner',
    type: 'project',
    title: 'Void Runner',
    description:
      'Runner infinito com mecânicas de manipulação de gravidade e wall-running procedural.',
    genre: 'Ação / Shooter',
    year: '2022',
    tech: ['Unity', 'C#'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=225&fit=crop',
    position: [32, 0, -13],
  },

  // ── Tooling / Shaders ─────────────────────────────────────────
  {
    id: 'prism-shader-pack',
    type: 'project',
    title: 'Prism Shader Pack',
    description:
      'Coleção de 20+ shaders URP para Unity: dissolve, hologramas, fresnel e distorção de calor.',
    genre: 'Tooling / Shaders',
    year: '2024',
    tech: ['HLSL', 'Shader Graph', 'Unity URP'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
    position: [-8, 0, 28],
  },
  {
    id: 'level-forge',
    type: 'project',
    title: 'Level Forge',
    description:
      'Editor procedural de dungeons integrado ao Unity Editor. Exporta para ScriptableObject.',
    genre: 'Tooling / Shaders',
    year: '2023',
    tech: ['Unity Editor', 'C#', 'Burst'],
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=225&fit=crop',
    position: [8, 0, 28],
  },

  // ── Links ─────────────────────────────────────────────────────
  {
    id: 'link-itchio',
    type: 'link',
    title: 'itch.io',
    description: 'Todos os meus jogos publicados na plataforma itch.io.',
    genre: 'Links',
    url: 'https://itch.io',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop',
    position: [-8, 0, -34],
  },
  {
    id: 'link-artstation',
    type: 'link',
    title: 'ArtStation',
    description: 'Portfolio de arte, concept art e shaders no ArtStation.',
    genre: 'Links',
    url: 'https://artstation.com',
    image:
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=400&h=225&fit=crop',
    position: [0, 0, -38],
  },
  {
    id: 'link-curriculo',
    type: 'link',
    title: 'Currículo',
    description: 'Meu currículo completo em PDF — experiência e formação.',
    genre: 'Links',
    url: '#',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
    position: [8, 0, -34],
  },
];

// Backward-compat alias used by older imports
export type Project = Island;
export const PROJECTS = ISLANDS;
