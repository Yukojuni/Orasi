"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Trash2 } from "lucide-react"

export default function Comments() {
  const [comments, setComments] = useState<any[]>([])

  const loadComments = async () => {
    const { data } = await supabase
      .from("commentaires")
      .select("*, users(pseudo), articles(titre)")
      .order("date_commentaire", { ascending: false })
    setComments(data || [])
  }

  useEffect(() => { loadComments() }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer ce commentaire ?")) {
      await supabase.from("commentaires").delete().eq("id", id)
      loadComments()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Gestion des Commentaires</h2>
      <div className="space-y-4">
        {comments.map(c => (
          <div key={c.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-['Cambria_Math'] text-[#4B4B4B] mb-1">{c.users?.pseudo || "Utilisateur supprimé"}</h3>
                <p className="text-xs text-gray-400">{new Date(c.date_commentaire).toLocaleDateString("fr-FR")}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDelete(c.id)} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
            <p className="text-[#4B4B4B] font-['Work_Sans']">{c.contenu}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
