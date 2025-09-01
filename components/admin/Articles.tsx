"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react"

// Draft.js et react-draft-wysiwyg
import dynamic from "next/dynamic"
import { EditorState, convertToRaw, convertFromRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Editor = dynamic<import("react-draft-wysiwyg").EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
)

export default function Articles() {
  const [articles, setArticles] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [sortField, setSortField] = useState<string>("date_publication")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const themeColors: Record<string, string> = {
    Culture: "bg-[#fc6cc4]",
    Sociologie: "bg-[#ff3131]",
    Géopolitique: "bg-[#f8ec24]",
    Société: "bg-[#f87c24]",
    Opinion: "bg-[#c02f2c]",
    Politique: "bg-[#70b4e4]",
  }

  const loadArticles = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order(sortField, { ascending: sortOrder === "asc" })
    setArticles(data || [])
  }

  useEffect(() => { loadArticles() }, [sortField, sortOrder])

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cet article ?")) {
      await supabase.from("articles").delete().eq("id", id)
      loadArticles()
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleSubmit = async (formData: any) => {
    const payload = {
      ...formData,
      date_publication: formData.date_publication ? new Date(formData.date_publication) : new Date(),
    }

    try {
      if (editing) {
        await supabase.from("articles").update(payload).eq("id", editing.id)
      } else {
        await supabase.from("articles").insert([payload])
      }
      setShowForm(false)
      setEditing(null)
      loadArticles()
    } catch (error) {
      console.error("Erreur création/modification article:", error)
    }
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 opacity-40" />
    return sortOrder === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 md:mb-0">Gestion des Articles</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#4E3AC4] text-white rounded-2xl px-4 py-2 shadow hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" /> Nouvel Article
        </Button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-2xl border border-gray-200">
        <table className="w-full min-w-[600px] table-auto">
          <thead className="bg-gray-50">
            <tr>
              {["titre", "theme", "auteur", "date_publication"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort(col)}
                >
                  <div className="flex items-center gap-1">
                    {col === "titre" ? "Titre" : col === "theme" ? "Thème" : col === "auteur" ? "Auteur" : "Date"}
                    <SortIcon field={col} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{a.titre}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full text-white ${themeColors[a.theme] || "bg-gray-300"}`}>
                    {a.theme}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{a.auteur}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(a.date_publication).toLocaleDateString("fr-FR")}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditing(a); setShowForm(true) }}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(a.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ArticleForm
          initialData={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

function ArticleForm({ initialData, onClose, onSubmit }: any) {
  const [titre, setTitre] = useState(initialData?.titre || "")
  const [theme, setTheme] = useState(initialData?.theme || "")
  const [auteur, setAuteur] = useState(initialData?.auteur || "")
  const [subsection, setSubsection] = useState(initialData?.subsection || "")
  const [image_couverture, setImageCouverture] = useState(initialData?.image_couverture || "")
  const [date_publication, setDatePublication] = useState(initialData?.date_publication?.split("T")[0] || "")

  // Contenu avec draft-js
  const [contenu, setContenu] = useState<EditorState>(
    initialData?.contenu
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(initialData.contenu)))
      : EditorState.createEmpty()
  )

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const rawContent = JSON.stringify(convertToRaw(contenu.getCurrentContent()))
    onSubmit({ titre, theme, auteur, subsection, contenu: rawContent, image_couverture, date_publication })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <h3 className="text-2xl font-bold mb-6">{initialData ? "Modifier" : "Créer"} un article</h3>
        <form onSubmit={handleSubmitForm} className="space-y-5">
          <div>
            <Label>Titre</Label>
            <Input value={titre} onChange={(e) => setTitre(e.target.value)} required className="border-gray-300 rounded-xl" />
          </div>

          <div>
            <Label>Image de couverture (URL)</Label>
            <Input value={image_couverture} onChange={(e) => setImageCouverture(e.target.value)} className="border-gray-300 rounded-xl" />
          </div>

          <div>
            <Label>Thème</Label>
            <Select value={theme} onValueChange={setTheme} required>
              <SelectTrigger className="border-gray-300 rounded-xl"><SelectValue placeholder="Sélectionner un thème" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Géopolitique">Géopolitique</SelectItem>
                <SelectItem value="Culture">Culture</SelectItem>
                <SelectItem value="Politique">Politique</SelectItem>
                <SelectItem value="Société">Société</SelectItem>
                <SelectItem value="Opinion">Opinion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Subsection</Label>
            <Input value={subsection} onChange={(e) => setSubsection(e.target.value)} className="border-gray-300 rounded-xl" />
          </div>

          <div>
            <Label>Contenu</Label>
            <Editor
              editorState={contenu}
              onEditorStateChange={setContenu}
              toolbar={{
                options: ["inline","blockType","fontSize","list","textAlign","link","history","image","colorPicker"]
              }}
              wrapperClassName="border rounded-xl"
              editorClassName="min-h-[200px] p-2"
            />
          </div>

          <div>
            <Label>Auteur</Label>
            <Input value={auteur} onChange={(e) => setAuteur(e.target.value)} required className="border-gray-300 rounded-xl" />
          </div>

          <div>
            <Label>Date de publication</Label>
            <Input type="date" value={date_publication} onChange={(e) => setDatePublication(e.target.value)} className="border-gray-300 rounded-xl" />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit" className="bg-[#4E3AC4] text-white rounded-xl px-5 py-2 shadow hover:shadow-lg transition">
              {initialData ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
