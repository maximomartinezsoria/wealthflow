import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum TransactionType {
  Income = "INCOME",
  Expense = "EXPENSE",
  BalanceTransfer = "BALANCE_TRANSFER",
  GoalAllocation = "GOAL_ALLOCATION",
  GoalDisallocation = "GOAL_DISALLOCATION",
}

export const transactionTypes = Object.values(TransactionType).map((type) => ({
  key: type,
  value: type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "),
}));

export type Transaction = {
  id: number;
  amount: number;
  type: TransactionType;
  balanceId: string;
  goalId: string;
  createdAt: Date;
};

export enum BalanceColor {
  Red = "#FF6384",
  Blue = "#36A2EB",
  Yellow = "#FFCE56",
  Green = "#4BC0C0",
}

export type Balance = {
  id: string;
  name: string;
  amount: number;
  usable: number;
  color: BalanceColor;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  allocated: number;
  balanceId: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  monthlyIncome: number;
  totalMoney: number;
  lastMonthTotalMoney: number;
  payday: number;
};

type State = {
  user: User;
  balances: Balance[];
  goals: Goal[];
  transactions: Transaction[];
  income: number;
  payday: number;
  incomeDistribution: Record<string, number>;
  isDarkMode: boolean;
  setUser: (user: User) => void;
  setBalances: (balances: Balance[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addBalance: (balance: Omit<Balance, "color">) => void;
  updateBalance: (name: string, updates: Partial<Balance>) => void;
  removeBalance: (name: string) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (name: string, amount: number) => void;
  removeGoal: (name: string) => void;
  setIncome: (amount: number) => void;
  setPayday: (day: number) => void;
  setIncomeDistribution: (distribution: Record<string, number>) => void;
  toggleDarkMode: () => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      user: {
        id: "",
        email: "",
        name: "",
        monthlyIncome: 0,
        totalMoney: 0,
        lastMonthTotalMoney: 0,
        payday: 1,
      },
      balances: [],
      goals: [],
      transactions: [],
      income: 0,
      payday: 1,
      incomeDistribution: {},
      isDarkMode: false,
      setUser: (user) => set({ user }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: Date.now() },
          ],
        })),
      setBalances: (balances) => set({ balances }),
      setTransactions: (transactions) => set({ transactions }),
      addBalance: (balance) =>
        set((state) => ({
          balances: [
            ...state.balances,
            {
              ...balance,
              color:
                Object.values(BalanceColor)[
                  Math.floor(Math.random() * Object.keys(BalanceColor).length)
                ],
            },
          ],
        })),
      updateBalance: (name, updates) =>
        set((state) => ({
          balances: state.balances.map((balance) =>
            balance.name === name ? { ...balance, ...updates } : balance,
          ),
        })),
      removeBalance: (name) =>
        set((state) => ({
          balances: state.balances.filter((balance) => balance.name !== name),
        })),
      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, goal],
        })),
      updateGoal: (name, amount) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.name === name
              ? { ...goal, current: goal.allocated + amount }
              : goal,
          ),
        })),
      removeGoal: (name) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.name !== name),
        })),
      setIncome: (amount) => set({ income: amount }),
      setPayday: (day) => set({ payday: day }),
      setIncomeDistribution: (distribution) =>
        set({ incomeDistribution: distribution }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "wealthflow-storage",
    },
  ),
);
