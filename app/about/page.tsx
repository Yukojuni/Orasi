"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />

      {/* Hero Rejoignez-nous */}
      <section className="bg-[#4E3AC4] text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Rejoignez-nous</h2>
          <p className="text-lg mb-8 leading-relaxed opacity-90">
            Vous souhaitez écrire un article ?<br />
            Vous en avez déjà un de prêt, n’hésitez pas à l’envoyer à <a href="mailto:orasi.contact@gmail.com" className="underline">orasi.contact@gmail.com</a>.<br />
            Toute demande de renseignement ? Envoyez-nous un message sur Instagram : <a href="https://instagram.com/orasi.france" target="_blank" className="underline">orasi.france</a>
          </p>
          <Link href="https://www.helloasso.com/associations/orasi/adhesions/formulaire-d-adhesion-en-tant-que-membre-actif-orasi-8">
            <Button className="rounded-xl bg-white text-[#4E3AC4] hover:bg-[#e6e6ff] hover:text-[#3d2ea3] font-bold px-8 py-3 transition-all">
              Adhérer à ORASI
            </Button>
          </Link>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-16">

          <div>
            <h1 className="text-5xl font-bold text-[#4B4B4B] mb-8 text-center">À propos d'ORASI</h1>
          </div>

          <div className="space-y-12">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <h2 className="text-3xl font-bold text-[#4E3AC4] mb-4">Notre Mission</h2>
              <p className="text-lg text-[#4B4B4B] leading-relaxed mb-4">
                Des étudiants passionnés par les grandes questions contemporaines et par tous les sujets inter-temporels dont la complexité intensifie l'envie d'en apprendre plus.
              </p>
              <p className="text-lg text-[#4B4B4B] leading-relaxed">
                Orasi, du grec όραση, se traduit par "vision" : notre vision du monde, des phénomènes et de ce que certaines choses devraient être.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <h2 className="text-3xl font-bold text-[#4E3AC4] mb-4">Notre Vision</h2>
              <p className="text-lg text-[#4B4B4B] leading-relaxed mb-4">
                Orasi s'inscrit dans une volonté croissante des jeunes de partager leurs opinions sur des sujets vastes et complexes. 
              </p>
              <p className="text-lg text-[#4B4B4B] leading-relaxed">
                Dans une société qui nous offre la possibilité de débattre et de s'informer, Orasi prend position et défend des idéaux forts et ambitieux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-[#4B4B4B] text-center mb-12">Nos Valeurs</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Curiosité Intellectuelle", text: "Nous encourageons la soif d'apprendre et la remise en question constructive." },
              { title: "Débat Respectueux", text: "Nous privilégions l'échange d'idées dans le respect mutuel et la bienveillance." },
              { title: "Engagement Citoyen", text: "Nous croyons en l'importance de s'impliquer dans les enjeux de société." },
              { title: "Diversité des Perspectives", text: "Nous valorisons la richesse des points de vue et des expériences diverses." },
            ].map((valeur) => (
              <div key={valeur.title} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow">
                <h3 className="text-xl font-bold text-[#4E3AC4] mb-2">{valeur.title}</h3>
                <p className="text-[#4B4B4B]">{valeur.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
