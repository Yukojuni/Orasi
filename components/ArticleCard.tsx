import Link from "next/link"
import { Calendar, User, Eye } from "lucide-react"

interface Article {
  id: string
  titre: string
  contenu: string
  theme: string
  auteur: string
  date_publication: string
  nb_vues: number
  image_couverture?: string
}

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

// 🔑 Fonction utilitaire pour extraire un résumé propre
function getExcerpt(contenu: string, maxLength = 120): string {
  try {
    // 👉 Essayer de parser comme Draft.js JSON
    const raw = JSON.parse(contenu)
    if (raw.blocks && Array.isArray(raw.blocks)) {
      const text = raw.blocks.map((block: any) => block.text).join(" ")
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
    }
    return contenu.substring(0, maxLength) + "..."
  } catch (e) {
    // 👉 Si ce n’est PAS du JSON → texte brut
    return contenu.length > maxLength ? contenu.substring(0, maxLength) + "..." : contenu
  }
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const getThemeColor = (theme: string) => {
    const colors = {
      Culture: "bg-[#fc6cc4]",
      Sociologie: "bg-[#ff3131]",
      Géopolitique: "bg-[#f8ec24]",
      Société: "bg-[#f87c24]",
      Opinion: "bg-[#c02f2c]",
      Politique: "bg-[#70b4e4]",
    }
    return colors[theme as keyof typeof colors] || "bg-[#4B4B4B]"
  }

  return (
    <Link href={`/articles/${article.id}`}>
      <div
        className={`
          relative overflow-hidden rounded-2xl shadow-lg
          border border-gray-200 bg-white
          transition-transform duration-300 ease-out
          hover:scale-[1.03] hover:rotate-[1deg] hover:shadow-2xl
          ${featured ? "h-[486px]" : "h-[406px]"} w-full
        `}
      >
        {/* Image de couverture */}
        <div className="relative h-1/2 w-full overflow-hidden">
          <img
            src={article.image_couverture || "/default-article.jpg"}
            alt={article.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div
            className={`
              absolute bottom-2 left-2 px-3 py-1 rounded-lg text-white text-xs uppercase shadow-md
              ${getThemeColor(article.theme)}
            `}
          >
            {article.theme}
          </div>
        </div>

        {/* Contenu Texte */}
        <div className="p-4 flex flex-col justify-between h-1/2">
          {/* Titre */}
          <h3
            className={`font-bold leading-tight mb-2 line-clamp-2 ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {article.titre}
          </h3>

          {/* Extrait */}
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            {getExcerpt(article.contenu, 120)}
          </p>

          {/* Métadonnées */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <User size={14} />
              {article.auteur}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
