"use client";

import { useMemo, useEffect, useState } from "react";

type ExpenseKey = "rent" | "groceries" | "transport" | "phone" | "misc";

type ExpenseItem = {
  key: ExpenseKey;
  label: string;
  hint: string;
};

const expenseItems: ExpenseItem[] = [
  { key: "rent", label: "Rent", hint: "Weekly or monthly housing cost" },
  { key: "groceries", label: "Groceries", hint: "Food and household basics" },
  { key: "transport", label: "Transport", hint: "Opal, rideshare, fuel" },
  { key: "phone", label: "Phone Bill", hint: "Mobile plan and data" },
  { key: "misc", label: "Misc Expenses", hint: "Health, shopping, weekends" },
];

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currency.format(Number.isFinite(value) ? value : 0);
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function MoneyInput({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block rounded-lg border border-white/10 bg-white/[0.05] p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.08]">
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="block text-sm font-semibold text-white">{label}</span>
          <span className="mt-1 block text-xs leading-5 text-slate-400">
            {hint}
          </span>
        </span>
        <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          AUD
        </span>
      </span>
      <input
        type="number"
        min="0"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 w-full rounded-lg border border-white/10 bg-[#05070f] px-4 py-3 text-base font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
        placeholder="0"
      />
    </label>
  );
}

function StatCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "positive" | "warning";
}) {
  const toneClass =
    tone === "positive"
      ? "text-emerald-300"
      : tone === "warning"
        ? "text-amber-300"
        : "text-cyan-200";

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${toneClass}`}>
        {value}
      </p>
    </div>
  );
}

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
      <p className="text-sm font-semibold text-cyan-100">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
    </div>
  );
}

function ExpenseBar({
  label,
  amount,
  percentClass,
}: {
  label: string;
  amount: number;
  percentClass: string;
}) {
  return (
    <div className="rounded-lg bg-white/[0.05] p-4">
      <div className="mb-3 flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-white">{formatCurrency(amount)}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className={`h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 ${percentClass}`}
        />
      </div>
    </div>
  );
}

export default function BudgetPlannerPage() {

  const [income, setIncome] = useState("3200");

  const [expenses, setExpenses] = useState<Record<ExpenseKey, string>>({
    rent: "1600",
    groceries: "480",
    transport: "180",
    phone: "45",
    misc: "300",  
  });

  useEffect(() => {
    const savedBudget =
      localStorage.getItem("atlasBudget");

    if (savedBudget) {
      const parsed = JSON.parse(savedBudget);

      if (parsed.income) {
        setIncome(parsed.income);
      }

      if (parsed.expenses) {
        setExpenses(parsed.expenses);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "atlasBudget",
      JSON.stringify({
        income,
        expenses
      })
    );
  }, [income, expenses]);

  const budget = useMemo(() => {
    const monthlyIncome = toNumber(income);
    const values = expenseItems.map((item) => ({
      ...item,
      amount: toNumber(expenses[item.key]),
    }));

    const total = values.reduce((sum, item) => sum + item.amount, 0);
    const remaining = monthlyIncome - total;
    const savingsRate = monthlyIncome > 0 ? (remaining / monthlyIncome) * 100 : 0;
    const rentShare =
      monthlyIncome > 0 ? (toNumber(expenses.rent) / monthlyIncome) * 100 : 0;
    const topExpense = values.reduce((highest, item) =>
      item.amount > highest.amount ? item : highest,
    );

    const bars = values.map((item) => {
      const percent = total > 0 ? Math.round((item.amount / total) * 100) : 0;
      const percentClass =
        percent >= 75
          ? "w-3/4"
          : percent >= 50
            ? "w-1/2"
            : percent >= 25
              ? "w-1/4"
              : percent >= 10
                ? "w-[10%]"
                : "w-[4%]";

      return { ...item, percentClass };
    });

    return {
      total,
      remaining,
      savingsRate,
      rentShare,
      topExpense,
      bars,
    };
  }, [expenses, income]);

  const insights = [
    budget.remaining >= 0
      ? {
          title: "Budget status",
          body: `You have ${formatCurrency(
            budget.remaining,
          )} left after monthly essentials. Keep part of it ready for visa, health, or study costs.`,
        }
      : {
          title: "Budget status",
          body: `You are ${formatCurrency(
            Math.abs(budget.remaining),
          )} over budget. Review flexible categories before rent or required bills.`,
        },
    budget.rentShare > 45
      ? {
          title: "Rent pressure",
          body: "Rent is taking a high share of income. A shared room, suburb comparison, or weekly cap could improve your cash flow.",
        }
      : {
          title: "Rent balance",
          body: "Your rent looks manageable against income. Keep checking bond, utilities, and commute costs together.",
        },
    budget.savingsRate >= 15
      ? {
          title: "Savings signal",
          body: "You are leaving a healthy buffer. Consider splitting it between emergency savings and planned student expenses.",
        }
      : {
          title: "Savings signal",
          body: "Your buffer is tight. Try setting a small weekly limit for misc spending before the month starts.",
        },
  ];

  return (
    <main className="min-h-screen bg-[#05070f] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] px-6 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
              <span className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.95)]" />
            </span>
            <span className="text-lg font-semibold tracking-wide">Atlas AI</span>
          </a>
          <a
            href="/"
            className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
          >
            Home
          </a>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Student Budget Planner
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Plan your Sydney month before the money disappears.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Add income and everyday costs to see your monthly total, remaining
              budget, and AI-style spending insights for international student
              life.
            </p>

            <div className="mt-8 rounded-lg border border-white/10 bg-[#08111f]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <MoneyInput
                label="Monthly Income"
                hint="Part-time work, family support, savings, or scholarship funds"
                value={income}
                onChange={setIncome}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Monthly expenses"
              value={formatCurrency(budget.total)}
            />
            <StatCard
              label="Remaining budget"
              value={formatCurrency(budget.remaining)}
              tone={budget.remaining >= 0 ? "positive" : "warning"}
            />
            <StatCard
              label="Savings rate"
              value={`${Math.round(budget.savingsRate)}%`}
              tone={budget.savingsRate >= 15 ? "positive" : "warning"}
            />
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-white/10 bg-[#08111f]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Monthly Inputs</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Update your essentials and flexible spending.
                </p>
              </div>
              <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
                Live
              </span>
            </div>

            <div className="grid gap-4">
              {expenseItems.map((item) => (
                <MoneyInput
                  key={item.key}
                  label={item.label}
                  hint={item.hint}
                  value={expenses[item.key]}
                  onChange={(value) =>
                    setExpenses((current) => ({
                      ...current,
                      [item.key]: value,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-white/10 bg-[#08111f]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Expense Breakdown</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Largest cost: {budget.topExpense.label}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Monthly
                </span>
              </div>

              <div className="space-y-4">
                {budget.bars.map((item) => (
                  <ExpenseBar
                    key={item.key}
                    label={item.label}
                    amount={item.amount}
                    percentClass={item.percentClass}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30">
              <h2 className="text-xl font-semibold">Spending Insights</h2>
              <div className="mt-5 grid gap-4">
                {insights.map((insight) => (
                  <InsightCard
                    key={insight.title}
                    title={insight.title}
                    body={insight.body}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
