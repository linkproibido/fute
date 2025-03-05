"use client"

import { useState, useEffect } from "react"

interface AdPopupProps {
  extid: string
}

export function AdPopup({ extid }: AdPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000) // Mostra o pop-up após 5 segundos
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    window.open(`https://tsyndicate.com/api/v1/direct/3ae0f7bda163418bb5071e232972abc6?extid=${extid}`, "_blank")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Anúncio Especial</h2>
        <p className="mb-4">Clique aqui para ver ofertas exclusivas!</p>
        <div className="flex justify-between">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver Oferta
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

