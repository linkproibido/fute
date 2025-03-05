"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface VideoPlayerProps {
  playerUrl: string
  title: string
}

export function VideoPlayer({ playerUrl, title }: VideoPlayerProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showRealPlayer, setShowRealPlayer] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleAdClick = useCallback(() => {
    const adUrls = [
      `https://tsyndicate.com/api/v1/direct/3ae0f7bda163418bb5071e232972abc6?extid=1&playerUrl=${encodeURIComponent(playerUrl)}`,
      `https://tsyndicate.com/api/v1/direct/3ae0f7bda163418bb5071e232972abc6?extid=2&playerUrl=${encodeURIComponent(playerUrl)}`,
    ]

    if (clickCount < 2) {
      window.open(adUrls[clickCount], "_blank")
      setClickCount((prevCount) => prevCount + 1)
      if (clickCount === 1) {
        setShowRealPlayer(true)
      }
    }
  }, [clickCount, playerUrl])

  useEffect(() => {
    if (showRealPlayer && iframeRef.current) {
      const iframe = iframeRef.current
      iframe.onload = () => {
        try {
          if (iframe.contentDocument && iframe.contentDocument.head) {
            const style = document.createElement("style")
            style.textContent = `
              [class*="ad"]:not(.our-ad), [class*="Ad"]:not(.our-ad), [class*="AD"]:not(.our-ad),
              [id*="ad"]:not(.our-ad), [id*="Ad"]:not(.our-ad), [id*="AD"]:not(.our-ad),
              [class*="banner"]:not(.our-ad), [class*="Banner"]:not(.our-ad),
              [class*="popup"]:not(.our-popup), [class*="Popup"]:not(.our-popup),
              [class*="overlay"]:not(.our-overlay), [class*="Overlay"]:not(.our-overlay),
              iframe:not(.plyr-iframe):not(.our-iframe) {
                display: none !important;
                opacity: 0 !important;
                pointer-events: none !important;
                height: 0 !important;
                width: 0 !important;
                position: absolute !important;
                z-index: -9999 !important;
              }
            `
            iframe.contentDocument.head.appendChild(style)
          }
        } catch (error) {
          console.error("Erro ao acessar o conteúdo do iframe:", error)
        }
      }
    }

    // Add protection against inspection
    const preventInspection = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", preventInspection)

    return () => {
      window.removeEventListener("keydown", preventInspection)
    }
  }, [showRealPlayer])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {!showRealPlayer ? (
        <div
          className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-br from-gray-900 to-blue-900"
          onClick={handleAdClick}
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-4">
              {clickCount === 0 ? "Clique para iniciar" : "Clique mais uma vez"}
            </p>
            <p className="text-xl text-blue-300">
              {2 - clickCount} {2 - clickCount === 1 ? "clique" : "cliques"} restantes
            </p>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={playerUrl}
          allowFullScreen
          title={title}
          className="w-full h-full"
          style={{ border: "none" }}
          sandbox="allow-same-origin allow-scripts allow-forms allow-presentation"
          loading="lazy"
        />
      )}
    </div>
  )
}

