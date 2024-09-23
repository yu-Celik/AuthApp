# AuthApp - Application d'Authentification Sécurisée

AuthApp est une application d'authentification robuste et sécurisée construite avec Next.js, Prisma et NextAuth.js. Elle offre une expérience utilisateur fluide pour l'inscription, la connexion et la gestion des comptes.

## Fonctionnalités

- Inscription utilisateur avec vérification par email
- Connexion sécurisée
- Authentification via Google et GitHub
- Réinitialisation de mot de passe
- Tableau de bord utilisateur
- Gestion des rôles (utilisateur, administrateur)
- Interface responsive

## Technologies Utilisées

- [Next.js](https://nextjs.org/) - Framework React pour le rendu côté serveur
- [Prisma](https://www.prisma.io/) - ORM pour la gestion de la base de données
- [NextAuth.js](https://next-auth.js.org/) - Solution d'authentification pour Next.js
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript typé
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [MongoDB](https://www.mongodb.com/) - Base de données NoSQL

## Sécurité

AuthApp intègre plusieurs niveaux de sécurité pour protéger les données des utilisateurs et prévenir les attaques courantes :

### Authentification

1. **Hachage des mots de passe** : 
   - Utilisation de bcrypt pour le hachage sécurisé des mots de passe avant stockage.
   - Empêche l'accès aux mots de passe en clair, même en cas de fuite de la base de données.

2. **Vérification d'email** :
   - Les nouveaux comptes nécessitent une vérification par email.
   - Prévient la création de comptes frauduleux et assure la validité des adresses email.
   - Si l'utilisateur crée un compte avec GitHub ou Google, son compte est directement vérifié.
   - L'utilisateur peut renvoyer un mail de vérification chaque minute. S'il est vérifié, il est renvoyé à la page de connexion.

3. **Authentification multi-fournisseurs** :
   - Intégration de Google et GitHub comme options d'authentification.
   - Permet une authentification sécurisée via des tiers de confiance.

4. **Gestion des sessions** :
   - Utilisation de JWT (JSON Web Tokens) pour la gestion sécurisée des sessions.
   - Les tokens sont stockés côté client de manière sécurisée.
   - Le token est décrypté côté serveur pour stocker les données utilisateur utiles et non sensibles dans la session.

### Autorisation

1. **Contrôle d'accès basé sur les rôles** :
   - Différenciation entre utilisateurs et administrateurs.
   - Restriction de l'accès aux fonctionnalités sensibles selon le rôle.

2. **Middleware de protection des routes** :
   - Vérification de l'authentification pour l'accès aux routes protégées.
   - Redirection instantanée des utilisateurs non authentifiés.
   - Si l'utilisateur est authentifié, il n'a pas accès aux pages d'authentification.

### Protection des données

1. **Validation des entrées** :
   - Utilisation de Zod pour la validation côté serveur des données entrantes.
   - Prévient les injections et les attaques par manipulation de données.

### Gestion des tokens

1. **Tokens de réinitialisation de mot de passe** :
   - Génération de tokens uniques et à usage unique pour la réinitialisation de mot de passe.
   - Expiration automatique des tokens après un délai défini.

2. **Tokens de vérification d'email** :
   - Tokens sécurisés pour la vérification des adresses email.
   - Limitation de la durée de validité des tokens.

### Sécurité de la base de données

1. **ORM Prisma** :
   - Utilisation de requêtes paramétrées pour prévenir les injections SQL.

2. **Isolation des données** :
   - Chaque utilisateur n'a accès qu'à ses propres données.

### Bonnes pratiques de développement

1. **Variables d'environnement** :
   - Stockage sécurisé des clés API et des secrets dans des variables d'environnement.
   - Séparation des configurations de développement et de production.

### Améliorations futures

- Implémentation de l'authentification à deux facteurs (2FA).
- Mise en place d'un système de détection des activités suspectes.
- Chiffrement des données sensibles au repos dans la base de données.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Une base de données MongoDB

## Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/votre-nom/authapp.git
   cd authapp
   ```

2. Installez les dépendances :
   ```
   npm install
   ```
   ou
   ```
   yarn install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet et ajoutez les variables nécessaires (voir `.env.example`).

4. Générez les types Prisma :
   ```
   npx prisma generate
   ```

5. Lancez l'application en mode développement :
   ```
   npm run dev
   ```
   ou
   ```
   yarn dev
   ```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Structure du Projet

- `src/app` - Composants et pages de l'application
- `src/components` - Composants réutilisables
- `src/libs` - Utilitaires et configurations
- `prisma` - Schéma et migrations Prisma

## Déploiement

Cette application peut être facilement déployée sur des plateformes comme Vercel ou Netlify. Assurez-vous de configurer correctement les variables d'environnement sur votre plateforme de déploiement.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
