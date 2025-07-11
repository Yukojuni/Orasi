"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ArticleCard from "@/components/ArticleCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { supabase } from "@/lib/supabase"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const themes = ["Tous", "Géopolitique", "Culture", "Politique", "Société", "Opinion"]

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState("Tous")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchArticles = async () => {
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

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter((article) => {
    const matchesTheme = selectedTheme === "Tous" || article.theme === selectedTheme
    const matchesSearch =
      article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contenu.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTheme && matchesSearch
  })

  return (
    <div className="min-h-screen">
      <Header />

      {/* Filtres + Recherche */}
      <section className="py-8 px-4 bg-[#FFFFFF]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B] w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math']"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  variant={selectedTheme === theme ? "default" : "outline"}
                  className={`
                    rounded-none rounded-br-xl font-['Cambria_Math'] uppercase text-sm
                    ${
                      selectedTheme === theme
                        ? "bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                        : "border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                    }
                  `}
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Affichage des articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto space-y-16">
          {loading ? (
            <p className="text-center text-[#4B4B4B]">Chargement des articles...</p>
          ) : filteredArticles.length > 0 ? (
            // On regroupe les articles par thème
            [...new Set(filteredArticles.map((a) => a.theme))].map((theme) => {
              const articlesDuTheme = filteredArticles.filter((a) => a.theme === theme)

              return (
                <div key={theme} className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#4E3AC4] font-['Work_Sans']">
                    {theme}
                  </h2>
                  <Carousel opts={{ align: "start" }}>
                    <CarouselContent>
                      {articlesDuTheme.map((article) => (
                        <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                          <ArticleCard article={article} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )
            })
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-[#4B4B4B] font-['Work_Sans']">
                Aucun article trouvé pour votre recherche.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
