import React from 'react';
import { Receipt } from 'lucide-react';
import type { Expense } from '../hooks/useExpenses';
import type { CategoryId } from '../utils/categories';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  selectedCategory: CategoryId | 'all';
  onDelete: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  selectedCategory,
  onDelete,
}: ExpenseListProps) {
  const filtered =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div
      style={{
        background: '#ffffff',
        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px 20px 12px',
          borderBottom: '1px solid #ebebeb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#171717',
            letterSpacing: '-0.4px',
          }}
        >
          Transactions
        </h2>
        <span
          style={{
            fontSize: '12px',
            color: '#808080',
            background: '#f5f5f5',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          {sorted.length} item{sorted.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div
        style={{
          maxHeight: '460px',
          overflowY: 'auto',
        }}
      >
        {sorted.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              padding: '48px 24px',
              color: '#808080',
            }}
          >
            <Receipt size={32} strokeWidth={1.5} color="#cccccc" />
            <div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#4d4d4d',
                  textAlign: 'center',
                }}
              >
                No transactions yet
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: '#808080',
                  textAlign: 'center',
                  marginTop: '4px',
                }}
              >
                Add your first expense to get started.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ padding: '4px 4px' }}>
            {sorted.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
