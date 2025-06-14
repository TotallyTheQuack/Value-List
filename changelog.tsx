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
      name: "Metron Praenintius",
      oldValue: 1500,
      newValue: 1750,
      rarity: "8/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Isisauriraptor",
      oldValue: 160,
      newValue: 180,
      rarity: "8/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Berserk Alametus",
      oldValue: 155,
      newValue: 170,
      rarity: "8/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Fallen Gladiator",
      oldValue: 95,
      newValue: 105,
      rarity: "8/8",
      isIncrease: true,
      tierColor: "bg-blue-500",
    },
    {
      name: "Zomvinychus",
      oldValue: 40,
      newValue: 45,
      rarity: "6/8",
      isIncrease: true,
      tierColor: "bg-blue-500",
    },
    {
      name: "Galactic Barosaurus",
      oldValue: 105,
      newValue: 110,
      rarity: "5/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Scylla",
      oldValue: 31,
      newValue: 40,
      rarity: "6/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Kaiju Gelioichthys",
      oldValue: 13,
      newValue: 13,
      rarity: "5/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Pitch Black Terror",
      oldValue: 50,
      newValue: 52,
      rarity: "6/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Krampus",
      oldValue: 16,
      newValue: 18,
      rarity: "5/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Spawn Shunosaurus",
      oldValue: 0,
      newValue: 22,
      rarity: "5/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Butterfly Alametus",
      oldValue: 0,
      newValue: 13,
      rarity: "4/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Spring Blossom Lusotitan",
      oldValue: 0,
      newValue: 5,
      rarity: "3/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Tree Elder Ankylosaurus",
      oldValue: 0,
      newValue: 5,
      rarity: "3/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Forest Dweller Shantungosaurus",
      oldValue: 0,
      newValue: 5,
      rarity: "3/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Sneaky Bunny Guanlong",
      oldValue: 0,
      newValue: 4,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Monarch Meganeura",
      oldValue: 0,
      newValue: 4,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Honey Heist Gigatitan",
      oldValue: 0,
      newValue: 4,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Collector Maip Macrothorax",
      oldValue: 0,
      newValue: 4,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Valley Golem Machimosaurus",
      oldValue: 0,
      newValue: 2,
      rarity: "1/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Cottontail Maiasaura",
      oldValue: 0,
      newValue: 1,
      rarity: "1/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: " Drinking Bird Gigantoraptor",
      oldValue: 0,
      newValue: 1,
      rarity: "1/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Chicken Egg Balaur",
      oldValue: 0,
      newValue: 1,
      rarity: "1/8",
      isIncrease: true,
      tierColor: "bg-purple-500",
    },
    {
      name: "Hydralania",
      oldValue: 255,
      newValue: 205,
      rarity: "7/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Blue Whale Shastasaurus",
      oldValue: 190,
      newValue: 170,
      rarity: "5/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Violex Magnus",
      oldValue: 105,
      newValue: 100,
      rarity: "7/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Pitch Wraith Terror",
      oldValue: 420,
      newValue: 390,
      rarity: "7/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Pitch Luminescent Avinychus",
      oldValue: 72,
      newValue: 70,
      rarity: "5/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Spinofaarus",
      oldValue: 36,
      newValue: 34,
      rarity: "5/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Classic Albino Terror",
      oldValue: 35,
      newValue: 32,
      rarity: "3/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Movie Spinosaurus",
      oldValue: 15,
      newValue: 13,
      rarity: "3/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Saurophaganax Remodel",
      oldValue: 12,
      newValue: 8,
      rarity: "3/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Singularfaarus",
      oldValue: 10,
      newValue: 8,
      rarity: "3/8",
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
