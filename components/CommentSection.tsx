"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/Providers"
import { supabase } from "@/lib/supabase"  // <- import unique supabase client
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react"

interface Comment {
  id: string
  contenu: string
  date_commentaire: string
  auteur_id: {
    pseudo: string
    avatar_url?: string
  }[]
  likes: number
  dislikes: number
  userReaction?: "like" | "dislike" | null
}

export default function CommentSection({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [orderAsc, setOrderAsc] = useState(false)
  const [visibleCount, setVisibleCount] = useState(5)
  const { user } = useAuth()

  const fetchComments = async () => {
    setLoading(true)

    const { data: commentsData, error } = await supabase
      .from("commentaires")
      .select(`id, contenu, date_commentaire, auteur_id (pseudo, avatar_url)`) 
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
      <br/>
      <hr className="border-[#4B4B4B] w-full mb-4" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] font-['Cambria_Math'] text-black">
          Commentaires ({comments.length})
        </h2>
        <span
          onClick={() => setOrderAsc(!orderAsc)}
          className="text-sm text-gray-700 cursor-pointer flex items-center space-x-1 font-['Cambria_Math']"
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
          <Button onClick={handleSubmit} className="bg-[#4E3AC4] text-white rounded-none rounded-tl-xl rounded-br-xl font-['Cambria_Math'] uppercase">
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
          {comments.slice(0, visibleCount).map((c) => (
            <li key={c.id} className="border border-gray-200 rounded-xl px-6 py-4 bg-white shadow-sm">
              <div className="flex items-center space-x-4 mb-2">
                {c.auteur_id.avatar_url && (
                  <img src={c.auteur_id[0].avatar_url} alt={c.auteur_id.pseudo} className="w-8 h-8 rounded-full object-cover" />
                )}
                <span className="text-sm font-semibold">{c.auteur_id.pseudo || "Anonyme"}</span>
                <span className="text-xs text-gray-500">{new Date(c.date_commentaire).toLocaleDateString("fr-FR", {
                  day: "numeric", month: "long", year: "numeric"
                })}</span>
              </div>
              <p className="text-gray-800 whitespace-pre-line mb-2">{c.contenu}</p>
              <div className="flex space-x-4 text-sm text-gray-600">
                <button
                  className={`flex items-center space-x-1 ${c.userReaction === "like" ? "text-blue-600" : ""}`}
                  onClick={() => handleReaction(c.id, "like")}
                >
                  <ThumbsUp size={16} /> <span>{c.likes}</span>
                </button>
                <button
                  className={`flex items-center space-x-1 ${c.userReaction === "dislike" ? "text-red-600" : ""}`}
                  onClick={() => handleReaction(c.id, "dislike")}
                >
                  <ThumbsDown size={16} /> <span>{c.dislikes}</span>
                </button>
              </div>
            </li>
          ))}
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