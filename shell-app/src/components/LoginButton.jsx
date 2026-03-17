import React from "react";
import { useClerk, useSession } from "@clerk/clerk-react";

export const LoginButton = () => {
  const { session } = useSession();
  const { openSignIn, signOut } = useClerk();

  if (!session?.user) {
    return (
      <button
        onClick={() => openSignIn()}
        className="w-full rounded-full bg-emerald-400 px-8 py-3 font-semibold text-zinc-950 transition shadow-lg shadow-emerald-400/30 hover:bg-emerald-300 hover:shadow-emerald-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-card/40 border border-border/60 backdrop-blur p-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Signed in as
        </p>
        <p className="mb-3 text-lg font-semibold text-foreground">
          {session.user.firstName} {session.user.lastName}
        </p>
        <p className="text-sm text-muted-foreground">
          {session.user.primaryEmailAddress?.emailAddress}
        </p>
      </div>
      <button
        onClick={() => signOut()}
        className="w-full rounded-full bg-red-500/80 px-6 py-3 font-semibold text-white transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        Sign Out
      </button>
    </div>
  );
};
