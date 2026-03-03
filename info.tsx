"use client"

import { useState, useEffect } from "react"
import { Paintbrush, BookOpen, HelpCircle, ChevronDown, Shield, Dna } from "lucide-react"
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
    { tier: "1/8", description: "Misc items with little to no value. Prices set by individual offers or low collector demand." },
    { tier: "2/8", description: "Rarely maintains its value and is likely to decrease in worth." },
    { tier: "3/8", description: "Occasionally retains its value but with difficulty." },
    { tier: "4/8", description: "Maintains value with some effort and occasional trading activity." },
    { tier: "5/8", description: "Consistently traded at its value on a daily basis." },
    { tier: "6/8", description: "Prioritized over 5/8 items. Can attract overpays from time to time." },
    { tier: "7/8", description: "Commands notable overpays and demonstrates very high demand." },
    { tier: "8/8", description: "Highly sought after. Strong indications of future value increase." },
  ]

  return (
    <div className={`min-h-screen ${t.background}`}>
      <header className={`${t.headerBg} backdrop-blur-xl border-b ${t.border} sticky top-0 z-50`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className={`${t.textPrimary} ${t.linkHover} transition-colors`}>
            <h1 className="text-lg font-bold tracking-tight">Dinosaur Simulator</h1>
            <p className={`text-[10px] ${t.textSecondary} uppercase tracking-wider`}>Information</p>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border`} aria-label="Choose Theme">
                <Paintbrush className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Themes</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl ${t.dropdownBg} border ${t.cardBorder} shadow-2xl z-[200] max-h-72 overflow-y-auto`}>
                  <div className={`px-3 py-2 border-b ${t.border}`}>
                    <p className={`text-[10px] ${t.textSecondary} uppercase tracking-wider`}>Appearance</p>
                  </div>
                  {Object.entries(themes).map(([key, opt]) => (
                    <button type="button" key={key} onClick={() => handleThemeChange(key)} className={`w-full text-left px-3 py-2 text-sm ${t.textPrimary} ${t.buttonHover} transition-colors ${theme === key ? t.badgeBg : ""}`}>
                      {opt.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/" className={`px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border`}>Value List</Link>
            <Link href="/changelog" className={`px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border hidden sm:block`}>Changelog</Link>
            <Link href="/calculator" className={`px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border hidden sm:block`}>Calculator</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Page Header */}
        <div className="text-center py-4">
          <h2 className={`text-2xl font-bold ${t.textPrimary} tracking-tight`}>Information</h2>
          <p className={`text-xs ${t.textSecondary} mt-1`}>Understanding trading demand, values, and how this list works</p>
        </div>

        {/* Demand Tier System */}
        <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
            <BookOpen className={`w-4 h-4 ${t.textAccent}`} />
            <div>
              <h3 className={`text-sm font-semibold ${t.textPrimary}`}>Demand Tier System</h3>
              <p className={`text-[10px] ${t.textSecondary}`}>How trading demand and value stability works</p>
            </div>
          </div>
          <div className="p-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {demandTiers.map((tier, i) => (
              <div key={i} className={`${t.inputBg} ${t.cardBorder} border rounded-xl p-3.5`}>
                <span className={`text-[10px] px-2 py-0.5 rounded-md ${t.rarityColors[tier.tier as keyof typeof t.rarityColors]} border font-bold inline-block mb-2`}>{tier.tier}</span>
                <p className={`${t.textPrimary} text-xs leading-relaxed`}>{tier.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Missing Skins */}
          <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
            <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
              <HelpCircle className={`w-4 h-4 ${t.textAccent}`} />
              <div>
                <h3 className={`text-sm font-semibold ${t.textPrimary}`}>Missing Skins</h3>
                <p className={`text-[10px] ${t.textSecondary}`}>Why some skins are not listed</p>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {[
                "It is not tradeable as a gamepass/badge",
                "Its demand or value is too low/high",
                "It hasn't been added yet",
              ].map((reason, i) => (
                <div key={i} className={`${t.inputBg} ${t.cardBorder} border rounded-xl p-3.5 flex items-start gap-3`}>
                  <div className={`w-5 h-5 rounded-lg ${t.badgeBg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <span className={`${t.badgeText} text-[10px] font-bold font-mono`}>{i + 1}</span>
                  </div>
                  <p className={`${t.textPrimary} text-xs leading-relaxed`}>{reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Trading Guidelines */}
          <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
            <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
              <Shield className={`w-4 h-4 ${t.textAccent}`} />
              <div>
                <h3 className={`text-sm font-semibold ${t.textPrimary}`}>Trading Guidelines</h3>
                <p className={`text-[10px] ${t.textSecondary}`}>Essential trading tips</p>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {[
                { title: "Value Fluctuations", desc: "Values change based on market demand, updates, and community trends. Check the changelog before trading." },
                { title: "Rarity vs Demand", desc: "Higher rarity (8/8) doesn't always mean higher value. Demand is crucial in determining worth." },
                { title: "DNA Conversion", desc: `Current rate: ${(DNA_CONVERSION_MIN / 1000).toFixed(0)}K-${(DNA_CONVERSION_MAX / 1000).toFixed(0)}K DNA = 1 Value. This rate may change with updates.` },
              ].map((item, i) => (
                <div key={i} className={`${t.inputBg} ${t.cardBorder} border rounded-xl p-3.5`}>
                  <h4 className={`${t.textAccent} font-semibold text-xs mb-1`}>{item.title}</h4>
                  <p className={`${t.textPrimary} text-xs leading-relaxed`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className={`${t.cardBg} ${t.cardBorder} border rounded-2xl p-5 text-center`}>
          <p className={`${t.textSecondary} text-xs`}>
            Forked from the{" "}
            <a href="https://discord.gg/kNPy4jwMWj" target="_blank" rel="noopener noreferrer" className={`${t.textAccent} ${t.linkHover} transition-colors underline underline-offset-2 font-medium`}>
              Dinosaur Simulator Trading Network
            </a>{" "}
            Discord server
          </p>
        </div>
      </main>
    </div>
  )
}
