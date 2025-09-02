"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      setMessage("Erreur : " + error.message)
    } else {
      setMessage("Un email de réinitialisation a été envoyé ✅")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center">Mot de passe oublié</h1>
          <Input
            placeholder="Votre email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-full bg-[#4E3AC4] text-white" onClick={handleReset}>
            Envoyer le lien
          </Button>
          {message && <p className="text-sm text-gray-600 text-center">{message}</p>}
        </div>
      </div>

      <Footer />
    </div>
  )
}
