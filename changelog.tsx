"use client"

import { useState, useEffect } from "react"
import { Paintbrush, TrendingUp, TrendingDown, RefreshCw, Sparkles, ChevronDown, Dna } from "lucide-react"
import Link from "next/link"
import { themes, loadTheme, saveTheme } from "@/lib/dino-data"
import type { Theme } from "@/lib/dino-data"

const ValueChangeItem = ({
  name, oldValue, newValue, oldRarity, newRarity, theme, isDecrease,
}: {
  name: string; oldValue: string; newValue: string; oldRarity: string; newRarity: string; theme: Theme; isDecrease?: boolean
}) => {
  const color = isDecrease ? "text-red-400" : "text-emerald-400"
  const dot = isDecrease ? "bg-red-500" : "bg-emerald-500"
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} border rounded-xl p-3.5`}>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h4 className={`font-medium ${theme.textPrimary} text-sm truncate`}>{name}</h4>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`${theme.textSecondary} text-xs font-mono`}>{oldValue}</span>
            <span className={`${theme.textSecondary} text-[10px]`}>({oldRarity})</span>
            <span className={`${theme.textSecondary} text-xs`}>{">"}</span>
            <span className={`${color} text-xs font-bold font-mono`}>{newValue}</span>
            <span className={`${theme.textSecondary} text-[10px]`}>({newRarity})</span>
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
  const textColor = isIncrease ? "text-emerald-400" : "text-red-400"
  const dot = isIncrease ? "bg-emerald-500" : "bg-red-500"
  return (
    <div className={`rounded-xl border ${theme.border} ${theme.cardBg} p-3.5`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <h4 className={`font-medium ${textColor} text-sm`}>{name}</h4>
      </div>
      <p className={`text-xs ${textColor} font-mono ml-3.5`}>{change}</p>
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
      <header className={`${t.headerBg} backdrop-blur-xl border-b ${t.border} sticky top-0 z-50`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className={`${t.textPrimary} ${t.linkHover} transition-colors`}>
            <h1 className="text-lg font-bold tracking-tight">Dinosaur Simulator</h1>
            <p className={`text-[10px] ${t.textSecondary} uppercase tracking-wider`}>Changelog</p>
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
            <Link href="/calculator" className={`px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border hidden sm:block`}>Calculator</Link>
            <Link href="/info" className={`px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border hidden sm:block`}>Info</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Page Header */}
        <div className="text-center py-4">
          <h2 className={`text-2xl font-bold ${t.textPrimary} tracking-tight`}>Changelog</h2>
          <p className={`text-xs ${t.textSecondary} mt-1`}>Track all value updates and market changes</p>
        </div>

        {/* Banner */}
        <div className={`${t.cardBg} border border-red-500/20 rounded-2xl overflow-hidden`}>
          <div className="h-1 bg-red-500/40" />
          <div className="p-5">
            <h3 className="text-sm font-bold text-red-300 mb-2 uppercase tracking-wider">Latest Value Update</h3>
            <p className={`${t.textSecondary} text-xs leading-relaxed`}>
              Major market correction: Apparition Fossil Giganotosaurus soars to 570 value (8/8) and Eschaton
              Argentinosaurus reaches 470 value. Pitchygator surges to 175. DNA conversion decreased to 20-23K DNA per
              value, reflecting market stabilization after recent inflation. Several rarity adjustments and 2 new tradables added.
            </p>
          </div>
        </div>

        {/* Increases */}
        <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-emerald-400">Value Increases</h3>
            <span className={`text-[10px] ${t.textSecondary} ml-auto font-mono`}>21 items</span>
          </div>
          <div className="p-4 grid gap-2 sm:grid-cols-2">
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
        </section>

        {/* Decreases */}
        <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
            <TrendingDown className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-semibold text-red-400">Value Decreases</h3>
            <span className={`text-[10px] ${t.textSecondary} ml-auto font-mono`}>11 items</span>
          </div>
          <div className="p-4 grid gap-2 sm:grid-cols-2">
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
        </section>

        {/* Tier Adjustments */}
        <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
            <RefreshCw className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-amber-400">Tier Adjustments</h3>
          </div>
          <div className="p-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <TierAdjustmentCard name="Blue Whale Shastasaurus" change="140 (7/8) > 155 (6/8)" theme={t} isIncrease />
            <TierAdjustmentCard name="Movie Mosasaurus" change="70 (7/8) > 70 (6/8)" theme={t} isIncrease={false} />
            <TierAdjustmentCard name="Pitch Coconut Brachiosaurus" change="42 (4/8) > 40 (4/8)" theme={t} isIncrease={false} />
            <TierAdjustmentCard name="Kaiju Spinofaarus" change="36 (5/8) > 38 (5/8)" theme={t} isIncrease />
            <TierAdjustmentCard name="Spinofaarus" change="35 (5/8) > 36 (5/8)" theme={t} isIncrease />
            <TierAdjustmentCard name="Kaiju Sauroposeidon" change="11 (3/8) > 10 (3/8)" theme={t} isIncrease={false} />
            <TierAdjustmentCard name="Pumpkin Megalodon" change="5 (1/8) > 3 (1/8)" theme={t} isIncrease={false} />
            <TierAdjustmentCard name="Singulafaarus" change="8 (3/8) > 9 (3/8)" theme={t} isIncrease />
          </div>
        </section>

        {/* New Tradables */}
        <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <h3 className="text-sm font-semibold text-cyan-400">New Tradables</h3>
            <span className={`text-[10px] ${t.textSecondary} ml-auto font-mono`}>2 new</span>
          </div>
          <div className="p-4 grid gap-2 sm:grid-cols-2">
            <div className={`rounded-xl border ${t.border} ${t.inputBg} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium text-sm ${t.textPrimary}`}>Pitch Black Shantungosaurus</h4>
                <span className={`font-bold text-sm ${t.textAccent} font-mono`}>12</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">3/8</span>
                <span className={`text-[10px] ${t.textSecondary}`}>D Tier</span>
              </div>
            </div>
            <div className={`rounded-xl border ${t.border} ${t.inputBg} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium text-sm ${t.textPrimary}`}>Blinding White Shantungosaurus</h4>
                <span className={`font-bold text-sm ${t.textAccent} font-mono`}>8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">2/8</span>
                <span className={`text-[10px] ${t.textSecondary}`}>E Tier</span>
              </div>
            </div>
          </div>
        </section>

        {/* DNA Conversion */}
        <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
            <Dna className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-semibold text-red-400">DNA Conversion Rate Change</h3>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 text-sm font-bold flex-wrap font-mono">
              <span className="text-red-400">9-11K = 1 Value</span>
              <span className={`${t.textSecondary} text-xs`}>{">"}</span>
              <span className="text-red-500">20-23K = 1 Value</span>
            </div>
            <p className={`text-[10px] ${t.textSecondary} mt-2 italic`}>Higher DNA per value indicates market stabilization after recent inflation</p>
          </div>
        </section>
      </main>
    </div>
  )
}
