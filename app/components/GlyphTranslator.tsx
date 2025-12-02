"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { translateToGlyphs, TranslationResult } from "@/lib/translator";
import { CorruptText } from "./CorruptText";

interface UIState {
  text: string;
  randomize: boolean;
  debug: boolean;
  size: number; // px
}

const DEFAULT_TEXT = "";

export const GlyphTranslator: React.FC = () => {
  const [state, setState] = useState<UIState>({ text: DEFAULT_TEXT, randomize: false, debug: false, size: 80 });
  const result: TranslationResult = useMemo(
    () => translateToGlyphs(state.text, { enableDebug: state.debug, randomizeVariants: state.randomize, keepUnknown: true }),
    [state]
  );
  // HTML export removed by request.

  function handleText(e: React.ChangeEvent<HTMLTextAreaElement>) { setState(s => ({ ...s, text: e.target.value })); }
  function toggle<K extends keyof UIState>(key: K) { setState(s => ({ ...s, [key]: !s[key] })); }
  function handleSize(e: React.ChangeEvent<HTMLInputElement>) { setState(s => ({ ...s, size: parseInt(e.target.value, 10) || 64 })); }
  // Clipboard logic removed.

  return (
    <div className="flex w-full flex-col gap-6 glyph-translator-container">
  <CorruptText as="h1" intensity="high" className="text-3xl font-semibold tracking-tight">Glyph Translator</CorruptText>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Input Text</span>
            <textarea
              value={state.text}
              onChange={handleText}
              rows={8}
              className="rounded-md border border-zinc-300 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-700 placeholder:text-zinc-400"
              placeholder="i luv it when they call me big papa"
            />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={state.randomize} onChange={() => toggle("randomize")} /> <span>Variants</span></label>
            <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={state.debug} onChange={() => toggle("debug")} /> <span>Debug</span></label>
            <label className="flex items-center gap-2 text-xs">Size<input type="number" min={24} max={256} value={state.size} onChange={handleSize} className="w-20 px-2 py-1 text-xs" />px</label>
            {/* Removed HTML export button */}
          </div>
          {state.debug && (
            <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3 text-xs dark:bg-indigo-950 dark:border-indigo-700">
              <p className="font-medium mb-2">Debug Steps</p>
              <ol className="grid gap-1">
                {result.debugSteps?.map((d,i) => (
                  <li key={i} className="flex justify-between gap-2"><span>@{d.index}</span><span className="truncate">slice: {d.sliceTried}</span><span className="text-indigo-600">match: {d.matchedRule || "-"}</span></li>
                ))}
              </ol>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {state.text.trim().length > 0 && (
            <div className="flex flex-wrap gap-2 rounded-md border border-zinc-800 bg-black/40 p-3">
              {result.glyphs.map(g => (
                <Image
                  key={`${g.start}-${g.pattern}-${g.url}`}
                  src={g.url}
                  alt={g.alt}
                  title={g.pattern}
                  width={state.size}
                  height={state.size}
                  className="glyph-item select-none"
                  draggable={false}
                  unoptimized
                />
              ))}
            </div>
          )}
          {/* HTML export block removed */}
          {state.text.trim().length > 0 && result.unknown.length > 0 && (
            <p className="text-xs text-zinc-500">Unknown characters encountered: {Array.from(new Set(result.unknown)).join(", ")}</p>
          )}
          <p className="text-xs">Edit <code>lib/glyph-rules.ts</code> to expand patterns. Longer patterns (e.g. <code>ing</code>, <code>ea</code>) override single letters.</p>
        </div>
      </div>
    </div>
  );
};
