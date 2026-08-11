
# Portfolio Website

This repository contains the source code for my personal portfolio website, built with [Next.js](https://nextjs.org) and TypeScript. The site showcases my professional background, projects, technical skills, and provides ways to get in touch. It also integrates GitHub API data to display commit activity, language distribution, and repository statistics.

## Features

- **Modern Frontend Stack**: Built with Next.js 16, React 19, TypeScript, and the App Router.
- **TypeScript**: Ensures type safety and improved developer experience.
- **Tailwind CSS**: Rapidly style UI components with a utility-first CSS framework.
- **Interactive Project Workspaces**: Lazy-loaded browser simulations provide hands-on evidence for selected flagship projects.
- **Dark Mode Support**: Easily switch between light and dark themes.
- **GitHub Stats Integration**: Retrieves and displays GitHub repository, commit activity, and language usage statistics (requires a GitHub token).
- **Modular & Scalable Architecture**: Organized into structured directories for pages, components, hooks, and utilities, simplifying maintenance and scalability.
- **Contact Form Integration**: Submits through a server-side API route with validation, honeypot protection, optional Upstash rate limiting, and EmailJS REST delivery.
- **Responsive & Mobile-Friendly**: Adapts to various screen sizes, with a responsive sidebar and mobile navigation.

## Project Structure

```
.
├── public/                 # Public assets (images, icons, etc.)
├── src/
│   ├── app/                # Next.js App Router structure
│   │   ├── page.tsx        # Homepage
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog page & loader
│   │   ├── contact/        # Contact page & loader
│   │   ├── api/            # Server routes for GitHub data, contact, and CSP reporting
│   │   ├── error.tsx       # Custom error page
│   │   ├── layout.tsx      # Root layout with ThemeProvider
│   │   ├── loading.tsx     # Global loading state
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable UI components
│   │   ├── About/          # About page components & GitHubStats integration
│   │   ├── Blog/           # Blog listing & modal viewer
│   │   ├── Contact/        # Contact form interface
│   │   ├── Die/            # Interactive skill "die" component
│   │   ├── Home/           # Home section (hero, skills preview, call-to-action)
│   │   ├── Projects/       # Featured projects listing
│   │   ├── Sidebar/        # Sidebar and mobile navigation
│   │   ├── common/         # Common utilities (ErrorBoundary, Layout, Loading, ThemeProvider)
│   │   └── ui/             # UI primitives (Card, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Metadata, utility functions
│   └── types/              # Type definitions (GitHub stats, etc.)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── ... (other config files)
```

## Getting Started

### Prerequisites

- Node.js 20.17 or newer
- npm 11.x (this repository uses npm and `package-lock.json`)
- A GitHub personal access token (optional) if you want the GitHub stats feature to function

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/josuejero/portfolio-final.git
   cd portfolio-final
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Set environment variables:**

   Create a `.env.local` file at the root of the project to configure environment variables:

   ```env
   # Optional GitHub API token
   GITHUB_TOKEN=

   # Server-side contact delivery
   EMAILJS_SERVICE_ID=
   EMAILJS_TEMPLATE_ID=
   EMAILJS_PUBLIC_KEY=
   EMAILJS_PRIVATE_KEY=
   CONTACT_TO_EMAIL=

   # Optional Redis caching and contact rate limiting
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

   - **GITHUB_TOKEN**: Optional token used by GitHub-backed portfolio features.
   - **EmailJS variables**: Used by the server-side contact route. `EMAILJS_PRIVATE_KEY` is optional depending on the EmailJS configuration.

### Running Locally

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The site will automatically reload whenever you make changes to the code.

### Building & Production

To create a production build:

```bash
npm run build
```

Then, start the production server:

```bash
npm run start
```

### Deployment

The site can be easily deployed to [Vercel](https://vercel.com/) (recommended) or any other hosting platform that supports Next.js.

For Vercel:

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. [Import the repository into Vercel](https://vercel.com/new).
3. Add your environment variables on Vercel.
4. Vercel handles builds, previews, and deployments automatically on every git push.

## Customization

- **Branding & Content**: Update `siteMetadata` in `src/lib/metadata.ts` for SEO, social links, and site title.
- **Styling**: Customize styles via Tailwind classes in `globals.css` or component-level styling.
- **Components & Pages**: Modify or add new pages under `src/app/` and respective components under `src/components/`.

## Technologies Used

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Vitest**
- **React Markdown**
- **Recharts**
- **EmailJS REST API**
- **Upstash Redis**
- **GitHub API**
- **Vercel Deployment**

## Contributing

Contributions are welcome! Please open issues or submit pull requests if you have improvements, suggestions, or bug fixes.

1. Fork the repository
2. Create a new branch for your changes (`git checkout -b feature/my-feature`)
3. Commit and push your changes
4. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).