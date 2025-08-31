"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";

import { EditorState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

interface Article {
  id: string;
  titre: string;
  contenu: string;
  theme: string;
  date_publication: string;
  nb_vues: number;
  image_couverture: string | null;
  auteur: string | null;
}

// 🔑 Fonction utilitaire : rend HTML selon format
function renderArticleContent(contenu: string) {
  try {
    // 👉 Essayer de parser comme JSON Draft.js
    const raw = JSON.parse(contenu);
    const contentState = convertFromRaw(raw);
    const editorState = EditorState.createWithContent(contentState);
    return stateToHTML(editorState.getCurrentContent());
  } catch (err) {
    // 👉 Sinon, c'est du texte brut
    return contenu
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("");
  }
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select(
          `
          id,
          titre,
          contenu,
          theme,
          date_publication,
          nb_vues,
          image_couverture,
          auteur
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Article non trouvé.");
      } else {
        setArticle(data);
      }

      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-600 text-lg uppercase">
          Chargement de l'article...
        </p>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <p className="text-red-600 text-lg uppercase">{error}</p>
      </main>
    );
  }

  // 🔑 Construire le rendu HTML (Draft.js ou texte brut)
  const contenuHTML = renderArticleContent(article.contenu);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto p-8 flex-grow">
        {article.image_couverture && (
          <img
            src={article.image_couverture}
            alt={article.titre}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold mb-4 uppercase">{article.titre}</h1>

        <div className="flex items-center space-x-4 mb-8 text-sm text-gray-600 uppercase">
          <span>Auteur : {article.auteur || "Inconnu"}</span>
          <span>
            Date :{" "}
            {new Date(article.date_publication).toLocaleDateString("fr-FR")}
          </span>
        </div>

        {/* 🔑 Affichage du contenu formaté */}
        <article
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: contenuHTML }}
        />

        <CommentSection articleId={article.id} />
      </main>
      <Footer />
    </div>
  );
}
