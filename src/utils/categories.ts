export type CategoryId =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'housing'
  | 'health'
  | 'other';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  color: string;
  lightColor: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'food',
    label: 'Food',
    emoji: '🍕',
    color: '#f97316',
    lightColor: '#fff7ed',
  },
  {
    id: 'transport',
    label: 'Transport',
    emoji: '🚗',
    color: '#3b82f6',
    lightColor: '#eff6ff',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    emoji: '🎮',
    color: '#8b5cf6',
    lightColor: '#f5f3ff',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    emoji: '🛍',
    color: '#ec4899',
    lightColor: '#fdf2f8',
  },
  {
    id: 'housing',
    label: 'Housing',
    emoji: '🏠',
    color: '#10b981',
    lightColor: '#ecfdf5',
  },
  {
    id: 'health',
    label: 'Health',
    emoji: '💊',
    color: '#ef4444',
    lightColor: '#fef2f2',
  },
  {
    id: 'other',
    label: 'Other',
    emoji: '📦',
    color: '#6b7280',
    lightColor: '#f9fafb',
  },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
) as Record<CategoryId, Category>;

export function getCategory(id: CategoryId): Category {
  return CATEGORY_MAP[id] ?? CATEGORY_MAP['other'];
}
