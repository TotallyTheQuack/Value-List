"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Paintbrush, InfoIcon, BookOpen, HelpCircle, ChevronDown } from "lucide-react"
import Link from "next/link"
import { themes, loadTheme, saveTheme, DNA_CONVERSION_MIN, DNA_CONVERSION_MAX } from "@/lib/dino-data"

export default function Info() {
  const [theme, setTheme] = useState("dark")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => { setTheme(loadTheme()) }, [])

  const handleThemeChange = (key: string) => {
    setTheme(key)
    saveTheme(key)
    setDropdownOpen(false)
  }

  const t = themes[theme] || themes.dark

  const demandTiers = [
    { tier: "1/8", description: "Used for misc items; these skins typically have little to no value, with prices set by individual offers or low collector demand." },
    { tier: "2/8", description: "Rarely maintains its value and is likely to decrease in worth." },
    { tier: "3/8", description: "Occasionally retains its value but with difficulty." },
    { tier: "4/8", description: "Maintains value with some effort and occasional trading activity." },
    { tier: "5/8", description: "Consistently traded at its value on a daily basis." },
    { tier: "6/8", description: "Prioritized over items rated 5/8, with higher preference among traders; it can attract overpays from time to time." },
    { tier: "7/8", description: "Commands notable overpays and demonstrates very high demand." },
    { tier: "8/8", description: "Highly sought after, with strong indications of a potential future increase in value." },
  ]

  const missingReasons = [
    "It is not tradeable as a gamepass/badge",
    "Its demand or value is too low/high",
    "It hasn't been added yet",
  ]

  return (
    <div className={`min-h-screen ${t.background}`}>
      {/* Header */}
      <header className={`${t.headerBg} backdrop-blur-md border-b ${t.border} sticky top-0 z-50`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className={`${t.textPrimary} ${t.linkHover} transition-colors`}>
            <h1 className="text-xl font-bold">Dinosaur Simulator</h1>
            <p className={`text-xs ${t.textSecondary}`}>Information</p>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors`} aria-label="Choose Theme">
                <Paintbrush className="w-4 h-4" />
                <span className="hidden sm:inline">Themes</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg ${t.dropdownBg} border ${t.cardBorder} shadow-xl z-[200] max-h-72 overflow-y-auto`}>
                  <div className={`px-3 py-2 border-b ${t.border}`}>
                    <p className={`text-xs ${t.textSecondary}`}>Choose Theme</p>
                  </div>
                  {Object.entries(themes).map(([key, opt]) => (
                    <button type="button" key={key} onClick={() => handleThemeChange(key)} className={`w-full text-left px-3 py-2 text-sm ${t.textPrimary} ${t.buttonHover} transition-colors ${theme === key ? t.badgeBg : ""}`}>
                      {opt.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/" className={`px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors`}>Value List</Link>
            <Link href="/changelog" className={`px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors hidden sm:block`}>Changelog</Link>
            <Link href="/calculator" className={`px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors hidden sm:block`}>Calculator</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Demand Tier System */}
        <Card className={`${t.cardBg} ${t.cardBorder} border backdrop-blur-sm rounded-xl overflow-hidden`}>
          <CardHeader className={`${t.inputBg} ${t.cardBorder} border-b`}>
            <div className="flex items-center gap-3">
              <BookOpen className={`w-5 h-5 ${t.textAccent}`} />
              <div>
                <CardTitle className={`${t.textPrimary} text-xl font-bold`}>Demand Tier System</CardTitle>
                <p className={`${t.textSecondary} text-xs mt-1`}>Understanding trading demand and value stability</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {demandTiers.map((tier, i) => (
                <div key={i} className={`${t.inputBg} ${t.cardBorder} border rounded-xl p-4`}>
                  <div className="flex flex-col gap-2">
                    <Badge className={`text-xs ${t.rarityColors[tier.tier as keyof typeof t.rarityColors]} border shadow-sm w-fit font-bold`}>
                      {tier.tier}
                    </Badge>
                    <p className={`${t.textPrimary} text-xs leading-relaxed`}>{tier.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Missing Skins */}
          <Card className={`${t.cardBg} ${t.cardBorder} border backdrop-blur-sm rounded-xl overflow-hidden`}>
            <CardHeader className={`${t.inputBg} ${t.cardBorder} border-b`}>
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 ${t.textAccent}`} />
                <div>
                  <CardTitle className={`${t.textPrimary} text-lg font-bold`}>Missing Skins</CardTitle>
                  <p className={`${t.textSecondary} text-xs mt-0.5`}>Why some skins aren't listed</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {missingReasons.map((reason, i) => (
                <div key={i} className={`${t.inputBg} ${t.cardBorder} border rounded-lg p-3`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full ${t.badgeBg} flex items-center justify-center shrink-0`}>
                      <span className={`${t.badgeText} text-xs font-bold`}>{i + 1}</span>
                    </div>
                    <p className={`${t.textPrimary} text-sm leading-relaxed`}>{reason}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trading Guidelines */}
          <Card className={`${t.cardBg} ${t.cardBorder} border backdrop-blur-sm rounded-xl overflow-hidden`}>
            <CardHeader className={`${t.inputBg} ${t.cardBorder} border-b`}>
              <div className="flex items-center gap-3">
                <InfoIcon className={`w-5 h-5 ${t.textAccent}`} />
                <div>
                  <CardTitle className={`${t.textPrimary} text-lg font-bold`}>Trading Guidelines</CardTitle>
                  <p className={`${t.textSecondary} text-xs mt-0.5`}>Essential trading tips</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className={`${t.inputBg} ${t.cardBorder} border rounded-lg p-3`}>
                <h4 className={`${t.textAccent} font-semibold text-sm mb-1`}>Value Fluctuations</h4>
                <p className={`${t.textPrimary} text-xs leading-relaxed`}>
                  Values change based on market demand, updates, and community trends. Check the changelog before trading.
                </p>
              </div>
              <div className={`${t.inputBg} ${t.cardBorder} border rounded-lg p-3`}>
                <h4 className={`${t.textAccent} font-semibold text-sm mb-1`}>Rarity vs Demand</h4>
                <p className={`${t.textPrimary} text-xs leading-relaxed`}>
                  Higher rarity (8/8) doesn't always mean higher value. Demand is crucial in determining worth.
                </p>
              </div>
              <div className={`${t.inputBg} ${t.cardBorder} border rounded-lg p-3`}>
                <h4 className={`${t.textAccent} font-semibold text-sm mb-1`}>DNA Conversion</h4>
                <p className={`${t.textPrimary} text-xs leading-relaxed`}>
                  Current rate: {(DNA_CONVERSION_MIN / 1000).toFixed(0)}K-{(DNA_CONVERSION_MAX / 1000).toFixed(0)}K DNA = 1 Value. This rate may change with updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className={`${t.cardBg} ${t.cardBorder} border backdrop-blur-sm rounded-xl p-5 text-center`}>
          <p className={`${t.textSecondary} text-sm`}>
            Directly forked from the{" "}
            <a href="https://discord.gg/kNPy4jwMWj" target="_blank" rel="noopener noreferrer" className={`${t.textAccent} ${t.linkHover} transition-colors underline font-medium`}>
              Dinosaur Simulator Trading Network
            </a>{" "}
            Discord Server with slight changes.
          </p>
        </div>
      </main>
    </div>
  )
}
