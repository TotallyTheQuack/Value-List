import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Value List - Dinosaur Simulator Trading",
  description: "Complete value list for Dinosaur Simulator trading with tiers, rarities, and promo codes",
}

export default function Page() {
  return <ClientPage />
}
