"use client";

import { useEffect } from "react";

import { Balance, Transaction, User, useStore } from "@/lib/store";

type Props = {
  user: User;
  balances: Balance[];
  transactions: Transaction[];
};

export function ClientHydrator({ user, balances, transactions }: Props) {
  const { setUser, setBalances, setTransactions } = useStore();

  useEffect(() => {
    setUser(user);
    setBalances(balances);
    setTransactions(transactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
