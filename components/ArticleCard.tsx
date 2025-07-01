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

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const getThemeColor = (theme: string) => {
    const colors = {
      Géopolitique: "bg-[#4E3AC4]",
      Culture: "bg-[#5DC2A3]",
      Politique: "bg-[#F9B626]",
      Société: "bg-[#A8C6FF]",
      Opinion: "bg-[#4B4B4B]",
    }
    return colors[theme as keyof typeof colors] || "bg-[#4B4B4B]"
  }

  return (
    <Link href={`/articles/${article.id}`}>
      <div
        className={`
        relative overflow-hidden rounded-tl-xl rounded-br-xl shadow-lg hover:shadow-xl transition-shadow
        ${featured ? "h-[486px]" : "h-[406px]"} w-full
        ${featured ? "bg-gradient-to-br from-[#4E3AC4] to-black/75" : "bg-white"}
      `}
      >
        {/* Image de couverture */}
        {article.image_couverture && !featured && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image_couverture})` }}
          />
        )}

        {/* Contenu */}
        <div
          className={`
          absolute bottom-0 left-0 right-0 p-6
          ${featured ? "text-white" : "bg-white"}
        `}
        >
          {/* Tag thème */}
          <div
            className={`
            inline-block px-4 py-2 rounded-t-lg text-white text-sm font-['Cambria_Math'] uppercase
            ${getThemeColor(article.theme)}
          `}
          >
            {article.theme}
          </div>

          {/* Titre */}
          <h3
            className={`
            text-xl font-['Cambria_Math'] mb-2 line-clamp-3
            ${featured ? "text-white" : "text-[#4B4B4B]"}
          `}
          >
            {article.titre}
          </h3>

          {/* Description */}
          <p
            className={`
            text-sm mb-4 line-clamp-2
            ${featured ? "text-white/90" : "text-[#4B4B4B]"}
          `}
          >
            {article.contenu.substring(0, 120)}...
          </p>

          {/* Métadonnées */}
          <div
            className={`
            flex items-center justify-between text-xs
            ${featured ? "text-white/80" : "text-[#4B4B4B]/70"}
          `}
          >
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <User size={12} />
                <span className="font-['Cambria_Math'] uppercase">{article.auteur}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{new Date(article.date_publication).toLocaleDateString("fr-FR")}</span>
              </span>
            </div>
            <span className="flex items-center space-x-1">
              <Eye size={12} />
              <span>{article.nb_vues}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
