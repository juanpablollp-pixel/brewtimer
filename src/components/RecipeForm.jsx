import { useState } from 'react';

function calcRatio(coffee, water) {
  const c = parseFloat(coffee);
  const w = parseFloat(water);
  if (c > 0 && w > 0) return `1:${(w / c).toFixed(1)}`;
  return '';
}

function formatTotalTime(sec) {
  const s = Math.round(sec);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r === 0 ? `${m}m` : `${m}m ${r}s`;
}

const BackArrow = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
    <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function RecipeForm({ recipe, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: recipe?.id || '',
    name: recipe?.name || '',
    method: recipe?.method || '',
    coffee: recipe?.coffee ?? 15,
    water: recipe?.water ?? 250,
    temp: recipe?.temp ?? 93,
    grind: recipe?.grind || '',
    roast: recipe?.roast || '',
    ratio: recipe?.ratio || calcRatio(recipe?.coffee ?? 15, recipe?.water ?? 250),
    steps: recipe?.steps ? recipe.steps.map((s) => ({ ...s })) : [],
  });

  const update = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'coffee' || field === 'water') {
        const c = parseFloat(field === 'coffee' ? value : prev.coffee) || 0;
        const w = parseFloat(field === 'water' ? value : prev.water) || 0;
        next.ratio = calcRatio(c, w);
      }
      return next;
    });
  };

  const addStep = (type) => {
    setForm((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          name: type === 'vertido' ? 'Vertido' : 'Espera',
          type,
          targetWater: type === 'vertido' ? 50 : 0,
          duration: 30,
        },
      ],
    }));
  };

  const updateStep = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((s, i) =>
        i === idx
          ? { ...s, [field]: field === 'name' ? value : Number(value) }
          : s
      ),
    }));
  };

  const removeStep = (idx) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== idx),
    }));
  };

  const totalWater = form.steps.reduce((sum, s) => sum + (s.targetWater || 0), 0);
  const totalTime = form.steps.reduce((sum, s) => sum + (s.duration || 0), 0);

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="recipe-form">
      {/* Header */}
      <div className="screen-header">
        <button className="back-btn" onClick={onCancel} aria-label="Volver">
          <BackArrow /> Volver
        </button>
        <p className="screen-title">{form.id ? 'Editar Receta' : 'Nueva Receta'}</p>
      </div>

      {/* Información general */}
      <p className="section-label">Información general</p>

      <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="form-field">
          <label className="form-field-label">Nombre</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Mi receta"
          />
        </div>
        <div className="form-field">
          <label className="form-field-label">Método</label>
          <input
            type="text"
            value={form.method}
            onChange={(e) => update('method', e.target.value)}
            placeholder="V60, Chemex, Aeropress..."
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label className="form-field-label">Café (g)</label>
          <input
            type="number"
            value={form.coffee}
            onChange={(e) => update('coffee', e.target.value)}
            min="1"
          />
        </div>
        <div className="form-field">
          <label className="form-field-label">Agua (g)</label>
          <input
            type="number"
            value={form.water}
            onChange={(e) => update('water', e.target.value)}
            min="1"
          />
        </div>

        <div className="form-field">
          <label className="form-field-label">Temp °C</label>
          <input
            type="number"
            value={form.temp}
            onChange={(e) => update('temp', e.target.value)}
            min="60"
            max="100"
          />
        </div>
        <div className="form-field">
          <label className="form-field-label">Molienda</label>
          <input
            type="text"
            value={form.grind}
            onChange={(e) => update('grind', e.target.value)}
            placeholder="Clicks..."
          />
        </div>

        <div className="form-field">
          <label className="form-field-label">Tueste</label>
          <input
            type="text"
            value={form.roast}
            onChange={(e) => update('roast', e.target.value)}
            placeholder="Ej. Claro"
          />
        </div>
        <div className="form-field">
          <label className="form-field-label">Ratio</label>
          <input type="text" value={form.ratio} readOnly />
        </div>
      </div>

      {/* Fases de preparación */}
      <div className="form-divider" />
      <p className="section-label">Fases de preparación</p>

      {form.steps.map((step, idx) => (
        <div className="step-item" key={idx}>
          <span className={`step-badge step-badge-${step.type}`}>
            {step.type === 'vertido' ? 'Vertido' : 'Espera'}
          </span>
          <div className="step-details">
            <input
              className="step-input-name"
              type="text"
              value={step.name}
              onChange={(e) => updateStep(idx, 'name', e.target.value)}
            />
            {step.type === 'vertido' && (
              <>
                <input
                  className="step-input"
                  type="number"
                  value={step.targetWater}
                  onChange={(e) => updateStep(idx, 'targetWater', e.target.value)}
                  min="0"
                  title="Agua (ml)"
                />
                <span className="step-unit">ml</span>
              </>
            )}
            <input
              className="step-input"
              type="number"
              value={step.duration}
              onChange={(e) => updateStep(idx, 'duration', e.target.value)}
              min="1"
              title="Duración (s)"
            />
            <span className="step-unit">s</span>
          </div>
          <button className="step-delete" onClick={() => removeStep(idx)}>✕</button>
        </div>
      ))}

      <div className="phase-add-row">
        <button className="phase-add-btn phase-add-btn-vertido" onClick={() => addStep('vertido')}>
          + Vertido
        </button>
        <button className="phase-add-btn phase-add-btn-espera" onClick={() => addStep('espera')}>
          + Espera
        </button>
      </div>

      {/* Totales */}
      <div className="totals-panel">
        <div className="total-item">
          <span className="total-label">Total agua</span>
          <span className="total-value">{totalWater}g</span>
        </div>
        <div className="total-item">
          <span className="total-label">Tiempo total</span>
          <span className="total-value">{formatTotalTime(totalTime)}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="form-bottom-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
        <button className="btn-save" onClick={handleSave}>Guardar Receta</button>
      </div>
    </div>
  );
}
