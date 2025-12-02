# Glyph Translator

Interactive glyph translation tool for building a custom written language. Type English text and see glyph images assembled using rule-based pattern matching (digraphs/trigraphs like `ea`, `th`, `ing` override single letters).

## Quick Start

```bash
npm install
npm run dev
```
Open http://localhost:3000

## Configure Glyph Rules

Edit `lib/glyph-rules.ts`:
* Replace `YOUR_BUCKET` with your Google Cloud Storage bucket name.
* Add / remove rules. Longer `pattern` values are matched first.
* Provide multiple `variants` with `weight` for probabilistic stylistic variation.

## How Matching Works

1. Input normalized + lowercased.
2. Rules sorted by pattern length desc, then priority desc.
3. First match at each index selected; pointer advances by pattern length.
4. Variant chosen (weighted random if enabled).
5. Unknown characters optionally collected.

## UI Features

* Text input
* Glyph preview with adjustable size
* Randomize variant toggle
* Debug segmentation view

HTML export was removed; focus is on in-app visualization.

## Ideas to Increase Complexity

* Add context-specific patterns (e.g. `ing` vs `in` at word end).
* Introduce silent spacer glyphs.
* Provide seasonal variant sets and enable/disable by UI.
* Add JSON import/export for rule sets.

## License

MIT (glyph artwork remains your property).

