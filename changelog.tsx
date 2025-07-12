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
    // RISES
    {
      name: "Albino Terror",
      oldValue: 95,
      newValue: 100,
      rarity: "8/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Violex Magnus",
      oldValue: 100,
      newValue: 110,
      rarity: "7/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Pitch Black Terror",
      oldValue: 52,
      newValue: 58,
      rarity: "7/8",
      isIncrease: true,
      tierColor: "bg-orange-500",
    },
    {
      name: "Scylla",
      oldValue: 40,
      newValue: 45,
      rarity: "6/8",
      isIncrease: true,
      tierColor: "bg-yellow-500",
    },
    {
      name: "Kaiju Spinofaarus",
      oldValue: 34,
      newValue: 38,
      rarity: "6/8",
      isIncrease: true,
      tierColor: "bg-yellow-500",
    },
    {
      name: "Spinofaarus",
      oldValue: 34,
      newValue: 40,
      rarity: "6/8",
      isIncrease: true,
      tierColor: "bg-yellow-500",
    },
    {
      name: "Alpha Kaiju Spinosaurus",
      oldValue: 25,
      newValue: 30,
      rarity: "5/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Firebird",
      oldValue: 21,
      newValue: 24,
      rarity: "6/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Movie Spinosaurus",
      oldValue: 13,
      newValue: 32,
      rarity: "7/8",
      isIncrease: true,
      tierColor: "bg-yellow-500",
    },
    // DROPS
    {
      name: "Blue Whale Shastasaurus",
      oldValue: 170,
      newValue: 120,
      rarity: "5/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Galactic Barosaurus",
      oldValue: 110,
      newValue: 98,
      rarity: "6/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Orca Spinosaurus",
      oldValue: 95,
      newValue: 85,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Dolphin Ichthyovenator",
      oldValue: 70,
      newValue: 65,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-orange-500",
    },
    {
      name: "Zomvinychus",
      oldValue: 45,
      newValue: 42,
      rarity: "5/8",
      isIncrease: false,
      tierColor: "bg-yellow-500",
    },
    {
      name: "Carcharocles Megalodon",
      oldValue: 21,
      newValue: 20,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-green-500",
    },
    {
      name: "Spawn Shunosaurus",
      oldValue: 22,
      newValue: 16,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-green-500",
    },
    {
      name: "Kralkatorrik",
      oldValue: 20,
      newValue: 20,
      rarity: "2/8",
      isIncrease: false,
      tierColor: "bg-green-500",
    },
    // ADJUSTMENTS
    {
      name: "Pitch Wraith Terror",
      oldValue: 390,
      newValue: 380,
      rarity: "7/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Hydralania",
      oldValue: 205,
      newValue: 190,
      rarity: "6/8",
      isIncrease: false,
      tierColor: "bg-red-500",
    },
    {
      name: "Peak Spinosaurus",
      oldValue: 37,
      newValue: 34,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-yellow-500",
    },
    {
      name: "Pitch Coconut Brachiosaurus",
      oldValue: 36,
      newValue: 35,
      rarity: "4/8",
      isIncrease: false,
      tierColor: "bg-yellow-500",
    },
    // GRAYSCALES
    {
      name: "Grayscale Megavore",
      oldValue: 10,
      newValue: 28,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Grayscale Gelioichthys",
      oldValue: 5,
      newValue: 28,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Grayscale Albino Terror",
      oldValue: 10,
      newValue: 22,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Grayscale Alametus",
      oldValue: 10,
      newValue: 20,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Grayscale Fasolatherium",
      oldValue: 8,
      newValue: 20,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Grayscale Dolichomalosaurus",
      oldValue: 8,
      newValue: 16,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    {
      name: "Grayscale Avinychus",
      oldValue: 5,
      newValue: 15,
      rarity: "2/8",
      isIncrease: true,
      tierColor: "bg-green-500",
    },
    // CROSSOVERS
    {
      name: "Crossover Hybrid/Vinera",
      oldValue: 50,
      newValue: 95,
      rarity: "6/8",
      isIncrease: true,
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
                  <h3 className="text-red-400 text-lg font-light mb-4">-DROPS & ADJUSTMENTS-</h3>
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

          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">New Movie Event Additions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Distorted King - NEW → 115 (6/8)</span>
                  </div>
                  <Badge className="text-xs bg-orange-600/80 text-orange-100 border-0">6/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Mosasaurus - NEW → 75 (7/8)</span>
                  </div>
                  <Badge className="text-xs bg-red-600/80 text-red-100 border-0">7/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Forgotten Mutant - NEW → 38 (5/8)</span>
                  </div>
                  <Badge className="text-xs bg-yellow-600/80 text-yellow-100 border-0">5/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Chaos Titanosaur - NEW → 28 (5/8)</span>
                  </div>
                  <Badge className="text-xs bg-yellow-600/80 text-yellow-100 border-0">5/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Chaos Mosasaurus - NEW → 20 (5/8)</span>
                  </div>
                  <Badge className="text-xs bg-yellow-600/80 text-yellow-100 border-0">5/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Tyrannosaurus Rex - NEW → 13 (4/8)</span>
                  </div>
                  <Badge className="text-xs bg-green-600/80 text-green-100 border-0">4/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Chaos Spinosaurus - NEW → 13 (4/8)</span>
                  </div>
                  <Badge className="text-xs bg-green-600/80 text-green-100 border-0">4/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Classified Tylosaurus - NEW → 10 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Classified Troodon - NEW → 3 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Velociraptor - NEW → 3 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Ankylosaurus - NEW → 2 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Hatzegopteryx - NEW → 1.5 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Parasaurolophus - NEW → 1 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Allosaurus - NEW → 1 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Carnotaurus - NEW → 1 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
                </div>
                <div className="flex items-center gap-3 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">Movie Pteranodon - NEW → 1 (2/8)</span>
                  </div>
                  <Badge className="text-xs bg-indigo-600/80 text-indigo-100 border-0">2/8</Badge>
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
