// ─────────────────────────────────────────────────────────────────
//  ISLAND DATA — add any island here by filling the fields below
//  type: 'project' → game project island
//  type: 'link'    → external link island (itch.io, ArtStation, etc.)
// ─────────────────────────────────────────────────────────────────

export type Genre =
  | 'Commercial'
  | 'Game Jams'
  | 'Personal'
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
  'Commercial': {
    label: 'Commercial',
    color: '#7c3aed',
    center: [-26.5, -15],
  },
  'Game Jams': {
    label: 'Ação / Shooter',
    color: '#dc2626',
    center: [25, -20],
  },
  'Personal': {
    label: 'Tooling / Shaders',
    color: '#059669',
    center: [0, 28],
  },
  Links: {
    label: 'Links',
    color: '#f59e0b',
    center: [0, -30],
  },
};


export const ISLANDS: Island[] = [
  // ── Commercial ───────────────────────────────────────────
  {
    id: 'littlequarium',
    type: 'project',
    title: 'Cozy Littlequarium',
    description:
      'Cozy Littlequarium is a relaxing aquarium simulator that sits at the bottom of your screen! Take care, breed them, collect and decorate! ',
    genre: 'Commercial',
    year: '2025',
    tech: ['Unity', 'C#', 'Aseprite'],
    url: 'https://store.steampowered.com/app/3420070/Cozy_Littlequarium/',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3420070/677851c22b33fab57d75ac07260f6f5c18966289/header.jpg?t=1771266259',
    position: [-28, 0, -22],
  },
  {
    id: 'slime-slammer',
    type: 'project',
    title: 'Slime Slammer',
    description:
      'Slime Slammer is an idle PvZ-like tower defense game that sits at the bottom of your screen! ',
    genre: 'Commercial',
    year: '2026',
    tech: ['Unity', 'C#', 'Krita'],
    url: 'https://store.steampowered.com/app/4435840/Slime_Slammer/',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4435840/6d097c62b178f96b5888ce967fbb84a1f94a4027/capsule_616x353.jpg?t=1773678162',
    position: [-33, 0, -15],
  },


  // ── Ação / Shooter ────────────────────────────────────────────
  {
    id: 'turnon',
    type: 'project',
    title: 'Turn On The Light',
    description:
      'Game that portrays the cycle of depression, in an abstract way. A game about solving puzzles and unlock colors in a metroidvania style.',
    genre: 'Game Jams',
    year: '2023',
    tech: ['Unity', 'C#', 'Photoshop'],
    url: 'https://gabreu-senra.itch.io/turn-on-the-light',
    image:
      'https://img.itch.zone/aW1nLzEzMDQ1MTAwLnBuZw==/original/%2Fl7D6u.png',
    position: [28, 0, -26],
  },
  {
    id: 'whiletrue',
    type: 'project',
    title: 'While True',
    description:
      'Winner of the 2nd DevJams Best Art Award for "Crie Seus Jogos" While(true) is a infinite runner developed for the game jam "DevJam" with "Infinite Loop" theme.',
    genre: 'Game Jams',
    year: '2022',
    tech: ['Unity', 'C#', 'Aseprite'],
    url: 'https://gabreu-senra.itch.io/whiletrue',
    image:
      'https://img.itch.zone/aW1hZ2UvMjE4Mjc1OS8xMjg4OTAyMy5wbmc=/347x500/lDKfIr.png',
    position: [18, 0, -16],
  },
  {
    id: 'whyd',
    type: 'project',
    title: "Why the chicken DIDN'T cross the road",
    description:
      "A game where you are a crazy chicken in it's way to cross a road.",
    genre: 'Game Jams',
    year: '2022',
    tech: ['Unity', 'C#', 'Photoshop'],
    url: 'https://gabreu-senra.itch.io/why-the-chicken-didnt-cross-the-road',
    image:
      'https://img.itch.zone/aW1hZ2UvNDM2NDU5OC8yNjA1Mjk0NC5wbmc=/347x500/UDaI86.png',
    position: [28, 0, -16],
  },
  {
    id: 'sushi',
    type: 'project',
    title: "Pazzuru Packing Sushi",
    description:
      "You run a Japanese Food Delivey, but the boxes won't fill up on their own!, YOU have to fill them with all pieces the customer ordered, in a limited space of a Bento Box!",
    genre: 'Game Jams',
    year: '2024',
    tech: ['Unity', 'C#', 'Aseprite'],
    url: 'https://gabreu-senra.itch.io/pazuru-packing-sushi',
    image:
      'https://img.itch.zone/aW1hZ2UvMjI5NDI2MC8xMzU5NTUyNS5wbmc=/347x500/%2Fs950L.png',
    position: [20, 0, -24],
  },

  // ── Personal ─────────────────────────────────────────
  {
    id: 'ashen',
    type: 'project',
    title: 'Ashen Survivors',
    description:
      'In Ashen Survivors, you battle through relentless waves of corrupted warriors, twisted beasts, and nightmarish creatures inspired by the dark worlds of ancient fantasy.',
    genre: 'Personal',
    year: '2019',
    tech: ['Unity', 'C#', 'Aseprite'],
    url: 'https://gabreu-senra.itch.io/ashen-survivors',
    image:
      'https://img.itch.zone/aW1nLzI2MDUzNTkxLnBuZw==/original/v329Ow.png',
    position: [-8, 0, 28],
  },
  {
    id: 'wonder',
    type: 'project',
    title: 'Super Mario Bros - Wonder Style',
    description:
      'Fan-made remake of the very first level of Super Mario Bros, recreated with the vibrant visual style of Super Mario Bros. Wonder',
    genre: 'Personal',
    year: '2025',
    tech: ['Unity Editor', 'C#', 'Photoshop'],
    url: 'https://gabreu-senra.itch.io/super-mario-bros-wonder-style',
    image:
      'https://img.itch.zone/aW1nLzI1NzE3NzQ5LnBuZw==/original/NQ9Q%2F2.png',
    position: [8, 0, 28],
  },
  {
    id: 'connect',
    type: 'project',
    title: 'CONNECT',
    description:
      'A game created to teach pointers! It is my Undergraduate thesis project!',
    genre: 'Personal',
    year: '2025',
    tech: ['Unity Editor', 'C#', 'Aseprite'],
    url: 'https://gabreu-senra.itch.io/connect',
    image:
      'https://img.itch.zone/aW1nLzI0NDM2Nzg1LnBuZw==/315x250%23c/yMJfh1.png',
    position: [4, 0, 35],
  },
  {
    id: 'celeste',
    type: 'project',
    title: 'Celeste Educational Recreation',
    description:
      'Recreation of the Celeste game system, including movement, respawn, and level transitions.',
    genre: 'Personal',
    year: '2023',
    tech: ['Unity Editor', 'C#', 'Aseprite'],
    url: 'https://gabreu-senra.itch.io/celeste-educational-recreation',
    image:
      'https://img.itch.zone/aW1nLzE3MzE5MjU4LnBuZw==/315x250%23c/7SpPvv.png',
    position: [-4, 0, 35],
  },

  // ── Links ─────────────────────────────────────────────────────
  {
    id: 'link-itchio',
    type: 'link',
    title: 'itch.io',
    description: 'All my games on itch.io.',
    genre: 'Links',
    url: 'https://gabreu-senra.itch.io/',
    image:
      'https://assetsio.gnwcdn.com/Itch.io_logo.jpg?width=1200&height=600&fit=crop&enable=upscale&auto=webp',
    position: [-8, 0, -30],
  },
  {
    id: 'link-artstation',
    type: 'link',
    title: 'ArtStation',
    description: 'Real-Time VFX',
    genre: 'Links',
    url: 'https://www.artstation.com/gabreusenra',
    image:
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=400&h=225&fit=crop',
    position: [0, 0, -34],
  },
  {
    id: 'link-curriculo',
    type: 'link',
    title: 'Resume',
    description: 'My Resume in PDF',
    genre: 'Links',
    url: '/Gabriel Senra Resume.pdf',
    image:
      '/assets/images/profile.png',
    position: [8, 0, -30],
  },
];

// Backward-compat alias used by older imports
export type Project = Island;
export const PROJECTS = ISLANDS;
