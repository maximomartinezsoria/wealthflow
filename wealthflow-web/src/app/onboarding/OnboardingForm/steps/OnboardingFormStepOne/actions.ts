"use server";

import { gql } from "@apollo/client";
import {
  clerkClient as createClerkClient,
  currentUser,
} from "@clerk/nextjs/server";

import { createApolloClient } from "@/lib/apolloClient";

interface CreateUserDTO {
  name: string;
  monthlyIncome: number;
  payday: number;
  totalMoney: number;
}

export async function createUser(userDTO: CreateUserDTO) {
  const clerkClient = await createClerkClient();
  const client = await createApolloClient();
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const email = user?.primaryEmailAddress?.emailAddress;

  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation CreateUser($user: CreateUserInput!) {
        createUser(input: $user) {
          id
          name
          email
          monthlyIncome
          payday
          totalMoney
        }
      }
    `,
    variables: {
      user: {
        email,
        name: userDTO.name,
        monthlyIncome: userDTO.monthlyIncome,
        payday: userDTO.payday,
      },
    },
  });

  await clerkClient.users.updateUserMetadata(user.id, {
    privateMetadata: {
      userId: data.createUser.id,
    },
  });

  return {
    data,
    errors,
  };
}
