This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Helper (structure)

Structure Next.js concise
Organisation des fichiers

App Router (moderne) : Utilise /app avec page.js pour les pages et route.js pour les API
Pages Router (classique) : Utilise /pages où chaque fichier correspond à une route

### Types de routes

Routes statiques : /about = app/about/page.js
Routes dynamiques :

Segment variable : app/blog/[slug]/page.js → /blog/mon-article
Segment catch-all : app/docs/[...slug]/page.js → /docs/a/b/c
Segment optionnel : app/shop/[[...slug]]/page.js → /shop ou /shop/products/123



### Composants spéciaux

layout.js : Mise en page partagée entre plusieurs pages (imbrication possible)
loading.js : Affichage pendant le chargement
error.js : Gestion des erreurs
not-found.js : Page 404 personnalisée

Génération des pages

Static Site Generation (SSG) : generateStaticParams() pour pré-rendre les pages au build
Server-Side Rendering (SSR) : Par défaut dans App Router
Client-Side Rendering : Avec 'use client' directive

API routes

Route Handlers : app/api/endpoint/route.js avec fonctions HTTP (GET, POST, etc.)
Endpoints dynamiques : Même syntaxe que pour les pages ([paramètre])

Data Fetching

Server Components (par défaut) : fetch() avec options de mise en cache
Route Handlers : Pour créer des API
React Server Actions : Formulaires et mutations de données côté serveur