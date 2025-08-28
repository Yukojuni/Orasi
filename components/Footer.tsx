"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-[#4E3AC4] text-white py-16 mt-16 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 gap-x-12 items-start">

          {/* Logo + description */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-3xl font-bold">ORASI</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              L'association étudiante qui rend les débats et la culture générale accessibles et passionnants.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://instagram.com/orasi.france" target="_blank" className="hover:opacity-80 transition-opacity">
                <img src="/Instagram.png" alt="Instagram ORASI" className="w-6 h-6"/>
              </a>
              <a href="mailto:orasi.contact@gmail.com" className="hover:opacity-80 transition-opacity">
                <img src="/email.png" alt="Email ORASI" className="w-6 h-6"/>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xl font-semibold">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: "Accueil", href: "/" },
                { name: "Articles", href: "/articles" },
                { name: "Événements", href: "/events" },
                { name: "Interviews", href: "/interviews" },
                { name: "À propos", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#F3E8FF] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xl font-semibold">Contact & Newsletter</h4>
            <p className="text-sm opacity-90">
              Une question ou suggestion ? Contactez-nous par email :<br/>
              <a href="mailto:orasi.contact@gmail.com" className="underline hover:text-[#F3E8FF]">orasi.contact@gmail.com</a>
            </p>
            <form className="flex flex-col gap-2 mt-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 rounded-xl border border-white/50 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#F3E8FF] transition-all"
              />
              <button className="bg-white text-[#4E3AC4] py-2 px-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                S'inscrire
              </button>
            </form>
          </div>

          {/* Faire un don */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xl font-semibold">Soutenez ORASI</h4>
            <p className="text-sm opacity-90">
              Chaque contribution nous aide à proposer des contenus de qualité et des événements passionnants.
            </p>
            <a
              href="https://www.helloasso.com/associations/orasi/formulaires/1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#4E3AC4] font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-200 transition-colors text-center text-lg"
              aria-label="Faire un don à ORASI"
            >
              Faire un don
            </a>
          </div>

        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm opacity-70">
          <p>&copy; 2025 ORASI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
