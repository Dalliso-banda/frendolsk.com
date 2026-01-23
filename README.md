# DevHolm

[![CI/CD Pipeline](https://github.com/chrishacia/devholm/actions/workflows/ci.yml/badge.svg)](https://github.com/chrishacia/devholm/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-6-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, feature-rich **personal website template** built with **Next.js 16**, **React 19**, **TypeScript**, **Material UI**, and **PostgreSQL**. Perfect for developers, creators, and professionals who want a polished online presence with a full admin dashboard.

🌐 **Live Example:** [chrishacia.com](https://chrishacia.com)
💬 **Discord:** [Join the Community](https://discord.gg/8gG5vpN3YP)

---

## ✨ Features

### 🖥️ Modern Tech Stack
- **Next.js 16** with App Router and Server Components
- **React 19** with the latest features
- **TypeScript** for type safety
- **Material UI 6** for beautiful, accessible components
- **PostgreSQL** with Knex.js for robust data management

### 📝 Content Management
- **Blog System** — Markdown support, tags, series, reading time, RSS feed
- **Projects Portfolio** — Showcase your work with images and links
- **Resume/CV** — Display your professional experience
- **Now Page** — Share what you're currently working on
- **Uses Page** — Document your tools and setup

### 🔐 Admin Dashboard
- **Post Management** — Create, edit, and schedule blog posts
- **Media Library** — Upload and manage images with automatic optimization
- **Contact Inbox** — View and manage form submissions
- **Analytics Dashboard** — Privacy-focused page view tracking
- **Site Settings** — Configure your site from the admin panel

### 🎨 Design & UX
- **Light/Dark Mode** — System preference detection + manual toggle
- **Fully Responsive** — Looks great on all devices
- **Accessible** — WCAG compliant components
- **SEO Optimized** — Dynamic OG images, sitemap, structured data

### 🚀 Developer Experience
- **Docker Ready** — Production-ready Dockerfile and compose setup
- **CI/CD Pipeline** — GitHub Actions for testing, building, and deployment
- **E2E Testing** — Playwright test suite included
- **Hot Reload** — Fast refresh during development

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **pnpm** 9+
- **PostgreSQL** 15+ (local or Docker)

### 1. Clone & Install

```bash
git clone https://github.com/chrishacia/devholm.git my-site
cd my-site
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Site Info
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Your Site Name"
NEXT_PUBLIC_AUTHOR_NAME="Your Name"
NEXT_PUBLIC_AUTHOR_EMAIL=you@example.com

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=mysite_dev
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword

# Authentication
AUTH_SECRET=generate-a-secure-secret
AUTH_URL=http://localhost:3000

# Admin (for initial setup)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password
```

### 3. Setup Database

```bash
# Run migrations
pnpm db:migrate

# Seed initial admin user
pnpm seed:admin

# (Optional) Seed example data
pnpm db:seed
```

### 4. Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog pages
│   │   ├── about/        # About page
│   │   ├── projects/     # Projects portfolio
│   │   ├── resume/       # Resume/CV
│   │   └── ...           # Other pages
│   ├── components/       # React components
│   │   ├── admin/        # Admin-specific components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   └── seo/          # SEO components
│   ├── config/           # Site configuration
│   ├── db/               # Database layer
│   │   ├── migrations/   # Knex migrations
│   │   └── seeds/        # Seed files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── theme/            # MUI theme configuration
│   └── types/            # TypeScript types
├── public/               # Static assets
├── e2e/                  # Playwright E2E tests
├── scripts/              # Utility scripts
└── docs/                 # Documentation
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:migrate:rollback` | Rollback last migration |
| `pnpm db:seed` | Run all seed files |
| `pnpm seed:admin` | Create initial admin user |

---

## 🎨 Customization

### Site Configuration

All configuration is done via **environment variables**, making it easy to personalize without touching code:

```env
# Branding
NEXT_PUBLIC_SITE_NAME="My Portfolio"
NEXT_PUBLIC_AUTHOR_NAME="Jane Developer"
NEXT_PUBLIC_AUTHOR_EMAIL=jane@example.com

# Social Links (leave empty to hide)
NEXT_PUBLIC_SOCIAL_TWITTER=janedev
NEXT_PUBLIC_SOCIAL_GITHUB=janedev
NEXT_PUBLIC_SOCIAL_LINKEDIN=janedev
```

### Theming

Customize colors and styles in `src/theme/theme.ts`:

```typescript
// Light theme primary color
primary: {
  main: '#22C55E',  // Change to your brand color
},
```

See [THEMING.md](./THEMING.md) for detailed theming documentation.

### Content Pages

Edit the page content in:
- `src/app/about/AboutPageClient.tsx` — Your bio and story
- `src/app/now/NowPageClient.tsx` — What you're working on
- `src/app/uses/UsesPageClient.tsx` — Your tools and setup

### Resume & Projects

Seed your own data by editing:
- `src/db/seeds/seed-resume-example.ts` — Your work experience
- `src/db/seeds/seed-projects-example.ts` — Your projects

---

## 🚢 Deployment

### Docker (Recommended)

The project includes a production-ready Docker setup:

```bash
# Build the image
docker build -t devholm .

# Run with docker-compose
docker-compose up -d
```

### GitHub Actions CI/CD

The included workflow automatically:
1. Runs linting and type checks
2. Runs unit and E2E tests
3. Builds Docker image
4. Deploys to your server

> 💡 **Note:** GitHub Actions are **free for public repositories**. If you fork/clone this repo and make it private, you'll be charged for Actions minutes. See [GitHub's pricing](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions) for details.

Set these **GitHub Secrets**:

| Secret | Description |
|--------|-------------|
| `DEPLOY_HOST` | Server hostname/IP |
| `DEPLOY_USER` | SSH username |
| `DEPLOY_KEY` | SSH private key |
| `DEPLOY_PATH` | Deployment directory |
| `APP_PORT` | Host port (default: 3000, use different port for multiple sites) |
| `POSTGRES_PASSWORD` | Database password |
| `AUTH_SECRET` | Auth encryption key |
| `ADMIN_EMAIL` | Initial admin email |
| `ADMIN_PASSWORD` | Initial admin password |

📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) and [GITHUB_SECRETS.md](./GITHUB_SECRETS.md) for detailed guides.

### Vercel / Netlify

While optimized for self-hosting, you can also deploy to:
- **Vercel** — Works out of the box (requires external PostgreSQL)
- **Railway** — Full-stack deployment with managed PostgreSQL
- **Render** — Free tier available

---

## 📊 Analytics

DevHolm includes a **privacy-focused analytics system**:

- No cookies required
- No personal data stored
- GDPR compliant
- View stats in the admin dashboard

To disable, remove `<PageViewTracker />` from `src/app/layout.tsx`.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with these amazing open-source projects:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [Knex.js](https://knexjs.org/)
- [Marked](https://marked.js.org/)
- [Sharp](https://sharp.pixelplumbing.com/)

---

<p align="center">
  Made with ❤️ by <a href="https://chrishacia.com">Chris Hacia</a>
</p>
