import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import {
  getServerSession,
  type NextAuthOptions,
  type User as Users,
} from "next-auth";

import { getAccount, newAccount } from "./actions/account.actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        if (!session.user?.email) throw new Error("Invalid email");

        // store the account in session
        const response = await getAccount(session.user.email);

        session.user = response;

        return session;
      } catch (error) {
        if (error instanceof Error)
          throw new Error(
            `Error storing the account in session: ${error.message}`
          );

        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | Users }) {
      try {
        const { email, name, image } = user;
        if (!email || !name || !image) throw new Error("Invalid account.");

        // check if account already exists
        const existingAccount = await getAccount(email);

        // if not, create a new document and save account in MongoDB
        if (!existingAccount) await newAccount({ email, name, image });

        return true;
      } catch (error) {
        if (error instanceof Error)
          throw new Error(`Error checking if user exists: ${error.message}`);

        return false;
      }
    },
  },
};

export async function getSession() {
  const data = await getServerSession(authOptions);

  return JSON.parse(JSON.stringify(data));
}
