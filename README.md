# Users List Application

Next.js application with user list, search, pagination, and internationalization (English/French).

## Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

## Installation

```bash
git clone https://github.com/n-huzaifa/javik-test.git
cd javik-test
npm install
```

## Running the Application

Development:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/en` by default.

Production:
```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features

- User list with responsive design (cards on mobile, table on desktop)
- Real-time search by name or email
- Pagination (5 users per page)
- Internationalization with locale dropdown (English/French)
- Locale switching via dropdown in header

## Technologies

- Next.js 16
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Lucide React (icons)

## Locales

Supported locales: English (`/en`) and French (`/fr`). Switch locales using the dropdown in the header or navigate to `/en` or `/fr` in the URL.

## API

Fetches user data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
