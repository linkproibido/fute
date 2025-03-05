import Link from "next/link"
import Image from "next/image"
import { getAllEvents } from "@/lib/events-manager"

export default function Home() {
  const events = getAllEvents()

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-blue-400">
        Streaming de Eventos <span className="text-gray-100">de Alta Tecnologia</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link href={`/eventos/${event.slug}`} key={event.id} className="group">
            <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105">
              <Image
                src={event.coverImage || "/placeholder.svg"}
                alt={event.name}
                width={400}
                height={225}
                className="object-cover w-full h-56"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-xl font-bold text-white mb-1">{event.name}</h2>
                <p className="text-sm text-blue-300">{event.providerName}</p>
              </div>
              <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white text-xs font-bold rounded-bl-lg">
                AO VIVO
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

