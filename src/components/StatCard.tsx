import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  subLabel?: string;
  trend?: number; // percentage change
  trendLabel?: string;
  accentColor?: string;
  icon?: React.ReactNode;
}

export default function StatCard({
  label,
  value,
  subLabel,
  trend,
  trendLabel,
  accentColor,
  icon,
}: StatCardProps) {
  const hasTrend = trend !== undefined;
  const isPositive = (trend ?? 0) > 0;
  const isNeutral = trend === 0;

  const trendColor = isNeutral
    ? '#666666'
    : isPositive
    ? '#0a72ef'
    : '#ff5b4f';

  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      style={{
        background: '#ffffff',
        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)',
        borderRadius: '8px',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0px 0px 0px 1px rgba(0,0,0,0.08)';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#666666',
            letterSpacing: '0px',
          }}
        >
          {label}
        </span>
        {icon && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: accentColor
                ? `${accentColor}14`
                : 'rgba(0,0,0,0.04)',
              color: accentColor ?? '#171717',
            }}
          >
            {icon}
          </span>
        )}
      </div>

      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#171717',
          letterSpacing: '-1.4px',
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>

      {(hasTrend || subLabel) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '2px',
          }}
        >
          {hasTrend && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '12px',
                fontWeight: 600,
                color: trendColor,
                background: `${trendColor}14`,
                borderRadius: '4px',
                padding: '2px 6px',
              }}
            >
              <TrendIcon size={11} strokeWidth={2.5} />
              {Math.abs(trend!).toFixed(1)}%
            </span>
          )}
          {(trendLabel ?? subLabel) && (
            <span style={{ fontSize: '12px', color: '#808080' }}>
              {trendLabel ?? subLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
