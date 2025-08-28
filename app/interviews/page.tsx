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
    const fetchData = async () => {
      setLoading(true)

      const { data: videosData, error: videosError } = await supabase
        .from("videos")
        .select("*")
        .order("date", { ascending: false })

      console.log("Vidéos:", videosData, videosError)

      if (videosError) console.error(videosError)
      else setVideos(videosData || [])

      setLoading(false)
    }

    fetchData()
  }, [])


  return (
    <div className="min-h-screen">
      <Header />
      
      {/* SECTION - Vidéos récentes */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-8 text-center">Nos vidéos</h2>

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
                    <h3 className="text-xl  text-[#4B4B4B]">{video.titre}</h3>
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
              <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-xl uppercase">
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
