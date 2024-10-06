# AuthApp - Application d'Authentification Sécurisée

AuthApp est une application d'authentification robuste et sécurisée construite avec Next.js, Prisma et NextAuth.js. Elle offre une expérience utilisateur fluide pour l'inscription, la connexion et la gestion avancée des comptes.

## Fonctionnalités Principales

### Authentification
- Inscription avec vérification par email
- Connexion sécurisée (email/mot de passe)
- Authentification à deux facteurs (2FA)
- Authentification via Google et GitHub (OAuth)
- Réinitialisation de mot de passe sécurisée

### Gestion de Compte
- Tableau de bord utilisateur personnalisé
- Mise à jour du nom d'utilisateur avec actualisation en temps réel de la session
- Ajout/modification de mot de passe pour les comptes créés via OAuth
- Modification sécurisée du mot de passe avec vérifications avancées
- Gestion des rôles (utilisateur, administrateur)

### Sécurité et Expérience Utilisateur
- Interface responsive et intuitive
- Pages d'erreur personnalisées (authentification, 404)
- Validation en temps réel des formulaires
- Feedback immédiat lors des actions utilisateur

## Technologies Utilisées

- [Next.js](https://nextjs.org/) - Framework React pour le rendu côté serveur
- [Prisma](https://www.prisma.io/) - ORM pour la gestion de la base de données
- [NextAuth.js](https://next-auth.js.org/) - Solution d'authentification pour Next.js
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript typé
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [MongoDB](https://www.mongodb.com/) - Base de données NoSQL
- [Zod](https://github.com/colinhacks/zod) - Validation de schéma TypeScript-first
- [date-fns](https://date-fns.org/) - Bibliothèque de manipulation de dates

## Fonctionnalités de Sécurité Détaillées

### Authentification
1. **Hachage des mots de passe** : Utilisation de bcrypt pour un stockage sécurisé.
2. **Vérification d'email** : 
   - Obligatoire pour les nouveaux comptes.
   - Vérification automatique pour les comptes OAuth.
   - Possibilité de renvoyer l'email de vérification (limité à une fois par minute).
3. **Authentification à deux facteurs (2FA)** : 
   - Utilisation de codes TOTP.
   - Activation/désactivation par l'utilisateur.
4. **Gestion des sessions** : 
   - Utilisation de JWT stockés de manière sécurisée.
   - Décryptage côté serveur pour une session sécurisée.

### Autorisation
1. **Contrôle d'accès basé sur les rôles** : Différenciation utilisateur/administrateur.
2. **Middleware de protection des routes** : 
   - Vérification de l'authentification pour les routes protégées.
   - Redirection des utilisateurs non authentifiés.
   - Restriction d'accès aux pages d'authentification pour les utilisateurs connectés.

### Gestion du Profil Utilisateur
1. **Mise à jour du nom d'utilisateur** : 
   - Actualisation en temps réel de la session.
2. **Gestion des mots de passe pour les comptes OAuth** : 
   - Ajout possible d'un mot de passe pour une authentification locale.
3. **Modification sécurisée du mot de passe** : 
   - Vérification de l'ancien mot de passe.
   - Prévention de la réutilisation du même mot de passe.
   - Validation de la force du nouveau mot de passe.

### Protection des Données
1. **Validation des entrées** : Utilisation de Zod pour prévenir les injections.
2. **Gestion sécurisée des tokens** : 
   - Tokens uniques pour la réinitialisation de mot de passe et la vérification d'email.
   - Expiration automatique des tokens.
3. **Isolation des données** : Accès limité aux données personnelles de l'utilisateur.

## Gestion des Erreurs et UX
- Pages d'erreur personnalisées (authentification, 404).
- Messages d'erreur clairs et informatifs.
- Feedback immédiat lors des actions utilisateur.

## Internationalisation
- Utilisation de date-fns pour le formatage des dates en français.

## Prérequis
- Node.js (v14+)
- npm ou yarn
- MongoDB

## Installation

1. Cloner le dépôt :
   ```
   git clone https://github.com/votre-nom/authapp.git
   cd authapp
   ```

2. Installer les dépendances :
   ```
   npm install
   ```

3. Configurer les variables d'environnement :
   Créer un fichier `.env` basé sur `.env.example`.

4. Générer les types Prisma :
   ```
   npx prisma generate
   ```

5. Lancer l'application :
   ```
   npm run dev
   ```

L'application sera accessible sur `http://localhost:3000`.

## Structure du Projet
- `src/app` - Composants et pages
- `src/components` - Composants réutilisables
- `src/libs` - Utilitaires et configurations
- `prisma` - Schéma et migrations Prisma

## Composants UI Personnalisés
- Formulaires d'authentification sécurisés
- Boutons de soumission avec états de chargement
- Champs de saisie avec validation en temps réel
- Composants de dialogue pour les confirmations

## Déploiement
Compatible avec les plateformes comme Vercel ou Netlify. Assurez-vous de configurer correctement les variables d'environnement.

## Contribution
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
