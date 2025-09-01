"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/Providers"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      } else {
        router.push("/profile")
      }
    } catch (err) {
      setError("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDFA] via-[#f5f3ff] to-[#e0e7ff] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:underline mb-6 block uppercase"
          >
            ← Retourner sur le site
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Bienvenue 👋
          </h1>
          <p className="text-gray-600 mb-8">
            Connecte-toi pour accéder à ton espace personnel
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-gray-700 uppercase mb-2 text-sm">
                Identifiant
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ton email"
                required
                className="border-[#4E3AC4] rounded-xl focus:ring-2 focus:ring-[#4E3AC4] transition"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-gray-700 uppercase mb-2 text-sm">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ton mot de passe"
                required
                className="border-[#4E3AC4] rounded-xl focus:ring-2 focus:ring-[#4E3AC4] transition"
              />
            </div>

            {/* Mot de passe oublié */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-[#4E3AC4] transition uppercase"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton connexion */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-xl uppercase py-3 shadow-md hover:shadow-lg transition"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>

            {/* Lien inscription */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-[#4E3AC4] hover:underline uppercase font-semibold"
                >
                  S'inscrire
                </Link>
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
