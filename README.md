# LoreVerse

A buildless, responsive lore exploration app for the Marvel Cinematic Universe and HBO’s Game of Thrones.

## Run

Serve `dist/` with a static server: `python3 -m http.server 4173 --directory dist`.

## Game of Thrones reference

The complete user-provided guide is retained in `data/game-of-thrones-reference.md` and available from the in-app Reference guide. It covers all 15 sections and retains citations, grouped roles, canon caveats, mentioned-only figures, and unresolved fates.

- 348 entries: 270 character entries (some grouped), 34 battles, 22 event/season entries, 10 creatures, and 12 family/collective entries.
- 296 explicit, season-tagged relationships. Passing mentions are not automatically interpreted as relationships.
- Principal characters are deliberately ordered first in the overview, directory, and equal-ranking search results.
- Search, group filters, and pagination provide access to the full directory.
- Timeline uses season and episode order instead of speculative dates.
- Full biographies require All seasons because the supplied entries mix early and late outcomes. Events and relationships use season cutoffs; this is not episode-level protection. Viewing progress is stored separately for each universe.
- The graph focuses on one entity and up to 23 neighbors to remain readable. Every available entity can be selected. Some minor entries have no curated graph relationships.

## Update the reference

Edit `data/game-of-thrones-reference.md`, then run `python3 scripts/import-got.py` and copy that source to `dist/game-of-thrones-reference.md`. The importer rebuilds `dist/got-data.js`. Editorial character order, ID aliases, and conservative reveal levels are in the importer. Explicit graph edges are in `dist/got-relations.js`; the expanded interface is in `dist/got-app.js`.

## Verify

Run `node --check dist/app.js`, `node --check dist/got-app.js`, `node check.cjs`, and `node check-got.cjs`.

Checks cover reference preservation, famous-first ordering, all season cutoffs, graph endpoint/path integrity, source links, and safe Markdown rendering.

## Scope

The MCU universe remains a curated sample. Search is keyword-based. No LLM or backend database is connected. Bookmarks and viewing progress are browser-local. The hosted site is public and has no login requirement. Fonts use Google Fonts. All functional data ships locally.

## Glass theme and artwork

`dist/glass.css` applies charcoal glass surfaces, restrained gold accents, responsive layouts, and reduced-motion/reduced-transparency support. Blur is limited to navigation, header and dialog surfaces. `dist/glass.js` supplies original inline SVG crest illustrations and monograms; no character or cast photos are used. Existing content, ordering and interactions remain intact.

## Painted portraits and liquid glass

`dist/liquid.css` adds refractive rims, translucent panels and static ambient lighting. `dist/paintings.js` maps 23 original AI-generated character paintings to the first unfiltered directory page; the Night King retains his crest because image generation was unavailable. The optimized JPEGs are in `dist/assets/paintings/`; full prompts and provenance are in `data/portrait-prompts.json`. Other entries and failed image loads retain the original crests. Images are lazy-loaded, motion is optional, and mobile cards use opaque readable panels to limit blur cost.

## House family trees

The Family trees view covers 45 houses represented in the supplied HBO reference. It reuses character profiles and paintings, distinguishes biological, marital, other kinship and household ties, and respects season cutoffs. Unknown ancestry is left unconnected. Supplemental family relationships live in `dist/families-data.js`.
