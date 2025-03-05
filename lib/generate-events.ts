export const generateEvents = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const eventId = i + 1
    return {
      id: eventId,
      name: `Evento ${eventId}`,
      slug: `evento-${eventId}`,
      coverImage: `/placeholder.svg?height=200&width=350&text=Evento ${eventId}`,
      playerUrl: `https://embedcanaistv.com/globosp/player${eventId}`,
    }
  })
}

export const EMBED_URL = "https://embedcanaistv.com/globosp/"

