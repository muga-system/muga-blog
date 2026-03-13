"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function getStoredThemePreference(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem("theme-preference");
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

function resolveSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemePreference(themePreference: Theme) {
  const resolvedTheme =
    themePreference === "system" ? resolveSystemTheme() : themePreference;

  document.documentElement.setAttribute("data-theme", resolvedTheme);
  window.localStorage.setItem("theme-preference", themePreference);
}

export function ThemeToggle() {
  const [themePreference, setThemePreference] = useState<Theme>("system");

  useEffect(() => {
    const nextPreference = getStoredThemePreference();
    setThemePreference(nextPreference);
    applyThemePreference(nextPreference);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (getStoredThemePreference() === "system") {
        applyThemePreference("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const handleSelect = (nextPreference: Theme) => {
    setThemePreference(nextPreference);
    applyThemePreference(nextPreference);
  };

  return (
    <div
      className="inline-flex items-center rounded-md border border-line p-0.5 text-xs"
      role="radiogroup"
      aria-label="Selector de tema"
    >
      {(["light", "dark", "system"] as const).map((option) => {
        const isActive = themePreference === option;

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => handleSelect(option)}
            className={`rounded px-2 py-1 transition-colors ${
              isActive ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {option === "light" ? "Light" : option === "dark" ? "Dark" : "System"}
          </button>
        );
      })}
    </div>
  );
}
