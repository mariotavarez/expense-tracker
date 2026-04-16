import { useState, useCallback } from 'react';
import type { CategoryId } from '../utils/categories';
import { SAMPLE_EXPENSES } from '../data/sampleData';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: CategoryId;
  date: string; // YYYY-MM-DD
  type: 'expense' | 'income';
}

const STORAGE_KEY = 'spendr-expenses';

function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Expense[];
    }
  } catch {
    // ignore
  }
  // Seed with sample data on first load
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_EXPENSES));
  return SAMPLE_EXPENSES;
}

function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: `e-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    setExpenses((prev) => {
      const updated = [newExpense, ...prev];
      saveExpenses(updated);
      return updated;
    });
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveExpenses(updated);
      return updated;
    });
  }, []);

  const getExpensesForMonth = useCallback(
    (monthKey: string) => {
      return expenses.filter((e) => e.date.startsWith(monthKey));
    },
    [expenses]
  );

  const getTotalForMonth = useCallback(
    (monthKey: string, type: 'expense' | 'income' = 'expense') => {
      return expenses
        .filter((e) => e.date.startsWith(monthKey) && e.type === type)
        .reduce((sum, e) => sum + e.amount, 0);
    },
    [expenses]
  );

  const getCategoryTotals = useCallback(
    (monthKey: string) => {
      const totals: Record<string, number> = {};
      expenses
        .filter((e) => e.date.startsWith(monthKey) && e.type === 'expense')
        .forEach((e) => {
          totals[e.category] = (totals[e.category] ?? 0) + e.amount;
        });
      return totals;
    },
    [expenses]
  );

  return {
    expenses,
    addExpense,
    deleteExpense,
    getExpensesForMonth,
    getTotalForMonth,
    getCategoryTotals,
  };
}
