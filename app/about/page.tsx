import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-['Cambria_Math'] text-[#4B4B4B] mb-8 text-center">À propos d'ORASI</h1>

          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <h2 className="text-3xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Notre Mission</h2>
              <p className="text-lg text-[#4B4B4B] font-['Work_Sans'] leading-relaxed mb-6">
                Des étudiants passionnés par les grandes questions contemporaines de ce siècle et par tous les sujets
                inter-temporels dont la complexité intensifie l'envie d'en apprendre plus.
              </p>
              <p className="text-lg text-[#4B4B4B] font-['Work_Sans'] leading-relaxed mb-6">
                Orasi, du grec όραση se traduit en français par "vision", notre vision du monde, des phénomènes voire de
                ce que devraient être certaines choses.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Notre Vision</h2>
              <p className="text-lg text-[#4B4B4B] font-['Work_Sans'] leading-relaxed mb-6">
                Orasi s'inscrit dans une volonté croissante des jeunes de partager leurs opinions sur des sujets vastes
                et complexes, dont la maîtrise requiert parfois de longues études. Pour autant devant une connaissance
                parfois incomplète, se dresse une ambition d'exprimer des idées, des opinions et surtout des valeurs.
              </p>
              <p className="text-lg text-[#4B4B4B] font-['Work_Sans'] leading-relaxed mb-6">
                Dans une société qui nous offre la possibilité de débattre et de s'informer, Orasi prend position et
                défend des idéaux forts et ambitieux. Retrouvez ici un mélange de sujets d'actualités ou d'analyse de
                questions fondamentales, pour découvrir notre orasi du monde.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-['Cambria_Math'] text-[#4B4B4B] mb-6">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-['Cambria_Math'] text-[#4E3AC4] mb-3">Curiosité Intellectuelle</h3>
                  <p className="text-[#4B4B4B] font-['Work_Sans']">
                    Nous encourageons la soif d'apprendre et la remise en question constructive.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-['Cambria_Math'] text-[#4E3AC4] mb-3">Débat Respectueux</h3>
                  <p className="text-[#4B4B4B] font-['Work_Sans']">
                    Nous privilégions l'échange d'idées dans le respect mutuel et la bienveillance.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-['Cambria_Math'] text-[#4E3AC4] mb-3">Engagement Citoyen</h3>
                  <p className="text-[#4B4B4B] font-['Work_Sans']">
                    Nous croyons en l'importance de s'impliquer dans les enjeux de société.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-['Cambria_Math'] text-[#4E3AC4] mb-3">Diversité des Perspectives</h3>
                  <p className="text-[#4B4B4B] font-['Work_Sans']">
                    Nous valorisons la richesse des points de vue et des expériences diverses.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center bg-[#4E3AC4] text-white p-8 rounded-xl">
              <h2 className="text-3xl font-['Cambria_Math'] mb-4">Rejoignez-nous</h2>
              <p className="text-lg mb-6 opacity-90">Participez aux débats qui façonnent notre époque</p>
              <a
                href="/register"
                className="inline-block bg-white text-[#4E3AC4] px-8 py-3 rounded-none rounded-br-xl font-['Cambria_Math'] uppercase font-semibold hover:bg-gray-100 transition-colors"
              >
                Devenir membre
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
