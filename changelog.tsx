"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ChangelogEntry {
  name: string
  oldValue: number
  newValue: number
  rarity: string
  isIncrease: boolean
  tierColor: string
}

export default function Changelog() {
  const changelogEntries: ChangelogEntry[] = [
    {
      name: "Hydralania",
      oldValue: 220,
      newValue: 255,
      rarity: "8/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Isisauriraptor",
      oldValue: 150,
      newValue: 160,
      rarity: "7/8",
      isIncrease: true,
      tierColor: "bg-red-500",
    },
    {
      name: "Berserk Alametus",
      oldValue: 140,
      newValue: 155,
      rarity: "7/8",
      isIncrease: true,
      tierColor: "bg-red-500",
    },
    {
      name: "Violex Magnus",
      oldValue: 90,
      newValue: 105,
      rarity: "8/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Pitch Black Terror",
      oldValue: 44,
      newValue: 50,
      rarity: "7/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Pitch Wraith Terror",
      oldValue: 450,
      newValue: 420,
      rarity: "7/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Wraith Terror",
      oldValue: 315,
      newValue: 285,
      rarity: "7/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Blue Whale Shastasaurus",
      oldValue: 220,
      newValue: 190,
      rarity: "5/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Orca Spinosaurus",
      oldValue: 105,
      newValue: 95,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Dolphin Ichthyovenator",
      oldValue: 75,
      newValue: 70,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Pitch Luminescent Avinychus",
      oldValue: 75,
      newValue: 72,
      rarity: "5/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Luminescent Avinychus",
      oldValue: 58,
      newValue: 56,
      rarity: "6/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Giant Albino Baryonyx",
      oldValue: 56,
      newValue: 54,
      rarity: "6/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
  ]

  const getRarityColor = (rarity: string) => {
    if (rarity.includes("8/8")) return "bg-purple-600/80 text-purple-100"
    if (rarity.includes("7/8")) return "bg-red-600/80 text-red-100"
    if (rarity.includes("6/8")) return "bg-orange-600/80 text-orange-100"
    if (rarity.includes("5/8")) return "bg-yellow-600/80 text-yellow-100"
    if (rarity.includes("4/8")) return "bg-green-600/80 text-green-100"
    if (rarity.includes("3/8")) return "bg-blue-600/80 text-blue-100"
    if (rarity.includes("2/8")) return "bg-indigo-600/80 text-indigo-100"
    if (rarity.includes("1/8")) return "bg-gray-600/80 text-gray-100"
    return "bg-gray-500/80 text-gray-100"
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-end gap-2 mb-4">
          <Link href="/info">
            <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-md text-sm font-light transition-colors border border-gray-700/50">
              Info
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-md text-sm font-light transition-colors border border-gray-700/50">
              Back to Value List
            </button>
          </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-white mb-3 tracking-wide">Value List</h1>
          <h2 className="text-xl font-extralight text-gray-400 mb-2">Changelog</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto"></div>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">Recent Value Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-green-400 text-lg font-light mb-4">-RISES-</h3>
                  <div className="space-y-2">
                    {changelogEntries
                      .filter((entry) => entry.isIncrease)
                      .map((entry, index) => (
                        <div key={index} className="flex items-center gap-3 text-white text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-light">
                              {entry.name} - {entry.oldValue} (OLD) → {entry.newValue} ({entry.rarity})
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div className={`w-3 h-3 ${entry.tierColor} rounded-sm`}></div>
                            <Badge className={`text-xs ${getRarityColor(entry.rarity)} border-0`}>{entry.rarity}</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-red-400 text-lg font-light mb-4">-DROPS-</h3>
                  <div className="space-y-2">
                    {changelogEntries
                      .filter((entry) => !entry.isIncrease)
                      .map((entry, index) => (
                        <div key={index} className="flex items-center gap-3 text-white text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="font-light">
                              {entry.name} - {entry.oldValue} (OLD) → {entry.newValue} ({entry.rarity})
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div className={`w-3 h-3 ${entry.tierColor} rounded-sm`}></div>
                            <Badge className={`text-xs ${getRarityColor(entry.rarity)} border-0`}>{entry.rarity}</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm font-light">
            Directly forked from the{" "}
            <a
              href="https://discord.gg/kNPy4jwMWj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors underline decoration-gray-600 hover:decoration-gray-400"
            >
              Dinosaur Simulator Trading Network
            </a>{" "}
            Discord Server with slight changes.
          </p>
        </div>
      </div>
    </div>
  )
}
