"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const loadData = async () => {
    const { data } = await supabase.from("videos").select("*").order("date", { ascending: false })
    setVideos(data || [])
  }

  useEffect(() => { loadData() }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cette vidéo ?")) {
      await supabase.from("videos").delete().eq("id", id)
      loadData()
    }
  }

  const handleSubmit = async (formData: any) => {
    if (editing) {
      await supabase.from("videos").update(formData).eq("id", editing.id)
    } else {
      await supabase.from("videos").insert([formData])
    }
    setShowForm(false)
    setEditing(null)
    loadData()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-['Cambria_Math'] text-[#4B4B4B]">Gestion des Vidéos</h2>
        <Button onClick={() => setShowForm(true)} className="bg-[#4E3AC4] text-white rounded-none rounded-br-xl">
          <Plus className="w-4 h-4 mr-2"/> Nouvelle Vidéo
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YouTube ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map(v => (
                <tr key={v.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{v.titre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{v.youtube_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{v.date ? new Date(v.date).toLocaleDateString("fr-FR") : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => { setEditing(v); setShowForm(true) }}>
                      <Edit className="w-4 h-4"/>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(v.id)} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      <Trash2 className="w-4 h-4"/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <VideoForm
          initialData={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

function VideoForm({ initialData, onClose, onSubmit }: any) {
  const [titre, setTitre] = useState(initialData?.titre || "")
  const [youtube_id, setYoutubeId] = useState(initialData?.youtube_id || "")
  const [date, setDate] = useState(initialData?.date?.split("T")[0] || "")

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-['Cambria_Math'] mb-6">{initialData ? "Modifier" : "Créer"} une vidéo</h3>
        <form onSubmit={e => { e.preventDefault(); onSubmit({ titre, youtube_id, date }) }}>
          <div className="space-y-4">
            <input placeholder="Titre" value={titre} onChange={e => setTitre(e.target.value)} className="w-full border rounded px-2 py-1"/>
            <input placeholder="YouTube ID" value={youtube_id} onChange={e => setYoutubeId(e.target.value)} className="w-full border rounded px-2 py-1"/>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border rounded px-2 py-1"/>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit" className="bg-[#4E3AC4] text-white">{initialData ? "Modifier" : "Créer"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
