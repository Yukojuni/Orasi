"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ArticleCard from "@/components/ArticleCard"
import EventCard from "@/components/EventCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [evenements, setEvenements] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: eventsData, error: eventsError } = await supabase
        .from("evenements")
        .select("*")
        .order("date", { ascending: true })
        .limit(3)

      if (eventsError) console.error(eventsError)
      else setEvenements(eventsData || [])
      setLoading(false)
    }
    fetchData()
  }, [])

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
        .limit(8)

      if (error) console.error("Erreur récupération articles :", error)
      else {
        const formatted = data.map(a => ({
          ...a,
          auteur: a.auteur_id?.pseudo || "Auteur inconnu",
          avatar: a.auteur_id?.avatar_url || null,
        }))
        setArticles(formatted)
      }
      setLoading(false)
    }
    fetchFeaturedArticles()
  }, [])

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden">
      <Header />

      {/* SECTION ARTICLES + ÉVÉNEMENTS */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* === ARTICLE PRINCIPAL === */}
          <div className="lg:col-span-2 relative">
            <Link href={`/articles/${articles[0]?.id}`} className="block">
              <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                <img
                  src={articles[0]?.image_couverture || "/default.jpg"}
                  alt={articles[0]?.titre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="mt-4">
                <span className="text-sm uppercase font-bold text-[#4E3AC4]">
                  {articles[0]?.theme}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#4B4B4B] leading-tight mt-2">
                  {articles[0]?.titre}
                </h1>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  {articles[0]?.contenu?.substring(0, 150)}...
                </p>
              </div>
            </Link>
          </div>

          {/* === ARTICLES SECONDAIRES === */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {articles.slice(1, 6).map((article) => (
              <Link href={`/articles/${article.id}`} key={article.id} className="flex gap-4">
                {article.image_couverture && (
                  <img
                    src={article.image_couverture}
                    alt={article.titre}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-[#4B4B4B] leading-snug line-clamp-2">
                    {article.titre}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.contenu.substring(0, 80)}...</p>
                </div>
              </Link>
            ))}
          </div>

          {/* === ÉVÉNEMENT À VENIR === */}
          <div className="lg:col-span-1 relative">
            {evenements[0] ? (
              <Link href={`/events/${evenements[0].id}`} className="block">
                {/* Image de l'événement */}
                <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                  <img
                    src={evenements[0].lien_image || "/default-event.jpg"}
                    alt={evenements[0].titre}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay dégradé pour lisibilité */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Contenu texte */}
                <div className="mt-4">
                  <span className="text-sm uppercase font-bold text-[#4E3AC4]">
                    À venir
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#4B4B4B] leading-tight mt-2 line-clamp-2">
                    {evenements[0].titre}
                  </h3>
                  <p className="text-gray-700 mt-2 line-clamp-3">
                    {evenements[0].description}
                  </p>
                  {evenements[0].lien && (
                    <Button className="mt-4 bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl">
                      <a href={evenements[0].lien} target="_blank" rel="noreferrer">
                        S'inscrire
                      </a>
                    </Button>
                  )}
                </div>
              </Link>
            ) : (
              <p className="text-gray-500 text-center">Aucun événement à venir</p>
            )}
          </div>

        </div>
      </section>

      {/* ARTICLES EN CARROUSEL */}
    <section className="py-16 bg-white">
      <div className="container mx-auto overflow-visible">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Derniers articles
        </h2>

        {loading ? (
          <p className="text-center">Chargement des articles...</p>
        ) : (
          <Carousel opts={{ align: "start" }} className="overflow-visible">
            <CarouselContent className="overflow-visible">
              {articles.slice(0, 6).map(article => (
                <CarouselItem
                  key={article.id}
                  className="pl-2 md:basis-[45%] lg:basis-[22%] basis-[85%]"
                >
                  <ArticleCard article={article} featured={false} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>



      {/* SECTION EVENEMENTS */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
            Prochains événements
          </h2>

          {loading ? (
            <p className="text-center">Chargement...</p>
          ) : evenements.length === 0 ? (
            <p className="text-center text-gray-500">Aucun événement à venir</p>
          ) : (
            <Carousel opts={{ align: "start" }} className="mb-8 px-4 overflow-visible">
              <CarouselContent>
                {evenements.map(event => (
                  <CarouselItem
                    key={event.id}
                    className="pl-10 md:basis-[45%] lg:basis-[30%] basis-[85%] pb-8 py-4 "
                  >
                    <EventCard evenement={event} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </section>


      <Footer />
    </div>
  )
}
