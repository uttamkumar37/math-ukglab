type DiagramProps = {
  type: "number-line" | "curve" | "triangle" | "matrix";
};

export function Diagram({ type }: DiagramProps) {
  if (type === "curve") {
    return (
      <svg viewBox="0 0 360 220" role="img" aria-label="Quadratic curve crossing the x-axis" className="h-full w-full">
        <path d="M24 172H336M54 24V196" className="stroke-ink-300 dark:stroke-white/20" strokeWidth="2" fill="none" />
        <path d="M48 172C104 16 244 16 304 172" className="stroke-signal-500" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="108" cy="116" r="5" className="fill-flame-500" />
        <circle cx="246" cy="116" r="5" className="fill-flame-500" />
      </svg>
    );
  }

  if (type === "triangle") {
    return (
      <svg viewBox="0 0 360 220" role="img" aria-label="Triangle geometry diagram" className="h-full w-full">
        <path d="M76 176L182 42L292 176Z" className="fill-signal-500/10 stroke-signal-500" strokeWidth="4" />
        <path d="M182 42V176" className="stroke-ink-400 dark:stroke-white/30" strokeDasharray="6 8" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "matrix") {
    return (
      <svg viewBox="0 0 360 220" role="img" aria-label="Matrix arrangement" className="h-full w-full">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => <rect key={`${row}-${col}`} x={92 + col * 58} y={36 + row * 48} width="38" height="30" rx="6" className="fill-white stroke-ink-200 dark:fill-white/10 dark:stroke-white/15" />),
        )}
        <path d="M70 30C52 66 52 154 70 190M290 30C308 66 308 154 290 190" className="stroke-signal-500" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="Number line division diagram" className="h-full w-full">
      <path d="M38 148H322" className="stroke-ink-300 dark:stroke-white/25" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((tick) => (
        <path key={tick} d={`M${62 + tick * 58} 136V160`} className="stroke-ink-500 dark:stroke-white/40" strokeWidth="2" />
      ))}
      <path d="M62 118C90 76 116 76 144 118C172 76 198 76 226 118C254 76 280 76 308 118" className="stroke-signal-500" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="308" cy="148" r="7" className="fill-flame-500" />
    </svg>
  );
}
