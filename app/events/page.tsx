"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import Link from "next/link"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

export default function ActualitesPage() {
  const [evenements, setEvenements] = useState<any[]>([])
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const simulateData = async () => {
      setLoading(true)

      // Simule des événements
      const fakeEvents = [
        {
          id: 1,
          titre: "Conférence Tech",
          description: "Explorez les dernières tendances du numérique.",
          date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
          lien: "https://example.com/event1"
        },
        {
          id: 2,
          titre: "Atelier IA",
          description: "Découvrez les applications concrètes de l'IA.",
          date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
          lien: ""
        },
        {
          id: 3,
          titre: "Webinaire sur la cybersécurité",
          description: "Comment protéger vos données efficacement.",
          date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
          lien: "https://example.com/event3"
        }
      ]

      // Simule des vidéos
      const fakeVideos = [
        {
          id: 1,
          titre: "Introduction à Orasi",
          youtube_id: "dQw4w9WgXcQ",
          date: new Date().toISOString()
        },
        {
          id: 2,
          titre: "ITW : Le rap était-il mieux avant ?",
          youtube_id: "KsZxUd5ihmM?si=_QkCS24K31LXC9Ne",
          date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
        }
      ]

      setEvenements(fakeEvents)
      setVideos(fakeVideos)
      setLoading(false)
    }

    simulateData()
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Récupère les événements à venir
      const { data: eventsData, error: eventsError } = await supabase
        .from("evenements")
        .select("*")
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true })
        .limit(3)

      // Récupère les vidéos (YouTube ou autre source)
      const { data: videosData, error: videosError } = await supabase
        .from("videos")
        .select("*")
        .order("date", { ascending: false })

      if (eventsError) console.error(eventsError)
      else setEvenements(eventsData || [])

      if (videosError) console.error(videosError)
      else setVideos(videosData || [])

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      {/* SECTION - Calendrier */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-['Cambria_Math'] text-center text-black mb-8">Calendrier des événements</h2>
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-3xl mx-auto border border-gray-200">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              events={evenements.map(e => ({
                title: e.titre,
                date: e.date,
                url: e.lien || undefined
              }))}
              eventColor="#4E3AC4"
              eventTextColor="#fff"
              dayMaxEventRows={true}
              fixedWeekCount={false}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: ""
              }}
              aspectRatio={1.5}
              contentHeight={400}
              eventClick={(info) => {
                if (info.event.url) {
                  info.jsEvent.preventDefault()
                  window.open(info.event.url, "_blank")
                }
              }}
            />
          </div>
        </div>
      </section>


      {/* SECTION - Événements à venir */}
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
                    {format(new Date(event.date), "EEEE d MMMM yyyy 'à' HH:mm")}
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

      {/* SECTION - Vidéos récentes */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-['Cambria_Math'] text-center text-black mb-12">Nos vidéos</h2>

          {loading ? (
            <p className="text-center">Chargement des vidéos...</p>
          ) : videos.length === 0 ? (
            <p className="text-center text-gray-500">Aucune vidéo pour le moment</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white shadow-md rounded-xl overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtube_id}`}
                      title={video.titre}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-['Cambria_Math'] text-[#4B4B4B]">{video.titre}</h3>
                    <p className="text-sm text-gray-600">
                      Publiée le {format(new Date(video.date), "d MMMM yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@Orasi.France"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
                Voir toutes nos vidéos
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
