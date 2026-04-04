const DOT_COLORS = {
  V60: '#4a7c59',
  Chemex: '#c47a3a',
  Aeropress: '#5a9fc2',
  'French Press': '#e05555',
  Moka: '#c47a3a',
};
function dotColor(method, idx) {
  return DOT_COLORS[method] || ['#4a7c59', '#c47a3a', '#5a9fc2', '#e05555'][idx % 4];
}

function fmtRatio(ratio) {
  if (!ratio) return '—';
  const parts = ratio.split(':');
  if (parts.length === 2) return `1:${Math.round(parseFloat(parts[1]))}`;
  return ratio;
}

export default function RecipeList({ recipes, onNewRecipe, onEditRecipe, onDeleteRecipe, onStartTimer, onRatioCalc }) {
  return (
    <div className="recipe-list">
      {/* Header con logo */}
      <div className="list-logo-header">
        <img src="/brewtimer/logo-titulo.png" alt="BrewTimer" className="logo" />
      </div>

      {/* Acciones principales */}
      <div className="action-row">
        <button className="action-btn action-btn-primary" onClick={onNewRecipe}>
          + Nueva receta
        </button>
        <button className="action-btn" onClick={onRatioCalc}>
          ⊙ Calcular ratio
        </button>
      </div>

      {/* Conteo de recetas */}
      <div className="section-row">
        <span className="section-name">Recetas guardadas</span>
        <span className="section-count">{recipes.length}</span>
      </div>

      {/* Estado vacío */}
      {recipes.length === 0 && (
        <div className="recipe-empty">No hay recetas. Creá la primera.</div>
      )}

      {/* Lista de recetas */}
      {recipes.map((recipe, idx) => (
        <div className="recipe-card" key={recipe.id}>
          <div className="card-top">
            <div>
              <div className="recipe-name">{recipe.name}</div>
              <div className="recipe-method">{recipe.method || '—'}</div>
            </div>
            <div className="color-dot" style={{ background: dotColor(recipe.method, idx) }} />
          </div>

          <div className="stats-row">
            <div className="stat"><span>Café</span>{recipe.coffee}g</div>
            <div className="stat"><span>Agua</span>{recipe.water}ml</div>
            <div className="stat"><span>Temp</span>{recipe.temp}°C</div>
            <div className="stat"><span>Ratio</span>{fmtRatio(recipe.ratio)}</div>
          </div>

          <div className="card-actions">
            <button className="btn-preparar" onClick={() => onStartTimer(recipe)}>
              Preparar
            </button>
            <button
              className="btn-icon"
              onClick={() => onEditRecipe(recipe)}
              aria-label="Editar"
            >
              ✎
            </button>
            <button
              className="btn-icon btn-icon-danger"
              onClick={() => {
                if (confirm(`¿Eliminar "${recipe.name}"?`)) onDeleteRecipe(recipe.id);
              }}
              aria-label="Eliminar"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
