"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/Providers"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()

  // Scroll lock sur body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <header className="w-full h-[123px] bg-white border-b border-gray-200 relative z-40">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-4xl font-bold text-[#4B4B4B]">
          ORASI
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {["/", "/articles", "/events", "/about"].map((path, i) => (
            <Link
              key={i}
              href={path}
              className="text-[#4B4B4B] hover:text-[#4E3AC4] transition-colors font-['Cambria_Math'] text-base uppercase"
            >
              {["Accueil", "Articles", "L'actualités", "À propos"][i]}
            </Link>
          ))}
        </nav>
          
        {/* Auth Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {user.user_metadata?.role == "admin" && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Admin
                  </Button>
                </Link>
              )}
              <Link href="/profile">
                <Button
                  variant="outline"
                  className="border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                >
                  Profil
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
                  Rejoindre
                </Button>
              </Link>
            </>
          )}
        </div>


        {/* Menu Mobile Icon */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center space-y-6 p-6">
          <nav className="flex flex-col items-center space-y-6">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-[#4B4B4B] font-['Cambria_Math'] text-xl uppercase">
              Accueil
            </Link>
            <Link href="/articles" onClick={() => setIsMenuOpen(false)} className="text-[#4B4B4B] font-['Cambria_Math'] text-xl uppercase">
              Articles
            </Link>
            <Link href="/events" onClick={() => setIsMenuOpen(false)} className="text-[#4B4B4B] font-['Cambria_Math'] text-xl uppercase">
              L'actualités
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-[#4B4B4B] font-['Cambria_Math'] text-xl uppercase">
              À propos
            </Link>
            {user ? (
              <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-40 border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                >
                  Profil
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-40 border-[#4E3AC4] text-[#4B4B4B] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    className="w-40 bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Rejoindre
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
