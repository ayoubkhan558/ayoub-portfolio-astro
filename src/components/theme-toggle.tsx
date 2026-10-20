import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
/** Portfolio control, server-rendered; the shared header script owns theme state. */
export function ThemeToggle() {
  return (
    <Button
      type="button"
      id="theme-toggle"
      size="icon"
      variant="ghost"
      className="icon-button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Moon className="theme-moon" size={18} aria-hidden="true" />
      <Sun className="theme-sun" size={18} aria-hidden="true" />
    </Button>
  );
}
