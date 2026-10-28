import { ArrowUpRight, Shield } from "lucide-react";

// La tabla recibe los equipos del padre para separar presentacion y datos.
export default function StandingsPanel({ teams }) {
  return (
    <section
      className="standings-panel"
      id="clasificacion"
      aria-labelledby="standings-title"
    >
      <div className="standings-heading">
        <div>
          <p className="eyebrow">FASE DE GRUPOS</p>
          <h2 id="standings-title">Clasificación</h2>
        </div>
        <span className="standings-heading__season">GRUPO A</span>
      </div>
      <div className="standings-table-wrap">
        <table className="standings-table">
          <caption className="visually-hidden">
            Posiciones del grupo A de la Copa Pixel
          </caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Equipo</th>
              <th scope="col">PJ</th>
              <th scope="col">PTS</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.name}>
                <td className="standings-table__rank">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td>
                  <span className={`team-crest team-crest--${team.tone}`}>
                    <Shield size={15} aria-hidden="true" />
                  </span>
                  <strong>{team.name}</strong>
                </td>
                <td>{team.played}</td>
                <td className="standings-table__points">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a className="panel-link" href="#partidos">
        Ver tabla completa <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
