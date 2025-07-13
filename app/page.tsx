"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ArticleCard from "@/components/ArticleCard"
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
        .limit (3)

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
                <Link href="/about">
                  <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
                  Devenir membre
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button
                    variant="outline"
                    className="border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Lire un article
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full h-[500px] md:h-[300px] lg:h-[400px]">
              {/* Background avec dégradé */}
              <div className="absolute top-0 right-0 w-4/5 h-full bg-gradient-to-br from-[#4E3AC4] to-[#251C5E] rounded-[124px_0px] z-0"></div>

              {/* Statue superposée */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/6 w-2/3 md:w-2/3 z-10">
                <img
                  src="/hero.png"
                  alt="image de présentation"
                  className="w-full h-auto object-contain rounded drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-['Cambria_Math'] text-center text-black mb-12">
            Derniers articles
          </h2>

          {loading ? (
            <p className="text-center">Chargement des articles...</p>
          ) : (
            <Carousel opts={{ align: "start" }} className="mb-8 px-2">
              <CarouselContent>
                {articles.sort((a, b) => new Date(b.date_publication) - new Date(a.date_publication)).slice(0, 8).map((article) => (
                  <CarouselItem key={article.id} className="pl-2 md:basis-[45%] lg:basis-[22%] basis-[85%]">
                    <ArticleCard article={article} featured={false} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          <div className="text-center">
            <Link href="/articles">
              <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
                Voir plus d'articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section className="py-16 px-4 bg-[#F9F9F9]">
        <div className="container mx-auto">
          <h2 className="text-5xl font-['Cambria_Math'] text-center text-black mb-12">Prochains événements</h2>

          {loading ? (
            <p className="text-center">Chargement des événements...</p>
          ) : evenements.length === 0 ? (
            <p className="text-center text-gray-500">Aucun événement à venir</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {evenements.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-2xl font-['Cambria_Math'] mb-2 text-[#4B4B4B]">{event.titre}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                  </p>
                  <p className="text-[#4B4B4B] mb-4">{event.description}</p>
                  <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
                    {event.lien ? <a href={event.lien} target="_blank">S'inscrire</a> : "En savoir plus"}
                  </Button>
                </div>
              ))}
            </div>
          )}
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
                <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
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
              className="border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math']"
            />
            <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
