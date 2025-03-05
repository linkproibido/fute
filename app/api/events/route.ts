import { NextResponse } from "next/server"
import { generateEvents } from "@/lib/generate-events"

export async function GET() {
  const events = generateEvents()

  return NextResponse.json({ events })
}

