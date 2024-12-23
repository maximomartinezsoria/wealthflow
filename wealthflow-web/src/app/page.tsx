'use client'

import { useEffect,useState } from 'react'

import { BalanceDistribution } from '@/components/BalanceDistribution'
import { FinancialGoals } from '@/components/FinancialGoals'
import { Header } from '@/components/Header'
import { IncomeDistribution } from '@/components/IncomeDistribution'
import { SummaryCards } from '@/components/SummaryCards'
import { Transactions } from '@/components/Transactions'
import { Transaction,useStore } from '@/lib/store'

export default function DashboardPage() {
  const [sortColumn, setSortColumn] = useState<keyof Transaction>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [filterBalance, setFilterBalance] = useState('')

  const {
    balances,
    goals,
    transactions,
    income,
    payday,
    isDarkMode,
    addTransaction,
    addGoal,
    removeGoal,
    toggleDarkMode,
  } = useStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleSortChange = (column: keyof Transaction) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!a[sortColumn] || !b[sortColumn]) return 0
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const filteredTransactions = filterBalance
    ? sortedTransactions.filter((t) => t.balance === filterBalance)
    : sortedTransactions

  const totalBalance = balances.reduce((sum, balance) => sum + balance.value, 0)

  return (
    <div className={`flex flex-col min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container flex-1 py-6">
        <SummaryCards
          totalBalance={totalBalance}
          income={income}
          payday={payday}
          goalsCount={goals.length}
          completedGoalsCount={goals.filter(goal => goal.current >= goal.target).length}
          transactionsCount={transactions.length}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <BalanceDistribution balances={balances} />
          <IncomeDistribution />
          <FinancialGoals
            goals={goals}
            balances={balances}
            addGoal={addGoal}
            removeGoal={removeGoal}
          />
        </div>
        <Transactions
          transactions={filteredTransactions}
          balances={balances}
          goals={goals}
          addTransaction={addTransaction}
          filterBalance={filterBalance}
          setFilterBalance={setFilterBalance}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
        />
      </main>
    </div>
  )
}

