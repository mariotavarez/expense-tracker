import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Expense } from '../hooks/useExpenses';
import { getLast6MonthKeys, getMonthShortLabel } from '../utils/dateUtils';
import { formatCurrency } from '../utils/formatCurrency';

interface MonthlyChartProps {
  expenses: Expense[];
}

interface TooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{ name: string; value: number; fill: string }>;
}

function CustomTooltip({ active, label, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'white',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '13px',
        minWidth: '140px',
      }}
    >
      <div
        style={{ fontWeight: 600, color: '#171717', marginBottom: '8px' }}
      >
        {label}
      </div>
      {payload.map((p) => (
        <div
          key={p.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              background: p.fill,
              flexShrink: 0,
            }}
          />
          <span style={{ color: '#666666', flex: 1 }}>{p.name}</span>
          <span style={{ fontWeight: 600, color: '#171717' }}>
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyChart({ expenses }: MonthlyChartProps) {
  const monthKeys = getLast6MonthKeys();

  const data = monthKeys.map((key) => {
    const monthExpenses = expenses.filter((e) => e.date.startsWith(key));
    const totalExpense = monthExpenses
      .filter((e) => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = monthExpenses
      .filter((e) => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      month: getMonthShortLabel(key),
      Expenses: Math.round(totalExpense * 100) / 100,
      Income: Math.round(totalIncome * 100) / 100,
    };
  });

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
        Monthly Overview
      </h2>
      <p style={{ fontSize: '13px', color: '#808080', marginBottom: '20px' }}>
        Income vs expenses — last 6 months
      </p>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
          barGap={3}
          barCategoryGap="30%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#ebebeb"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#808080' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#808080' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) =>
              v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
            }
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#666666', paddingTop: '12px' }}
          />
          <Bar dataKey="Income" fill="#0a72ef" radius={[3, 3, 0, 0]} maxBarSize={32} />
          <Bar dataKey="Expenses" fill="#ff5b4f" radius={[3, 3, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
