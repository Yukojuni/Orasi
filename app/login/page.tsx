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
    <div className="min-h-screen bg-[#FFFDFA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
          {/* Image décorative */}
          <div className="hidden lg:block">
            <div className="w-full h-[500px] bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
              <span className="text-lg">Image de connexion</span>
            </div>
          </div>

          {/* Formulaire de connexion */}
          <div className="max-w-md mx-auto w-full">
            <Link href="/" className="text-sm text-[#4B4B4B] hover:underline mb-6 block font-['Work_Sans'] uppercase">
              ← Retourner sur le site
            </Link>

            <h1 className="text-5xl font-['Cambria_Math'] text-black mb-8">Bonjour !</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

              <div>
                <Label htmlFor="email" className="block text-[#4B4B4B] font-['Cambria_Math'] uppercase mb-2">
                  Identifiant
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ton email"
                  required
                  className="border-[#4E3AC4] rounded-none rounded-br-xl font-['Cambria_Math']"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-[#4B4B4B] font-['Cambria_Math'] uppercase mb-2">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ton mot de passe"
                  required
                  className="border-[#4E3AC4] rounded-none rounded-br-xl font-['Cambria_Math']"
                />
              </div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#4B4B4B] hover:underline font-['Work_Sans'] uppercase"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase py-3"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>

              <div className="text-center">
                <span className="text-sm text-[#4B4B4B] font-['Work_Sans']">
                  Pas encore de compte ?{" "}
                  <Link href="/register" className="text-[#4E3AC4] hover:underline uppercase">
                    S'inscrire
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
