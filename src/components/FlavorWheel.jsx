import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FLAVOR_WHEEL } from '../data/flavorWheel';

function fixConnectors() {
  document.querySelectorAll('.fw-content-inner').forEach(container => {
    const items = Array.from(container.children).filter(el =>
      el.classList.contains('fw-sub-item') || el.classList.contains('fw-leaf-item')
    );
    if (items.length === 0) return;
    const last = items[items.length - 1];
    const lastRow = last.querySelector('.fw-sub-row, .fw-leaf-row');
    if (!lastRow) return;
    const containerRect = container.getBoundingClientRect();
    const lastRowRect = lastRow.getBoundingClientRect();
    const height = (lastRowRect.top + lastRowRect.height / 2) - containerRect.top;
    let vline = container.querySelector(':scope > .fw-vline');
    if (!vline) {
      vline = document.createElement('div');
      vline.className = 'fw-vline';
      container.prepend(vline);
    }
    vline.style.height = Math.round(height) + 'px';
  });
}

function DescriptionText({ text }) {
  const sections = ['Nariz:', 'Entrada:', 'Medio:', 'Final:', 'Diagnóstico:'];
  const parts = text.split(/(?=Nariz:|Entrada:|Medio:|Final:|Diagnóstico:)/);
  return (
    <div>
      {parts.map((part, i) => {
        const label = sections.find(s => part.startsWith(s));
        if (!label) return <span key={i}>{part}</span>;
        const content = part.slice(label.length).trim();
        return (
          <div key={i} style={{ marginBottom: i < parts.length - 1 ? 5 : 0 }}>
            <span style={{ fontWeight: 600 }}>{label}</span>{' '}{content}
          </div>
        );
      })}
    </div>
  );
}

// ── Leaf (level 3) node ──────────────────────────────────────────────────────
function LeafNode({ node, activeTooltipId, onShowTooltip }) {
  return (
    <div className="fw-leaf-item">
      <div className="fw-leaf-row">
        <button
          className={`fw-leaf-btn${node.darkText ? ' dark-text' : ''}`}
          style={{ background: node.color }}
        >
          {node.label}
        </button>
        {node.description && (
          <button
            className={`fw-info-btn${activeTooltipId === node.id ? ' active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onShowTooltip(e, node); }}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

// ── Sub (level 2) node ───────────────────────────────────────────────────────
function SubNode({ node, openSubId, onToggleSub, activeTooltipId, onShowTooltip }) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = openSubId === node.id;

  return (
    <div className="fw-sub-item">
      <div className="fw-sub-row">
        <button
          className={`fw-sub-btn${node.darkText ? ' dark-text' : ''}`}
          style={{ background: node.color }}
          onClick={hasChildren ? () => onToggleSub(node.id) : undefined}
        >
          {node.label}
          {hasChildren && (
            <span className={`fw-arrow${isOpen ? ' open' : ''}`}>▼</span>
          )}
        </button>
        {node.description && (
          <button
            className={`fw-info-btn${activeTooltipId === node.id ? ' active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onShowTooltip(e, node); }}
          >
            +
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div style={{ paddingTop: 6, paddingLeft: 12 }}>
          <div className="fw-content-inner">
            {node.children.map(leaf => (
              <LeafNode
                key={leaf.id}
                node={leaf}
                activeTooltipId={activeTooltipId}
                onShowTooltip={onShowTooltip}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Cat (level 1) node ───────────────────────────────────────────────────────
function CatNode({ node, openCatId, onToggleCat, activeTooltipId, onShowTooltip }) {
  const isOpen = openCatId === node.id;
  const [openSubId, setOpenSubId] = useState(null);

  useEffect(() => {
    if (!isOpen) setOpenSubId(null);
  }, [isOpen]);

  const handleToggleSub = (subId) => {
    setOpenSubId(prev => prev === subId ? null : subId);
  };

  useEffect(() => {
    const t = setTimeout(fixConnectors, 30);
    return () => clearTimeout(t);
  }, [isOpen, openSubId]);

  return (
    <div className="fw-cat-item" style={{ marginBottom: 8 }}>
      <button
        className={`fw-cat-btn${node.darkText ? ' dark-text' : ''}`}
        style={{ background: node.color }}
        onClick={() => onToggleCat(node.id)}
      >
        {node.label}
        <span className={`fw-arrow${isOpen ? ' open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div style={{ paddingTop: 8, paddingLeft: 16 }}>
          <div className="fw-content-inner">
            {node.children.map(sub => (
              <SubNode
                key={sub.id}
                node={sub}
                openSubId={openSubId}
                onToggleSub={handleToggleSub}
                activeTooltipId={activeTooltipId}
                onShowTooltip={onShowTooltip}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function FlavorWheel({ onBack }) {
  const [openCatId, setOpenCatId] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const handleToggleCat = (catId) => {
    setOpenCatId(prev => prev === catId ? null : catId);
  };

  const handleShowTooltip = (e, node) => {
    if (tooltip && tooltip.id === node.id) {
      setTooltip(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const isBottomHalf = rect.bottom > window.innerHeight * 0.6;
    setTooltip({
      id: node.id,
      description: node.description,
      top: isBottomHalf ? undefined : rect.bottom + 6,
      bottom: isBottomHalf ? window.innerHeight - rect.top + 6 : undefined,
    });
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.3 }}
      onDragEnd={(_, info) => { if (info.offset.x > 60) onBack(); }}
      style={{ fontFamily: '"Exo 2", sans-serif', background: '#fff', color: '#111', maxWidth: 430, margin: '0 auto', paddingBottom: 48, touchAction: 'pan-y' }}
    >
      {/* Header */}
      <div style={{ padding: '36px 24px 16px', borderBottom: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#111', padding: 0, lineHeight: 1 }}
        >
          ←
        </button>
        <div style={{ fontFamily: '"new-astro", sans-serif', fontSize: 22, color: '#111' }}>
          SCAA Taster Flavor Wheel
        </div>
      </div>

      {/* Wheel list */}
      <div style={{ padding: '16px 24px 0' }}>
        {FLAVOR_WHEEL.map(cat => (
          <CatNode
            key={cat.id}
            node={cat}
            openCatId={openCatId}
            onToggleCat={handleToggleCat}
            activeTooltipId={tooltip?.id}
            onShowTooltip={handleShowTooltip}
          />
        ))}
      </div>

      {/* Tooltip overlay */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            top: tooltip.top !== undefined ? tooltip.top : 'auto',
            bottom: tooltip.bottom !== undefined ? tooltip.bottom : 'auto',
            left: 24,
            right: 24,
            maxWidth: 'calc(100vw - 48px)',
            background: '#ffffff',
            border: '1px solid #e8e8e8',
            borderRadius: 4,
            padding: '12px 28px 12px 12px',
            zIndex: 200,
            fontFamily: '"Exo 2", sans-serif',
            fontSize: 11,
            fontWeight: 400,
            color: '#111',
            lineHeight: 1.6,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          <button
            onClick={() => setTooltip(null)}
            style={{
              position: 'absolute',
              top: 6,
              right: 8,
              background: 'none',
              border: 'none',
              fontSize: 16,
              cursor: 'pointer',
              color: '#111',
              lineHeight: 1,
              padding: 2,
            }}
          >
            ×
          </button>
          <DescriptionText text={tooltip.description} />
        </div>
      )}

      <style>{`
        .fw-cat-btn {
          width: 100%;
          border: none;
          border-radius: 4px;
          padding: 14px 16px;
          font-family: "Exo 2", sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fw-cat-btn.dark-text { color: #111; }

        .fw-sub-btn {
          flex: 1;
          min-width: 0;
          border: none;
          border-radius: 4px;
          padding: 10px 14px;
          font-family: "Exo 2", sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fw-sub-btn.dark-text { color: #111; }

        .fw-leaf-btn {
          flex: 1;
          min-width: 0;
          border: none;
          border-radius: 3px;
          padding: 10px 14px;
          font-family: "Exo 2", sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #fff;
          text-align: left;
          cursor: default;
        }
        .fw-leaf-btn.dark-text { color: #111; }

        .fw-info-btn {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border: 1px solid #e8e8e8;
          border-radius: 50%;
          background: #fff;
          color: #888;
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .fw-info-btn.active {
          background: #f0f0f0;
          color: #111;
          border-color: #ccc;
        }

        .fw-sub-item { margin-bottom: 4px; }
        .fw-leaf-item { margin-bottom: 3px; }

        .fw-arrow {
          font-size: 10px;
          opacity: 0.8;
          transition: transform 0.2s;
          display: inline-block;
        }
        .fw-arrow.open { transform: rotate(180deg); }

        /* Connectors */
        .fw-content-inner { position: relative; }
        .fw-vline {
          position: absolute;
          left: -14px;
          top: 0;
          width: 2px;
          background: #e8e8e8;
          pointer-events: none;
        }
        .fw-sub-row {
          position: relative;
          padding-left: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .fw-sub-row::before {
          content: "";
          position: absolute;
          left: -14px;
          top: 50%;
          width: 12px;
          height: 2px;
          background: #e8e8e8;
          transform: translateY(-50%);
        }
        .fw-leaf-row {
          position: relative;
          padding-left: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .fw-leaf-row::before {
          content: "";
          position: absolute;
          left: -14px;
          top: 50%;
          width: 12px;
          height: 2px;
          background: #e8e8e8;
          transform: translateY(-50%);
        }
      `}</style>
    </motion.div>
  );
}
