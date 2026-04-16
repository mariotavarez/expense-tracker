import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CATEGORIES, CATEGORY_MAP } from '../utils/categories';
import { formatCurrency } from '../utils/formatCurrency';

interface CategoryChartProps {
  categoryTotals: Record<string, number>;
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomLabelProps) {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="11"
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { category: string } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const cat = CATEGORY_MAP[item.payload.category as keyof typeof CATEGORY_MAP];
  return (
    <div
      style={{
        background: 'white',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '13px',
      }}
    >
      <div style={{ fontWeight: 600, color: '#171717', marginBottom: '4px' }}>
        {cat?.emoji} {cat?.label ?? item.name}
      </div>
      <div style={{ color: '#ff5b4f', fontWeight: 700 }}>
        {formatCurrency(item.value)}
      </div>
    </div>
  );
}

export default function CategoryChart({ categoryTotals }: CategoryChartProps) {
  const data = CATEGORIES.filter(
    (cat) => (categoryTotals[cat.id] ?? 0) > 0
  ).map((cat) => ({
    name: cat.label,
    category: cat.id,
    value: categoryTotals[cat.id] ?? 0,
    color: cat.color,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

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
        Category Breakdown
      </h2>
      <p style={{ fontSize: '13px', color: '#808080', marginBottom: '20px' }}>
        Spending distribution this period
      </p>

      {data.length === 0 ? (
        <div
          style={{
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#808080',
            fontSize: '14px',
          }}
        >
          No expense data for this period.
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            {data
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <div
                  key={item.category}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '2px',
                      background: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: '13px',
                      color: '#4d4d4d',
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#171717',
                    }}
                  >
                    {formatCurrency(item.value)}
                  </span>
                  <span style={{ fontSize: '12px', color: '#808080', minWidth: '36px', textAlign: 'right' }}>
                    {total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
