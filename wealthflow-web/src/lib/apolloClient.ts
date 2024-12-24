import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { auth } from "@clerk/nextjs/server";

import { apiUrl } from "@/config";

export async function createApolloClient() {
  const { getToken } = await auth();
  const token = await getToken({ template: "jwt" });

  const httpLink = new HttpLink({
    uri: `${apiUrl}/graphql`,
    fetch,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}
