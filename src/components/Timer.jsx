import { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useWakeLock } from '../hooks/useWakeLock';

const RADIUS = 110;
const CX = 140;
const CY = 130;
const CIRC = 2 * Math.PI * RADIUS;

function fmtTime(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const BackArrow = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
    <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Timer({ recipe, onExit }) {
  const { phase, countdown, stepIdx, remaining, progress, currentStep, start, pause, resume, skip, reset } =
    useTimer(recipe.steps);
  const { acquire, release } = useWakeLock();

  useEffect(() => {
    if (phase === 'running') acquire();
    else release();
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { reset(); release(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isIdle = phase === 'idle';
  const isCountdown = phase === 'countdown';
  const isRunning = phase === 'running';
  const isPaused = phase === 'paused';
  const isFinished = phase === 'finished';
  const isActive = isRunning || isPaused;

  // Pre-calcular gramos acumulados por paso
  let acc = 0;
  const stepsWithAccumulated = recipe.steps.map(step => {
    acc += step.targetWater || 0;
    return { ...step, accumulatedWater: acc };
  });

  const stepColor = currentStep?.type === 'espera' ? 'var(--accent-orange)' : 'var(--accent-green)';
  const ringProgress = isFinished ? 1 : progress;
  const nextStep = recipe.steps[stepIdx + 1] ?? null;
  const activeStepData = isActive ? stepsWithAccumulated[stepIdx] : null;
  const firstStep = stepsWithAccumulated[0] ?? null;

  const handleExit = () => { reset(); release(); onExit(); };

  return (
    <div className="timer-screen">
      {/* Header */}
      <div className="screen-header">
        <button className="back-btn" onClick={handleExit}>
          <BackArrow /> Salir
        </button>
        <span className="screen-title">{recipe.name}</span>
        <span className="step-counter-badge">
          {isIdle || isCountdown
            ? `— / ${recipe.steps.length}`
            : `${stepIdx + 1} / ${recipe.steps.length}`}
        </span>
      </div>

      {/* SVG Ring — fluye de arriba hacia abajo */}
      <div className="timer-ring-container">
        <svg viewBox="0 0 280 260" className="timer-ring">
          {/* Track */}
          <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#f0f0f0" strokeWidth="1" />

          {/* Progress arc */}
          {(isActive || isFinished) && (
            <circle
              cx={CX} cy={CY} r={RADIUS}
              fill="none"
              stroke={isFinished ? 'var(--accent-green)' : stepColor}
              strokeWidth="1.5"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - ringProgress)}
              strokeLinecap="round"
              transform={`rotate(-90, ${CX}, ${CY})`}
            />
          )}

          {/* Countdown (3, 2, 1 antes de iniciar) */}
          {isCountdown && (
            <text x={CX} y={CY + 18} textAnchor="middle"
              fontSize="72" fontWeight="700" fill="#111"
              fontFamily="'Exo 2', sans-serif">
              {countdown}
            </text>
          )}

          {/* Finished */}
          {isFinished && (
            <text x={CX} y={CY + 10} textAnchor="middle"
              fontSize="22" fontWeight="700" fill="var(--accent-green)"
              fontFamily="'Exo 2', sans-serif" letterSpacing="2">
              ¡LISTO!
            </text>
          )}

          {/* Idle preview — primer paso */}
          {isIdle && firstStep && (
            firstStep.type === 'vertido' ? (
              <>
                <text x={CX} y={CY - 32} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#bbbbbb"
                  fontWeight="600" fontFamily="'Exo 2', sans-serif" letterSpacing="3">
                  OBJETIVO BÁSCULA
                </text>
                <text x={CX} y={CY + 18} textAnchor="middle" fontSize="46" fill="#e0e0e0"
                  fontWeight="700" fontFamily="'Exo 2', sans-serif">
                  {firstStep.accumulatedWater}g
                </text>
                <text x={CX} y={CY + 50} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#bbbbbb"
                  fontWeight="600" fontFamily="'Exo 2', sans-serif" letterSpacing="2">
                  VIERTE {firstStep.targetWater}G
                </text>
              </>
            ) : (
              <>
                <text x={CX} y={CY + 18} textAnchor="middle" fontSize="46" fill="#e0e0e0"
                  fontWeight="300" fontFamily="'Exo 2', sans-serif">
                  {fmtTime(firstStep.duration)}
                </text>
                <text x={CX} y={CY + 50} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#bbbbbb"
                  fontWeight="600" fontFamily="'Exo 2', sans-serif" letterSpacing="2">
                  ESPERA
                </text>
              </>
            )
          )}

          {/* Paso activo */}
          {isActive && activeStepData && (
            activeStepData.type === 'vertido' ? (
              <>
                <text x={CX} y={CY - 32} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#bbbbbb"
                  fontWeight="600" fontFamily="'Exo 2', sans-serif" letterSpacing="3">
                  OBJETIVO BÁSCULA
                </text>
                <text x={CX} y={CY + 18} textAnchor="middle" fontSize="46" fill="#111111"
                  fontWeight="700" fontFamily="'Exo 2', sans-serif">
                  {activeStepData.accumulatedWater}g
                </text>
                <text x={CX} y={CY + 50} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#bbbbbb"
                  fontWeight="600" fontFamily="'Exo 2', sans-serif" letterSpacing="2">
                  VIERTE {activeStepData.targetWater}G
                </text>
              </>
            ) : (
              <>
                <text x={CX} y={CY + 18} textAnchor="middle" fontSize="46" fill="#111111"
                  fontWeight="300" fontFamily="'Exo 2', sans-serif">
                  {fmtTime(remaining)}
                </text>
                <text x={CX} y={CY + 50} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#bbbbbb"
                  fontWeight="600" fontFamily="'Exo 2', sans-serif" letterSpacing="2">
                  ESPERA
                </text>
              </>
            )
          )}
        </svg>
      </div>

      {/* Siguiente paso */}
      {!isFinished && nextStep && (
        <div className="next-step">
          <div>
            <p className="next-label">Siguiente paso</p>
            <p className="next-name">
              {nextStep.name}
              {nextStep.targetWater > 0 && ` · ${nextStep.targetWater}ml`}
              {` · ${nextStep.duration}s`}
            </p>
          </div>
          <span className={`next-badge next-badge-${nextStep.type}`}>
            {nextStep.type === 'vertido' ? 'Vertido' : 'Espera'}
          </span>
        </div>
      )}

      {isFinished && (
        <div className="timer-finished-card">
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-green)', marginBottom: '4px' }}>
            Preparación completada
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
            {recipe.method ? `Disfruta tu ${recipe.method}` : 'Buen provecho'}
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="timer-buttons">
        {isIdle && (
          <button className="btn-green flex-1" onClick={start}>Iniciar</button>
        )}
        {isCountdown && (
          <button className="btn-disabled flex-1" disabled>Iniciando...</button>
        )}
        {isRunning && (
          <>
            <button className="btn-secondary flex-1" onClick={pause}>Pausar</button>
            <button className="btn-secondary" onClick={skip}>Saltar</button>
          </>
        )}
        {isPaused && (
          <>
            <button className="btn-green flex-1" onClick={resume}>Reanudar</button>
            <button className="btn-secondary" onClick={skip}>Saltar</button>
          </>
        )}
        {isFinished && (
          <button className="btn-primary flex-1" onClick={handleExit}>Cerrar</button>
        )}
      </div>
    </div>
  );
}
