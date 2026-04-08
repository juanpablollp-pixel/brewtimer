import { motion } from 'framer-motion';
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

function BrewCard({ entry, onDelete, onDetalle }) {
  const flavors = entry.sensorAnalysis?.flavorNotes ?? [];

  return (
    <div className="recipe-card">
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

      <div className="stats-row">
        <div className="stat"><span>Café</span>{entry.coffee}g</div>
        <div className="stat"><span>Agua</span>{entry.water}ml</div>
        <div className="stat"><span>Temp</span>{entry.temperature}°C</div>
        <div className="stat"><span>Ratio</span>{entry.ratio || '—'}</div>
      </div>

      <div className="card-actions">
        <button className="btn-preparar bk-btn-detalle" onClick={onDetalle}>
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

      {flavors.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '10px 0 4px' }}>
          {flavors.map(item => (
            <span
              key={item.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 10px',
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 600,
                background: item.color,
                color: item.darkText ? '#111' : '#fff',
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrewKnowledge({ onBack, onFlavorWheel, onDetalle }) {
  const { history, deleteBrewEntry } = useHistory();

  return (
    <motion.div
      className="bk-screen"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.3 }}
      onDragEnd={(_, info) => { if (info.offset.x > 60) onBack(); }}
      style={{ touchAction: 'pan-y' }}
    >
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

      {/* Botones */}
      <div className="action-row">
        <button className="action-btn bk-btn-scaa" onClick={onFlavorWheel}>SCAA Flavor Wheel</button>
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
            <BrewCard
              key={entry.id}
              entry={entry}
              onDelete={deleteBrewEntry}
              onDetalle={() => onDetalle(entry)}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}
