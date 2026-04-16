import { useState, useCallback } from 'react';
import type { CategoryId } from '../utils/categories';
import { SAMPLE_BUDGETS } from '../data/sampleData';

export interface Budget {
  category: CategoryId;
  limit: number;
}

const STORAGE_KEY = 'spendr-budgets';

function loadBudgets(): Budget[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Budget[];
    }
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_BUDGETS));
  return SAMPLE_BUDGETS;
}

function saveBudgets(budgets: Budget[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>(() => loadBudgets());

  const setBudgetLimit = useCallback((category: CategoryId, limit: number) => {
    setBudgets((prev) => {
      const existing = prev.find((b) => b.category === category);
      let updated: Budget[];
      if (existing) {
        updated = prev.map((b) =>
          b.category === category ? { ...b, limit } : b
        );
      } else {
        updated = [...prev, { category, limit }];
      }
      saveBudgets(updated);
      return updated;
    });
  }, []);

  const getBudget = useCallback(
    (category: CategoryId): Budget | undefined => {
      return budgets.find((b) => b.category === category);
    },
    [budgets]
  );

  return { budgets, setBudgetLimit, getBudget };
}
