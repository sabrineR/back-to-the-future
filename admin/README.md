# BTTF Admin

Administration application for managing the DVD Store movie catalog.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- JWT
- AWS S3

## Features

- Administrator authentication
- Protected routes
- View movie catalog
- Create movies
- Edit movies
- Delete movies
- Upload movie posters to AWS S3

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

The administration application runs on:

```text
http://localhost:5174
```

## Demo account

```text
Email: admin@bttf.com
Password: Admin123!
```

The account is created by the API database seeder.

## Build

```bash
npm run build
```

## Code quality

```bash
npm run lint
```
