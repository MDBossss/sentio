import React from "react";
import { Sun, Moon, LogOut, Settings } from "lucide-react";
import { useSession, useClerk } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/ui/UserAvatar";

interface HeaderProps {
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  const { session } = useSession();
  const { signOut } = useClerk();

  const firstName = session?.user?.firstName || "there";
  const userImageUrl = session?.user?.imageUrl;

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
            className="rounded-full transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 mr-1"
            aria-label="User profile"
          >
            <UserAvatar
              imageUrl={userImageUrl}
              firstName={session?.user?.firstName}
              lastName={session?.user?.lastName}
            />
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
          <DropdownMenuSeparator className="my-2 bg-border/40" />
          <DropdownMenuItem
            onClick={() => (window.location.href = "/settings")}
            className="gap-2 rounded-xl focus:bg-white/10 hover:bg-white/10 cursor-pointer"
          >
            <Settings size={14} className="text-emerald-400" />
            <span className="text-popover-foreground">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2 bg-border/40" />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="gap-2 rounded-xl focus:bg-white/10 hover:bg-white/10 cursor-pointer"
          >
            <LogOut size={14} className="text-red-400" />
            <span className="text-red-400">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
