# Suite du chantier production

## De ton côté

À faire avant d'encaisser une vraie commande. L'application refuse le paiement tant que les clés manquent, et les pages légales restent marquées incomplètes.

- [ ] Remplir `src/config/seller.js` : nom, forme juridique, adresse, SIRET, TVA, e-mail, téléphone, directeur de publication.
- [ ] Créer `.env.local` à partir de `.env.example` : `NEXT_PUBLIC_SITE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FIREBASE_SERVICE_ACCOUNT_JSON`.
- [ ] Dans Stripe, ajouter le webhook `checkout.session.completed` vers `/api/stripe-webhook`.
- [ ] Vérifier que le bucket Storage `nextjs-e-website.appspot.com` est actif.
- [ ] Déployer cette version de l'app et les règles Firebase (`database` + `storage`) ensemble. Déployer les règles avant l'app couperait le checkout encore en ligne, qui écrit la commande depuis le navigateur.

## Chantiers à venir

- [ ] Stock et anti-survente.
- [ ] E-mails de commande (accusé, expédition).
- [ ] Suivi client par e-mail et numéro de commande.
- [ ] Back-office : client, montant, et réécriture de statut sans remplacer toute la commande.
- [ ] Limiter le nombre de créations de commande.
- [ ] Panier : fusionner les lignes du même article et modifier la quantité.
- [ ] SEO : titres, URLs produit, sitemap.
- [ ] Euro TTC si la vente vise la France.
- [ ] Vérifier l'accueil et la fiche produit sur mobile.
- [ ] Remontée des erreurs en production.
- [ ] Accessibilité du parcours d'achat.

Après l'ouverture : comptes clients, retours branchés sur Stripe, recherche, migration App Router.
