"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/Providers"
import { supabase  } from "@/lib/supabase"
import { Plus, Edit, Trash2, Users, FileText, MessageSquare } from "lucide-react"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("articles")
  const [articles, setArticles] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Vérification des droits admin
  useEffect(() => {
    if (!loading && (!user || user.user_metadata?.role !== "admin")) {
      router.push("/")
    }
  }, [user, loading, router])

  // Chargement des données
  useEffect(() => {
    if (user && user.user_metadata?.role === "admin") {
      loadData()
    }
  }, [user, activeTab])

  const loadData = async () => {
    try {
      if (activeTab === "articles") {
        const { data } = await supabase
          .from("articles")
          .select("*")
          .order("date_publication", { ascending: false })
        setArticles(data || [])
      } else if (activeTab === "users") {
        const { data } = await supabase.from("users").select("*").order("date_inscription", { ascending: false })
        setUsers(data || [])
      } else if (activeTab === "comments") {
        const { data } = await supabase
          .from("commentaires")
          .select("*, users(pseudo), articles(titre)")
          .order("date_commentaire", { ascending: false })
        setComments(data || [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    }
  }

  const handleCreateArticle = async (formData: any) => {
    console.log("Appel handleCreateArticle avec :", formData, "userId:", user?.id)
    try {
      const { data, error } = await supabase.from("articles").insert([
        {
          titre: formData.titre,
          contenu: formData.contenu,
          theme: formData.theme,
          auteur_id: user?.id,
          image_couverture: formData.image_couverture,
        },
      ])
      console.log("Résultat insert:", { data, error })

      if (error) {
        console.error("Erreur lors de la création de l'article:", error)
        return
      }

      setShowCreateForm(false)
      loadData()
      console.log("✅ Article créé avec succès")
    } catch (error) {
      console.error("Erreur lors de la création:", error)
      console.log("problème avec les données du formulaire :", formData)
    }
  }


  const handleDeleteItem = async (id: string, table: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        const { error } = await supabase.from(table).delete().eq("id", id)

        if (!error) {
          loadData()
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  const handleUpdateArticle = async (formData: any) => {
    console.log("Appel handleUpdateArticle avec :", formData);
    if (!formData.id) {
      console.error("ID de l'article manquant dans formData");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("articles")
        .update({
          titre: formData.titre,
          contenu: formData.contenu,
          theme: formData.theme,
          image_couverture: formData.image_couverture || null,
        })
        .eq("id", formData.id)
        .select();  // <<<<-- Ici pour récupérer les données mises à jour

      console.log("Résultat update:", { data, error });

      if (error) {
        console.error("Erreur Supabase lors de la mise à jour de l'article:", error);
        return;
      }

      setEditingItem(null);
      loadData();
      console.log("✅ Article mis à jour avec succès");
    } catch (error) {
      console.error("Erreur JS dans handleUpdateArticle:", error);
      console.log("formData envoyé :", formData);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4E3AC4] mx-auto mb-4"></div>
          <p className="text-[#4B4B4B]">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user || user.user_metadata?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-[#FFFDFA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-['Cambria_Math'] text-[#4B4B4B] mb-4">Administration ORASI</h1>
          <p className="text-lg text-[#4B4B4B] font-['Work_Sans']">Gestion complète de la plateforme</p>
        </div>

        {/* Navigation des onglets */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            onClick={() => setActiveTab("articles")}
            variant={activeTab === "articles" ? "default" : "outline"}
            className={`
              rounded-none rounded-br-xl font-['Cambria_Math'] uppercase
              ${
                activeTab === "articles"
                  ? "bg-[#4E3AC4] text-white"
                  : "border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white"
              }
            `}
          >
            <FileText className="w-4 h-4 mr-2" />
            Articles
          </Button>
          <Button
            onClick={() => setActiveTab("users")}
            variant={activeTab === "users" ? "default" : "outline"}
            className={`
              rounded-none rounded-br-xl font-['Cambria_Math'] uppercase
              ${
                activeTab === "users"
                  ? "bg-[#4E3AC4] text-white"
                  : "border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white"
              }
            `}
          >
            <Users className="w-4 h-4 mr-2" />
            Utilisateurs
          </Button>
          <Button
            onClick={() => setActiveTab("comments")}
            variant={activeTab === "comments" ? "default" : "outline"}
            className={`
              rounded-none rounded-br-xl font-['Cambria_Math'] uppercase
              ${
                activeTab === "comments"
                  ? "bg-[#4E3AC4] text-white"
                  : "border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white"
              }
            `}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Commentaires
          </Button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === "articles" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-['Cambria_Math'] text-[#4B4B4B]">Gestion des Articles</h2>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvel Article
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Titre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thème
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auteur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vues
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{article.titre}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#4E3AC4] text-white">
                            {article.theme}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {article.users?.pseudo || "Inconnu"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.nb_vues}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(article.date_publication).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingItem(article)}
                              className="border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteItem(article.id, "articles")}
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Gestion des Utilisateurs</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pseudo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.pseudo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "admin" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.date_inscription).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteItem(user.id, "users")}
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            disabled={user.role === "admin"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            <h2 className="text-2xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Gestion des Commentaires</h2>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-['Cambria_Math'] text-[#4B4B4B] mb-1">
                        {comment.users?.pseudo || "Utilisateur supprimé"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Sur l'article : {comment.articles?.titre || "Article supprimé"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.date_commentaire).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteItem(comment.id, "commentaires")}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-[#4B4B4B] font-['Work_Sans']">{comment.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulaire de création d'article */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Créer un nouvel article</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleCreateArticle({
                    titre: formData.get("titre"),
                    contenu: formData.get("contenu"),
                    theme: formData.get("theme"),
                    image_couverture: formData.get("image_couverture"),
                  })
                }}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titre" className="font-['Cambria_Math'] uppercase">
                      Titre
                    </Label>
                    <Input id="titre" name="titre" required className="border-[#4E3AC4] rounded-none rounded-br-xl" />
                  </div>

                  <div>
                    <Label htmlFor="theme" className="font-['Cambria_Math'] uppercase">
                      Thème
                    </Label>
                    <Select name="theme" required>
                      <SelectTrigger className="border-[#4E3AC4] rounded-none rounded-br-xl">
                        <SelectValue placeholder="Sélectionner un thème" />
                      </SelectTrigger>
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
                    <Label htmlFor="image_couverture" className="font-['Cambria_Math'] uppercase">
                      Image de couverture (URL)
                    </Label>
                    <Input
                      id="image_couverture"
                      name="image_couverture"
                      type="url"
                      className="border-[#4E3AC4] rounded-none rounded-br-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contenu" className="font-['Cambria_Math'] uppercase">
                      Contenu
                    </Label>
                    <Textarea
                      id="contenu"
                      name="contenu"
                      required
                      rows={10}
                      className="border-[#4E3AC4] rounded-none rounded-br-xl"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Créer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Modifier l'article</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleUpdateArticle({
                    id: editingItem.id, 
                    titre: formData.get("titre"),
                    contenu: formData.get("contenu"),
                    theme: formData.get("theme"),
                    image_couverture: formData.get("image_couverture"),
                  })
                }}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titre" className="font-['Cambria_Math'] uppercase">Titre</Label>
                    <Input id="titre" name="titre" defaultValue={editingItem.titre} required className="border-[#4E3AC4] rounded-none rounded-br-xl" />
                  </div>

                  <div>
                    <Label htmlFor="theme" className="font-['Cambria_Math'] uppercase">Thème</Label>
                    <Select name="theme" defaultValue={editingItem.theme} required>
                      <SelectTrigger className="border-[#4E3AC4] rounded-none rounded-br-xl">
                        <SelectValue placeholder="Sélectionner un thème" />
                      </SelectTrigger>
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
                    <Label htmlFor="image_couverture" className="font-['Cambria_Math'] uppercase">Image de couverture (URL)</Label>
                    <Input id="image_couverture" name="image_couverture" type="url" defaultValue={editingItem.image_couverture} className="border-[#4E3AC4] rounded-none rounded-br-xl" />
                  </div>

                  <div>
                    <Label htmlFor="contenu" className="font-['Cambria_Math'] uppercase">Contenu</Label>
                    <Textarea id="contenu" name="contenu" defaultValue={editingItem.contenu} required rows={10} className="border-[#4E3AC4] rounded-none rounded-br-xl" />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingItem(null)}
                    className="border-[#4E3AC4] text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] rounded-none rounded-br-xl font-['Cambria_Math'] uppercase"
                  >
                    Mettre à jour
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
