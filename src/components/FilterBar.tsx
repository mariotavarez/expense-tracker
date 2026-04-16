import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';
import type { CategoryId } from '../utils/categories';
import { getMonthLabel, getPreviousMonthKey } from '../utils/dateUtils';

interface FilterBarProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  selectedCategory: CategoryId | 'all';
  onCategoryChange: (cat: CategoryId | 'all') => void;
}

export default function FilterBar({
  selectedMonth,
  onMonthChange,
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  function goBack() {
    onMonthChange(getPreviousMonthKey(selectedMonth));
  }

  function goForward() {
    const [year, month] = selectedMonth.split('-').map(Number);
    const d = new Date(year, month, 1);
    const next = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    onMonthChange(next);
  }

  const isCurrentMonth =
    selectedMonth ===
    new Date().toISOString().slice(0, 7).replace('T', '-').slice(0, 7);

  const currentMonthStr = new Date().toISOString().slice(0, 7);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px 24px',
        background: '#fafafa',
        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)',
        borderRadius: '8px',
      }}
    >
      {/* Month navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{ fontSize: '13px', fontWeight: 500, color: '#666666', minWidth: 50 }}
        >
          Period
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={goBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: 'none',
              background: 'white',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.12)',
              color: '#171717',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={14} />
          </button>

          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#171717',
              letterSpacing: '-0.3px',
              minWidth: '140px',
              textAlign: 'center',
            }}
          >
            {getMonthLabel(selectedMonth)}
          </span>

          <button
            onClick={goForward}
            disabled={selectedMonth >= currentMonthStr}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: 'none',
              background:
                selectedMonth >= currentMonthStr ? '#fafafa' : 'white',
              boxShadow:
                selectedMonth >= currentMonthStr
                  ? 'none'
                  : '0 0 0 1px rgba(0,0,0,0.12)',
              color:
                selectedMonth >= currentMonthStr ? '#cccccc' : '#171717',
              cursor:
                selectedMonth >= currentMonthStr ? 'not-allowed' : 'pointer',
            }}
          >
            <ChevronRight size={14} />
          </button>

          {!isCurrentMonth && (
            <button
              onClick={() => onMonthChange(currentMonthStr)}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#0072f5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 4px',
              }}
            >
              Today
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{ fontSize: '13px', fontWeight: 500, color: '#666666', minWidth: 50 }}
        >
          Category
        </span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onCategoryChange('all')}
            style={{
              fontSize: '12px',
              fontWeight: selectedCategory === 'all' ? 600 : 400,
              ...(selectedCategory === 'all'
                ? { color: 'white', background: '#171717' }
                : { color: '#4d4d4d', background: 'white' }),
              border: 'none',
              borderRadius: '4px',
              padding: '4px 10px',
              cursor: 'pointer',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
              transition: 'all 0.1s ease',
            }}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              style={{
                fontSize: '12px',
                fontWeight: selectedCategory === cat.id ? 600 : 400,
                ...(selectedCategory === cat.id
                  ? {
                      color: 'white',
                      background: cat.color,
                      boxShadow: `0 0 0 1px ${cat.color}`,
                    }
                  : {
                      color: '#4d4d4d',
                      background: 'white',
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                    }),
                border: 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '11px' }}>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
