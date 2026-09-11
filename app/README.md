# BTTF DVD Store

Customer-facing application for the Back to the Future DVD Store.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Features

- Browse the movie catalog
- Search movies
- Add movies to the cart
- Update quantities
- Remove movies from the cart
- Persistent guest cart
- Add movies from text input
- Automatic BTTF discount calculation

## Configuration

Create a `.env` file:

```env
VITE_API_URL=http://localhost:4000/api/bttf
```

## Installation

```bash
npm install
```

Start the application:

```bash
npm run dev
```

The application runs on:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Code quality

```bash
npm run lint
npm run format:check
```
