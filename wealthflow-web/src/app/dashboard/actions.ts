"use server";

import { gql } from "@apollo/client";
import { currentUser } from "@clerk/nextjs/server";

import { createApolloClient } from "@/lib/apolloClient";
import { Transaction } from "@/lib/store";

export async function getUser() {
  const client = await createApolloClient();
  const user = await currentUser();

  const userId = user?.privateMetadata["userId"];

  if (!userId) {
    return null;
  }

  try {
    const { data } = await client.query({
      query: gql`
        query FindUser($input: FindUserInput!) {
          user(input: $input) {
            id
            email
            name
            monthlyIncome
            totalMoney
            payday
          }
        }
      `,
      variables: {
        input: {
          id: userId,
        },
      },
    });

    return data.user;
  } catch (error) {
    console.log(error);
  }
}

export async function getGoals() {
  const client = await createApolloClient();
  const user = await currentUser();

  const userId = user?.privateMetadata["userId"];

  if (!userId) {
    return null;
  }

  try {
    const { data } = await client.query({
      query: gql`
        query FindGoals($input: FindUserInput!) {
          goals(input: $input) {
            id
            email
            name
            monthlyIncome
            totalMoney
            payday
          }
        }
      `,
      variables: {
        input: {
          id: userId,
        },
      },
    });

    return data.user;
  } catch (error) {
    console.log(error);
  }
}

export async function getBalances() {
  const client = await createApolloClient();

  try {
    const { data } = await client.query({
      query: gql`
        query FindBalances {
          balances {
            balances {
              id
              name
              amount
              usable
              color
            }
          }
        }
      `,
    });

    return data.balances?.balances;
  } catch (error) {
    console.log(error);
  }
}

interface GetTransactionsCriteria {
  fromDate?: Transaction["createdAt"];
  toDate?: Transaction["createdAt"];
  transactionType?: Transaction["type"];
  balanceId?: Transaction["balanceId"];
}

export async function getTransactions(criteria: GetTransactionsCriteria) {
  const client = await createApolloClient();

  try {
    const { data } = await client.query({
      query: gql`
        query FindTransactions($input: FindTransactionInput!) {
          transactions(input: $input) {
            transactions {
              id
              amount
              type
              balanceId
              balanceToId
              goalId
              createdAt
            }
          }
        }
      `,
      variables: {
        input: {
          criteria,
        },
      },
    });

    return data.transactions?.transactions;
  } catch (error) {
    console.log(error);
  }
}
