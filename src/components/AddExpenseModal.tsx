import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Expense } from '../hooks/useExpenses';
import { CATEGORIES } from '../utils/categories';
import type { CategoryId } from '../utils/categories';

interface AddExpenseModalProps {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  fontSize: '14px',
  color: '#171717',
  background: '#ffffff',
  border: 'none',
  boxShadow: '0 0 0 1px rgba(0,0,0,0.12)',
  borderRadius: '6px',
  outline: 'none',
  letterSpacing: '-0.2px',
};

export default function AddExpenseModal({
  onAdd,
  onClose,
}: AddExpenseModalProps) {
  const today = new Date().toISOString().split('T')[0];

  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryId>('food');
  const [date, setDate] = useState(today);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    if (isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!date) {
      setError('Date is required.');
      return;
    }
    onAdd({
      description: description.trim(),
      amount: parsed,
      category,
      date,
      type,
    });
    onClose();
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.18)',
          width: '100%',
          maxWidth: '440px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px 16px',
            borderBottom: '1px solid #ebebeb',
          }}
        >
          <h2
            style={{
              fontSize: '17px',
              fontWeight: 600,
              color: '#171717',
              letterSpacing: '-0.5px',
            }}
          >
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: '#808080',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px 24px' }}>
          {/* Income / Expense toggle */}
          <div
            style={{
              display: 'flex',
              background: '#f5f5f5',
              borderRadius: '8px',
              padding: '3px',
              marginBottom: '20px',
            }}
          >
            {(['expense', 'income'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                style={{
                  flex: 1,
                  padding: '7px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  letterSpacing: '-0.2px',
                  ...(type === t
                    ? {
                        background: '#ffffff',
                        color: t === 'expense' ? '#ff5b4f' : '#0a72ef',
                        boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
                      }
                    : {
                        background: 'transparent',
                        color: '#808080',
                      }),
                }}
              >
                {t === 'expense' ? 'Expense' : 'Income'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Description */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4d4d4d',
                  marginBottom: '6px',
                  letterSpacing: '-0.1px',
                }}
              >
                Description
              </label>
              <input
                type="text"
                placeholder="e.g. Whole Foods grocery run"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.boxShadow =
                    '0 0 0 2px rgba(0,114,245,0.4)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.boxShadow =
                    '0 0 0 1px rgba(0,0,0,0.12)';
                }}
              />
            </div>

            {/* Amount */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4d4d4d',
                  marginBottom: '6px',
                }}
              >
                Amount (USD)
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    color: '#808080',
                    fontWeight: 500,
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: '24px' }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      '0 0 0 2px rgba(0,114,245,0.4)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.boxShadow =
                      '0 0 0 1px rgba(0,0,0,0.12)';
                  }}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4d4d4d',
                  marginBottom: '6px',
                }}
              >
                Category
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '6px',
                }}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 4px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: category === cat.id ? 600 : 400,
                      transition: 'all 0.1s ease',
                      ...(category === cat.id
                        ? {
                            background: cat.lightColor,
                            color: cat.color,
                            boxShadow: `0 0 0 1.5px ${cat.color}`,
                          }
                        : {
                            background: '#f9fafb',
                            color: '#4d4d4d',
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
                          }),
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{cat.emoji}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4d4d4d',
                  marginBottom: '6px',
                }}
              >
                Date
              </label>
              <input
                type="date"
                value={date}
                max={today}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.boxShadow =
                    '0 0 0 2px rgba(0,114,245,0.4)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.boxShadow =
                    '0 0 0 1px rgba(0,0,0,0.12)';
                }}
              />
            </div>
          </div>

          {error && (
            <p
              style={{
                fontSize: '12px',
                color: '#ff5b4f',
                marginTop: '12px',
                marginBottom: '-4px',
              }}
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '20px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '9px 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#171717',
                background: 'white',
                border: 'none',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '-0.2px',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '9px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                background: '#171717',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '-0.2px',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  '#000000';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  '#171717';
              }}
            >
              Add {type === 'income' ? 'Income' : 'Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
