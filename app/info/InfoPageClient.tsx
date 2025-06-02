"use client"

import Info from "../../info"
import Link from "next/link"

export default function InfoPageClient() {
  return (
    <>
      <div className="flex flex-col items-end mb-4">
        <div className="flex gap-2 mb-1">
          <Link href="/changelog">
            <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-md text-sm font-light transition-colors border border-gray-700/50">
              Changelog
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-md text-sm font-light transition-colors border border-gray-700/50">
              Back to Value List
            </button>
          </Link>
        </div>
        <span className="text-gray-500 text-xs font-light">Updated June 2nd 2025</span>
      </div>
      <Info />
    </>
  )
}
