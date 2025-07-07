"use client"

import { use, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CommentSection from "@/components/CommentSection"
import React from "react"


interface Props {
  params: { id: string }
}

interface Article {
  id: string
  titre: string
  contenu: string
  theme: string
  date_publication: string
  nb_vues: number
  image_couverture: string | null
  auteur_id: {
    pseudo: string | null
    avatar_url?: string | null
  }[] | null
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) 
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          titre,
          contenu,
          theme,
          date_publication,
          nb_vues,
          image_couverture,
          auteur_id,
          auteur_id (pseudo, avatar_url)
        `)
        .eq("id", id)
        .single()

      if (error || !data) {
        setError("Article non trouvé.")
      } else {
        setArticle(data)
      }
      setLoading(false)
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-600 text-lg font-['Cambria_Math'] uppercase">Chargement de l'article...</p>
      </main>
    )
  }

  if (error || !article) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <p className="text-red-600 text-lg font-['Cambria_Math'] uppercase">{error}</p>
      </main>
    )
  }

  const auteurPseudo = article.auteur_id?.pseudo || "Inconnu"
  const auteurAvatar = article.auteur_id?.avatar_url || null

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

        <h1 className="text-4xl font-bold mb-4 font-['Cambria_Math'] uppercase">{article.titre}</h1>

        <div className="flex items-center space-x-4 mb-8 text-sm text-gray-600 font-['Cambria_Math'] uppercase">
          {auteurAvatar && (
            <img
              src={auteurAvatar}
              alt={auteurPseudo}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span>Auteur : {auteurPseudo}</span>
          <span>Date : {new Date(article.date_publication).toLocaleDateString("fr-FR")}</span>
          <span>Vues : {article.nb_vues}</span>
        </div>

        <article className="prose max-w-none text-gray-800 whitespace-pre-line">{article.contenu}</article>
        <CommentSection articleId={article.id} />
      </main>

      <Footer />
    </div>
  )
}
