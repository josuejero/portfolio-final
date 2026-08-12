# Josue Sebastian Jeronimo — Engineering Portfolio

A kinetic editorial engineering portfolio built with Next.js, React, and TypeScript.

The site presents software engineering, QA/test automation, data quality, and platform/support work through evidence-backed case studies and interactive browser simulations rather than a conventional card-based portfolio.

## Portfolio Structure

Primary public routes:

- `/` — immersive portfolio home and four flagship engineering chapters
- `/projects` — role-aware engineering work index
- `/projects/[name]` — project case studies, evidence, interactive demos, and repository documentation
- `/about` — engineering background, education, technical skills, and live GitHub activity
- `/contact` — direct inquiry form
- `/snippets` — live GitHub Gist index and source inspector

The primary visual system uses a warm bone background, deep ink, cobalt, and acid-lime accents with large editorial typography and restrained technical labeling.

## Flagship Interactive Workspaces

The portfolio includes browser-based simulations for:

- **HostDesk** — prospect operations, cadence work, notes, and handoff gating
- **BotMedic** — incident triage and recovery workflow
- **DQSentry** — data-quality validation, scoring, and publish gates
- **CycleReady** — requirements traceability, defects, and release readiness
- **FrameCast** — frame assignment and photo/device configuration

Simulation state stays local to the browser. Model logic is isolated from presentation and covered by Vitest suites.

## Architecture

    src/
    ├── app/
    │   ├── api/
    │   │   ├── contact/
    │   │   ├── csp-report/
    │   │   ├── github-projects/
    │   │   └── github-stats/
    │   ├── about/
    │   ├── contact/
    │   ├── projects/
    │   │   └── [name]/
    │   ├── snippets/
    │   ├── error.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   └── page.tsx
    ├── components/
    │   ├── About/
    │   ├── Contact/
    │   ├── Home/
    │   ├── Projects/
    │   │   └── demos/
    │   ├── Snippets/
    │   └── common/
    ├── config/
    ├── data/
    ├── hooks/
    ├── lib/
    └── types/

Canonical project, role-lens, skill, evidence, and presentation data live under `src/data` rather than being duplicated across page components.

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- CSS Modules
- Vitest
- React Markdown
- remark-gfm
- Recharts
- Zod
- GitHub API
- Upstash Redis / rate limiting
- EmailJS REST delivery

Tailwind remains primarily for the established interactive-demo implementation. The redesigned portfolio surfaces use scoped CSS Modules and the portfolio editorial token system.

## GitHub Integration

GitHub-backed routes provide:

- public repository metadata
- README content
- release data
- public Gists
- contribution and activity statistics

A GitHub token is optional but recommended for authenticated API limits.

## Contact Pipeline

The contact form submits through `/api/contact` and includes:

- server-side validation
- honeypot protection
- optional Upstash rate limiting
- EmailJS REST delivery

## Environment Variables

Create `.env.local` as needed:

    # Optional authenticated GitHub requests
    GITHUB_TOKEN=

    # Contact delivery
    EMAILJS_SERVICE_ID=
    EMAILJS_TEMPLATE_ID=
    EMAILJS_PUBLIC_KEY=
    EMAILJS_PRIVATE_KEY=
    CONTACT_TO_EMAIL=

    # Optional Redis caching and contact rate limiting
    UPSTASH_REDIS_REST_URL=
    UPSTASH_REDIS_REST_TOKEN=

`EMAILJS_PRIVATE_KEY` is optional depending on the EmailJS configuration.

## Local Development

Requirements:

- Node.js 20.17 or newer
- npm 11.x

Install:

    npm ci

Run development:

    npm run dev

Production build:

    npm run build

Start the production server:

    npm run start

## Validation

Lint:

    npm run lint

Run the complete test suite:

    npm test -- --run

Generate Next.js route types:

    npx next typegen

Coverage:

    npm run test:coverage

## Security

The application configures response hardening headers including:

- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- cross-origin opener/resource policies
- production HSTS

A Content Security Policy is currently emitted in **report-only** mode through `src/proxy.ts` and reports violations to `/api/csp-report`. It should not be promoted to enforcing mode until production CSP reports have been reviewed.

## Deployment

The current portfolio URL is configured in `src/config/site.ts`.

The project is compatible with Vercel deployment and other environments that support Next.js.

## License

This project is licensed under the [MIT License](LICENSE).
