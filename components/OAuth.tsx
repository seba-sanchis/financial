"use client";

import { signIn, signOut } from "next-auth/react";

import { Session } from "@/types";
import { Button } from "@/components";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function OAuth({
  id,
  name,
  session,
}: {
  id?: string;
  name?: string;
  session: Session;
}) {
  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2 text-sm px-2 py-1.5 w-full rounded-md hover:bg-[--hover-2]"
      >
        <FaArrowRightFromBracket size={16} />
        Sign out
      </button>
    );
  } else {
    return (
      <Button key={name} onClick={() => signIn(id)}>
        Sign in
      </Button>
    );
  }
}
