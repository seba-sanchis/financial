import Link from "next/link";
import Image from "next/image";
import { getProviders } from "next-auth/react";

import { Session } from "@/types";
import { OAuth } from "@/components";

type Props = {
  session: Session;
};

export default async function Navbar({ session }: Props) {
  const providers = await getProviders();
  return (
    <nav>
      {session && (
        <div className="flex gap-3 md:gap-5">
          <Link href="/profile">
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </Link>
        </div>
      )}
      {providers &&
        Object.values(providers).map(
          (provider) =>
            provider.name !== "Credentials" && (
              <OAuth
                key={provider.id}
                id={provider.id}
                name={provider.name}
                session={session}
              />
            )
        )}
    </nav>
  );
}
