import { useState, useEffect, useRef } from 'react';
import { FLAVOR_WHEEL } from '../data/flavorWheel';

// ── Vertical connector line measured via DOM ─────────────────────────────────
function useConnector(innerRef, isOpen) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!isOpen || !innerRef.current) { setHeight(0); return; }

    function measure() {
      if (!innerRef.current) return;

      const allRows = Array.from(innerRef.current.querySelectorAll(
        '.fw-sub-row, .fw-leaf-row'
      )).filter(row => {
        const subContent = row.closest('.fw-sub-content');
        if (!subContent) return true;
        return subContent.style.display !== 'none' && subContent.offsetParent !== null;
      });

      if (!allRows.length) return;

      const lastRow = allRows[allRows.length - 1];
      const containerRect = innerRef.current.getBoundingClientRect();
      const lastRect = lastRow.getBoundingClientRect();
      setHeight(Math.round((lastRect.top + lastRect.height / 2) - containerRect.top));
    }

    measure();
    const t1 = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 150);

    const ro = new ResizeObserver(measure);
    ro.observe(innerRef.current);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
    };
  }, [isOpen, innerRef]);

  return height;
}

// ── Leaf (level 3) node ──────────────────────────────────────────────────────
function LeafNode({ node }) {
  return (
    <div className="fw-leaf-item">
      <div className="fw-leaf-row">
        <div className="fw-h-line" />
        <button
          className={`fw-leaf-btn${node.darkText ? ' dark-text' : ''}`}
          style={{ background: node.color }}
        >
          {node.label}
        </button>
      </div>
    </div>
  );
}

// ── Sub (level 2) node ───────────────────────────────────────────────────────
function SubNode({ node, openSubId, onToggleSub }) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = openSubId === node.id;
  const innerRef = useRef(null);
  const connHeight = useConnector(innerRef, isOpen);

  return (
    <div className="fw-sub-item">
      <div className="fw-sub-row">
        <div className="fw-h-line" />
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
      </div>

      {hasChildren && isOpen && (
        <div className="fw-sub-content" style={{ paddingLeft: 28, paddingTop: 6, position: 'relative' }}>
          {connHeight > 0 && (
            <div
              className="fw-connector-col"
              style={{ position: 'absolute', left: 28, top: 0, width: 2, background: '#e8e8e8', height: connHeight }}
            />
          )}
          <div className="fw-sub-content-inner" ref={innerRef}>
            {node.children.map(leaf => (
              <LeafNode key={leaf.id} node={leaf} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Cat (level 1) node ───────────────────────────────────────────────────────
function CatNode({ node, openCatId, onToggleCat }) {
  const isOpen = openCatId === node.id;
  const [openSubId, setOpenSubId] = useState(null);
  const innerRef = useRef(null);
  const connHeight = useConnector(innerRef, isOpen);

  // Reset sub when cat collapses
  useEffect(() => {
    if (!isOpen) setOpenSubId(null);
  }, [isOpen]);

  const handleToggleSub = (subId) => {
    setOpenSubId(prev => prev === subId ? null : subId);
  };

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
        <div style={{ paddingLeft: 32, paddingTop: 6, position: 'relative' }}>
          {connHeight > 0 && (
            <div
              className="fw-connector-col"
              style={{ position: 'absolute', left: 32, top: 0, width: 2, background: '#e8e8e8', height: connHeight }}
            />
          )}
          <div className="fw-cat-content-inner" ref={innerRef}>
            {node.children.map(sub => (
              <SubNode
                key={sub.id}
                node={sub}
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
export default function FlavorWheel({ onBack }) {
  const [openCatId, setOpenCatId] = useState(null);

  const handleToggleCat = (catId) => {
    setOpenCatId(prev => prev === catId ? null : catId);
  };

  return (
    <div style={{ fontFamily: '"Exo 2", sans-serif', background: '#fff', color: '#111', maxWidth: 430, margin: '0 auto', paddingBottom: 48 }}>
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
          />
        ))}
      </div>

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
          border: none;
          border-radius: 4px;
          padding: 10px 14px;
          font-family: "Exo 2", sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .fw-sub-btn.dark-text { color: #111; }

        .fw-leaf-btn {
          flex: 1;
          border: none;
          border-radius: 4px;
          padding: 9px 14px;
          font-family: "Exo 2", sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: #fff;
          text-align: left;
          cursor: default;
          width: 100%;
        }
        .fw-leaf-btn.dark-text { color: #111; }

        .fw-sub-row,
        .fw-leaf-row {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .fw-h-line {
          width: 14px;
          height: 2px;
          background: #e8e8e8;
          flex-shrink: 0;
        }

        .fw-sub-item { margin-bottom: 6px; }
        .fw-leaf-item { margin-bottom: 5px; }

        .fw-cat-content-inner,
        .fw-sub-content-inner {
          display: flex;
          flex-direction: column;
        }

        .fw-arrow {
          font-size: 10px;
          opacity: 0.8;
          transition: transform 0.2s;
          display: inline-block;
        }
        .fw-arrow.open { transform: rotate(180deg); }
      `}</style>
    </div>
  );
}
