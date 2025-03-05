import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FuteFREE - Eventos ao Vivo",
  description: "Streaming de eventos esportivos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-800 border-b border-gray-700">
            <nav className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-blue-400">FuteFREE</h1>
            </nav>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-800 border-t border-gray-700 py-4">
            <div className="container mx-auto px-4 text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} NÃO HOSPEDAMOS NEM UM CONTEÚDO EM NOSSOS SERVIDORES!
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}



import './globals.css'