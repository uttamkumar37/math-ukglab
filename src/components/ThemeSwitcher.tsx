import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex rounded-md border border-ink-200 bg-white p-1 dark:border-white/10 dark:bg-white/5" role="group" aria-label="Theme preference">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          className={`focus-ring rounded px-2.5 py-2 transition ${
            theme === value ? "bg-ink-950 text-white dark:bg-white dark:text-ink-950" : "text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
          }`}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          title={`${label} theme`}
        >
          <Icon aria-hidden="true" size={16} />
        </button>
      ))}
    </div>
  );
}
