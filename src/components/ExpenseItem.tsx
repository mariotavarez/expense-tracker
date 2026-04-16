import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Expense } from '../hooks/useExpenses';
import { getCategory } from '../utils/categories';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDateShort } from '../utils/dateUtils';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const cat = getCategory(expense.category);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '6px',
        background: '#ffffff',
        transition: 'background 0.1s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = '#fafafa';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = '#ffffff';
      }}
    >
      {/* Category icon */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: cat.lightColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          flexShrink: 0,
        }}
      >
        {expense.type === 'income' ? '💰' : cat.emoji}
      </div>

      {/* Description + date */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#171717',
            letterSpacing: '-0.2px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {expense.description}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#808080',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            marginTop: '2px',
          }}
        >
          <span>{formatDateShort(expense.date)}</span>
          <span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#cccccc',
            }}
          />
          <span
            style={{
              background: cat.lightColor,
              color: cat.color,
              fontSize: '11px',
              fontWeight: 500,
              padding: '1px 6px',
              borderRadius: '4px',
            }}
          >
            {expense.type === 'income' ? 'Income' : cat.label}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: expense.type === 'income' ? '#0a72ef' : '#ff5b4f',
          letterSpacing: '-0.3px',
          flexShrink: 0,
        }}
      >
        {expense.type === 'income' ? '+' : '-'}
        {formatCurrency(expense.amount)}
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(expense.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          border: 'none',
          background: 'transparent',
          color: '#cccccc',
          cursor: 'pointer',
          transition: 'all 0.1s ease',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#fff1f0';
          (e.currentTarget as HTMLButtonElement).style.color = '#ff5b4f';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = '#cccccc';
        }}
        title="Delete transaction"
      >
        <Trash2 size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
