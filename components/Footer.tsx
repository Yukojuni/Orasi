export default function Footer() {
  return (
    <footer className="w-full bg-[#4E3AC4] text-white py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-['Cambria_Math']">ORASI</h3>
            <p className="text-sm opacity-90">
              L'association étudiante qui donne du sens aux débats et à la culture générale.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-['Cambria_Math']">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/articles" className="hover:underline">
                  Articles
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  À propos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-['Cambria_Math']">Contact</h4>
            <p className="text-sm opacity-90">
              Une question ? Une suggestion ?<br />
              Contactez-nous à contact@orasi.fr
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2024 ORASI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
