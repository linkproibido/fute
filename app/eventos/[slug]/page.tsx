import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import { getEventBySlug } from "@/lib/events-manager"

const VideoPlayer = dynamic(() => import("@/components/video-player").then((mod) => mod.VideoPlayer), { ssr: false })

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="fixed inset-0 bg-black">
      <VideoPlayer playerUrl={event.playerUrl} title={event.name} />
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white mb-2">{event.name}</h1>
        <p className="text-sm text-blue-300">{event.providerName}</p>
      </div>
    </div>
  )
}

