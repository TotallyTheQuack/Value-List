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
      name: "Hydralania",
      oldValue: 165,
      newValue: 170,
      oldRarity: "6/8",
      newRarity: "7/8",
      isIncrease: true,
    },
    {
      name: "Violex Magnus",
      oldValue: 120,
      newValue: 140,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: true,
    },
    {
      name: "Fallen Gladiator",
      oldValue: 115,
      newValue: 140,
      oldRarity: "7/8",
      newRarity: "8/8",
      isIncrease: true,
    },
    {
      name: "Aurora Borethalass",
      oldValue: 48,
      newValue: 48,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: true,
    },
    {
      name: "Zomvinychus",
      oldValue: 42,
      newValue: 44,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Firebird",
      oldValue: 24,
      newValue: 26,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Carcharocles Megalodon",
      oldValue: 20,
      newValue: 20,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: true,
    },
    // DROPS
    {
      name: "Metron Praenintius",
      oldValue: 1600,
      newValue: 850,
      oldRarity: "7/8",
      newRarity: "7/8",
      isIncrease: false,
    },
    {
      name: "Pitch Wraith Terror",
      oldValue: 220,
      newValue: 190,
      oldRarity: "6/8",
      newRarity: "5/8",
      isIncrease: false,
    },
    {
      name: "Wraith Terror",
      oldValue: 170,
      newValue: 140,
      oldRarity: "6/8",
      newRarity: "5/8",
      isIncrease: false,
    },
    {
      name: "Isisauriraptor",
      oldValue: 140,
      newValue: 130,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Berserk Alametus",
      oldValue: 130,
      newValue: 125,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
    },
    {
      name: "Blue Whale Shastasaurus",
      oldValue: 95,
      newValue: 85,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: false,
    },
    {
      name: "Orca Spinosaurus",
      oldValue: 80,
      newValue: 70,
      oldRarity: "5/8",
      newRarity: "4/8",
      isIncrease: false,
    },
    {
      name: "Distorted King",
      oldValue: 65,
      newValue: 60,
      oldRarity: "6/8",
      newRarity: "5/8",
      isIncrease: false,
    },
    {
      name: "Dolphin Ichthyovenator",
      oldValue: 65,
      newValue: 55,
      oldRarity: "4/8",
      newRarity: "4/8",
      isIncrease: false,
    },
    {
      name: "Movie Mosasaurus",
      oldValue: 25,
      newValue: 22,
      oldRarity: "4/8",
      newRarity: "3/8",
      isIncrease: false,
    },
    {
      name: "Forgotten Mutant",
      oldValue: 20,
      newValue: 12,
      oldRarity: "4/8",
      newRarity: "4/8",
      isIncrease: false,
    },
    {
      name: "Movie Giganotosaurus",
      oldValue: 14,
      newValue: 5,
      oldRarity: "4/8",
      newRarity: "3/8",
      isIncrease: false,
    },
    {
      name: "Movie Therizinosaurus",
      oldValue: 12,
      newValue: 3,
      oldRarity: "4/8",
      newRarity: "1/8",
      isIncrease: false,
    },
    // ADJUSTMENTS
    {
      name: "Galactic Barosaurus",
      oldValue: 90,
      newValue: 90,
      oldRarity: "6/8",
      newRarity: "7/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Luminescent Avinychus",
      oldValue: 56,
      newValue: 54,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Giant Albino Baryonyx",
      oldValue: 54,
      newValue: 52,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Spinofaarus",
      oldValue: 52,
      newValue: 50,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Kaiju Giraffatitan",
      oldValue: 47,
      newValue: 47,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Alien Irritator",
      oldValue: 33,
      newValue: 26,
      oldRarity: "3/8",
      newRarity: "4/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Movie Spinosaurus",
      oldValue: 22,
      newValue: 22,
      oldRarity: "5/8",
      newRarity: "3/8",
      isIncrease: false,
      isAdjustment: true,
    },
    // COLLECTORS' TIER
    {
      name: "Branded Purrusaurus",
      oldValue: 2000,
      newValue: 1350,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: false,
      isCollectors: true,
    },
    {
      name: "Golden Ectenosaurus",
      oldValue: "80-150",
      newValue: "100-170",
      oldRarity: "1/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
    },
    {
      name: "Crossover Hybrid/Vinera",
      oldValue: 70,
      newValue: 45,
      oldRarity: "5/8",
      newRarity: "4/8",
      isIncrease: false,
      isCollectors: true,
    },
    {
      name: "Grayscale Fasolatherium",
      oldValue: 8,
      newValue: 105,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
    },
    {
      name: "Grayscale Albino Terror",
      oldValue: 10,
      newValue: 105,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
    },
    {
      name: "Grayscale Gelioichthys",
      oldValue: 5,
      newValue: 100,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
    },
    {
      name: "Grayscale Megavore",
      oldValue: 10,
      newValue: 85,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
    },
    {
      name: "Grayscale Alametus",
      oldValue: 10,
      newValue: 48,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
    },
    {
      name: "Grayscale Dolichomalosaurus",
      oldValue: 8,
      newValue: 60,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
    },
    {
      name: "Grayscale Avinychus",
      oldValue: 5,
      newValue: 60,
      oldRarity: "2/8",
      newRarity: "1/8",
      isIncrease: true,
      isCollectors: true,
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
              <CardTitle className="text-white text-xl font-light tracking-wide">
                Recent Value Changes - August 22, 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-green-400 text-lg font-light mb-4">-RISES-</h3>
                  <div className="space-y-2">
                    {changelogEntries
                      .filter((entry) => entry.isIncrease && !entry.isCollectors)
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
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
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
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-light">Gold Lily Saurolophus - NEW → 6 (2/8)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">DNA Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="font-light">1 Value = 8-12K DNA (10K Average)</span>
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
