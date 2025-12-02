import { ALL_RULES, GlyphRule, GlyphVariant } from "./glyph-rules";

export interface TranslatedGlyph {
  pattern: string;
  url: string;
  alt: string;
  start: number; // inclusive index in original string
  end: number;   // exclusive index
  rule: GlyphRule;
}

export interface TranslationDebugStep {
  index: number;
  sliceTried: string;
  matchedRule?: string;
}

export interface TranslationResult {
  input: string;
  glyphs: TranslatedGlyph[];
  unknown: string[];
  debugSteps?: TranslationDebugStep[];
}

export interface TranslatorOptions {
  enableDebug?: boolean;
  keepUnknown?: boolean; // collect characters not covered by any rule
  randomizeVariants?: boolean;
}

// Pre-sort rules: longest patterns first, then priority
const SORTED_RULES = [...ALL_RULES].sort((a, b) => {
  if (b.pattern.length !== a.pattern.length) return b.pattern.length - a.pattern.length;
  return (b.priority ?? 0) - (a.priority ?? 0);
});

function chooseVariant(variants: GlyphVariant[], randomize: boolean): GlyphVariant {
  if (!randomize || variants.length === 1) return variants[0];
  const weights = variants.map(v => v.weight ?? 1);
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < variants.length; i++) {
    r -= weights[i];
    if (r <= 0) return variants[i];
  }
  return variants[variants.length - 1];
}

export function translateToGlyphs(inputRaw: string, opts: TranslatorOptions = {}): TranslationResult {
  const normalized = inputRaw.normalize("NFKC").toLowerCase();
  const glyphs: TranslatedGlyph[] = [];
  const unknown: string[] = [];
  const debugSteps: TranslationDebugStep[] = [];

  let i = 0;
  while (i < normalized.length) {
    let match: GlyphRule | undefined;
    for (const rule of SORTED_RULES) {
      if (normalized.startsWith(rule.pattern, i)) {
        match = rule;
        break;
      }
    }
    if (opts.enableDebug) {
      debugSteps.push({ index: i, sliceTried: normalized.slice(i, i + 5), matchedRule: match?.pattern });
    }
    if (match) {
      const variant = chooseVariant(match.variants, !!opts.randomizeVariants);
      glyphs.push({
        pattern: match.pattern,
        url: variant.url,
        alt: variant.alt || match.pattern,
        start: i,
        end: i + match.pattern.length,
        rule: match
      });
      i += match.pattern.length;
    } else {
      if (opts.keepUnknown) unknown.push(normalized[i]);
      i += 1;
    }
  }

  return { input: inputRaw, glyphs, unknown, debugSteps: opts.enableDebug ? debugSteps : undefined };
}

// HTML export removed per updated requirements.
