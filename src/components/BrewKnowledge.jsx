import { useHistory } from '../hooks/useHistory';

const BackArrow = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
    <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function formatDate(isoString) {
  const d = new Date(isoString);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day} / ${month} / ${year}`;
}

function TimeDeltaBadge({ timeDelta }) {
  if (!timeDelta || timeDelta.type === null) {
    return <span className="bk-tiempo-neutro">sin fase final</span>;
  }
  if (timeDelta.type === 'extra') {
    return <span className="bk-tiempo-extra">+{timeDelta.seconds}s Extra</span>;
  }
  if (timeDelta.type === 'short') {
    return <span className="bk-tiempo-faltante">−{timeDelta.seconds}s Faltantes</span>;
  }
  return null;
}

function BrewCard({ entry, onDelete }) {
  return (
    <div className="recipe-card">
      {/* Same structure as RecipeList card-top, but right side is date + timedelta instead of color-dot */}
      <div className="card-top">
        <div>
          <div className="recipe-name">{entry.recipeName}</div>
          <div className="recipe-method">{entry.method || '—'}</div>
        </div>
        <div className="bk-fecha-grupo">
          <span className="bk-card-fecha">{formatDate(entry.date)}</span>
          <TimeDeltaBadge timeDelta={entry.timeDelta} />
        </div>
      </div>

      {/* Exact same stats-row / stat structure as RecipeList */}
      <div className="stats-row">
        <div className="stat"><span>Café</span>{entry.coffee}g</div>
        <div className="stat"><span>Agua</span>{entry.water}ml</div>
        <div className="stat"><span>Temp</span>{entry.temperature}°C</div>
        <div className="stat"><span>Ratio</span>{entry.ratio || '—'}</div>
      </div>

      {/* Same card-actions dimensions; btn-preparar overridden to celeste via bk-btn-detalle */}
      <div className="card-actions">
        <button className="btn-preparar bk-btn-detalle">
          Detalle de la preparación
        </button>
        <button
          className="btn-icon btn-icon-danger"
          onClick={() => onDelete(entry.id)}
          aria-label="Eliminar preparación"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function BrewKnowledge({ onBack }) {
  const { history, deleteBrewEntry } = useHistory();

  return (
    <div className="bk-screen">
      {/* Header */}
      <div className="screen-header" style={{ marginTop: '16px' }}>
        <button className="back-btn" onClick={onBack}>
          <BackArrow /> Volver
        </button>
        <span />
      </div>

      {/* Título */}
      <div className="bk-header">
        <div className="bk-titulo">Conociendo mi Café</div>
      </div>

      {/* Botones — misma clase action-btn, solo se sobreescribe color */}
      <div className="action-row">
        <button className="action-btn bk-btn-scaa">SCAA Flavor Wheel</button>
        <button className="action-btn bk-btn-wcr">WCR Sensory Lexicon</button>
      </div>

      {/* Historial */}
      <div className="bk-historial-section">
        <div className="bk-historial-label">Historial de Preparaciones</div>

        {history.length === 0 ? (
          <div className="bk-historial-vacio">
            <p>Aún no hay preparaciones guardadas.<br />Completá una receta para verla aquí.</p>
          </div>
        ) : (
          history.map((entry) => (
            <BrewCard key={entry.id} entry={entry} onDelete={deleteBrewEntry} />
          ))
        )}
      </div>
    </div>
  );
}
