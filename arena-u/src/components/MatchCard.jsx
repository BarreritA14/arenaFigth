import { ArrowUpRight, Clock3, Gamepad2, MapPin, Shield } from "lucide-react";

// Traduce los estados internos a etiquetas legibles para las personas.
const statusLabels = {
  live: "En vivo",
  upcoming: "Por jugar",
  finished: "Finalizado",
};

// Una tarjeta representa cualquier partido; sus equipos, hora y estado llegan por props.
export default function MatchCard({
  homeTeam,
  awayTeam,
  game,
  time,
  status,
  homeScore,
  awayScore,
  court,
  homeTone,
  awayTone,
}) {
  const hasScore = status === "finished" || status === "live";
  return (
    <article className={`match-card match-card--${status}`}>
      <div className="match-card__meta">
        <span className={`match-status match-status--${status}`}>
          {status === "live" && (
            <span className="match-status__pulse" aria-hidden="true" />
          )}
          {statusLabels[status]}
        </span>
        <span className="match-card__game">
          <Gamepad2 size={14} aria-hidden="true" /> {game}
        </span>
      </div>
      <div className="match-card__teams">
        <div className="match-team">
          <span className={`team-crest team-crest--${homeTone}`}>
            <Shield size={19} aria-hidden="true" />
          </span>
          <strong>{homeTeam}</strong>
        </div>
        <div
          className={`match-score${hasScore ? "" : " match-score--upcoming"}`}
          aria-label={hasScore ? `${homeScore} a ${awayScore}` : "Por comenzar"}
        >
          {hasScore ? (
            <>
              <span>{homeScore}</span>
              <i>:</i>
              <span>{awayScore}</span>
            </>
          ) : (
            <span>VS</span>
          )}
        </div>
        <div className="match-team match-team--away">
          <strong>{awayTeam}</strong>
          <span className={`team-crest team-crest--${awayTone}`}>
            <Shield size={19} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="match-card__footer">
        <span>
          <Clock3 size={14} aria-hidden="true" /> {time}
        </span>
        <span>
          <MapPin size={14} aria-hidden="true" /> {court}
        </span>
        <a
          href="#inscripcion"
          aria-label={`Ver detalles de ${homeTeam} contra ${awayTeam}`}
        >
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
