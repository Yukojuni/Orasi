"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/Providers"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="w-full h-[123px] bg-[#FFFDFA] border-b border-gray-200">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-4xl font-bold text-[#4B4B4B]">
          ORASI
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-[#4B4B4B] hover:text-[#4E3AC4] transition-colors font-['Cambria_Math'] text-base uppercase"
          >
            Accueil
          </Link>
          <Link
            href="/articles"
            className="text-[#4B4B4B] hover:text-[#4E3AC4] transition-colors font-['Cambria_Math'] text-base uppercase"
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="text-[#4B4B4B] hover:text-[#4E3AC4] transition-colors font-['Cambria_Math'] text-base uppercase"
          >
            L'asso
          </Link>
        </nav>

        {/* Boutons d'authentification */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
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
                <Button 
                className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
                  Rejoindre
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Menu Mobile */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-[#4B4B4B] font-['Cambria_Math'] uppercase">
              Accueil
            </Link>
            <Link href="/articles" className="text-[#4B4B4B] font-['Cambria_Math'] uppercase">
              Articles
            </Link>
            <Link href="/about" className="text-[#4B4B4B] font-['Cambria_Math'] uppercase">
              L'asso
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="text-[#4B4B4B] font-['Cambria_Math'] uppercase">
                  Profil
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[#4B4B4B] font-['Cambria_Math'] uppercase">
                  Connexion
                </Link>
                <Link href="/register" className="text-[#4B4B4B] font-['Cambria_Math'] uppercase">
                  Inscription
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
