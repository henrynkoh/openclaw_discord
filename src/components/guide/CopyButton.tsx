"use client";

import { useCallback, useState } from "react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [ok, setOk] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      window.setTimeout(() => setOk(false), 1600);
    } catch {
      setOk(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 ${className}`}
    >
      {ok ? "Copied" : "Copy"}
    </button>
  );
}
