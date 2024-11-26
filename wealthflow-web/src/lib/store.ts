import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Transaction = {
  id: number
  date: string
  description: string
  amount: number
  type: 'in' | 'out'
  balance: string
  goal?: string
}

export type Balance = {
  name: string
  value: number
  color: string
}

export type Goal = {
  name: string
  current: number
  target: number
  balance: string
}

type State = {
  balances: Balance[]
  goals: Goal[]
  transactions: Transaction[]
  income: number
  payday: number
  incomeDistribution: Record<string, number>
  isDarkMode: boolean
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateBalance: (name: string, updates: Partial<Balance>) => void
  addGoal: (goal: Goal) => void
  updateGoal: (name: string, amount: number) => void
  removeGoal: (name: string) => void
  setIncome: (amount: number) => void
  setPayday: (day: number) => void
  setIncomeDistribution: (distribution: Record<string, number>) => void
  addBalance: (name: string, value: number, color: string) => void
  removeBalance: (name: string) => void
  toggleDarkMode: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      balances: [
        { name: 'Investment', value: 15000, color: '#FF6384' },
        { name: 'Luxury', value: 5000, color: '#36A2EB' },
        { name: 'Learning', value: 3000, color: '#FFCE56' },
        { name: 'Emergency Fund', value: 10000, color: '#4BC0C0' },
      ],
      goals: [
        { name: 'Trip to Japan', current: 2000, target: 5000, balance: 'Luxury' },
        { name: 'New Apartment', current: 10000, target: 50000, balance: 'Investment' },
        { name: 'S&P 500 Investment', current: 5000, target: 10000, balance: 'Investment' },
        { name: 'Emergency Fund', current: 10000, target: 20000, balance: 'Emergency Fund' },
        { name: 'New Car', current: 3000, target: 25000, balance: 'Luxury' },
      ],
      transactions: [
        { id: 1, date: '2023-06-01', description: 'Salary', amount: 5000, type: 'in', balance: 'Investment' },
        { id: 2, date: '2023-06-02', description: 'Online Course', amount: 200, type: 'out', balance: 'Learning' },
        { id: 3, date: '2023-06-03', description: 'Stocks Purchase', amount: 1000, type: 'out', balance: 'Investment', goal: 'S&P 500 Investment' },
        { id: 4, date: '2023-06-04', description: 'Restaurant', amount: 150, type: 'out', balance: 'Luxury' },
        { id: 5, date: '2023-06-05', description: 'Freelance Work', amount: 800, type: 'in', balance: 'Investment' },
        { id: 6, date: '2023-06-06', description: 'Emergency Fund Contribution', amount: 500, type: 'out', balance: 'Emergency Fund', goal: 'Emergency Fund' },
        { id: 7, date: '2023-06-07', description: 'Movie Night', amount: 50, type: 'out', balance: 'Luxury' },
        { id: 8, date: '2023-06-08', description: 'Book Purchase', amount: 30, type: 'out', balance: 'Learning' },
        { id: 9, date: '2023-06-09', description: 'Dividend Income', amount: 200, type: 'in', balance: 'Investment' },
        { id: 10, date: '2023-06-10', description: 'Japan Trip Savings', amount: 300, type: 'out', balance: 'Luxury', goal: 'Trip to Japan' },
      ],
      income: 5000,
      payday: 1,
      incomeDistribution: { Investment: 60, Luxury: 20, Learning: 20, 'Emergency Fund': 20 },
      isDarkMode: false,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, { ...transaction, id: Date.now() }],
        })),
      updateBalance: (name, updates) =>
        set((state) => ({
          balances: state.balances.map((balance) =>
            balance.name === name ? { ...balance, ...updates } : balance
          ),
        })),
      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, goal],
        })),
      updateGoal: (name, amount) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.name === name ? { ...goal, current: goal.current + amount } : goal
          ),
        })),
      removeGoal: (name) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.name !== name),
        })),
      setIncome: (amount) => set({ income: amount }),
      setPayday: (day) => set({ payday: day }),
      setIncomeDistribution: (distribution) => set({ incomeDistribution: distribution }),
      addBalance: (name, value, color) =>
        set((state) => ({
          balances: [...state.balances, { name, value, color }],
        })),
      removeBalance: (name) =>
        set((state) => ({
          balances: state.balances.filter((balance) => balance.name !== name),
        })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'financial-tracker-storage',
    }
  )
)

