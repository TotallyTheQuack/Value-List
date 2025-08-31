"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface ChangelogEntry {
  name: string
  oldValue: number | string
  newValue: number | string
  oldRarity: string
  newRarity: string
  isIncrease: boolean
  isAdjustment?: boolean
  isCollectors?: boolean
}

export default function Changelog() {
  const changelogEntries: ChangelogEntry[] = [
    // RISES
    {
      name: "Wraith Terror",
      oldValue: 140,
      newValue: 150,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: true,
    },
    {
      name: "Fallen Gladiator",
      oldValue: 140,
      newValue: 145,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: true,
    },
    {
      name: "Violex Magnus",
      oldValue: 140,
      newValue: 145,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: true,
    },
    {
      name: "Galactic Barosaurus",
      oldValue: 90,
      newValue: 95,
      oldRarity: "7/8",
      newRarity: "7/8",
      isIncrease: true,
    },
    {
      name: "Distorted King",
      oldValue: 60,
      newValue: 85,
      oldRarity: "5/8",
      newRarity: "7/8",
      isIncrease: true,
    },
    {
      name: "Zomvinychus",
      oldValue: 44,
      newValue: 46,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Firebird",
      oldValue: 26,
      newValue: 27,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Movie Mosasaurus",
      oldValue: 22,
      newValue: 25,
      oldRarity: "3/8",
      newRarity: "4/8",
      isIncrease: true,
    },
    {
      name: "Kralkatorrik",
      oldValue: 18,
      newValue: 18,
      oldRarity: "2/8",
      newRarity: "3/8",
      isIncrease: true,
    },
    {
      name: "Butterfly Alametus",
      oldValue: 13,
      newValue: 17,
      oldRarity: "4/8",
      newRarity: "4/8",
      isIncrease: true,
    },
    // DROPS
    {
      name: "Albino Terror",
      oldValue: 105,
      newValue: 100,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: false,
    },
    {
      name: "Movie Spinosaurus",
      oldValue: 22,
      newValue: 18,
      oldRarity: "3/8",
      newRarity: "3/8",
      isIncrease: false,
    },
    {
      name: "Chaos Spinosaurus",
      oldValue: 9,
      newValue: 5,
      oldRarity: "3/8",
      newRarity: "2/8",
      isIncrease: false,
    },
    // ADJUSTMENTS
    {
      name: "Pitch Wraith Terror",
      oldValue: 190,
      newValue: 200,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: true,
      isAdjustment: true,
    },
    {
      name: "Hydralania",
      oldValue: 170,
      newValue: 175,
      oldRarity: "7/8",
      newRarity: "7/8",
      isIncrease: true,
      isAdjustment: true,
    },
    {
      name: "Isisauriraptor",
      oldValue: 130,
      newValue: 125,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Blue Whale Shastasaurus",
      oldValue: 85,
      newValue: 80,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Orca Spinosaurus",
      oldValue: 70,
      newValue: 65,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Dolphin Ichthyovenator",
      oldValue: 55,
      newValue: 55,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Phantom Bringer Ceratosaurus",
      oldValue: 45,
      newValue: 42,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Peak Spinosaurus",
      oldValue: 34,
      newValue: 32,
      oldRarity: "3/8",
      newRarity: "4/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Spring Blossom Lusotitan",
      oldValue: 6,
      newValue: 10,
      oldRarity: "2/8",
      newRarity: "2/8",
      isIncrease: true,
      isAdjustment: true,
    },
    // COLLECTORS' TIER
    {
      name: "Branded Purrusaurus",
      oldValue: 1350,
      newValue: "1250-1500",
      oldRarity: "1/8",
      newRarity: "1/8",
      isIncrease: false,
      isCollectors: true,
    },
    {
      name: "Crossover Hybrid/Vinera",
      oldValue: 45,
      newValue: 40,
      oldRarity: "4/8",
      newRarity: "4/8",
      isIncrease: false,
      isCollectors: true,
    },
  ]

  const newTradables = [
    { name: "Indomitable Thief Gen 2", value: 8, rarity: "3/8" },
    { name: "Indomitable King", value: 5, rarity: "2/8" },
    { name: "Indomitable Thief", value: 3, rarity: "2/8" },
    { name: "Movie Baryonyx", value: 3, rarity: "2/8" },
    { name: "Movie Pyroraptor", value: 3, rarity: "2/8" },
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
              <CardTitle className="text-white text-xl font-light tracking-wide">
                Recent Value Changes - August 31, 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
                <p className="text-green-400 text-sm font-light">
                  <strong>GOOD NEWS ALL TRADERS!</strong> The only major drop this update has been DNA! We have not
                  gotten a list with this much green for the entirety of 2025! Adds are recovering ever so slowly.
                </p>
              </div>
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-green-400 text-lg font-light mb-4">-RISES-</h3>
                  <div className="space-y-2">
                    {changelogEntries
                      .filter((entry) => entry.isIncrease && !entry.isCollectors && !entry.isAdjustment)
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

                <div className="mb-6">
                  <h3 className="text-red-400 text-lg font-light mb-4">-DROPS-</h3>
                  <div className="space-y-2">
                    {changelogEntries
                      .filter((entry) => !entry.isIncrease && !entry.isAdjustment && !entry.isCollectors)
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

                <div className="mb-6">
                  <h3 className="text-orange-400 text-lg font-light mb-4">-ADJUSTMENTS-</h3>
                  <div className="space-y-2">
                    {changelogEntries
                      .filter((entry) => entry.isAdjustment)
                      .map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-white text-sm">
                          <div
                            className={`w-3 h-3 rounded-full ${entry.isIncrease ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
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
                {changelogEntries
                  .filter((entry) => entry.isCollectors)
                  .map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-white text-sm">
                      <div className={`w-3 h-3 rounded-full ${entry.isIncrease ? "bg-green-500" : "bg-red-500"}`}></div>
                      <span className="font-light">
                        {entry.name} - {entry.oldValue} ({entry.oldRarity}) → {entry.newValue} ({entry.newRarity})
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">New Tradables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {newTradables.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-white text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-light">
                      {item.name} - NEW → {item.value} ({item.rarity})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">DNA Conversion Rate Change</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-light">DNA Conversion Rate - 8-12K DNA = 1 Value → 12-13K DNA = 1 Value</span>
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
