import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "DS Value List",
  description: "The Value List of all time",
}

export default function Page() {
  return <ClientPage />
}
