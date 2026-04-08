import { useState, useMemo } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { calcularRecomendacionTemp } from '../utils/brewRecommendations';

function formatDate(isoString) {
  const d = new Date(isoString);
  const day   = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year  = d.getFullYear();
  const hh    = d.getHours().toString().padStart(2, '0');
  const mm    = d.getMinutes().toString().padStart(2, '0');
  return `${day} / ${month} / ${year} — ${hh}:${mm}`;
}

function fmtTime(seconds) {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function fmtRatio(ratio) {
  if (!ratio) return '—';
  const parts = ratio.split(':');
  if (parts.length === 2) return `1:${Math.round(parseFloat(parts[1]))}`;
  return ratio;
}

// ── Tueste selector ──────────────────────────────────────────────────────────
const TUESTES = [
  { key: 'claro',  label: 'Claro',  sub: '92–95°c' },
  { key: 'medio',  label: 'Medio',  sub: '88–92°c' },
  { key: 'oscuro', label: 'Oscuro', sub: '85–88°c' },
];

// ── Sensory circles ──────────────────────────────────────────────────────────
function CirculosAtributo({ nombre, desc, clase, valor, onChange }) {
  return (
    <div className={`bd-atributo-row ${clase}`}>
      <div className="bd-atributo-header">
        <span className="bd-atributo-nombre">{nombre}</span>
        <span className="bd-atributo-desc">{desc}</span>
      </div>
      <div className="bd-circulos">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`bd-circulo${valor === n ? ' activo' : ''}`}
            onClick={() => onChange(valor === n ? null : n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Molienda recommendation (based on timeDelta) ─────────────────────────────
function RecMolienda({ timeDelta }) {
  if (!timeDelta || timeDelta.type === null) return null;
  const esExtra = timeDelta.type === 'extra';
  return (
    <div className={`bd-rec-molienda ${esExtra ? 'grueso' : 'fino'}`}>
      <span className="bd-rec-icono">⚙️</span>
      <div className="bd-rec-texto">
        {esExtra ? 'Moler más Grueso' : 'Moler más Fino'}
        <span>{esExtra ? 'La extracción superó el tiempo objetivo' : 'La extracción no alcanzó el tiempo objetivo'}</span>
      </div>
    </div>
  );
}

// ── Temperature recommendation block ─────────────────────────────────────────
function RecTemp({ resultado }) {
  if (!resultado) return null;

  if (resultado.tipo === 'incompatible') {
    return (
      <div className="bd-rec-incompatible">
        <div className="bd-incompat-label">⚠ Calificación Incompatible</div>
        <div className="bd-incompat-msg">{resultado.mensaje}</div>
      </div>
    );
  }

  return (
    <div className="bd-rec-temp">
      <div className="bd-rec-temp-header">Recomendación de Temperatura</div>
      <div className="bd-rec-temp-cuerpo">
        <div className="bd-temp-actual">
          <div className="bd-temp-actual-valor">{resultado.tempActual}°c</div>
          <div className="bd-temp-actual-label">Actual</div>
        </div>
        <div className="bd-temp-flecha">→</div>
        <div className="bd-temp-sugerida">
          <div className="bd-temp-sugerida-valor">{resultado.tempSugerida}°c</div>
          <div className="bd-temp-sugerida-label">Sugerida</div>
        </div>
      </div>
      <div className="bd-rec-temp-mensaje"
        dangerouslySetInnerHTML={{ __html: resultado.mensaje
          .replace('sub-extracción', '<strong>sub-extracción</strong>')
          .replace('sobre-extracción', '<strong>sobre-extracción</strong>')
          .replace(/(\+\d+°c|-\d+°c)/g, '<strong>$1</strong>')
        }}
      />
      {resultado.comentario && (
        <div className="bd-rec-temp-comentario">{resultado.comentario}</div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BrewDetail({ brew, onClose, onSave, onOpenChecklist }) {
  const dragControls = useDragControls();
  const [tueste, setTueste]           = useState(brew.sensorAnalysis?.tueste  ?? null);
  const [acidez, setAcidez]           = useState(brew.sensorAnalysis?.acidez  ?? null);
  const [amargor, setAmargor]         = useState(brew.sensorAnalysis?.amargor ?? null);
  const [astringencia, setAstringencia] = useState(brew.sensorAnalysis?.astringencia ?? null);
  const [flavorNotes, setFlavorNotes] = useState(brew.sensorAnalysis?.flavorNotes ?? []);

  const canShowRec = tueste !== null && acidez !== null && amargor !== null && astringencia !== null;

  const resultado = useMemo(() => {
    if (!canShowRec) return null;
    return calcularRecomendacionTemp(brew.temperature, tueste, acidez, amargor, astringencia);
  }, [canShowRec, brew.temperature, tueste, acidez, amargor, astringencia]);

  const handleGuardar = () => {
    const tempSugerida = resultado?.tipo === 'recomendacion' ? resultado.tempSugerida : null;
    onSave(brew.id, {
      sensorAnalysis: {
        tueste,
        acidez,
        amargor,
        astringencia,
        tempSugerida,
        flavorNotes,
        savedAt: new Date().toISOString(),
      },
    });
    onClose();
  };

  // TimeDelta display
  const { timeDelta } = brew;
  const deltaLabel = timeDelta?.type === 'extra' ? 'Tiempo Extra'
    : timeDelta?.type === 'short' ? 'Tiempo Faltante'
    : 'Sin fase final';
  const deltaValor = timeDelta?.type === 'extra'  ? `+${timeDelta.seconds}s Extra`
    : timeDelta?.type === 'short' ? `−${timeDelta.seconds}s Faltantes`
    : '—';
  const deltaClass = timeDelta?.type === 'extra' ? 'bd-tiempo-bloque-valor extra'
    : timeDelta?.type === 'short' ? 'bd-tiempo-bloque-valor faltante'
    : 'bd-tiempo-bloque-valor';

  return (
    <motion.div
      className="bd-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="bd-sheet"
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => { if (info.offset.y > 80) onClose(); }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Handle */}
        <div
          className="bd-handle"
          onPointerDown={(e) => dragControls.start(e)}
          style={{ touchAction: 'none' }}
        />

        {/* Header */}
        <div className="bd-header">
          <div className="bd-titulo">{brew.recipeName}</div>
          <div className="bd-subtitulo">{brew.method || '—'}</div>
          <div className="bd-fecha">{formatDate(brew.date)}</div>
        </div>

        {/* Sección: Detalles de la Receta */}
        <div className="bd-seccion">
          <div className="bd-seccion-label">Detalles de la Receta</div>

          <div className="bd-detalle-grid">
            <div className="bd-detalle-item">
              <span className="bd-detalle-label">Café</span>
              <span className="bd-detalle-valor">{brew.coffee}g</span>
            </div>
            <div className="bd-detalle-item">
              <span className="bd-detalle-label">Agua</span>
              <span className="bd-detalle-valor">{brew.water}ml</span>
            </div>
            <div className="bd-detalle-item">
              <span className="bd-detalle-label">Temperatura</span>
              <span className="bd-detalle-valor">{brew.temperature}°c</span>
            </div>
            <div className="bd-detalle-item">
              <span className="bd-detalle-label">Ratio</span>
              <span className="bd-detalle-valor">{fmtRatio(brew.ratio)}</span>
            </div>
          </div>

          {/* Tiempo objetivo vs delta */}
          <div className="bd-tiempo-row">
            <div className="bd-tiempo-bloque">
              <span className="bd-tiempo-bloque-label">Tiempo Objetivo</span>
              <span className="bd-tiempo-bloque-valor">
                {brew.totalTime ? fmtTime(brew.totalTime) : '—'}
              </span>
            </div>
            <div className="bd-tiempo-bloque">
              <span className="bd-tiempo-bloque-label">{deltaLabel}</span>
              <span className={deltaClass}>{deltaValor}</span>
            </div>
          </div>

          {/* Recomendación molienda */}
          <RecMolienda timeDelta={timeDelta} />
        </div>

        {/* Sección: Análisis Sensorial */}
        <div className="bd-seccion bd-seccion-sensorial">
          <div className="bd-seccion-label">Análisis Sensorial</div>

          {/* Selector de tueste */}
          <div className="bd-tueste-selector">
            {TUESTES.map(({ key, label, sub }) => (
              <button
                key={key}
                className={`bd-tueste-btn${tueste === key ? ' activo' : ''}`}
                onClick={() => setTueste(tueste === key ? null : key)}
              >
                {label}
                <span className="bd-tueste-sub">{sub}</span>
              </button>
            ))}
          </div>

          {/* Atributos sensoriales */}
          <CirculosAtributo
            nombre="Acidez" desc="Sub-extracción" clase="acidez"
            valor={acidez} onChange={setAcidez}
          />
          <CirculosAtributo
            nombre="Amargor" desc="Punto de balance" clase="amargor"
            valor={amargor} onChange={setAmargor}
          />
          <CirculosAtributo
            nombre="Astringencia" desc="Sobre-extracción" clase="astringencia"
            valor={astringencia} onChange={setAstringencia}
          />

          {/* Recomendación de temperatura */}
          {canShowRec && <RecTemp resultado={resultado} />}
        </div>

        {/* Sección: ¿A qué sabe mi café? */}
        <div className="bd-seccion">
          <div className="bd-seccion-label">¿A qué sabe mi café?</div>

          {flavorNotes.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {flavorNotes.map(item => (
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

          <button
            className="bd-btn-flavor"
            onClick={() => onOpenChecklist(flavorNotes, setFlavorNotes)}
          >
            ¿A qué sabe mi café?
          </button>
        </div>

        {/* Botón Guardar */}
        <button className="bd-btn-guardar" onClick={handleGuardar}>
          Guardar Análisis
        </button>

      </motion.div>
    </motion.div>
  );
}
