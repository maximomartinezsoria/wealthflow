"use server";

import { gql } from "@apollo/client";
import { currentUser } from "@clerk/nextjs/server";

import { createApolloClient } from "@/lib/apolloClient";

interface CreateBalanceDto {
  name: string;
  amount: number;
  color: string;
}

type CreateBalancesDTO = CreateBalanceDto[];

export async function createBalances(createBalancesDto: CreateBalancesDTO) {
  const client = await createApolloClient();
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.privateMetadata["userId"];

  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation CreateBalances($balances: CreateBalancesInput!) {
        createBalances(input: $balances) {
          balances {
            id
          }
        }
      }
    `,
    variables: {
      balances: {
        balances: createBalancesDto.map((balance) => ({
          name: balance.name,
          amount: balance.amount,
          color: balance.color,
          userId,
        })),
      },
    },
  });

  return { data, errors };
}
