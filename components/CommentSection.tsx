"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/Providers"
import { supabase } from "@/lib/supabase"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User, ThumbsUp, ThumbsDown, ChevronDown, MoreVertical } from "lucide-react"

interface Comment {
  id: string
  contenu: string
  date_commentaire: string
  auteur_id: {
    pseudo: string
    avatar_url?: string
    id: string
  }[]
  likes: number
  dislikes: number
  userReaction?: "like" | "dislike" | null
}

export default function CommentSection({articleId, filterByUser = false,}: {articleId?: string
                                                                            filterByUser?: boolean}) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [orderAsc, setOrderAsc] = useState(false)
  const [visibleCount, setVisibleCount] = useState(5)
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null)

  const { user } = useAuth()

  const toggleDropdown = (id: string) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id)
  }

  const isUserOwner = (auteurId: string) => {
    return user && user.id === auteurId
  }

  const handleDeleteComment = async (commentId: string) => {
    const { error } = await supabase
      .from("commentaires")
      .delete()
      .eq("id", commentId)

    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== commentId))
      setDropdownOpenId(null)
    }
  }

  const fetchComments = async () => {
    setLoading(true)

    const { data: commentsData, error } = await supabase
      .from("commentaires")
      .select(`id, contenu, date_commentaire, auteur_id (pseudo, avatar_url, id)`)
      .eq("article_id", articleId)
      .order("date_commentaire", { ascending: orderAsc })

    if (!commentsData || error) return setLoading(false)

    const ids = commentsData.map(c => c.id)
    const { data: reactionsData } = await supabase
      .from("commentaire_reactions")
      .select("commentaire_id, type")
      .in("commentaire_id", ids)

    const { data: userReactions } = user ? await supabase
      .from("commentaire_reactions")
      .select("commentaire_id, type")
      .eq("utilisateur_id", user.id) : { data: [] }

    const enriched = commentsData.map(c => {
      const likes = reactionsData?.filter(r => r.commentaire_id === c.id && r.type === "like").length || 0
      const dislikes = reactionsData?.filter(r => r.commentaire_id === c.id && r.type === "dislike").length || 0
      const userReaction = userReactions?.find(r => r.commentaire_id === c.id)?.type || null
      return { ...c, likes, dislikes, userReaction }
    })

    setComments(enriched)
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!newComment.trim() || !user) return

    const { error } = await supabase.from("commentaires").insert({
      contenu: newComment,
      article_id: articleId,
      auteur_id: user.id,
    })

    if (!error) {
      setNewComment("")
      fetchComments()
    }
  }

  const handleReaction = async (commentId: string, type: "like" | "dislike") => {
    if (!user) return alert("Connectez-vous pour réagir.")

    await supabase.rpc("toggle_comment_reaction", {
      target_comment_id: commentId,
      reaction_type: type
    })

    setComments(prev =>
      prev.map(c => {
        if (c.id !== commentId) return c

        let likes = c.likes
        let dislikes = c.dislikes
        let newReaction: "like" | "dislike" | null = type

        if (c.userReaction === type) {
          newReaction = null
          if (type === "like") likes--
          else dislikes--
        } else {
          if (type === "like") {
            likes++
            if (c.userReaction === "dislike") dislikes--
          } else {
            dislikes++
            if (c.userReaction === "like") likes--
          }
        }

        return { ...c, likes, dislikes, userReaction: newReaction }
      })
    )
  }

  useEffect(() => {
    fetchComments()
  }, [articleId, orderAsc])

  return (
    <section className="h-auto">
      <br />
      <hr className="border-[#4B4B4B] w-full mb-4" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] text-black">
          Commentaires ({comments.length})
        </h2>
        <span
          onClick={() => setOrderAsc(!orderAsc)}
          className="text-sm text-gray-700 cursor-pointer flex items-center space-x-1"
        >
          <span>{orderAsc ? "Ancien" : "Récent"}</span>
          <ChevronDown size={16} className={`transition-transform duration-200 ${orderAsc ? "rotate-180" : "rotate-0"}`} />
        </span>
      </div>

      {user ? (
        <div className="mb-6">
          <Textarea
            placeholder="Écrivez votre commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full h-[100px] mb-2"
          />
          <Button onClick={handleSubmit} className="bg-[#4E3AC4] text-white rounded-xl uppercase">
            Publier
          </Button>
        </div>
      ) : (
        <p className="text-sm text-gray-600 mb-6">Connectez-vous pour publier un commentaire.</p>
      )}

      {loading ? (
        <p>Chargement des commentaires...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">Aucun commentaire pour l'instant.</p>
      ) : (
        <ul className="space-y-6">
          {comments.slice(0, visibleCount).map((c) => {
            const auteur = c.auteur_id
            return (
              <li key={c.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4 relative">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg text-[#4B4B4B]">{auteur?.pseudo || "Anonyme"}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(c.date_commentaire).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="text-[#4B4B4B] mb-4 whitespace-pre-line">{c.contenu}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <button
                        className={`flex items-center gap-1 ${c.userReaction === "like" ? "text-blue-600" : ""}`}
                        onClick={() => handleReaction(c.id, "like")}
                      >
                        <ThumbsUp size={12} /> <span>{c.likes}</span>
                      </button>

                      <button
                        className={`flex items-center gap-1 ${c.userReaction === "dislike" ? "text-red-600" : ""}`}
                        onClick={() => handleReaction(c.id, "dislike")}
                      >
                        <ThumbsDown size={12} /> <span>{c.dislikes}</span>
                      </button>

                    </div>
                  </div>

                  {/* Menu ... */}
                  {user && auteur?.id === user.id && (
                    <div className="relative">
                      <button onClick={() => toggleDropdown(c.id)}>
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>

                      {dropdownOpenId === c.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                          > 
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {!loading && visibleCount < comments.length && (
        <div className="mt-4 text-center">
          <Button onClick={() => setVisibleCount(visibleCount + 5)} variant="outline">
            Voir plus
          </Button>
        </div>
      )}
    </section>
  )
}
