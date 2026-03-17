import React from "react";
import { LoginButton } from "../components/LoginButton";

export const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="mx-auto max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Sentio
          </h1>
          <p className="text-lg text-gray-400">
            Your AI-powered music playlist generator
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Sign in to get started and create amazing playlists
          </p>
          <LoginButton />
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-500">
            New to Sentio? Create an account with your email or social login.
          </p>
        </div>
      </div>
    </div>
  );
};
