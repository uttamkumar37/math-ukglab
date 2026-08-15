import { Brain, Gauge, Sprout } from "lucide-react";
import { learningLevelOptions } from "../learningPreferences";
import type { LearningLevel } from "../types";

const levelIcons = {
  simple: Sprout,
  medium: Gauge,
  hard: Brain,
};

type LearningLevelControlProps = {
  value: LearningLevel;
  onChange: (value: LearningLevel) => void;
  compact?: boolean;
  label?: string;
};

export function LearningLevelControl({ value, onChange, compact = false, label = "Explanation level" }: LearningLevelControlProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink-950 dark:text-white">{label}</legend>
      <div className={`mt-3 grid gap-2 ${compact ? "grid-cols-3" : "sm:grid-cols-3"}`}>
        {learningLevelOptions.map((option) => {
          const Icon = levelIcons[option.value];
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              className={`focus-ring min-w-0 rounded-md border px-3 py-3 text-left transition ${selected ? "border-signal-500 bg-signal-500/10 text-signal-800 dark:text-signal-300" : "border-ink-200 bg-white hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.03]"}`}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="shrink-0" size={16} aria-hidden="true" />
                <span className="min-w-0">{option.label}</span>
              </span>
              {!compact ? <span className="mt-1.5 block text-xs leading-5 text-ink-600 dark:text-ink-300">{option.shortDescription}</span> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
