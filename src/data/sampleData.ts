import type { Expense } from '../hooks/useExpenses';
import type { Budget } from '../hooks/useBudgets';

function d(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split('T')[0];
}

export const SAMPLE_EXPENSES: Expense[] = [
  // Current month — expenses
  { id: 'e1', description: 'Whole Foods grocery run', amount: 127.5, category: 'food', date: d(1), type: 'expense' },
  { id: 'e2', description: 'Uber to airport', amount: 42.0, category: 'transport', date: d(2), type: 'expense' },
  { id: 'e3', description: 'Netflix subscription', amount: 15.99, category: 'entertainment', date: d(3), type: 'expense' },
  { id: 'e4', description: 'ASOS order', amount: 89.0, category: 'shopping', date: d(3), type: 'expense' },
  { id: 'e5', description: 'Rent payment', amount: 1800.0, category: 'housing', date: d(4), type: 'expense' },
  { id: 'e6', description: 'Pharmacy prescription', amount: 34.5, category: 'health', date: d(5), type: 'expense' },
  { id: 'e7', description: 'Spotify annual plan', amount: 11.99, category: 'entertainment', date: d(6), type: 'expense' },
  { id: 'e8', description: 'Chipotle lunch', amount: 13.25, category: 'food', date: d(7), type: 'expense' },
  { id: 'e9', description: 'Metro card top up', amount: 33.0, category: 'transport', date: d(8), type: 'expense' },
  { id: 'e10', description: 'Amazon Prime', amount: 14.99, category: 'shopping', date: d(9), type: 'expense' },
  // Current month — income
  { id: 'i1', description: 'Monthly salary', amount: 4200.0, category: 'other', date: d(1), type: 'income' },
  { id: 'i2', description: 'Freelance project', amount: 650.0, category: 'other', date: d(10), type: 'income' },

  // Last month
  { id: 'e11', description: 'Trader Joe\'s groceries', amount: 98.4, category: 'food', date: d(32), type: 'expense' },
  { id: 'e12', description: 'Gym membership', amount: 45.0, category: 'health', date: d(33), type: 'expense' },
  { id: 'e13', description: 'Lyft rides', amount: 67.0, category: 'transport', date: d(34), type: 'expense' },
  { id: 'e14', description: 'Concert tickets', amount: 120.0, category: 'entertainment', date: d(35), type: 'expense' },
  { id: 'e15', description: 'Rent payment', amount: 1800.0, category: 'housing', date: d(36), type: 'expense' },
  { id: 'e16', description: 'Nike sneakers', amount: 110.0, category: 'shopping', date: d(37), type: 'expense' },
  { id: 'e17', description: 'Dentist visit', amount: 75.0, category: 'health', date: d(38), type: 'expense' },
  { id: 'e18', description: 'Starbucks (x10)', amount: 55.0, category: 'food', date: d(39), type: 'expense' },
  { id: 'i3', description: 'Monthly salary', amount: 4200.0, category: 'other', date: d(32), type: 'income' },

  // 2 months ago
  { id: 'e19', description: 'Food delivery apps', amount: 142.0, category: 'food', date: d(62), type: 'expense' },
  { id: 'e20', description: 'Car insurance', amount: 180.0, category: 'transport', date: d(63), type: 'expense' },
  { id: 'e21', description: 'Steam games', amount: 59.99, category: 'entertainment', date: d(64), type: 'expense' },
  { id: 'e22', description: 'Rent payment', amount: 1800.0, category: 'housing', date: d(65), type: 'expense' },
  { id: 'e23', description: 'Doctor copay', amount: 40.0, category: 'health', date: d(66), type: 'expense' },
  { id: 'e24', description: 'IKEA furniture', amount: 234.0, category: 'shopping', date: d(67), type: 'expense' },
  { id: 'i4', description: 'Monthly salary', amount: 4200.0, category: 'other', date: d(62), type: 'income' },
  { id: 'i5', description: 'Consulting fee', amount: 900.0, category: 'other', date: d(70), type: 'income' },

  // 3 months ago
  { id: 'e25', description: 'Grocery haul', amount: 115.0, category: 'food', date: d(92), type: 'expense' },
  { id: 'e26', description: 'Gas & tolls', amount: 78.0, category: 'transport', date: d(93), type: 'expense' },
  { id: 'e27', description: 'Disney+ bundle', amount: 19.99, category: 'entertainment', date: d(94), type: 'expense' },
  { id: 'e28', description: 'Rent payment', amount: 1800.0, category: 'housing', date: d(95), type: 'expense' },
  { id: 'e29', description: 'New glasses', amount: 195.0, category: 'health', date: d(96), type: 'expense' },
  { id: 'i6', description: 'Monthly salary', amount: 4200.0, category: 'other', date: d(92), type: 'income' },

  // 4 months ago
  { id: 'e30', description: 'Restaurant dinners', amount: 165.0, category: 'food', date: d(122), type: 'expense' },
  { id: 'e31', description: 'Airbnb weekend', amount: 320.0, category: 'transport', date: d(123), type: 'expense' },
  { id: 'e32', description: 'Rent payment', amount: 1800.0, category: 'housing', date: d(124), type: 'expense' },
  { id: 'e33', description: 'H&M haul', amount: 85.0, category: 'shopping', date: d(125), type: 'expense' },
  { id: 'i7', description: 'Monthly salary', amount: 4200.0, category: 'other', date: d(122), type: 'income' },

  // 5 months ago
  { id: 'e34', description: 'Meal prep groceries', amount: 109.0, category: 'food', date: d(152), type: 'expense' },
  { id: 'e35', description: 'Uber Eats', amount: 87.0, category: 'food', date: d(153), type: 'expense' },
  { id: 'e36', description: 'Bus & train passes', amount: 55.0, category: 'transport', date: d(154), type: 'expense' },
  { id: 'e37', description: 'Xbox Game Pass', amount: 14.99, category: 'entertainment', date: d(155), type: 'expense' },
  { id: 'e38', description: 'Rent payment', amount: 1800.0, category: 'housing', date: d(156), type: 'expense' },
  { id: 'i8', description: 'Monthly salary', amount: 4200.0, category: 'other', date: d(152), type: 'income' },
];

export const SAMPLE_BUDGETS: Budget[] = [
  { category: 'food', limit: 400 },
  { category: 'transport', limit: 150 },
  { category: 'entertainment', limit: 100 },
  { category: 'shopping', limit: 200 },
  { category: 'housing', limit: 1900 },
  { category: 'health', limit: 150 },
  { category: 'other', limit: 300 },
];
