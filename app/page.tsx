"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ArticleCard from "@/components/ArticleCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"


export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
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
        .order("date_publication", { ascending: false })
        .limit(4)

      if (error) {
        console.error("Erreur récupération articles :", error)
      } else {
        const articlesFormattés = data.map((a) => ({
          ...a,
          auteur: a.auteur_id?.pseudo || "Auteur inconnu",
          avatar: a.auteur_id?.avatar_url || null,
        }))
        setArticles(articlesFormattés)
      }
      setLoading(false)
    }

    fetchFeaturedArticles()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-['Cambria_Math'] text-[#4B4B4B] mb-6 leading-tight">
                Explore, pense, échange avec ORASI
              </h1>
              <p className="text-lg text-[#4B4B4B] mb-8 font-['Work_Sans']">
                L'association étudiante qui donne du sens aux débats et à la culture générale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/articles">
                  <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase px-6 py-3">
                    Lire un article
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white rounded-none rounded-br-xl font-['Cambria_Math'] uppercase px-6 py-3"
                  >
                    Découvrir l'asso
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-[400px] bg-gradient-to-br from-[#4E3AC4] to-[#251C5E] rounded-[124px_0px] flex items-center justify-center">
                <div className="w-[322px] h-[322px] bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                  <span className="text-lg">Image Hero</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-['Cambria_Math'] text-center text-black mb-12">Derniers articles</h2>

          {loading ? (
            <p className="text-center">Chargement des articles...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  // On ne distingue plus les featured, on applique un style uniforme plus sympa
                  featured={false}
                />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/articles">
              <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase px-8 py-3">
                Voir plus d'articles
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Section À propos */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full h-[400px] bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
                <span className="text-lg">Image À propos</span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">À propos</h2>
              <p className="text-lg text-[#4B4B4B] mb-8 font-['Work_Sans']">
                Des étudiants passionnés par les grandes questions contemporaines de ce siècle et par tous les sujets
                inter-temporels dont la complexité intensifie l'envie d'en apprendre plus.
              </p>
              <p className="text-lg text-[#4B4B4B] mb-8 font-['Work_Sans']">
                Orasi, du grec όραση se traduit en français par "vision", notre vision du monde, des phénomènes voire de
                ce que devraient être certaines choses.
              </p>
              <Link href="/about">
                <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase px-6 py-3">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Newsletter */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-['Cambria_Math'] text-[#4B4B4B] mb-4">Newsletter</h2>
          <p className="text-lg text-[#4B4B4B] mb-8 font-['Work_Sans']">
            Restez informé de nos dernières publications et événements
          </p>

          <div className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Ton email"
              className="border-[#4E3AC4] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
            />
            <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase px-6">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
