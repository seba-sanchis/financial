"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import OAuth from "./OAuth";
import { Session } from "@/types";
import { menu } from "@/constants";

type Props = {
  session: Session;
};

export default function Sidebar({ session }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-1 max-w-56 border-r border-[--border]">
      <ul className="p-5">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              href={item.url}
              className={`flex items-center gap-2 text-sm px-2 py-1.5 rounded hover:bg-[--hover-2] ${
                pathname === item.url && "text-[--accent-1]"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-5">
        <div className="py-1.5 text-xs">Account</div>
        <OAuth session={session} />
      </div>
    </div>
  );
}
