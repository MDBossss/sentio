import React from "react";
import { useClerk, useSession } from "@clerk/clerk-react";

export const LoginButton = () => {
  const { session } = useSession();
  const { openSignIn, signOut } = useClerk();

  if (!session?.user) {
    return (
      <button
        onClick={() => openSignIn()}
        className="w-full rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-gray-900 p-4">
        <p className="mb-2 text-sm text-gray-400">Signed in as</p>
        <p className="mb-3 text-lg font-semibold">
          {session.user.firstName} {session.user.lastName}
        </p>
        <p className="mb-4 text-sm text-gray-500">
          {session.user.primaryEmailAddress?.emailAddress}
        </p>
      </div>
      <button
        onClick={() => signOut()}
        className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
};
