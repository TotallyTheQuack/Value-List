"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Info() {
  const demandTiers = [
    {
      tier: "1/8",
      description:
        "Used for misc items; these skins typically have little to no value, with prices set by individual offers or low collector demand.",
      color: "bg-gray-600/80 text-gray-100",
    },
    {
      tier: "2/8",
      description: "Rarely maintains its value and is likely to decrease in worth.",
      color: "bg-indigo-600/80 text-indigo-100",
    },
    {
      tier: "3/8",
      description: "Occasionally retains its value but with difficulty.",
      color: "bg-blue-600/80 text-blue-100",
    },
    {
      tier: "5/8",
      description: "Consistently traded at its value on a daily basis.",
      color: "bg-yellow-600/80 text-yellow-100",
    },
    {
      tier: "6/8",
      description:
        "Prioritized over items rated 5/8, with higher preference among traders; it can attract overpays from time to time.",
      color: "bg-orange-600/80 text-orange-100",
    },
    {
      tier: "7/8",
      description: "Commands notable overpays and demonstrates very high demand.",
      color: "bg-red-600/80 text-red-100",
    },
    {
      tier: "8/8",
      description: "Highly sought after, with strong indications of a potential future increase in value.",
      color: "bg-purple-600/80 text-purple-100",
    },
  ]

  const missingReasons = [
    "It is not tradeable as a gamepass",
    "It's demand or value is too low",
    "It hasnt been added yet",
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-end gap-2 mb-4">
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

        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-white mb-3 tracking-wide">Value List</h1>
          <h2 className="text-xl font-extralight text-gray-400 mb-2">Info</h2>
          <p className="text-gray-400 text-sm mb-6">Detailed explanation of how the list demand works.</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto"></div>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">Main List demands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demandTiers.map((tier, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Badge className={`text-sm ${tier.color} border-0 shrink-0`}>{tier.tier}</Badge>
                    <p className="text-gray-300 text-sm font-light leading-relaxed">{tier.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl font-light tracking-wide">Missing skins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm font-light mb-4">
                Anything missing from above, despite being tradeable gamepass skins have their reasons:
              </p>
              <div className="space-y-2">
                {missingReasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-gray-400 text-sm font-light shrink-0">{index + 1}.</span>
                    <p className="text-gray-300 text-sm font-light">{reason}</p>
                  </div>
                ))}
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
