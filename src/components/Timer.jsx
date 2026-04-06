import { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useWakeLock } from '../hooks/useWakeLock';
import { saveBrewToHistory } from '../hooks/useHistory';

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
  const {
    phase, countdown, stepIdx, remaining, progress, currentStep,
    extraSeconds, start, pause, resume, skip, finish, reset,
  } = useTimer(recipe.steps);
  const { acquire, release } = useWakeLock();

  useEffect(() => {
    if (phase === 'running' || phase === 'overtime') acquire();
    else release();
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { reset(); release(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isIdle = phase === 'idle';
  const isCountdown = phase === 'countdown';
  const isRunning = phase === 'running';
  const isPaused = phase === 'paused';
  const isOvertime = phase === 'overtime';
  const isFinished = phase === 'finished';
  const isActive = isRunning || isPaused;

  // Calls finish(), saves to history, then returns (doesn't navigate away)
  const handleFinish = () => {
    const delta = finish();
    const totalTime = recipe.steps.reduce((acc, s) => acc + (s.duration || 0), 0);
    saveBrewToHistory(recipe, delta, totalTime);
  };

  // Pre-calcular gramos acumulados por paso
  let acc = 0;
  const stepsWithAccumulated = recipe.steps.map(step => {
    acc += step.targetWater || 0;
    return { ...step, accumulatedWater: acc };
  });

  const stepColor = currentStep?.type === 'espera' ? 'var(--accent-orange)' : 'var(--accent-green)';
  const ringProgress = (isFinished || isOvertime) ? 1 : progress;
  const activeStepData = isActive ? stepsWithAccumulated[stepIdx] : null;
  const firstStep = stepsWithAccumulated[0] ?? null;

  // Paso actual para la card (countdown muestra el primero, active muestra el stepIdx)
  const currentStepDisplay = isActive ? stepsWithAccumulated[stepIdx] : firstStep;

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

      {/* SVG Ring */}
      <div className="timer-ring-container">
        <svg viewBox="0 0 280 260" className="timer-ring">
          {/* Track */}
          <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#f0f0f0" strokeWidth="1" />

          {/* Progress arc */}
          {(isActive || isFinished || isOvertime) && (
            <circle
              cx={CX} cy={CY} r={RADIUS}
              fill="none"
              stroke={(isFinished || isOvertime) ? 'var(--accent-green)' : stepColor}
              strokeWidth="1.5"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - ringProgress)}
              strokeLinecap="round"
              transform={`rotate(-90, ${CX}, ${CY})`}
            />
          )}

          {/* Countdown */}
          {isCountdown && (
            <text x={CX} y={CY + 18} textAnchor="middle"
              fontSize="72" fontWeight="700" fill="#111"
              fontFamily="'Exo 2', sans-serif">
              {countdown}
            </text>
          )}

          {/* Finished */}
          {(isFinished || isOvertime) && (
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

        {/* Overtime counter — shown below the ring while overtime is active */}
        {isOvertime && (
          <div className="timer-overtime-counter">
            +{extraSeconds}s Extra
          </div>
        )}
      </div>

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
            <button className="btn-finish" onClick={handleFinish}>Finalizar</button>
            <button className="btn-secondary" onClick={skip}>Saltar</button>
          </>
        )}
        {isPaused && (
          <>
            <button className="btn-green flex-1" onClick={resume}>Reanudar</button>
            <button className="btn-finish" onClick={handleFinish}>Finalizar</button>
            <button className="btn-secondary" onClick={skip}>Saltar</button>
          </>
        )}
        {isOvertime && (
          <button className="btn-finish flex-1" onClick={handleFinish}>Finalizar</button>
        )}
        {isFinished && (
          <button className="btn-primary flex-1" onClick={handleExit}>Cerrar</button>
        )}
      </div>

      {/* Card paso actual */}
      {(isCountdown || isActive) && currentStepDisplay && (
        <div className="next-step" style={{ marginTop: '16px' }}>
          <div>
            <p className="next-label">Paso actual</p>
            <p className="next-name">
              {currentStepDisplay.name}
              {currentStepDisplay.type === 'vertido' && currentStepDisplay.targetWater > 0 && ` · ${currentStepDisplay.targetWater}ml`}
              {` · ${currentStepDisplay.duration}s`}
            </p>
          </div>
          <span className={`next-badge next-badge-${currentStepDisplay.type}`}>
            {currentStepDisplay.type === 'vertido' ? 'Vertido' : 'Espera'}
          </span>
        </div>
      )}

      {/* Pantalla de fin */}
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

      {/* Lista de todas las fases */}
      {!isIdle && (
        <div className="phases-list">
          {stepsWithAccumulated.map((step, idx) => {
            const isDone = isFinished || isOvertime || idx < stepIdx;
            const isCurrent = !isFinished && !isOvertime && (isActive || isCountdown) && idx === stepIdx;
            return (
              <div
                key={idx}
                className={[
                  'phase-row',
                  isDone ? 'phase-row-done' : '',
                  isCurrent ? `phase-row-current-${step.type}` : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="phase-row-name">{step.name}</span>
                <span className="phase-row-meta">
                  {step.type === 'vertido' && step.targetWater > 0 ? `${step.targetWater}ml · ` : ''}
                  {step.duration}s
                </span>
                <span className={`next-badge next-badge-${step.type}`}>
                  {step.type === 'vertido' ? 'Vertido' : 'Espera'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
