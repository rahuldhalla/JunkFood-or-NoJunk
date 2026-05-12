# Repository Guidelines

## Project Structure & Module Organization

This is a small Next.js app named `junk-or-no`. Application code lives in `src/app` using the App Router:

- `src/app/page.js`: main client UI, food keyword lists, and classification logic.
- `src/app/layout.js`: root layout and page metadata.
- `src/app/globals.css`: global Tailwind CSS styles.
- Root config files include `next.config.mjs`, `eslint.config.mjs`, `postcss.config.mjs`, and `jsconfig.json`.

There is no dedicated `tests` directory yet. Add tests near the code they cover or under `src/__tests__` if a test framework is introduced.

## Build, Test, and Development Commands

Run commands from the repository root:

- `npm install`: install Next.js, React, Tailwind, and lint dependencies.
- `npm run dev`: start the local development server at `http://localhost:3000`.
- `npm run build`: create a production build and catch framework-level errors.
- `npm run start`: run the production build locally after `npm run build`.
- `npm run lint`: run the configured Next.js ESLint rules.

## Coding Style & Naming Conventions

Use JavaScript modules and React functional components. Keep component names in `PascalCase`, helper functions in `camelCase`, and constant arrays in `camelCase` unless they become exported public API. Follow the existing style in `src/app/page.js`: two-space indentation, single quotes, semicolons, and concise helper functions for business logic.

Prefer Tailwind utility classes for styling. Keep UI text beginner-friendly and avoid adding complex abstractions unless the app grows beyond a single page.

## Testing Guidelines

No test runner is configured currently. For changes to classification behavior, verify manually through `npm run dev` using examples such as `Pizza`, `Apple`, `Ice cream`, and `Brown rice`. If tests are added, cover `normalize`, keyword matching, and the three result states: junk, not junk, and mixed/unknown.

## Commit & Pull Request Guidelines

Recent commit messages use short, imperative summaries, for example `Refine Junk or No page with cleaner logic and example quick picks`. Keep commits focused and describe the user-visible change.

Pull requests should include a brief description, testing notes such as `npm run lint` or manual browser checks, and screenshots for UI changes. Link any related issue when available.

## Agent-Specific Instructions

Keep edits scoped. Do not introduce new frameworks, test tools, or large refactors without a clear repository need. Preserve the beginner-friendly purpose of the app.
