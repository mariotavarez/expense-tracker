import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import AddExpenseModal from './components/AddExpenseModal';
import CategoryChart from './components/CategoryChart';
import MonthlyChart from './components/MonthlyChart';
import BudgetProgress from './components/BudgetProgress';
import FilterBar from './components/FilterBar';
import { useExpenses } from './hooks/useExpenses';
import { useBudgets } from './hooks/useBudgets';
import type { CategoryId } from './utils/categories';
import { getCurrentMonthKey, getPreviousMonthKey } from './utils/dateUtils';
import './index.css';

type ActiveTab = 'overview' | 'transactions' | 'charts' | 'budgets';

export default function App() {
  const { expenses, addExpense, deleteExpense, getTotalForMonth, getCategoryTotals } =
    useExpenses();
  const { budgets, setBudgetLimit } = useBudgets();

  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey());
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const prevMonth = getPreviousMonthKey(selectedMonth);
  const totalExpenses = getTotalForMonth(selectedMonth, 'expense');
  const totalIncome = getTotalForMonth(selectedMonth, 'income');
  const prevMonthExpenses = getTotalForMonth(prevMonth, 'expense');
  const categoryTotals = getCategoryTotals(selectedMonth);

  const monthExpenses = expenses.filter((e) => e.date.startsWith(selectedMonth));

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'charts', label: 'Charts' },
    { id: 'budgets', label: 'Budgets' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Top Nav */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #ebebeb',
        }}
      >
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '0 24px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                background: '#171717',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>S</span>
            </div>
            <span
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#171717',
                letterSpacing: '-0.8px',
              }}
            >
              Spendr
            </span>
          </div>

          {/* Tab navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#171717' : '#666666',
                  background: activeTab === tab.id ? '#f5f5f5' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease',
                  letterSpacing: '-0.1px',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Add button */}
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '7px 14px',
              fontSize: '13px',
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
              (e.currentTarget as HTMLButtonElement).style.background = '#000000';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#171717';
            }}
          >
            + Add
          </button>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '32px 24px 64px',
        }}
      >
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Dashboard
              totalExpenses={totalExpenses}
              totalIncome={totalIncome}
              prevMonthExpenses={prevMonthExpenses}
              categoryTotals={categoryTotals}
              onAddExpense={() => setShowModal(true)}
              selectedMonth={selectedMonth}
            />

            <FilterBar
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
              }}
            >
              <CategoryChart categoryTotals={categoryTotals} />
              <MonthlyChart expenses={expenses} />
            </div>

            <ExpenseList
              expenses={monthExpenses}
              selectedCategory={selectedCategory}
              onDelete={deleteExpense}
            />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#171717',
                  letterSpacing: '-1.6px',
                  marginBottom: '6px',
                }}
              >
                Transactions
              </h1>
              <p style={{ fontSize: '14px', color: '#808080' }}>
                All expenses and income for the selected period.
              </p>
            </div>

            <FilterBar
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <ExpenseList
              expenses={monthExpenses}
              selectedCategory={selectedCategory}
              onDelete={deleteExpense}
            />
          </div>
        )}

        {activeTab === 'charts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#171717',
                  letterSpacing: '-1.6px',
                  marginBottom: '6px',
                }}
              >
                Analytics
              </h1>
              <p style={{ fontSize: '14px', color: '#808080' }}>
                Visual breakdown of your spending patterns.
              </p>
            </div>

            <FilterBar
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '16px',
              }}
            >
              <CategoryChart categoryTotals={categoryTotals} />
              <MonthlyChart expenses={expenses} />
            </div>
          </div>
        )}

        {activeTab === 'budgets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#171717',
                  letterSpacing: '-1.6px',
                  marginBottom: '6px',
                }}
              >
                Budget Limits
              </h1>
              <p style={{ fontSize: '14px', color: '#808080' }}>
                Set monthly spending limits per category.
              </p>
            </div>

            <FilterBar
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <BudgetProgress
              categoryTotals={categoryTotals}
              budgets={budgets}
              onSetBudget={setBudgetLimit}
            />
          </div>
        )}
      </main>

      {showModal && (
        <AddExpenseModal
          onAdd={addExpense}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
