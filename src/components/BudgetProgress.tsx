import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import type { Budget } from '../hooks/useBudgets';
import { CATEGORIES, getCategory } from '../utils/categories';
import type { CategoryId } from '../utils/categories';
import { formatCurrency } from '../utils/formatCurrency';

interface BudgetProgressProps {
  categoryTotals: Record<string, number>;
  budgets: Budget[];
  onSetBudget: (category: CategoryId, limit: number) => void;
}

function BudgetRow({
  category,
  spent,
  budget,
  onSetBudget,
}: {
  category: CategoryId;
  spent: number;
  budget?: Budget;
  onSetBudget: (category: CategoryId, limit: number) => void;
}) {
  const cat = getCategory(category);
  const limit = budget?.limit ?? 0;
  const pct = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const isWarning = pct >= 80 && pct < 100;
  const isOver = spent > limit && limit > 0;

  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState(String(limit));

  function handleSave() {
    const parsed = parseFloat(inputVal);
    if (!isNaN(parsed) && parsed > 0) {
      onSetBudget(category, parsed);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setInputVal(String(limit));
      setEditing(false);
    }
  }

  const barColor = isOver
    ? '#ff5b4f'
    : isWarning
    ? '#f97316'
    : cat.color;

  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '8px',
        }}
      >
        <span style={{ fontSize: '16px' }}>{cat.emoji}</span>
        <span
          style={{
            flex: 1,
            fontSize: '14px',
            fontWeight: 500,
            color: '#171717',
            letterSpacing: '-0.2px',
          }}
        >
          {cat.label}
        </span>

        {/* Spent / Limit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: isOver ? '#ff5b4f' : '#171717',
            }}
          >
            {formatCurrency(spent)}
          </span>
          <span style={{ fontSize: '12px', color: '#cccccc' }}>/</span>

          {editing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: '#808080' }}>$</span>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{
                  width: '72px',
                  fontSize: '13px',
                  padding: '3px 6px',
                  border: 'none',
                  boxShadow: '0 0 0 1.5px rgba(0,114,245,0.5)',
                  borderRadius: '4px',
                  outline: 'none',
                  color: '#171717',
                  fontFamily: 'inherit',
                }}
              />
              <button
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '22px',
                  height: '22px',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#171717',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <Check size={12} />
              </button>
              <button
                onClick={() => {
                  setInputVal(String(limit));
                  setEditing(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '22px',
                  height: '22px',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#f5f5f5',
                  color: '#808080',
                  cursor: 'pointer',
                }}
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  fontSize: '13px',
                  color: '#808080',
                  minWidth: '50px',
                }}
              >
                {limit > 0 ? formatCurrency(limit) : 'No limit'}
              </span>
              <button
                onClick={() => {
                  setInputVal(String(limit || ''));
                  setEditing(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  border: 'none',
                  background: 'transparent',
                  color: '#cccccc',
                  cursor: 'pointer',
                }}
                title="Edit budget limit"
              >
                <Edit2 size={11} />
              </button>
            </div>
          )}
        </div>

        {/* Percentage badge */}
        {limit > 0 && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '4px',
              background: isOver
                ? '#fff1f0'
                : isWarning
                ? '#fff7ed'
                : '#f0fdf4',
              color: isOver ? '#ff5b4f' : isWarning ? '#f97316' : '#16a34a',
              minWidth: '40px',
              textAlign: 'center',
            }}
          >
            {pct.toFixed(0)}%
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '4px',
          background: '#f0f0f0',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        {limit > 0 && (
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: barColor,
              borderRadius: '2px',
              transition: 'width 0.3s ease',
            }}
          />
        )}
      </div>

      {isOver && (
        <p
          style={{
            fontSize: '11px',
            color: '#ff5b4f',
            marginTop: '4px',
          }}
        >
          Over budget by {formatCurrency(spent - limit)}
        </p>
      )}
      {isWarning && !isOver && (
        <p style={{ fontSize: '11px', color: '#f97316', marginTop: '4px' }}>
          {(100 - pct).toFixed(0)}% remaining
        </p>
      )}
    </div>
  );
}

export default function BudgetProgress({
  categoryTotals,
  budgets,
  onSetBudget,
}: BudgetProgressProps) {
  const budgetMap: Record<string, Budget> = Object.fromEntries(
    budgets.map((b) => [b.category, b])
  );

  return (
    <div
      style={{
        background: '#ffffff',
        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)',
        borderRadius: '8px',
        padding: '20px 24px',
      }}
    >
      <h2
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#171717',
          letterSpacing: '-0.4px',
          marginBottom: '4px',
        }}
      >
        Budget Limits
      </h2>
      <p style={{ fontSize: '13px', color: '#808080', marginBottom: '4px' }}>
        Click the pencil icon to set or update a limit.
      </p>

      <div>
        {CATEGORIES.map((cat) => (
          <BudgetRow
            key={cat.id}
            category={cat.id}
            spent={categoryTotals[cat.id] ?? 0}
            budget={budgetMap[cat.id]}
            onSetBudget={onSetBudget}
          />
        ))}
      </div>
    </div>
  );
}
