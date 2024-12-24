import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.privateMetadata["userId"];

  if (!userId) {
    redirect("/onboarding");
  }

  // const client = await createApolloClient();
  // const { data } = await client.query({
  //   query: gql`
  //     query GetUserById($email: String!) {
  //       user(email: $email) {
  //         id
  //         name
  //         email
  //       }
  //     }
  //   `,
  //   variables: { email: emailAddress },
  // });
  // const {getToken} = await auth()
  // const token = await getToken({
  //   template: 'jwt'
  // })
  // const response = await fetch(apiUrl + '/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify({
  //     query: `
  //       query {
  //         user (email: "${emailAddress}") {
  //           id
  //           email
  //         }
  //       }
  //     `})
  // });
  // const data = await response.json()

  return <div>Dashboard</div>;
}
