"use client";

import { signIn, signOut } from "next-auth/react";

import { Session } from "@/types";

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
    <button key={name} onClick={handleClick} type="button">
      {session ? "Sign out" : "Sign in"}
    </button>
  );
}
