"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only access localStorage and window after component mounts (client-side)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Check system preference
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(systemTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Return children without theme context during SSR to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a default theme during SSR or when context is not available
    return {
      theme: "light" as Theme,
      toggleTheme: () => {}
    };
  }
  return context;
}
