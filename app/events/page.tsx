"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import EventCard from "@/components/EventCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ActualitesPage() {
  const [evenements, setEvenements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: eventsData, error: eventsError } = await supabase
        .from("evenements")
        .select("*")
        .order("date", { ascending: true })

      if (eventsError) console.error(eventsError)
      else setEvenements(eventsData || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const calendarButtonClass = `
    bg-[#F9F9F9] text-[#4B4B4B] px-3 py-1 rounded-xl
    hover:bg-[#4E3AC4] hover:text-white transition-colors
  `

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-8 text-center">
            Calendrier des événements
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-6 max-w-5xl mx-auto border border-gray-200">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale="fr"
              height="auto"
              events={evenements.map(e => ({
                title: e.titre,
                date: e.date,
                url: e.lien || undefined,
              }))}
              eventContent={(arg) => (
                <div className="flex flex-col p-2 bg-[#4E3AC4] text-white rounded-lg shadow-md hover:scale-105 transition-transform">
                  <span className="font-bold text-sm">{arg.event.title}</span>
                </div>
              )}
              dayMaxEventRows={3}
              fixedWeekCount={false}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth"
              }}
              buttonText={{
                today: "Aujourd’hui",
                month: "Mois"
              }}
              aspectRatio={1.4}
              contentHeight={500}
              eventClick={(info) => {
                if (info.event.url) {
                  info.jsEvent.preventDefault()
                  window.open(info.event.url, "_blank")
                }
              }}
              dayCellClassNames="rounded-xl border border-gray-100 overflow-hidden hover:bg-gray-50 transition-colors"
            />
          </div>
        </div>
      </section>
      
      {/* SECTION EVENEMENTS */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
            Tous les événements
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
