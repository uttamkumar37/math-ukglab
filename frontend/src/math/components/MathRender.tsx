import { BlockMath, InlineMath } from "react-katex";
import type { LessonBlock } from "../types";

function renderInline(text: string) {
  return text.split(/(\$[^$]+\$)/g).map((part, index) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      return <InlineMath key={`${part}-${index}`} math={part.slice(1, -1)} />;
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function MathText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}>{renderInline(text)}</span>;
}

export function MathBlock({ math }: { math: string }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-ink-200 bg-white p-4 text-ink-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
      <BlockMath math={math} />
    </div>
  );
}

export function LessonContent({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-8 text-ink-700 dark:text-ink-200">
      {blocks.map((block, index) => {
        if (block.type === "equation") return <MathBlock key={`${block.math}-${index}`} math={block.math} />;
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.items.map((item) => (
                <li key={item}>
                  <MathText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={`${block.text}-${index}`}>
            <MathText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
