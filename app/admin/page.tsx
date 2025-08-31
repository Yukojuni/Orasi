"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { FileText, Users, MessageSquare, Calendar, Video } from "lucide-react"

import Articles from "@/components/admin/Articles"
import UsersPage from "@/components/admin/Users"
import Comments from "@/components/admin/Comments"
import Evenements from "@/components/admin/Events"
import VideosPage from "@/components/admin/Videos"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("articles")

  const renderTab = () => {
    switch (activeTab) {
      case "articles":
        return <Articles />
      case "users":
        return <UsersPage />
      case "comments":
        return <Comments />
      case "evenements":
        return <Evenements />
      case "videos":
        return <VideosPage />
      default:
        return <Articles />
    }
  }

  const tabs = [
    { id: "articles", label: "Articles", icon: <FileText className="w-5 h-5 mr-2" /> },
    { id: "users", label: "Utilisateurs", icon: <Users className="w-5 h-5 mr-2" /> },
    { id: "comments", label: "Commentaires", icon: <MessageSquare className="w-5 h-5 mr-2" /> },
    { id: "evenements", label: "Événements", icon: <Calendar className="w-5 h-5 mr-2" /> },
    { id: "videos", label: "Vidéos", icon: <Video className="w-5 h-5 mr-2" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-10">
        {/* Titre */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Administration ORASI</h1>
          <p className="text-gray-600 text-lg md:text-xl">Gestion complète de la plateforme</p>
        </div>

        {/* Navigation des onglets */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`
                flex items-center px-5 py-3 rounded-2xl font-semibold uppercase transition-all
                shadow-sm hover:shadow-md
                ${activeTab === tab.id
                  ? "bg-[#4E3AC4] text-white shadow-lg"
                  : "border border-gray-300 text-gray-700 hover:bg-[#4E3AC4] hover:text-white"
                }
              `}
            >
              {tab.icon} {tab.label}
            </Button>
          ))}
        </div>

        {/* Contenu actif */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 min-h-[60vh] transition-all">
          {renderTab()}
        </div>
      </div>
    </div>
  )
}
