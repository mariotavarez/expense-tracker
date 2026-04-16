<div align="center">

# Spendr

**Track spending. Stay on budget.**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-2.10-22b5bf?style=flat-square)](https://recharts.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)

<img src=".github/demo.svg" width="100%"/>

</div>

---

## Why Spendr

Most expense trackers are either too complex or too simplistic. Spendr finds the balance — a clean, fast personal finance dashboard that gives you exactly the information you need:

- **Immediate clarity**: See your month's spending at a glance, compare to last month
- **Category awareness**: Understand where your money actually goes with a visual breakdown
- **Budget discipline**: Set per-category limits and get warned before you overshoot
- **Zero friction**: Add expenses in seconds via the modal form

Built with Vercel's design philosophy: every pixel earns its place.

---

## Features

| Feature | Description |
|---|---|
| **Dashboard** | Monthly totals, % change vs last month, net balance, top category |
| **Transactions** | Full list with category filter, month selector, delete support |
| **Add Expense** | Modal form — description, amount, category, date, income/expense toggle |
| **Category Breakdown** | Recharts donut chart with live category percentages |
| **Monthly Overview** | 6-month bar chart comparing income vs expenses |
| **Budget Limits** | Per-category limits with progress bars, warning at 80%, over-budget alerts |

---

## Quick Start

```bash
git clone https://github.com/mariotavarez/expense-tracker.git
cd expense-tracker
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

The app seeds itself with 3 months of realistic sample data on first load. Data persists in `localStorage`.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19 | UI framework (createRoot) |
| TypeScript | 5.7 strict | Type safety |
| Vite | 6 | Build tool |
| Tailwind CSS | v4 | Utility CSS via `@tailwindcss/vite` |
| Recharts | 2.10 | Charts (PieChart, BarChart) |
| lucide-react | latest | Icons |
| localStorage | — | Data persistence |

---

## Project Structure

```
src/
├── App.tsx                    # Root with tab navigation
├── components/
│   ├── Dashboard.tsx          # KPI overview + hero heading
│   ├── ExpenseList.tsx        # Filtered transaction list
│   ├── ExpenseItem.tsx        # Single row with category icon
│   ├── AddExpenseModal.tsx    # Add/income form modal
│   ├── CategoryChart.tsx      # Recharts PieChart breakdown
│   ├── MonthlyChart.tsx       # Recharts BarChart 6-month view
│   ├── BudgetProgress.tsx     # Per-category budget bars (inline edit)
│   ├── FilterBar.tsx          # Month nav + category chips
│   └── StatCard.tsx           # KPI card with shadow-as-border
├── hooks/
│   ├── useExpenses.ts         # CRUD + localStorage (spendr-expenses)
│   └── useBudgets.ts          # Budget limits + localStorage (spendr-budgets)
├── utils/
│   ├── categories.ts          # Category definitions — emoji, color, label
│   ├── formatCurrency.ts      # Intl.NumberFormat USD wrapper
│   └── dateUtils.ts           # Month key helpers (YYYY-MM format)
└── data/
    └── sampleData.ts          # 3 months of seed transactions + budgets
```

---

## Design

Design system: Vercel-inspired. See [DESIGN.md](./DESIGN.md)

Key principles implemented:

- **Shadow-as-border**: `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)` on every card
- **Extreme negative letter-spacing**: `-1.6px` on 32px headings, `-1.2px` on display text
- **Vercel Black** (`#171717`) for all headings — not pure `#000000`
- Ship Red (`#ff5b4f`) for expenses, Develop Blue (`#0a72ef`) for income
- Sticky frosted-glass header with `backdrop-filter: blur(12px)`

---

## License

MIT © 2025
