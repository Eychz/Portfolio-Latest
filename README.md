# Portfolio-Latest

Personal portfolio of Harold Catipay, built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and shadcn/ui.

## Development

```bash
npm install
npm run dev        # start the dev server
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Content

Page content lives in data files under `components/Files/`:

- `ProjectData.ts`: system projects, event production and graphic designs
- `RecentWorks.ts`: items shown in the home page "Recent Work" grid
- `CertificatesData.ts`: certificate gallery
- `AcademicData.ts`, `TechStackData.ts`: About page sections

Images go in `public/`. Export them as WebP, at most 2000px on the longest side, with lowercase hyphenated file names (e.g. `public/Mockups/my-new-jersey.webp`).
