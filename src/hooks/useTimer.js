import { useState, useRef, useCallback, useEffect } from 'react';

function beep(freq = 880, dur = 0.15) {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.25, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    osc.start();
    osc.stop(ac.currentTime + dur);
  } catch {
    // audio not available
  }
}

export function useTimer(steps) {
  // phase: idle | countdown | running | paused | finished
  const [phase, setPhase] = useState('idle');
  const [countdown, setCountdown] = useState(3);
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  // Mutable refs — safe to read inside setInterval callbacks
  const iv = useRef(null);
  const cdIv = useRef(null);
  const t0 = useRef(0);        // timestamp when current run started
  const base = useRef(0);      // elapsed seconds banked at pause
  const iStep = useRef(0);     // current step index
  const stepsR = useRef(steps);
  stepsR.current = steps;

  const stopIv = () => {
    if (iv.current) { clearInterval(iv.current); iv.current = null; }
  };

  const runInterval = useCallback(() => {
    stopIv();
    t0.current = Date.now();
    iv.current = setInterval(() => {
      const el = base.current + (Date.now() - t0.current) / 1000;
      setElapsed(el);

      const step = stepsR.current[iStep.current];
      if (step && el >= step.duration) {
        const nxt = iStep.current + 1;
        if (nxt >= stepsR.current.length) {
          stopIv();
          setPhase('finished');
        } else {
          beep();
          iStep.current = nxt;
          setStepIdx(nxt);
          base.current = 0;
          t0.current = Date.now();
          setElapsed(0);
        }
      }
    }, 16);
  }, []);

  const start = useCallback(() => {
    setPhase('countdown');
    setCountdown(3);
    let n = 3;
    beep(440, 0.08);
    cdIv.current = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(cdIv.current);
        cdIv.current = null;
        iStep.current = 0;
        base.current = 0;
        setStepIdx(0);
        setElapsed(0);
        setCountdown(0);
        setPhase('running');
        beep(880, 0.2);
        runInterval();
      } else {
        setCountdown(n);
        beep(440, 0.08);
      }
    }, 1000);
  }, [runInterval]);

  const pause = useCallback(() => {
    stopIv();
    base.current += (Date.now() - t0.current) / 1000;
    setPhase('paused');
  }, []);

  const resume = useCallback(() => {
    setPhase('running');
    runInterval();
  }, [runInterval]);

  const skip = useCallback(() => {
    const nxt = iStep.current + 1;
    if (nxt >= stepsR.current.length) {
      stopIv();
      setPhase('finished');
      return;
    }
    beep();
    iStep.current = nxt;
    setStepIdx(nxt);
    base.current = 0;
    setElapsed(0);
    runInterval();
  }, [runInterval]);

  const reset = useCallback(() => {
    stopIv();
    if (cdIv.current) { clearInterval(cdIv.current); cdIv.current = null; }
    iStep.current = 0;
    base.current = 0;
    setPhase('idle');
    setStepIdx(0);
    setElapsed(0);
    setCountdown(3);
  }, []);

  useEffect(() => () => {
    stopIv();
    if (cdIv.current) clearInterval(cdIv.current);
  }, []);

  const currentStep = steps[stepIdx] ?? null;
  const stepDuration = currentStep?.duration ?? 0;
  const remaining = Math.max(0, stepDuration - elapsed);
  const progress = stepDuration > 0 ? Math.min(elapsed / stepDuration, 1) : 0;

  return { phase, countdown, stepIdx, elapsed, remaining, progress, currentStep, start, pause, resume, skip, reset };
}
