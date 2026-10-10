# LoreVerse

A buildless, responsive lore exploration MVP for the Marvel Cinematic Universe and HBO’s Game of Thrones.

## Run

Serve `dist/` with any static server, for example `python3 -m http.server 4173 --directory dist`.

## Features

- Two curated universe datasets with sourced summaries
- Interactive SVG relationship graph with pan, zoom, and entity filters
- Shortest connection paths using breadth-first search
- Entity profiles, event timeline, guided paths, and keyword search
- Viewing-progress filters applied across discovery and exploration
- Browser-local bookmarks and viewing progress

## Verify

`node --check dist/app.js` and `node check.cjs`.

## Scope

This is a working frontend MVP, not a comprehensive lore database. Search matches keywords; no LLM, semantic search, authentication, or backend database is connected. Spoiler filtering uses coarse milestones. Entries are original curated summaries, and continuity is explicitly separated. Fonts and atmospheric background use Google Fonts and Unsplash. All functional data ships locally. Add entities and relationships in `dist/app.js`.
