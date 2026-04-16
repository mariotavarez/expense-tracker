import React from 'react';
import { Plus, DollarSign, TrendingDown, Wallet } from 'lucide-react';
import StatCard from './StatCard';
import { formatCurrency } from '../utils/formatCurrency';
import { CATEGORIES } from '../utils/categories';

interface DashboardProps {
  totalExpenses: number;
  totalIncome: number;
  prevMonthExpenses: number;
  categoryTotals: Record<string, number>;
  onAddExpense: () => void;
  selectedMonth: string;
}

function getMonthDisplayName(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(year, month - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'long' });
}

export default function Dashboard({
  totalExpenses,
  totalIncome,
  prevMonthExpenses,
  categoryTotals,
  onAddExpense,
  selectedMonth,
}: DashboardProps) {
  const netBalance = totalIncome - totalExpenses;

  // Percentage change vs last month
  const expenseTrend =
    prevMonthExpenses > 0
      ? ((totalExpenses - prevMonthExpenses) / prevMonthExpenses) * 100
      : 0;

  // Largest category
  const largestCat = CATEGORIES.filter(
    (c) => (categoryTotals[c.id] ?? 0) > 0
  ).sort((a, b) => (categoryTotals[b.id] ?? 0) - (categoryTotals[a.id] ?? 0))[0];

  const monthName = getMonthDisplayName(selectedMonth);

  return (
    <div>
      {/* Hero header */}
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#171717',
              letterSpacing: '-1.6px',
              lineHeight: 1.15,
              marginBottom: '6px',
            }}
          >
            {monthName} Overview
          </h1>
          <p style={{ fontSize: '14px', color: '#808080' }}>
            Track your spending and stay on budget.
          </p>
        </div>

        <button
          onClick={onAddExpense}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 18px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            background: '#171717',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            letterSpacing: '-0.2px',
            transition: 'background 0.1s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#000000';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#171717';
          }}
        >
          <Plus size={15} strokeWidth={2.5} />
          Add Transaction
        </button>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '4px',
        }}
      >
        <StatCard
          label="Expenses This Month"
          value={formatCurrency(totalExpenses)}
          trend={prevMonthExpenses > 0 ? -expenseTrend : undefined}
          trendLabel="vs last month"
          accentColor="#ff5b4f"
          icon={<TrendingDown size={14} strokeWidth={2} />}
        />
        <StatCard
          label="Income This Month"
          value={formatCurrency(totalIncome)}
          subLabel={monthName}
          accentColor="#0a72ef"
          icon={<DollarSign size={14} strokeWidth={2} />}
        />
        <StatCard
          label="Net Balance"
          value={formatCurrency(Math.abs(netBalance))}
          subLabel={netBalance >= 0 ? 'surplus' : 'deficit'}
          accentColor={netBalance >= 0 ? '#16a34a' : '#ff5b4f'}
          icon={<Wallet size={14} strokeWidth={2} />}
        />
        {largestCat && (
          <StatCard
            label="Top Spending Category"
            value={`${largestCat.emoji} ${largestCat.label}`}
            subLabel={formatCurrency(categoryTotals[largestCat.id] ?? 0)}
            accentColor={largestCat.color}
          />
        )}
      </div>
    </div>
  );
}
