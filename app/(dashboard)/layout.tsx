import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components";
import { getSession } from "@/lib/auth";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await getSession();

  if (!session) redirect("/");

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-1 max-w-screen-lg">
        <Sidebar session={session} />
        {children}
      </div>
    </div>
  );
}
