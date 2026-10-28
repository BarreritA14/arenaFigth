import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Clock3,
  Gamepad2,
  MapPin,
  Search,
  Shield,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import AppHeader from "./components/AppHeader.jsx";
import MatchCard from "./components/MatchCard.jsx";
import StandingsPanel from "./components/StandingsPanel.jsx";
import { matches, standings } from "./data/tournament.js";
import "./App.css";

// Las opciones del filtro usan los mismos valores que el estado de cada partido.
const filters = [
  { label: "Todos", value: "all" },
  { label: "En vivo", value: "live" },
  { label: "Por jugar", value: "upcoming" },
  { label: "Finalizados", value: "finished" },
];

// La aplicacion reune la navegacion, el calendario, la clasificacion y la inscripcion local.
function App() {
  // Estos estados controlan la busqueda, el filtro seleccionado y el aviso del formulario.
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  // El calendario responde a ambos controles sin modificar los datos originales.
  const visibleMatches = matches.filter((match) => {
    const matchesFilter =
      activeFilter === "all" || match.status === activeFilter;
    const searchableText =
      `${match.homeTeam} ${match.awayTeam} ${match.game}`.toLowerCase();
    return (
      matchesFilter && searchableText.includes(searchTerm.trim().toLowerCase())
    );
  });

  // La solicitud se valida en el navegador y se aclara que aun no existe un servidor.
  function handleRegistration(event) {
    event.preventDefault();
    setRegistrationMessage(
      "Solicitud registrada en esta vista de demostracion; todavia no se envia a un servidor.",
    );
    event.currentTarget.reset();
  }

  return (
    <div className="app-shell">
      <AppHeader />

      <main>
        {/* Presenta el torneo y su encuentro en vivo como una banda informativa. */}
        <section className="arena-banner" aria-labelledby="page-title">
          <div className="arena-banner__copy">
            <p className="eyebrow">
              <Sparkles size={15} aria-hidden="true" />
              UNIVERSIDAD ALTAMIRA · TEMPORADA 2026
            </p>
            <h1 id="page-title">
              La Copa Pixel <span>se juega aquí.</span>
            </h1>
            <p className="arena-banner__intro">
              La comunidad gamer del campus se encuentra en Arena U. Sigue los
              partidos y alienta a tu equipo.
            </p>
            <a className="button button--light" href="#partidos">
              Ver calendario <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          {/* El destacado resalta el encuentro que está en curso. */}
          <div className="live-feature" aria-label="Partido en vivo">
            <div className="live-feature__topline">
              <span className="live-indicator">
                <span aria-hidden="true" /> EN VIVO
              </span>
              <span>FINAL · MAPA 2</span>
            </div>
            <div className="live-feature__teams">
              <div>
                <span className="team-crest team-crest--lime">
                  <Shield size={20} aria-hidden="true" />
                </span>
                <strong>Byte Club</strong>
              </div>
              <span className="live-feature__score">
                2 <i>:</i> 1
              </span>
              <div>
                <span className="team-crest team-crest--coral">
                  <CircleDot size={20} aria-hidden="true" />
                </span>
                <strong>Lag Cero</strong>
              </div>
            </div>
            <div className="live-feature__footer">
              <span>
                <Gamepad2 size={15} aria-hidden="true" /> Valorant
              </span>
              <span>
                <MapPin size={15} aria-hidden="true" /> Arena central
              </span>
            </div>
          </div>
        </section>

        {/* Resume las cifras de la jornada en una fila compacta y fácil de escanear. */}
        <section className="quick-stats" aria-label="Resumen de la Copa Pixel">
          <div className="quick-stat">
            <span className="quick-stat__icon quick-stat__icon--lime">
              <UsersRound size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>13</strong>
              <span>equipos inscritos</span>
            </div>
          </div>
          <div className="quick-stat">
            <span className="quick-stat__icon quick-stat__icon--blue">
              <CalendarDays size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>8</strong>
              <span>partidos esta semana</span>
            </div>
          </div>
          <div className="quick-stat">
            <span className="quick-stat__icon quick-stat__icon--coral">
              <Trophy size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>04</strong>
              <span>días para la final</span>
            </div>
          </div>
          <div className="quick-stat">
            <span className="quick-stat__icon quick-stat__icon--yellow">
              <Clock3 size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>18:00</strong>
              <span>siguiente encuentro</span>
            </div>
          </div>
        </section>

        {/* Distribuye el contenido operativo en calendario y clasificación. */}
        <div className="content-grid">
          <section
            className="schedule-section"
            id="partidos"
            aria-labelledby="schedule-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">MIÉRCOLES · 7 OCTUBRE</p>
                <h2 id="schedule-title">Partidos de hoy</h2>
              </div>
              <a className="text-link" href="#inscripcion">
                Inscribir equipo <ChevronRight size={16} aria-hidden="true" />
              </a>
            </div>

            {/* El buscador filtra equipos y juegos; los botones filtran por estado. */}
            <div className="schedule-tools">
              <label className="search-field">
                <Search size={17} aria-hidden="true" />
                <span className="visually-hidden">Buscar equipos o juegos</span>
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar equipo o juego"
                />
                <kbd>/</kbd>
              </label>
              <div
                className="filter-list"
                role="group"
                aria-label="Filtrar partidos por estado"
              >
                {filters.map((filter) => (
                  <button
                    className={`filter-button${activeFilter === filter.value ? " is-active" : ""}`}
                    key={filter.value}
                    type="button"
                    aria-pressed={activeFilter === filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cada partido reutiliza MatchCard y recibe sus datos mediante props. */}
            <div className="match-list" aria-live="polite">
              {visibleMatches.length > 0 ? (
                visibleMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))
              ) : (
                <div className="empty-state">
                  <Search size={22} aria-hidden="true" />
                  <strong>No encontramos partidos</strong>
                  <span>Prueba con otro equipo o cambia el filtro.</span>
                </div>
              )}
            </div>
          </section>

          {/* La clasificación es una pieza reutilizable que recibe sus filas como props. */}
          <aside className="sidebar-column" aria-label="Información del torneo">
            <StandingsPanel teams={standings} />
            <section className="venue-note" aria-labelledby="venue-title">
              <div className="venue-note__icon">
                <MapPin size={19} aria-hidden="true" />
              </div>
              <div>
                <p className="eyebrow">NOS VEMOS EN</p>
                <h3 id="venue-title">Arena central</h3>
                <p>Edificio de Innovación, planta baja.</p>
                <a href="#inscripcion">
                  Inscribir mi equipo{" "}
                  <ArrowDownRight size={15} aria-hidden="true" />
                </a>
              </div>
            </section>
          </aside>
        </div>

        {/* El formulario demuestra una interacción local, sin conectarse a un servidor. */}
        <section
          className="registration-section"
          id="inscripcion"
          aria-labelledby="registration-title"
        >
          <div className="registration-copy">
            <p className="eyebrow">TU EQUIPO TAMBIÉN PUEDE JUGAR</p>
            <h2 id="registration-title">Quedan 3 cupos para la Copa Pixel.</h2>
            <p>
              Déjanos los datos del equipo y el comité organizador se pondrá en
              contacto.
            </p>
          </div>
          <form className="registration-form" onSubmit={handleRegistration}>
            <label>
              <span>Nombre del equipo</span>
              <input
                name="teamName"
                autoComplete="organization"
                placeholder="Ej. Los Pixelados"
                required
              />
            </label>
            <label>
              <span>Correo de contacto</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="equipo@correo.com"
                required
              />
            </label>
            <button className="button button--dark" type="submit">
              Enviar solicitud <ArrowRight size={16} aria-hidden="true" />
            </button>
            <p className="form-feedback" role="status">
              {registrationMessage ||
                "Las solicitudes de esta demo no se envían ni se guardan en un servidor."}
            </p>
          </form>
        </section>
      </main>

      {/* El pie identifica el producto y enlaza con la guía de aprendizaje. */}
      <footer className="site-footer">
        <a
          className="brand brand--footer"
          href="#inicio"
          aria-label="Arena U, volver al inicio"
        >
          <span className="brand__mark">
            <Gamepad2 size={20} aria-hidden="true" />
          </span>
          <span className="brand__name">
            ARENA<span>U</span>
          </span>
        </a>
        <p>Copa Pixel · Universidad Altamira · 2026</p>
        <a href="/README.md">
          Guía del proyecto <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}

export default App;
