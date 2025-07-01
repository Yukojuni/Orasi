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
      const { error } = await signUp(formData.email, formData.password, formData.pseudo, formData.phone)
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
    <div className="min-h-screen bg-[#FFFDFA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[700px]">
          {/* Image décorative */}
          <div className="hidden lg:block">
            <div className="w-full h-[600px] bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
              <span className="text-lg">Image d'inscription</span>
            </div>
          </div>

          {/* Formulaire d'inscription */}
          <div className="max-w-md mx-auto w-full">
            <Link href="/" className="text-sm text-[#4B4B4B] hover:underline mb-6 block font-['Work_Sans'] uppercase">
              ← Retourner sur le site
            </Link>

            <h1 className="text-5xl font-['Cambria_Math'] text-black mb-8">Bonjour !</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

              <div>
                <Label htmlFor="email" className="block text-[#4B4B4B] font-['Cambria_Math'] uppercase mb-2">
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
                  className="border-[#4E3AC4] rounded-none rounded-br-xl font-['Cambria_Math']"
                />
              </div>

              <div>
                <Label htmlFor="pseudo" className="block text-[#4B4B4B] font-['Cambria_Math'] uppercase mb-2">
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
                  className="border-[#4E3AC4] rounded-none rounded-br-xl font-['Cambria_Math']"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="block text-[#4B4B4B] font-['Cambria_Math'] uppercase mb-2">
                  Numéro
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ton numéro"
                  className="border-[#4E3AC4] rounded-none rounded-br-xl font-['Cambria_Math']"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-[#4B4B4B] font-['Cambria_Math'] uppercase mb-2">
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
                  className="border-[#4E3AC4] rounded-none rounded-br-xl font-['Cambria_Math']"
                />
              </div>

              <div className="text-right">
                <Link href="/login" className="text-sm text-[#4B4B4B] hover:underline font-['Work_Sans'] uppercase">
                  Déjà un compte ?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase py-3"
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
