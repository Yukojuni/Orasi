"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  async function handleUpdate() {
    if (password !== confirm) {
      setMessage("Les mots de passe ne correspondent pas ❌")
      return
    }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setMessage("Erreur : " + error.message)
    } else {
      setMessage("Mot de passe mis à jour ✅")
      setTimeout(() => router.push("/login"), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center">Nouveau mot de passe</h1>
          <Input
            placeholder="Nouveau mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirmer le mot de passe"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button className="w-full bg-[#4E3AC4] text-white" onClick={handleUpdate}>
            Réinitialiser
          </Button>
          {message && <p className="text-sm text-gray-600 text-center">{message}</p>}
        </div>
      </div>

      <Footer />
    </div>
  )
}
