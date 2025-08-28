import Link from "next/link"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Evenement {
  id: string
  titre: string
  description?: string
  date: string
  lien_image?: string
}

interface EvenementCardProps {
  evenement: Evenement
  featured?: boolean
}

export default function EvenementCard({ evenement, featured = false }: EvenementCardProps) {
  return (
    <Link href={`/events/${evenement.id}`} className="block">
      <div
        className={`
          relative flex flex-col rounded-2xl overflow-hidden shadow-lg
          border border-gray-200 bg-white
          transition-transform duration-300 ease-out
          hover:scale-[1.03] hover:rotate-[1deg] hover:shadow-2xl
          ${featured ? "max-w-md" : "max-w-sm"}
        `}
      >
        {/* Image en haut */}
        <div className={`relative w-full ${featured ? "h-60" : "h-40"} overflow-hidden`}>
          <img
            src={evenement.lien_image || "/default-event.jpg"}
            alt={evenement.titre}
            className="w-full h-full object-cover"
          />
          {/* Overlay dégradé pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Contenu texte */}
        <div className="p-4 flex flex-col justify-between flex-1">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar size={16} className="text-[#4E3AC4]" />
            <span>
              {format(new Date(evenement.date), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>

          {/* Titre */}
          <h3
            className={`font-bold text-gray-800 leading-snug mb-2 ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {evenement.titre}
          </h3>

          {/* Description */}
          {featured && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {evenement.description?.substring(0, 120)}...
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
