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
          auteur_id (pseudo, avatar_url),
          subsection
        `)

      if (error) console.error("Erreur récupération articles :", error)
      else {
        const articlesFormattés = data.map(a => ({
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

  // Filtrer par thème et recherche
  const filteredArticles = articles.filter(article => {
    const matchesTheme = selectedTheme === "Tous" || article.theme === selectedTheme
    const matchesSearch =
      article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contenu.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTheme && matchesSearch
  })

  // Grouper par subsection si un thème est sélectionné
  const groupedArticlesBySubsection = selectedTheme === "Tous"
    ? {}
    : filteredArticles.reduce((acc: Record<string, any[]>, article) => {
        const key = article.subsection || "Sans subsection"
        if (!acc[key]) acc[key] = []
        acc[key].push(article)
        return acc
      }, {})

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden">
      <Header />

      {/* Filtres + Recherche */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B4B4B] w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#4E3AC4] text-[#4B4B4B] rounded-xl font-sans"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {themes.map(theme => (
              <Button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                variant={selectedTheme === theme ? "default" : "outline"}
                className={`rounded-xl font-sans uppercase text-sm ${
                  selectedTheme === theme
                    ? "bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-xl font-sans uppercase"
                    : "border-[#4E3AC4] text-[#4B4B4B] rounded-xl font-sans uppercase"
                }`}
              >
                {theme}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto space-y-16">
          {loading ? (
            <p className="text-center text-[#4B4B4B]">Chargement des articles...</p>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-[#4B4B4B] font-sans">
                Aucun article trouvé pour votre recherche.
              </p>
            </div>
          ) : selectedTheme === "Tous" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            Object.entries(groupedArticlesBySubsection).map(([subsectionTitle, articlesInGroup]) => (
              <div key={subsectionTitle} className="space-y-6">
                {subsectionTitle !== "Sans subsection" && (
                  <h3 className="text-2xl font-bold text-[#4E3AC4] font-sans">
                    {subsectionTitle}
                  </h3>
                )}
                <Carousel opts={{ align: "start" }} className="mb-8 px-2">
                  <CarouselContent>
                    {articlesInGroup.map(article => (
                      <CarouselItem
                        key={article.id}
                        className="pl-2 md:basis-[45%] lg:basis-[22%] basis-[85%]"
                      >
                        <ArticleCard article={article} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
