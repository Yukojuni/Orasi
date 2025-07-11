import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-['Cambria_Math'] text-[#4B4B4B] mb-8 text-center">L'actualités</h1>
        </div>
      </div>

      <Footer />
    </div>
  )
}
