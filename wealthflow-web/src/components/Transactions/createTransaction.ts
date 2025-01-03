"use server";

import { gql } from "@apollo/client";

import { createApolloClient } from "@/lib/apolloClient";

type CreateTransactionInput = {
  amount: number;
  type: string;
  balanceId?: string;
  balanceToId?: string;
  goalId?: string;
};

export async function createTransaction(
  createTransactionInput: CreateTransactionInput,
) {
  const client = await createApolloClient();

  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateTransaction($input: CreateTransactionInput!) {
          createTransaction(input: $input) {
            id
          }
        }
      `,
      variables: {
        input: createTransactionInput,
      },
    });

    return data.createTransaction;
  } catch (error) {
    console.log(error);
  }
}
