"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Clock, TrendingUp, TrendingDown, RefreshCw, Sparkles, ChevronDown } from "lucide-react"
import Link from "next/link"
import { themes, loadTheme, saveTheme } from "@/lib/dino-data"
import type { Theme } from "@/lib/dino-data"

const ValueChangeItem = ({
  name, oldValue, newValue, oldRarity, newRarity, theme, isDecrease,
}: {
  name: string; oldValue: string; newValue: string; oldRarity: string; newRarity: string; theme: Theme; isDecrease?: boolean
}) => {
  const color = isDecrease ? "text-red-400" : "text-green-400"
  const dot = isDecrease ? "bg-red-500" : "bg-green-500"
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} border p-4 rounded-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`font-semibold ${theme.textPrimary} text-sm`}>{name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`${color} text-xs`}>{oldValue} ({oldRarity}) → <span className="font-bold">{newValue}</span> ({newRarity})</span>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
      </div>
    </div>
  )
}

const TierAdjustmentCard = ({
  name, change, theme, isIncrease,
}: {
  name: string; change: string; theme: Theme; isIncrease: boolean
}) => {
  const textColor = isIncrease ? "text-green-300" : "text-red-300"
  const dot = isIncrease ? "bg-green-500" : "bg-red-500"
  return (
    <div className={`p-4 rounded-lg border ${theme.border} ${theme.cardBg}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${dot}`} />
        <h4 className={`font-semibold ${textColor} text-sm`}>{name}</h4>
      </div>
      <p className={`text-xs ${textColor}`}>{change}</p>
    </div>
  )
}

export default function ChangelogComponent() {
  const [theme, setTheme] = useState("dark")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => { setTheme(loadTheme()) }, [])

  const handleThemeChange = (key: string) => {
    setTheme(key)
    saveTheme(key)
    setDropdownOpen(false)
  }

  const t = themes[theme] || themes.dark

  return (
    <div className={`min-h-screen ${t.background}`}>
      {/* Header */}
      <header className={`${t.headerBg} backdrop-blur-md border-b ${t.border} sticky top-0 z-50`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className={`${t.textPrimary} ${t.linkHover} transition-colors`}>
            <h1 className="text-xl font-bold">Dinosaur Simulator</h1>
            <p className={`text-xs ${t.textSecondary}`}>Changelog</p>
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
            <Link href="/calculator" className={`px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors hidden sm:block`}>Calculator</Link>
            <Link href="/info" className={`px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors hidden sm:block`}>Info</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Card className={`${t.cardBg} ${t.cardBorder} border backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className={`text-3xl ${t.textPrimary} text-center`}>Changelog</CardTitle>
            <p className={`text-center ${t.textSecondary} mt-2 text-sm`}>Track all value updates and changes</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Banner */}
            <div className="p-5 bg-gradient-to-r from-red-900/30 to-orange-800/30 border border-red-600/30 rounded-lg">
              <h2 className="text-xl font-bold text-red-100 mb-2">LATEST VALUE UPDATE!</h2>
              <p className="text-red-200/80 text-sm leading-relaxed">
                Major market correction: Apparition Fossil Giganotosaurus soars to 570 value (8/8) and Eschaton
                Argentinosaurus reaches 470 value! Pitchygator surges to 175. DNA conversion decreased to 20-23K DNA per
                value, reflecting market stabilization after recent inflation. Several rarity adjustments and 2 new tradables added.
              </p>
            </div>

            {/* Increases */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className={`text-xl font-bold text-green-400`}>Value Increases</h3>
                <span className={`text-xs ${t.textSecondary}`}>21 items</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <ValueChangeItem name="Apparition Fossil Giganotosaurus" oldValue="440" newValue="570" oldRarity="8/8" newRarity="8/8" theme={t} />
                <ValueChangeItem name="Eschaton Argentinosaurus" oldValue="400" newValue="470" oldRarity="8/8" newRarity="8/8" theme={t} />
                <ValueChangeItem name="Pitch Wraith Terror" oldValue="280" newValue="290" oldRarity="8/8" newRarity="8/8" theme={t} />
                <ValueChangeItem name="Pitch Black Sunfish Shonisaurus" oldValue="210" newValue="220" oldRarity="6/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Wraith Terror" oldValue="180" newValue="190" oldRarity="6/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Pitchygator" oldValue="140" newValue="175" oldRarity="7/8" newRarity="7/8" theme={t} />
                <ValueChangeItem name="Hydralania" oldValue="160" newValue="165" oldRarity="6/8" newRarity="7/8" theme={t} />
                <ValueChangeItem name="Distorted King" oldValue="130" newValue="135" oldRarity="7/8" newRarity="8/8" theme={t} />
                <ValueChangeItem name="Pitch Black Moray Oxalaia" oldValue="120" newValue="122" oldRarity="6/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Cathedral Fasolatherium" oldValue="96" newValue="100" oldRarity="6/8" newRarity="7/8" theme={t} />
                <ValueChangeItem name="Nameless Barosaurus" oldValue="75" newValue="82" oldRarity="6/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Giant Albino Baryonyx" oldValue="68" newValue="70" oldRarity="6/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Aurora Borethalass" oldValue="49" newValue="62" oldRarity="6/8" newRarity="7/8" theme={t} />
                <ValueChangeItem name="Zomvinychus" oldValue="52" newValue="55" oldRarity="6/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Peak Spinosaurus" oldValue="30" newValue="30" oldRarity="5/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Butterfly Alametus" oldValue="26" newValue="26" oldRarity="5/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Carcharocles Megalodon" oldValue="25" newValue="28" oldRarity="5/8" newRarity="6/8" theme={t} />
                <ValueChangeItem name="Kaiju Gelioichthys" oldValue="24" newValue="26" oldRarity="5/8" newRarity="5/8" theme={t} />
                <ValueChangeItem name="Chaos Titanosaur" oldValue="11" newValue="13" oldRarity="3/8" newRarity="3/8" theme={t} />
                <ValueChangeItem name="Nidhogg" oldValue="8" newValue="10" oldRarity="3/8" newRarity="3/8" theme={t} />
                <ValueChangeItem name="Violex Parvulus" oldValue="8" newValue="9" oldRarity="2/8" newRarity="3/8" theme={t} />
              </div>
            </div>

            {/* Decreases */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <h3 className={`text-xl font-bold text-red-400`}>Value Decreases</h3>
                <span className={`text-xs ${t.textSecondary}`}>11 items</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <ValueChangeItem name="Pitch Black Baryonyx" oldValue="200" newValue="200" oldRarity="6/8" newRarity="5/8" theme={t} isDecrease />
                <ValueChangeItem name="Fallen Gladiator" oldValue="135" newValue="135" oldRarity="7/8" newRarity="6/8" theme={t} isDecrease />
                <ValueChangeItem name="Isisauriraptor" oldValue="122" newValue="115" oldRarity="6/8" newRarity="6/8" theme={t} isDecrease />
                <ValueChangeItem name="Orca Spinosaurus" oldValue="85" newValue="80" oldRarity="6/8" newRarity="6/8" theme={t} isDecrease />
                <ValueChangeItem name="Reaper Gelioichthys" oldValue="72" newValue="69" oldRarity="7/8" newRarity="6/8" theme={t} isDecrease />
                <ValueChangeItem name="Pitch Black Terror" oldValue="70" newValue="67" oldRarity="6/8" newRarity="6/7" theme={t} isDecrease />
                <ValueChangeItem name="Pitch Luminescent Avinychus" oldValue="60" newValue="54" oldRarity="5/8" newRarity="5/8" theme={t} isDecrease />
                <ValueChangeItem name="Spectre Fossil Megavore" oldValue="28" newValue="27" oldRarity="4/8" newRarity="4/8" theme={t} isDecrease />
                <ValueChangeItem name="Rakebaby Guanlong" oldValue="24" newValue="23" oldRarity="4/8" newRarity="4/8" theme={t} isDecrease />
                <ValueChangeItem name="Masquerade Gigantoraptor" oldValue="22" newValue="18" oldRarity="4/8" newRarity="4/8" theme={t} isDecrease />
                <ValueChangeItem name="Lil UFO Pteranodon" oldValue="13" newValue="10" oldRarity="2/8" newRarity="2/8" theme={t} isDecrease />
              </div>
            </div>

            {/* Tier Adjustments */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-5 h-5 text-orange-500" />
                <h3 className={`text-xl font-bold text-orange-400`}>Tier Adjustments</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TierAdjustmentCard name="Blue Whale Shastasaurus" change="140 (7/8) → 155 (6/8)" theme={t} isIncrease />
                <TierAdjustmentCard name="Movie Mosasaurus" change="70 (7/8) → 70 (6/8)" theme={t} isIncrease={false} />
                <TierAdjustmentCard name="Pitch Coconut Brachiosaurus" change="42 (4/8) → 40 (4/8)" theme={t} isIncrease={false} />
                <TierAdjustmentCard name="Kaiju Spinofaarus" change="36 (5/8) → 38 (5/8)" theme={t} isIncrease />
                <TierAdjustmentCard name="Spinofaarus" change="35 (5/8) → 36 (5/8)" theme={t} isIncrease />
                <TierAdjustmentCard name="Kaiju Sauroposeidon" change="11 (3/8) → 10 (3/8)" theme={t} isIncrease={false} />
                <TierAdjustmentCard name="Pumpkin Megalodon" change="5 (1/8) → 3 (1/8)" theme={t} isIncrease={false} />
                <TierAdjustmentCard name="Singulafaarus" change="8 (3/8) → 9 (3/8)" theme={t} isIncrease />
              </div>
            </div>

            {/* New Tradables */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h3 className={`text-xl font-bold text-cyan-400`}>New Tradables</h3>
                <span className={`text-xs ${t.textSecondary}`}>2 new skins added</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`p-4 rounded-lg border ${t.border} ${t.cardBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold text-sm ${t.textPrimary}`}>Pitch Black Shantungosaurus</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${t.badgeBg} ${t.badgeText}`}>12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">3/8</span>
                    <span className={`text-xs ${t.textSecondary}`}>D Tier</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${t.border} ${t.cardBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold text-sm ${t.textPrimary}`}>Blinding White Shantungosaurus</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${t.badgeBg} ${t.badgeText}`}>8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">2/8</span>
                    <span className={`text-xs ${t.textSecondary}`}>E Tier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DNA Conversion */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-red-500" />
                <h3 className={`text-xl font-bold text-red-400`}>DNA Conversion</h3>
              </div>
              <div className={`p-5 rounded-lg border ${t.border} ${t.cardBg}`}>
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <h4 className={`font-bold ${t.textPrimary}`}>Value Decrease</h4>
                </div>
                <div className="flex items-center gap-3 text-lg font-bold mb-2 flex-wrap">
                  <span className="text-red-400">9-11K DNA = 1 Value</span>
                  <span className={t.textSecondary}>→</span>
                  <span className="text-red-500">20-23K DNA = 1 Value</span>
                </div>
                <p className={`text-xs ${t.textSecondary} italic`}>
                  Higher DNA per value indicates market stabilization after recent inflation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
