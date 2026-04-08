import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FLAVOR_WHEEL } from '../data/flavorWheel';

function fixConnectors() {
  document.querySelectorAll('.fc-cat-content, .fc-sub-content').forEach(container => {
    const col = container.querySelector(':scope > .fc-connector-col');
    if (!col) return;
    const inner = container.querySelector(':scope > .fc-cat-content-inner, :scope > .fc-sub-content-inner');
    if (!inner) return;
    const rows = Array.from(
      inner.querySelectorAll(':scope > .fc-sub-item > .fc-sub-row, :scope > .fc-leaf-item > .fc-leaf-row')
    );
    if (!rows.length) return;
    const lastRow = rows[rows.length - 1];
    const containerTop = container.getBoundingClientRect().top;
    const lastMid = lastRow.getBoundingClientRect().top + lastRow.getBoundingClientRect().height / 2;
    col.style.height = Math.round(lastMid - containerTop) + 'px';
  });
}

// ── Check circle ─────────────────────────────────────────────────────────────
function CheckCircle({ node, selected, onToggle }) {
  const isChecked = selected.has(node.id);
  return (
    <div
      className={`fc-check${isChecked ? ' checked' : ''}`}
      style={isChecked ? { background: node.color, borderColor: node.color, color: node.darkText ? '#111' : '#fff' } : {}}
      onClick={(e) => { e.stopPropagation(); onToggle(node); }}
    >
      ✓
    </div>
  );
}

// ── Leaf (level 3) ───────────────────────────────────────────────────────────
function LeafNode({ node, selected, onToggle }) {
  return (
    <div className="fc-leaf-item">
      <div className="fc-leaf-row">
        <div className="fc-h-line" />
        <CheckCircle node={node} selected={selected} onToggle={onToggle} />
        <button
          className={`fc-leaf-btn${node.darkText ? ' dark-text' : ''}`}
          style={{ background: node.color }}
        >
          {node.label}
        </button>
      </div>
    </div>
  );
}

// ── Sub (level 2) ────────────────────────────────────────────────────────────
function SubNode({ node, selected, onToggle, openSubId, onToggleSub }) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = openSubId === node.id;

  return (
    <div className="fc-sub-item">
      <div className="fc-sub-row">
        <div className="fc-h-line" />
        <CheckCircle node={node} selected={selected} onToggle={onToggle} />
        <button
          className={`fc-sub-btn${node.darkText ? ' dark-text' : ''}`}
          style={{ background: node.color }}
          onClick={hasChildren ? () => onToggleSub(node.id) : undefined}
        >
          {node.label}
          {hasChildren && (
            <span className={`fc-arrow${isOpen ? ' open' : ''}`}>▼</span>
          )}
        </button>
      </div>

      {hasChildren && isOpen && (
        <div className="fc-sub-content">
          <div className="fc-connector-col" />
          <div className="fc-sub-content-inner">
            {node.children.map(leaf => (
              <LeafNode key={leaf.id} node={leaf} selected={selected} onToggle={onToggle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Cat (level 1) ────────────────────────────────────────────────────────────
function CatNode({ node, selected, onToggle, openCatId, onToggleCat }) {
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
    <div style={{ marginBottom: 8 }}>
      <div className="fc-cat-row">
        <CheckCircle node={node} selected={selected} onToggle={onToggle} />
        <button
          className={`fc-cat-btn${node.darkText ? ' dark-text' : ''}`}
          style={{ background: node.color }}
          onClick={() => onToggleCat(node.id)}
        >
          {node.label}
          <span className={`fc-arrow${isOpen ? ' open' : ''}`}>▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="fc-cat-content">
          <div className="fc-connector-col" />
          <div className="fc-cat-content-inner">
            {node.children.map(sub => (
              <SubNode
                key={sub.id}
                node={sub}
                selected={selected}
                onToggle={onToggle}
                openSubId={openSubId}
                onToggleSub={handleToggleSub}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function FlavorChecklist({ initialSelection = [], onSave, onBack }) {
  // Map of id -> { id, label, color, darkText }
  const [selected, setSelected] = useState(() => {
    const m = new Map();
    initialSelection.forEach(item => m.set(item.id, item));
    return m;
  });
  // Preserve insertion order
  const [order, setOrder] = useState(() => initialSelection.map(i => i.id));

  const [openCatId, setOpenCatId] = useState(null);

  const handleToggle = (node) => {
    setSelected(prev => {
      const next = new Map(prev);
      if (next.has(node.id)) {
        next.delete(node.id);
        setOrder(o => o.filter(id => id !== node.id));
      } else {
        next.set(node.id, { id: node.id, label: node.label, color: node.color, darkText: node.darkText });
        setOrder(o => [...o, node.id]);
      }
      return next;
    });
  };

  const handleRemoveChip = (id) => {
    setSelected(prev => { const next = new Map(prev); next.delete(id); return next; });
    setOrder(o => o.filter(x => x !== id));
  };

  const handleToggleCat = (catId) => {
    setOpenCatId(prev => prev === catId ? null : catId);
  };

  const handleSave = () => {
    const result = order.filter(id => selected.has(id)).map(id => selected.get(id));
    onSave(result);
  };

  const chips = order.filter(id => selected.has(id)).map(id => selected.get(id));

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.3 }}
      onDragEnd={(_, info) => { if (info.offset.x > 60) onBack(); }}
      style={{ fontFamily: '"Exo 2", sans-serif', background: '#fff', color: '#111', maxWidth: 430, margin: '0 auto', paddingBottom: 48, touchAction: 'pan-y' }}
    >
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #e8e8e8', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#111', padding: 0 }}
          >
            ←
          </button>
          <div style={{ fontFamily: '"new-astro", sans-serif', fontSize: 19, color: '#111' }}>
            ¿A qué sabe mi café?
          </div>
        </div>
        <button
          onClick={handleSave}
          style={{ fontFamily: '"Exo 2", sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#4a7c59', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 18px', cursor: 'pointer' }}
        >
          Listo
        </button>
      </div>

      {/* Chips section */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid #e8e8e8', minHeight: 52 }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#bbb', marginBottom: 8 }}>
          Seleccionados
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {chips.length === 0 ? (
            <span style={{ fontSize: 11, fontWeight: 300, color: '#bbb', fontStyle: 'italic' }}>Ningún sabor seleccionado</span>
          ) : (
            <AnimatePresence>
              {chips.map(item => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px 4px 8px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: item.color, color: item.darkText ? '#111' : '#fff' }}
                >
                  {item.label}{' '}
                  <span
                    style={{ fontSize: 10, opacity: 0.8, cursor: 'pointer' }}
                    onClick={() => handleRemoveChip(item.id)}
                  >
                    ✕
                  </span>
                </motion.span>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Wheel list */}
      <div style={{ padding: '16px 24px 0' }}>
        {FLAVOR_WHEEL.map(cat => (
          <CatNode
            key={cat.id}
            node={cat}
            selected={selected}
            onToggle={handleToggle}
            openCatId={openCatId}
            onToggleCat={handleToggleCat}
          />
        ))}
      </div>

      <style>{`
        .fc-cat-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fc-cat-btn {
          flex: 1;
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
        .fc-cat-btn.dark-text { color: #111; }

        .fc-sub-btn {
          flex: 1;
          border: none;
          border-radius: 4px;
          padding: 7px 12px;
          font-family: "Exo 2", sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fc-sub-btn.dark-text { color: #111; }

        .fc-leaf-btn {
          flex: 1;
          border: none;
          border-radius: 3px;
          padding: 4px 10px;
          font-family: "Exo 2", sans-serif;
          font-size: 7.5px;
          font-weight: 400;
          color: #fff;
          text-align: left;
          cursor: pointer;
        }
        .fc-leaf-btn.dark-text { color: #111; }

        .fc-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #e8e8e8;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 12px;
          color: transparent;
          transition: all 0.15s;
        }
        .fc-check.checked { color: #fff; }

        .fc-sub-item { margin-bottom: 4px; }
        .fc-leaf-item { margin-bottom: 3px; }

        .fc-arrow {
          font-size: 10px;
          opacity: 0.8;
          transition: transform 0.2s;
          display: inline-block;
        }
        .fc-arrow.open { transform: rotate(180deg); }

        /* Connectors */
        .fc-cat-content {
          padding-top: 6px;
          padding-left: 32px;
          position: relative;
          display: flex;
        }
        .fc-sub-content {
          padding-top: 6px;
          padding-left: 28px;
          position: relative;
          display: flex;
        }
        .fc-connector-col {
          position: absolute;
          left: 32px;
          top: 0;
          width: 2px;
          background: #e8e8e8;
          pointer-events: none;
        }
        .fc-sub-content > .fc-connector-col {
          left: 28px;
        }
        .fc-cat-content-inner,
        .fc-sub-content-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .fc-sub-row,
        .fc-leaf-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fc-h-line {
          width: 14px;
          height: 2px;
          background: #e8e8e8;
          flex-shrink: 0;
        }
      `}</style>
    </motion.div>
  );
}
