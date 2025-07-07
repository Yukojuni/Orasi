-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    pseudo VARCHAR(50) UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    date_inscription TIMESTAMP DEFAULT NOW()
);

-- Table des articles
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    image_couverture TEXT,
    auteur_id UUID REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(50) CHECK (theme IN ('Géopolitique', 'Culture', 'Politique', 'Société', 'Opinion')),
    date_publication TIMESTAMP DEFAULT NOW(),
    nb_vues INTEGER DEFAULT 0
);

-- Table des commentaires
CREATE TABLE IF NOT EXISTS commentaires (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contenu TEXT NOT NULL,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    auteur_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date_commentaire TIMESTAMP DEFAULT NOW()
);

-- Table des réactions (likes/dislikes)
CREATE TABLE IF NOT EXISTS commentaire_reactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    utilisateur_id UUID REFERENCES users(id) ON DELETE CASCADE,
    commentaire_id UUID REFERENCES commentaires(id) ON DELETE CASCADE,
    type VARCHAR(10) CHECK (type IN ('like', 'dislike')) NOT NULL,
    date_reaction TIMESTAMP DEFAULT NOW(),
    UNIQUE(utilisateur_id, commentaire_id)
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favoris (
    utilisateur_id UUID REFERENCES users(id) ON DELETE CASCADE,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    PRIMARY KEY (utilisateur_id, article_id)
);

-- Table de l'historique de lecture
CREATE TABLE IF NOT EXISTS historique_lecture (
    utilisateur_id UUID REFERENCES users(id) ON DELETE CASCADE,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    date_lecture TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (utilisateur_id, article_id)
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    utilisateur_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    contenu TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    date_envoi TIMESTAMP DEFAULT NOW()
);

-- Table des abonnés à la newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_inscription TIMESTAMP DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_articles_theme ON articles(theme);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date_publication DESC);
CREATE INDEX IF NOT EXISTS idx_commentaires_article ON commentaires(article_id);
CREATE INDEX IF NOT EXISTS idx_reactions_article ON reactions(article_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(utilisateur_id);
CREATE INDEX IF NOT EXISTS idx_historique_user ON historique_lecture(utilisateur_id);