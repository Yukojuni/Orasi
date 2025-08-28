# ORASI - Association Étudiante

Application web complète pour l'association étudiante ORASI, plateforme de diffusion et de débat d'idées autour de sujets sociétaux et culturels.

## 🚀 Technologies utilisées

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Déploiement**: Vercel

## 📋 Fonctionnalités

### Pour tous les utilisateurs
- ✅ Consultation des articles par thème (Géopolitique, Culture, Politique, Société, Opinion)
- ✅ Recherche et filtrage des articles
- ✅ Inscription à la newsletter
- ✅ Design responsive et accessible
- ✅ Mode sombre/clair

### Pour les membres connectés
- ✅ Système d'authentification complet
- ✅ Espace personnel avec historique et favoris
- ✅ Commentaires sur les articles
- ✅ Système de likes/dislikes
- ✅ Notifications

### Pour les administrateurs
- ✅ Back-office complet (CRUD)
- ✅ Gestion des articles, utilisateurs et commentaires
- ✅ Statistiques et modération
- ✅ Système de rôles

## 🎨 Charte graphique

- **Couleur principale**: #4E3AC4 (Violet)
- **Couleurs secondaires**: 
  - Bleu clair: #A8C6FF
  - Vert: #5DC2A3
  - Jaune: #F9B626
  - Noir: #4B4B4B
  - Fond clair: #FFFDFA

- **Typographies**:
  - Titres: Cambria Math
  - Paragraphes: Work Sans

## 🛠️ Installation et configuration

### Prérequis
- Node.js 18+
- Compte Supabase

### 1. Cloner le projet
\`\`\`bash
git clone [url-du-repo]
cd orasi-app
npm install --legacy-peer-deps
\`\`\`

### 2. Configuration Supabase
1. Créer un nouveau projet sur [Supabase](https://supabase.com)
2. Exécuter les scripts SQL dans `scripts/` pour créer les tables
3. Configurer les variables d'environnement

### 3. Variables d'environnement
Créer un fichier `.env.local` :
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 4. Lancement
\`\`\`bash
npm run dev
\`\`\`

L'application sera accessible sur `http://localhost:3000`

## 📊 Structure de la base de données

### Tables principales
- `users` - Utilisateurs et profils
- `articles` - Articles et contenus
- `commentaires` - Commentaires sur les articles
- `reactions` - Likes/dislikes
- `favoris` - Articles favoris des utilisateurs
- `historique_lecture` - Historique de lecture
- `notifications` - Système de notifications
- `newsletter_subscribers` - Abonnés newsletter

## 🔐 Authentification

L'application utilise Supabase Auth avec :
- Inscription par email/mot de passe
- Connexion sécurisée
- Gestion des rôles (user/admin)
- Récupération de mot de passe

## 📱 Responsive Design

- Design mobile-first
- Adaptation tablette et desktop
- Navigation optimisée pour tous les écrans
- Accessibilité WCAG AA

## 🎯 Guide d'utilisation

### Pour les membres
1. **Inscription** : Créer un compte via le formulaire d'inscription
2. **Navigation** : Parcourir les articles par thème ou recherche
3. **Interaction** : Commenter, liker et sauvegarder en favoris
4. **Profil** : Gérer son profil et consulter son historique

### Pour les administrateurs
1. **Accès admin** : Se connecter avec un compte administrateur
2. **Gestion articles** : Créer, modifier, supprimer des articles
3. **Modération** : Gérer les commentaires et utilisateurs
4. **Statistiques** : Suivre l'activité de la plateforme

## 🚀 Déploiement

### Vercel (recommandé)
1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes
L'application est compatible avec toutes les plateformes supportant Next.js.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email: contact@orasi.fr
- Issues GitHub: [Créer une issue](https://github.com/orasi/issues)

---

**ORASI** - *Explore, pense, échange*
