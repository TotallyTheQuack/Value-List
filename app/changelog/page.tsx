import type { Metadata } from "next"
import ChangelogPageClient from "./ChangelogPageClient"

export const metadata: Metadata = {
  title: "Changelog - Value List",
  description: "Recent value changes and updates for Dinosaur Simulator trading",
}

export default function ChangelogPage() {
  return <ChangelogPageClient />
}
