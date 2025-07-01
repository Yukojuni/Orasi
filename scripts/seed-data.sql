-- Données d'exemple pour ORASI

-- Insertion d'utilisateurs d'exemple
INSERT INTO users (pseudo, email, mot_de_passe, role) VALUES
('admin', 'admin@orasi.fr', '$2b$10$example_hashed_password', 'admin'),
('claire_martin', 'claire@example.com', '$2b$10$example_hashed_password', 'user'),
('thomas_dubois', 'thomas@example.com', '$2b$10$example_hashed_password', 'user'),
('sarah_johnson', 'sarah@example.com', '$2b$10$example_hashed_password', 'user'),
('marie_leroy', 'marie@example.com', '$2b$10$example_hashed_password', 'user'),
('pierre_moreau', 'pierre@example.com', '$2b$10$example_hashed_password', 'user');

-- Insertion d'articles d'exemple
INSERT INTO articles (titre, contenu, theme, auteur_id, nb_vues) VALUES
(
    'Les Chaebols : Quand les conglomérats Sud-Coréens deviennent les néo-monarques',
    'Anciennement royaume en ruine étant le pays le plus pauvre du monde en 1953, la Corée du Sud trône aujourd''hui à l''honorable 10ème position des plus grandes puissances économiques du monde. Il n''est d''ailleurs pas exagéré de présenter la Corée du Sud comme le pays le mieux équipé et le mieux avancé technologiquement dans le monde, faisant du pays un véritable paradis futuriste...',
    'Géopolitique',
    (SELECT id FROM users WHERE pseudo = 'claire_martin'),
    1250
),
(
    'L''impact de l''intelligence artificielle sur l''éducation moderne',
    'Comment l''IA transforme-t-elle nos méthodes d''apprentissage et quels sont les défis à relever pour une intégration réussie dans le système éducatif...',
    'Culture',
    (SELECT id FROM users WHERE pseudo = 'thomas_dubois'),
    890
),
(
    'Démocratie participative : vers une nouvelle forme de gouvernance ?',
    'Analyse des expérimentations démocratiques en cours et de leur potentiel transformateur pour nos sociétés contemporaines...',
    'Politique',
    (SELECT id FROM users WHERE pseudo = 'sarah_johnson'),
    756
),
(
    'Les enjeux environnementaux de la fast fashion',
    'Décryptage de l''impact écologique de l''industrie textile et des alternatives durables qui émergent...',
    'Société',
    (SELECT id FROM users WHERE pseudo = 'marie_leroy'),
    623
),
(
    'Réflexions sur l''avenir du travail à l''ère numérique',
    'Comment le télétravail et l''automatisation redéfinissent-ils notre rapport au travail et à la productivité...',
    'Opinion',
    (SELECT id FROM users WHERE pseudo = 'pierre_moreau'),
    445
);

-- Insertion de commentaires d'exemple
INSERT INTO commentaires (contenu, article_id, auteur_id) VALUES
(
    'Excellent article ! Cette analyse des Chaebols sud-coréens est très éclairante. J''aimerais en savoir plus sur leur influence politique.',
    (SELECT id FROM articles WHERE titre LIKE 'Les Chaebols%'),
    (SELECT id FROM users WHERE pseudo = 'thomas_dubois')
),
(
    'Très intéressant ! Cela me rappelle les débats sur l''IA que nous avons eus en cours.',
    (SELECT id FROM articles WHERE titre LIKE 'L''impact de l''intelligence%'),
    (SELECT id FROM users WHERE pseudo = 'sarah_johnson')
),
(
    'Merci pour cet éclairage sur la démocratie participative. Avez-vous des exemples concrets d''implémentation réussie ?',
    (SELECT id FROM articles WHERE titre LIKE 'Démocratie participative%'),
    (SELECT id FROM users WHERE pseudo = 'marie_leroy')
);
