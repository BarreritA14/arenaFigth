import { ArrowUpRight, Gamepad2 } from "lucide-react";

// La cabecera mantiene la marca, la navegacion por secciones y la accion principal.
export default function AppHeader() {
  return (
    <header className="site-header" id="inicio">
      <a className="brand" href="#inicio" aria-label="Arena U, inicio">
        <span className="brand__mark">
          <Gamepad2 size={21} aria-hidden="true" />
        </span>
        <span className="brand__name">
          ARENA<span>U</span>
        </span>
      </a>
      <nav className="primary-nav" aria-label="Navegacion principal">
        <a
          className="primary-nav__link is-current"
          href="#partidos"
          aria-current="page"
        >
          Partidos
        </a>
        <a className="primary-nav__link" href="#clasificacion">
          Clasificación
        </a>
        <a className="primary-nav__link" href="#inscripcion">
          La Copa
        </a>
      </nav>
      <a className="header-action" href="#inscripcion">
        Inscribir equipo <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </header>
  );
}
