"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface ChangelogEntry {
  name: string
  oldValue: number
  newValue: number
  oldRarity: string
  newRarity: string
  isIncrease: boolean
}

export default function Changelog() {
  const changelogEntries: ChangelogEntry[] = [
    // RISES
    {
      name: "Albino Terror",
      oldValue: 100,
      newValue: 105,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: true,
    },
    {
      name: "Violex Magnus",
      oldValue: 110,
      newValue: 115,
      oldRarity: "7/8",
      newRarity: "7/8",
      isIncrease: true,
    },
    {
      name: "Zomvinychus",
      oldValue: 42,
      newValue: 46,
      oldRarity: "5/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Spinofaarus",
      oldValue: 40,
      newValue: 45,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Spawn Shunosaurus",
      oldValue: 16,
      newValue: 16,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: true,
    },
    // DROPS
    {
      name: "Metron Praenintius",
      oldValue: 1750,
      newValue: 1600,
      oldRarity: "8/8",
      newRarity: "7/8",
      isIncrease: false,
    },
    {
      name: "Pitch Wraith Terror",
      oldValue: 380,
      newValue: 280,
      oldRarity: "7/8",
      newRarity: "7/8",
      isIncrease: false,
    },
    {
      name: "Wraith Terror",
      oldValue: 285,
      newValue: 210,
      oldRarity: "7/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Hydralania",
      oldValue: 190,
      newValue: 180,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Isisauriraptor",
      oldValue: 180,
      newValue: 155,
      oldRarity: "8/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Berserk Alametus",
      oldValue: 170,
      newValue: 150,
      oldRarity: "8/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Blue Whale Shastasaurus",
      oldValue: 120,
      newValue: 105,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: false,
    },
    {
      name: "Distorted King",
      oldValue: 115,
      newValue: 65,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Galactic Barosaurus",
      oldValue: 98,
      newValue: 90,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Movie Mosasaurus",
      oldValue: 75,
      newValue: 28,
      oldRarity: "7/8",
      newRarity: "4/8",
      isIncrease: false,
    },
    {
      name: "Pitch Luminescent Avinychus",
      oldValue: 70,
      newValue: 68,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: false,
    },
    {
      name: "Reaper Gelioichthys",
      oldValue: 68,
      newValue: 68,
      oldRarity: "7/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Forgotten Mutant",
      oldValue: 38,
      newValue: 26,
      oldRarity: "5/8",
      newRarity: "4/8",
      isIncrease: false,
    },
    {
      name: "Chaos Titanosaur",
      oldValue: 28,
      newValue: 12,
      oldRarity: "5/8",
      newRarity: "3/8",
      isIncrease: false,
    },
    {
      name: "Chaos Mosasaurus",
      oldValue: 20,
      newValue: 5,
      oldRarity: "5/8",
      newRarity: "2/8",
      isIncrease: false,
    },
    {
      name: "Movie Tyrannosaurus Rex",
      oldValue: 13,
      newValue: 1,
      oldRarity: "4/8",
      newRarity: "1/8",
      isIncrease: false,
    },
    {
      name: "Chaos Spinosaurus",
      oldValue: 13,
      newValue: 9,
      oldRarity: "4/8",
      newRarity: "3/8",
      isIncrease: false,
    },
    {
      name: "Classified Tylosaurus",
      oldValue: 10,
      newValue: 1,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: false,
    },
    {
      name: "Movie Velociraptor",
      oldValue: 3,
      newValue: 1,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: false,
    },
    // ADJUSTMENTS
    {
      name: "Fallen Gladiator",
      oldValue: 105,
      newValue: 110,
      oldRarity: "8/8",
      newRarity: "7/8",
      isIncrease: false,
    },
    {
      name: "Orca Spinosaurus",
      oldValue: 85,
      newValue: 80,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
    },
    {
      name: "Scylla",
      oldValue: 45,
      newValue: 46,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Movie Spinosaurus",
      oldValue: 32,
      newValue: 34,
      oldRarity: "7/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    // COLLECTORS' TIER
    {
      name: "Branded Purrusaurus",
      oldValue: 2250,
      newValue: 2000,
      oldRarity: "2/8",
      newRarity: "2/8",
      isIncrease: false,
    },
  ]

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
                        <div key={index} className="flex items-center gap-2 text-white text-sm">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-light">
                            {entry.name} - {entry.oldValue} ({entry.oldRarity}) → {entry.newValue} ({entry.newRarity})
                          </span>
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
                        <div key={index} className="flex items-center gap-2 text-white text-sm">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="font-light">
                            {entry.name} - {entry.oldValue} ({entry.oldRarity}) → {entry.newValue} ({entry.newRarity})
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">Collectors' Tier Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-light">Branded Purrusaurus - 2000-2500 (2/8) → 2000 (2/8)</span>
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
