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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    pseudo: "",
    phone: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { signUp } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.pseudo,
        formData.phone
      )
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
            Crée ton compte ✨
          </h1>
          <p className="text-gray-600 mb-8">
            Rejoins-nous et accède à ton espace personnel
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="block text-gray-700 uppercase mb-2 text-sm"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ton email"
                required
                className="border-[#4E3AC4] rounded-xl focus:ring-2 focus:ring-[#4E3AC4] transition"
              />
            </div>

            {/* Pseudo */}
            <div>
              <Label
                htmlFor="pseudo"
                className="block text-gray-700 uppercase mb-2 text-sm"
              >
                Pseudo
              </Label>
              <Input
                id="pseudo"
                name="pseudo"
                type="text"
                value={formData.pseudo}
                onChange={handleChange}
                placeholder="Ton pseudo"
                required
                className="border-[#4E3AC4] rounded-xl focus:ring-2 focus:ring-[#4E3AC4] transition"
              />
            </div>

            {/* Numéro */}
            <div>
              <Label
                htmlFor="phone"
                className="block text-gray-700 uppercase mb-2 text-sm"
              >
                Numéro
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ton numéro"
                className="border-[#4E3AC4] rounded-xl focus:ring-2 focus:ring-[#4E3AC4] transition"
              />
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="block text-gray-700 uppercase mb-2 text-sm"
              >
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ton mot de passe"
                required
                className="border-[#4E3AC4] rounded-xl focus:ring-2 focus:ring-[#4E3AC4] transition"
              />
            </div>

            {/* Déjà un compte */}
            <div className="text-right">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-[#4E3AC4] transition uppercase"
              >
                Déjà un compte ?
              </Link>
            </div>

            {/* Bouton inscription */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-xl uppercase py-3 shadow-md hover:shadow-lg transition"
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
