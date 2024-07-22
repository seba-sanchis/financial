"use client";

import { signIn, signOut } from "next-auth/react";

import { Session } from "@/types";
import { Button } from "@/components";

export default function OAuth({
  id,
  name,
  session,
}: {
  id: string;
  name: string;
  session: Session;
}) {
  function handleClick() {
    if (session) {
      signOut();
    } else {
      signIn(id);
    }
  }
  return (
    <Button key={name} onClick={handleClick}>
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
}
