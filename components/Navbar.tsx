import Link from "next/link";
import Image from "next/image";
import { getProviders } from "next-auth/react";

import { Session } from "@/types";
import { OAuth } from "@/components";
import { navigation } from "@/constants";

type Props = {
  session: Session;
};

export default async function Navbar({ session }: Props) {
  const providers = await getProviders();

  return (
    <header className="flex justify-center bg-[--background-2]">
      <div className="flex justify-between items-center px-4 py-3 w-full max-w-screen-lg">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex gap-2">
            <Image
              src="/assets/mint-logo.png"
              alt="mint logo"
              width={24}
              height={24}
            />
            <span className="text-[18px] text-[--accent-1] font-semibold">
              Mint
            </span>
          </Link>
          <nav>
            <ul className="flex">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="p-4 font-semibold text-[--foreground-2] hover:text-[--hover]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
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
      </div>
    </header>
  );
}
