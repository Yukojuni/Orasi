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
        relative overflow-hidden rounded-tl-xl rounded-br-xl shadow-lg hover:shadow-xl transition-shadow
        ${featured ? "h-[486px]" : "h-[406px]"} w-full
        ${featured ? "bg-gradient-to-br from-[#4E3AC4] to-black/75" : "bg-white"}
      `}
      >
        {/* Image de couverture ou dégradé par défaut */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: article.image_couverture && !featured
              ? `url(${article.image_couverture})`
              : `linear-gradient(135deg, #4E3AC4, #251C5E)`
          }}
        />
        {/* Contenu */}
        <div
          className={`
          absolute bottom-0 left-0 right-0 p-6
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
            inline-block px-4 py-2 rounded-tr-lg text-[#4B4B4B] text-sm font-['Cambria_Math'] bg-white
            ${featured ? "text-white" : "text-[#4B4B4B]"}
          `}
          >
            {article.titre}
          </h3>

          {/* Description */}
          <p
            className={`
            inline-block px-4 py-2 rounded-r-lg text-[#4B4B4B] text-sm font-['Cambria_Math'] bg-white
            ${featured ? "text-white/90" : "text-[#4B4B4B]"}
          `}
          >
            {article.contenu.substring(0, 120)}...
          </p>

          {/* Métadonnées */}
          <div
            className={`
            inline-block px-4 py-2 rounded-b-lg text-[#4B4B4B] text-sm font-['Cambria_Math'] bg-white
            ${featured ? "text-white/80" : "text-[#4B4B4B]/70"}
          `}
          >
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <User size={12} />
                <span className="font-['Cambria_Math'] uppercase">{article.auteur}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
