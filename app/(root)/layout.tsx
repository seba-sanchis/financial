import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { Navbar } from "@/components";
import { getSession } from "@/lib/auth";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await getSession();

  if (session) redirect("/home");

  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
