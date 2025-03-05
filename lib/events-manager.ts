import type { Event } from "@/types/event"
import { events } from "./events-data"

export function getAllEvents(): Event[] {
  return events
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug)
}

export function getEventCount(): number {
  return events.length
}

export const EMBED_URL = "https://embedcanaistv.com/"

