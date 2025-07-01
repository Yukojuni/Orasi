"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/Providers"
import { supabase  } from "@/lib/supabase"
import { User, Heart } from "lucide-react"

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4E3AC4] mx-auto mb-4"></div>
          <p className="text-[#4B4B4B]">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Profil utilisateur */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={48} className="text-gray-600" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-['Cambria_Math'] text-black mb-2">
                {user.user_metadata?.pseudo || "Membre ORASI"}
              </h1>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Button
                  variant="outline"
                  className="border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                >
                  {user.email}
                </Button>
                {user.user_metadata?.phone && (
                  <Button
                    variant="outline"
                    className="border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    {user.user_metadata.phone}
                  </Button>
                )}
              <Button
                onClick={() => signOut()}
                className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
              >
                Déconnexion
              </Button>
              </div>
            </div>

            <div className="w-32 h-32 bg-[#A8C6FF] rounded-xl flex items-center justify-center">
              <span className="text-white font-['Cambria_Math'] text-lg">MEMBRE</span>
            </div>
          </div>
        </div>

        <hr className="border-black mb-8" />

        {/* Section Commentaires */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-['Cambria_Math'] text-black">Commentaires</h2>
            <div className="flex items-center gap-2">
              <span className="bg-[#A8C6FF] text-white px-3 py-1 rounded text-sm font-['Cambria_Math'] uppercase">
                3
              </span>
              <span className="text-black font-['Cambria_Math'] uppercase text-sm">récent</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Commentaire exemple */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-['Cambria_Math'] text-[#4B4B4B]">
                      {user.user_metadata?.pseudo || "Vous"}
                    </h3>
                    <span className="text-xs text-gray-500">il y a 2 jours</span>
                  </div>
                  <p className="text-[#4B4B4B] font-['Work_Sans'] mb-4">
                    Excellent article ! Cette analyse des Chaebols sud-coréens est très éclairante. J'aimerais en savoir
                    plus sur leur influence politique.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart size={12} />5
                    </span>
                    <span>Répondre</span>
                    <span>...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-['Cambria_Math'] text-[#4B4B4B]">
                      {user.user_metadata?.pseudo || "Vous"}
                    </h3>
                    <span className="text-xs text-gray-500">il y a 1 semaine</span>
                  </div>
                  <p className="text-[#4B4B4B] font-['Work_Sans'] mb-4">
                    Très intéressant ! Cela me rappelle les débats sur l'IA que nous avons eus en cours.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart size={12} />2
                    </span>
                    <span>Répondre</span>
                    <span>...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-['Cambria_Math'] text-[#4B4B4B]">
                      {user.user_metadata?.pseudo || "Vous"}
                    </h3>
                    <span className="text-xs text-gray-500">il y a 2 semaines</span>
                  </div>
                  <p className="text-[#4B4B4B] font-['Work_Sans'] mb-4">
                    Merci pour cet éclairage sur la démocratie participative. Avez-vous des exemples concrets
                    d'implémentation réussie ?
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart size={12} />8
                    </span>
                    <span>Répondre</span>
                    <span>...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
