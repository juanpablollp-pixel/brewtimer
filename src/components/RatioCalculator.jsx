import { useState } from 'react';

const BackArrow = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
    <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function trackBg(value, min, max, color) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, ${color} ${pct}%, #e8e8e8 ${pct}%)`;
}

export default function RatioCalculator({ onBack }) {
  const [ratio, setRatio] = useState(16.7);
  const [coffee, setCoffee] = useState(15);
  const [water, setWater] = useState(250);

  const handleRatio = (val) => {
    const r = parseFloat(val);
    setRatio(r);
    setWater(Math.round(coffee * r));
  };

  const handleCoffee = (val) => {
    const c = parseFloat(val);
    setCoffee(c);
    setWater(Math.round(c * ratio));
  };

  const handleWater = (val) => {
    const w = parseFloat(val);
    setWater(w);
    const r = parseFloat((w / coffee).toFixed(1));
    setRatio(r);
  };

  return (
    <div className="ratio-calculator">
      {/* Header */}
      <div className="screen-header">
        <button className="back-btn" onClick={onBack} aria-label="Volver">
          <BackArrow /> Volver
        </button>
        <p className="screen-title">Calculadora</p>
      </div>

      {/* Panel de resultado */}
      <div className="result-panel">
        <p className="result-label">Ratio seleccionado</p>
        <p className="result-ratio">1 <span>:</span> {ratio.toFixed(1)}</p>
        <div className="result-row">
          <div className="result-item">
            <p className="result-item-label">Café</p>
            <p className="result-item-value">{coffee}g</p>
          </div>
          <div className="result-item">
            <p className="result-item-label">Agua</p>
            <p className="result-item-value">{water}g</p>
          </div>
        </div>
      </div>

      {/* Slider: Ratio */}
      <div className="slider-section">
        <div className="slider-top">
          <span className="slider-name">Ratio</span>
          <span className="slider-value">1:{ratio.toFixed(1)}</span>
        </div>
        <input
          type="range"
          className="slider"
          min="10"
          max="20"
          step="0.1"
          value={ratio}
          onChange={(e) => handleRatio(e.target.value)}
          style={{ '--thumb-color': '#111', background: trackBg(ratio, 10, 20, '#111') }}
        />
      </div>

      {/* Slider: Café */}
      <div className="slider-section">
        <div className="slider-top">
          <span className="slider-name" style={{ color: '#c47a3a' }}>Café</span>
          <span className="slider-value">{coffee}g</span>
        </div>
        <input
          type="range"
          className="slider"
          min="5"
          max="50"
          step="1"
          value={coffee}
          onChange={(e) => handleCoffee(e.target.value)}
          style={{ '--thumb-color': '#c47a3a', background: trackBg(coffee, 5, 50, '#c47a3a') }}
        />
      </div>

      {/* Slider: Agua */}
      <div className="slider-section">
        <div className="slider-top">
          <span className="slider-name" style={{ color: '#5a9fc2' }}>Agua</span>
          <span className="slider-value">{water}ml</span>
        </div>
        <input
          type="range"
          className="slider"
          min="50"
          max="1000"
          step="5"
          value={water}
          onChange={(e) => handleWater(e.target.value)}
          style={{ '--thumb-color': '#5a9fc2', background: trackBg(water, 50, 1000, '#5a9fc2') }}
        />
      </div>
    </div>
  );
}
