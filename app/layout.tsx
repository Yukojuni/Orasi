import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ORASI - Association Étudiante",
  description: "Plateforme associative de diffusion et de débat d'idées autour de sujets sociétaux et culturels.",
  keywords: "association, étudiante, débat, culture, société, géopolitique",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#FFFDFA] text-[#4B4B4B]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
