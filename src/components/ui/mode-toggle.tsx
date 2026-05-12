import { useTheme } from "@/hooks";
import { Sun, Moon } from "lucide-react";

export default function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="text-main h-11 w-11 center rounded-full"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}
