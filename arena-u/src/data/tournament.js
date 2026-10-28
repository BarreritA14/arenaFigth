// Estos objetos representan los datos que el componente padre pasa como props.
export const matches = [
  {
    id: "match-byte-lag",
    homeTeam: "Byte Club",
    awayTeam: "Lag Cero",
    game: "Valorant",
    time: "18:00",
    status: "live",
    homeScore: 2,
    awayScore: 1,
    court: "Arena central",
    homeTone: "lime",
    awayTone: "coral",
  },
  {
    id: "match-pixel-glitch",
    homeTeam: "Los Pixelados",
    awayTeam: "Glitch Crew",
    game: "Rocket League",
    time: "20:00",
    status: "upcoming",
    court: "Arena central",
    homeTone: "blue",
    awayTone: "violet",
  },
  {
    id: "match-neon-ctrl",
    homeTeam: "Neon Knights",
    awayTeam: "Ctrl Alt Elite",
    game: "Super Smash Bros.",
    time: "16:00",
    status: "finished",
    homeScore: 3,
    awayScore: 2,
    court: "Sala Pixel",
    homeTone: "yellow",
    awayTone: "blue",
  },
];

// Tabla local de posiciones, lista para sustituirse por datos de un servicio.
export const standings = [
  { name: "Byte Club", played: 4, points: 10, tone: "lime" },
  { name: "Los Pixelados", played: 4, points: 9, tone: "blue" },
  { name: "Lag Cero", played: 4, points: 7, tone: "coral" },
  { name: "Neon Knights", played: 4, points: 6, tone: "yellow" },
];
