import React from "react";
import { Sun, Moon } from "lucide-react";
import { useSession } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  const { session } = useSession();

  const firstName = session?.user?.firstName || "there";
  const userInitial = (session?.user?.firstName?.[0] || "?").toUpperCase();

  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Your space
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          Welcome, <span className="text-emerald-400">{firstName}</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Describe your vibe and Sentio will craft a playlist that matches your
          mood.
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-400 bg-white/5 text-sm font-semibold text-emerald-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="User profile"
          >
            {userInitial}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl border border-border/60 bg-popover/95 p-2 text-popover-foreground shadow-xl backdrop-blur"
        >
          <DropdownMenuItem
            onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
            className="gap-2 rounded-xl focus:bg-white/10 hover:bg-white/10 cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun size={14} className="text-emerald-400" />
                <span className="text-popover-foreground">
                  Switch to light mode
                </span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-emerald-400" />
                <span className="text-popover-foreground">
                  Switch to dark mode
                </span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
