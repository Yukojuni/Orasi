"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/Providers"
import { usePathname } from 'next/navigation' // pour détecter la page courante

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname() // récupère l'URL courante

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [isMenuOpen])

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/articles", label: "Articles" },
    { path: "/events", label: "Evénements" },
    { path: "/interviews", label: "Interviews" },
    { path: "/about", label: "À propos" }
  ]

  return (
    <header className="w-full bg-white border-gray-200 relative z-40">
      <div className="grid grid-rows-2">

        {/* Nom ORASI centré */}
        <div className="flex justify-center items-center py-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4B4B4B] tracking-wider font-sans">
            ORASI
          </h1>
        </div>

        {/* Logo gauche, nav centre, boutons droite */}
        <div className="grid grid-cols-3 items-center px-4 py-2 border-t border-gray-200">

          {/* Logo */}
          <div className="flex justify-start">
            <Link href="/">
              <img src="/logo.png" alt="Logo ORASI" className="h-12 md:h-16 rounded-lg" />
            </Link>
          </div>

          {/* Navigation centre */}
          <nav className="hidden md:flex justify-center space-x-8">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className={`font-sans text-base uppercase transition-all hover:scale-105 whitespace-nowrap ${
                  pathname === link.path
                    ? "text-[#4E3AC4]"  // violet si actif
                    : "text-[#4B4B4B] hover:text-[#4E3AC4]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Boutons droite */}
          <div className="hidden md:flex justify-end items-center space-x-4">
            {user ? (
              <>
                {user.user_metadata?.role === "admin" && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-sans uppercase transition-all hover:scale-105"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4]/10 rounded-xl font-sans uppercase transition-all hover:scale-105"
                  >
                    Profil
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="https://www.helloasso.com/associations/orasi/adhesions/formulaire-d-adhesion-en-tant-que-membre-actif-orasi-8">
                  <Button
                    variant="outline"
                    className="border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4]/10 rounded-xl font-sans uppercase transition-all hover:scale-105"
                  >
                    Adhérer
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-xl font-sans uppercase transition-all hover:scale-105">
                    Connexion
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex justify-end">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile fullscreen */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center space-y-6 p-6 overflow-y-auto">
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-sans text-xl uppercase transition-all hover:scale-105 ${
                  pathname === link.path
                    ? "text-[#4E3AC4]"
                    : "text-[#4B4B4B] hover:text-[#4E3AC4]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-40 border-[#4E3AC4] text-[#4B4B4B] rounded-xl font-sans uppercase transition-all hover:scale-105"
                >
                  Profil
                </Button>
              </Link>
            ) : (
              <>
                <Link href="https://www.helloasso.com/associations/orasi/adhesions/formulaire-d-adhesion-en-tant-que-membre-actif-orasi-8" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-40 border-[#4E3AC4] text-[#4B4B4B] rounded-xl font-sans uppercase transition-all hover:scale-105"
                  >
                    Adhérer
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    className="w-40 bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-xl font-sans uppercase transition-all hover:scale-105"
                  >
                    Connexion
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
