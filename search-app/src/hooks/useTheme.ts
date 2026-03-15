import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("sentio-theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";
    console.log("[sentio][search] initial theme from storage:", storedTheme);
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        theme?: Theme;
      };
      console.log("[sentio][search] theme change event:", detail);
      if (detail?.theme) {
        setTheme(detail.theme);
      }
    };

    window.addEventListener("sentio-theme-change", handler);
    return () => window.removeEventListener("sentio-theme-change", handler);
  }, []);

  const broadcastTheme = (nextTheme: Theme) => {
    console.log("[sentio][search] requesting theme:", nextTheme);
    setTheme(nextTheme);
    window.dispatchEvent(
      new CustomEvent("sentio-theme-request", { detail: { theme: nextTheme } }),
    );
  };

  return { theme, broadcastTheme };
};
