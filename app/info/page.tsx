import type { Metadata } from "next"
import InfoPageClient from "./InfoPageClient"

export const metadata: Metadata = {
  title: "Info - Value List",
  description: "Information about demand tiers and trading mechanics",
}

export default function InfoPage() {
  return <InfoPageClient />
}
