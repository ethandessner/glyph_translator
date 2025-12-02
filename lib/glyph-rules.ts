// Glyph rule configuration for the translator. Replace placeholder GCS URLs
// with your actual bucket object URLs (e.g. https://storage.googleapis.com/<bucket>/<object>)
// You can extend this list; longer patterns are matched first for complexity.

export interface GlyphVariant {
  url: string; // Direct link to the glyph image asset
  weight?: number; // Relative selection weight (default 1)
  alt?: string; // Alt text override
}

export interface GlyphRule {
  pattern: string; // ASCII sequence (lowercase) matched against normalized text
  variants: GlyphVariant[]; // One or more image variants
  priority?: number; // Higher wins when pattern lengths tie
  description?: string; // Optional note
}

// Example glyph rules. Multi-letter patterns add complexity beyond 1:1 mapping.
export const GLYPH_RULES: GlyphRule[] = [
  // Multi-letter special symbols
  {
    pattern: "ea",
    variants: [
      { url: "https://storage.googleapis.com/YOUR_BUCKET/glyph_ea.svg", alt: "ea" },
      { url: "https://storage.googleapis.com/YOUR_BUCKET/glyph_ea_alt.svg", alt: "ea alt", weight: 0.5 }
    ],
    priority: 10,
    description: "Diphthong EA"
  },
  {
    pattern: "th",
    variants: [ { url: "https://storage.googleapis.com/YOUR_BUCKET/glyph_th.svg", alt: "th" } ],
    priority: 8,
    description: "Digraph TH"
  },
  {
    pattern: "ing",
    variants: [ { url: "https://storage.googleapis.com/YOUR_BUCKET/glyph_ing.svg", alt: "ing" } ],
    priority: 9,
    description: "Common ending ING"
  },
  // Single letters (fallback)
  ..."abcdefghijklmnopqrstuvwxyz".split("").map<GlyphRule>(ch => ({
    pattern: ch,
    variants: [ { url: `https://storage.googleapis.com/YOUR_BUCKET/glyph_${ch}.svg`, alt: ch } ],
    priority: 0
  })),
  // Space (optional glyph) - could also choose to render nothing instead
  {
    pattern: " ",
    variants: [ { url: "https://storage.googleapis.com/YOUR_BUCKET/glyph_space.svg", alt: "space" } ],
    priority: -1,
    description: "Space glyph"
  }
];

// Add punctuation rules if desired.
export const PUNCTUATION_RULES: GlyphRule[] = [
  { pattern: ".", variants: [ { url: "https://storage.googleapis.com/YOUR_BUCKET/glyph_period.svg", alt: "period" } ] },
  { pattern: ",", variants: [ { url: "https://storage.googleapis.com/YOUR_BUCKET/glyph_comma.svg", alt: "comma" } ] }
];

export const ALL_RULES: GlyphRule[] = [ ...GLYPH_RULES, ...PUNCTUATION_RULES ];
