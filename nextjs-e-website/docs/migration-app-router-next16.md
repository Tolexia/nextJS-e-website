# Migration App Router + Next.js 16 (app-like UX)

Roadmap to unlock Instant Navigations, Cache Components, Partial Prefetching, and React View Transitions as described in the [Next.js 16.3 app-like experiences article](https://nextjs.org/blog/building-app-like-experiences-with-nextjs-16-3).

**Current baseline:** Pages Router (`src/pages`), Next 15.5, React 18, Firebase RTDB, cart via `CartProvider` + `localStorage`.

**Already done (portable):** storefront shell in `_app`, optimistic cart context, intent prefetch (`IntentLink`), skeletons on `/items`, admin/login without storefront chrome.

---

## Phase 0 — Inventaire

- [ ] Lister routes storefront vs admin vs API (`pages/api/*`)
- [ ] Noter chaque `getInitialProps` / fetch Firebase client (`index`, `product`, `items`, admin)
- [ ] Cartographier auth (`withAuth`, `login`)
- [ ] Décider stratégie data post-migration : Server Components + Firebase Admin, ou client Firebase inchangé dans des Client Components

**Critère de sortie :** tableau route → data → auth → risque.

---

## Phase 1 — Upgrade dépendances (rester en Pages)

- [ ] React 18 → 19
- [ ] Next 15 → 16.x
- [ ] `eslint-config-next` aligné
- [ ] Smoke test : home, items, product, add-to-cart, checkout, admin login

**Critère de sortie :** build + parcours critiques OK sans App Router.

**Risque :** moyen (breaking changes React 19 / Next 16).

---

## Phase 2 — Coexistence `app/` + `pages/`

- [ ] Créer `src/app/layout.tsx` (root) minimal
- [ ] Migrer d’abord une route non critique (ex. `about`) vers `app/about/page.tsx`
- [ ] Partager styles / composants sans casser Pages
- [ ] Garder API routes sous `pages/api` ou migrer vers Route Handlers

**Critère de sortie :** au moins une page App Router en prod-like, Pages intactes.

---

## Phase 3 — Storefront App Router

Migrer dans cet ordre :

1. `/` (home) — remplacer `getInitialProps` par fetch serveur ou Client Component
2. `/items` — list + filtres `searchParams`
3. `/product` — préférer `/product/[id]` ou garder query via `searchParams`
4. `/checkout` + `/order-confirmation`
5. Shell : `CartProvider` dans un layout client storefront (`app/(storefront)/layout.tsx`)

**Critère de sortie :** nav storefront sans remount panier ; checkout fonctionnel.

**Risque :** élevé (data + routing + cart).

---

## Phase 4 — Admin

- [ ] Layout admin dédié (sans chrome boutique)
- [ ] Migrer `/login`, `/admin`, CRUD products/orders
- [ ] Évaluer Server Actions pour mutations admin (optionnel)

**Critère de sortie :** back-office utilisable sans Pages pour ces routes.

---

## Phase 5 — Cache Components + Partial Prefetching

```ts
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};
```

- [ ] Identifier lectures cacheables (`'use cache'`, `cacheLife`, `cacheTag`)
- [ ] Revalidation après mutations (`updateTag`)
- [ ] `prefetch={true}` seulement sur liens détail où le contenu URL-dépendant est cacheable
- [ ] Garder `IntentLink`-style pour grilles denses si le coût serveur est trop haut

**Critère de sortie :** shell instantané sur navigations storefront ; revisites sans fallback inutile.

---

## Phase 6 — Polish app-like

- [ ] `useOptimistic` / `useTransition` sur favoris, quantités, admin toggles
- [ ] Nested `Suspense` (détail produit puis sections secondaires)
- [ ] React `<ViewTransition>` pour reveals / listes / nav directionnelle
- [ ] Tests Playwright avec helper `instant()` si disponible

**Hors scope recommandé :** `experimental.useOffline` (non production).

---

## Non-objectifs

- Réécrire Firebase en une seule passe
- Activer Cache Components avant la fin de la phase 3
- PWA / service worker hors besoin métier clair

---

## Références

- Skill Cursor : `app-like-ux-nextjs`
- Article : https://nextjs.org/blog/building-app-like-experiences-with-nextjs-16-3
- Instant Navigations : https://nextjs.org/blog/next-16-3-instant-navigations
