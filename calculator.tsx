"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Plus, X, ArrowLeftRight, Paintbrush, ChevronDown, Search, Dna, Calculator } from "lucide-react"
import Link from "next/link"
import {
  themes,
  allDinosaurs,
  parseValue,
  getTierLetter,
  getTierColor,
  loadTheme,
  saveTheme,
  DNA_CONVERSION_MIN,
  DNA_CONVERSION_MAX,
} from "@/lib/dino-data"
import type { Dinosaur } from "@/lib/dino-data"

interface TradeSlot {
  dinosaur: Dinosaur | null
}

export default function TradeCalculator() {
  const [theme, setTheme] = useState("dark")
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const [yourSlots, setYourSlots] = useState<TradeSlot[]>(Array(9).fill(null).map(() => ({ dinosaur: null })))
  const [theirSlots, setTheirSlots] = useState<TradeSlot[]>(Array(9).fill(null).map(() => ({ dinosaur: null })))
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSide, setModalSide] = useState<"your" | "their">("your")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDino, setSelectedDino] = useState<Dinosaur | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [valueAmount, setValueAmount] = useState("")
  const [dinoSearchQuery, setDinoSearchQuery] = useState("")
  const [selectedDinoForDna, setSelectedDinoForDna] = useState<Dinosaur | null>(null)
  const [showDinoResults, setShowDinoResults] = useState(false)
  const dinoSearchRef = useRef<HTMLDivElement>(null)

  const t = themes[theme] || themes.dark

  useEffect(() => {
    setTheme(loadTheme())
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dinoSearchRef.current && !dinoSearchRef.current.contains(e.target as Node)) {
        setShowDinoResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    saveTheme(newTheme)
    setThemeDropdownOpen(false)
  }

  const filteredDinos = useMemo(() => {
    if (!searchQuery.trim()) return [...allDinosaurs].sort((a, b) => a.name.localeCompare(b.name))
    const q = searchQuery.toLowerCase()
    return allDinosaurs.filter((d) => d.name.toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name))
  }, [searchQuery])

  const dinoSearchResults = useMemo(() => {
    if (!dinoSearchQuery.trim()) return []
    const q = dinoSearchQuery.toLowerCase()
    return allDinosaurs.filter((d) => d.name.toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name)).slice(0, 8)
  }, [dinoSearchQuery])

  const yourTotal = useMemo(() => yourSlots.reduce((sum, s) => s.dinosaur ? sum + parseValue(s.dinosaur.value) : sum, 0), [yourSlots])
  const theirTotal = useMemo(() => theirSlots.reduce((sum, s) => s.dinosaur ? sum + parseValue(s.dinosaur.value) : sum, 0), [theirSlots])
  const valueDifference = theirTotal - yourTotal
  const yourFilledSlots = yourSlots.filter((s) => s.dinosaur !== null).length
  const theirFilledSlots = theirSlots.filter((s) => s.dinosaur !== null).length

  const openModal = (side: "your" | "their") => {
    setModalSide(side)
    setSearchQuery("")
    setSelectedDino(null)
    setQuantity(1)
    setModalOpen(true)
  }

  const addDinosaurToSlot = () => {
    if (!selectedDino) return
    const slots = modalSide === "your" ? [...yourSlots] : [...theirSlots]
    const emptyIndices: number[] = []
    for (let i = 0; i < slots.length; i++) {
      if (!slots[i].dinosaur) emptyIndices.push(i)
    }
    const slotsToFill = Math.min(quantity, emptyIndices.length)
    if (slotsToFill === 0) return
    for (let i = 0; i < slotsToFill; i++) {
      slots[emptyIndices[i]] = { dinosaur: selectedDino }
    }
    if (modalSide === "your") setYourSlots(slots)
    else setTheirSlots(slots)
    setModalOpen(false)
  }

  const removeFromSlot = (side: "your" | "their", index: number) => {
    if (side === "your") {
      const slots = [...yourSlots]
      slots[index] = { dinosaur: null }
      setYourSlots(slots)
    } else {
      const slots = [...theirSlots]
      slots[index] = { dinosaur: null }
      setTheirSlots(slots)
    }
  }

  const clearSide = (side: "your" | "their") => {
    const empty = Array(9).fill(null).map(() => ({ dinosaur: null }))
    if (side === "your") setYourSlots(empty)
    else setTheirSlots(empty)
  }

  const valueToDnaMin = valueAmount ? Number.parseFloat(valueAmount) * DNA_CONVERSION_MIN : 0
  const valueToDnaMax = valueAmount ? Number.parseFloat(valueAmount) * DNA_CONVERSION_MAX : 0
  const dinoToDnaMin = selectedDinoForDna ? parseValue(selectedDinoForDna.value) * DNA_CONVERSION_MIN : 0
  const dinoToDnaMax = selectedDinoForDna ? parseValue(selectedDinoForDna.value) * DNA_CONVERSION_MAX : 0

  const renderSlot = (slot: TradeSlot, index: number, side: "your" | "their") => {
    if (slot.dinosaur) {
      const tierLetter = getTierLetter(slot.dinosaur.tier)
      const tierColor = getTierColor(slot.dinosaur.tier)
      return (
        <div key={index} className={`relative ${t.cardBg} border ${t.cardBorder} rounded-xl p-2.5 flex flex-col justify-between min-h-[84px] group`}>
          <button
            type="button"
            onClick={() => removeFromSlot(side, index)}
            className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-500/0 group-hover:bg-red-500/20 text-red-400/0 group-hover:text-red-400 transition-all"
            aria-label={`Remove ${slot.dinosaur.name}`}
          >
            <X className="w-3 h-3" />
          </button>
          <div>
            <span className={`text-[10px] font-bold ${tierColor} font-mono`}>{tierLetter}</span>
            <p className={`${t.textPrimary} text-[11px] font-medium leading-tight mt-0.5 pr-4`}>{slot.dinosaur.name}</p>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className={`text-[10px] font-bold ${t.textAccent} font-mono`}>{slot.dinosaur.value}</span>
            {slot.dinosaur.rarity && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${t.rarityColors[slot.dinosaur.rarity as keyof typeof t.rarityColors] || t.badgeBg} border font-bold`}>{slot.dinosaur.rarity}</span>
            )}
          </div>
        </div>
      )
    }
    return (
      <button
        key={index}
        type="button"
        onClick={() => openModal(side)}
        className={`border border-dashed ${t.border} rounded-xl flex items-center justify-center min-h-[84px] ${t.buttonHover} transition-all cursor-pointer hover:border-solid`}
        aria-label={`Add dinosaur to ${side} slot ${index + 1}`}
      >
        <Plus className={`w-4 h-4 ${t.textSecondary}`} />
      </button>
    )
  }

  return (
    <div className={`min-h-screen ${t.background}`}>
      {/* Header */}
      <header className={`${t.headerBg} backdrop-blur-xl border-b ${t.border} sticky top-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className={`${t.textPrimary} ${t.linkHover} transition-colors`}>
            <h1 className="text-lg font-bold tracking-tight">Dinosaur Simulator</h1>
            <p className={`text-[10px] ${t.textSecondary} uppercase tracking-wider`}>Trade Calculator</p>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors ${t.border} border`}
                aria-label="Choose Theme"
              >
                <Paintbrush className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs">Themes</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${themeDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {themeDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl ${t.dropdownBg} border ${t.cardBorder} shadow-2xl z-[200] max-h-72 overflow-y-auto`}>
                  <div className={`px-3 py-2 border-b ${t.border}`}>
                    <p className={`text-[10px] ${t.textSecondary} uppercase tracking-wider`}>Appearance</p>
                  </div>
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <button type="button" key={key} onClick={() => handleThemeChange(key)} className={`w-full text-left px-3 py-2 text-sm ${t.textPrimary} ${t.buttonHover} transition-colors ${theme === key ? t.badgeBg : ""}`}>
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/" className={`px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border`}>Value List</Link>
            <Link href="/changelog" className={`px-3 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border hidden sm:block`}>Changelog</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        {/* Trade Calculator */}
        <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
            <Calculator className={`w-4 h-4 ${t.textAccent}`} />
            <h2 className={`text-base font-semibold ${t.textPrimary} tracking-tight`}>Trade Calculator</h2>
          </div>

          <div className="p-5">
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              {/* Your Side */}
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-semibold ${t.textPrimary}`}>Your Offer</h3>
                  <span className={`text-xs ${t.textSecondary} font-mono`}>{yourFilledSlots}/9</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {yourSlots.map((slot, i) => renderSlot(slot, i, "your"))}
                </div>
                <div className={`mt-3 ${t.inputBg} border ${t.inputBorder} rounded-xl py-2.5 text-center`}>
                  <span className={`font-bold ${t.textAccent} font-mono text-sm`}>{yourTotal.toFixed(1)}</span>
                  <span className={`text-xs ${t.textSecondary} ml-1.5`}>total value</span>
                </div>
                <button type="button" onClick={() => clearSide("your")} className={`w-full mt-2 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border`}>Clear</button>
              </div>

              <div className="flex items-center justify-center lg:pt-20 py-2">
                <div className={`w-9 h-9 rounded-full ${t.badgeBg} flex items-center justify-center border ${t.border}`}>
                  <ArrowLeftRight className={`w-4 h-4 ${t.textSecondary}`} />
                </div>
              </div>

              {/* Their Side */}
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-semibold ${t.textPrimary}`}>Their Offer</h3>
                  <span className={`text-xs ${t.textSecondary} font-mono`}>{theirFilledSlots}/9</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {theirSlots.map((slot, i) => renderSlot(slot, i, "their"))}
                </div>
                <div className={`mt-3 ${t.inputBg} border ${t.inputBorder} rounded-xl py-2.5 text-center`}>
                  <span className={`font-bold ${t.textAccent} font-mono text-sm`}>{theirTotal.toFixed(1)}</span>
                  <span className={`text-xs ${t.textSecondary} ml-1.5`}>total value</span>
                </div>
                <button type="button" onClick={() => clearSide("their")} className={`w-full mt-2 py-2 rounded-xl ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-xs transition-colors ${t.border} border`}>Clear</button>
              </div>
            </div>

            {/* Result */}
            <div className={`mt-5 p-4 rounded-xl border text-center ${
              yourTotal === 0 && theirTotal === 0
                ? `${t.border} ${t.inputBg}`
                : valueDifference > 0
                  ? "border-emerald-500/30 bg-emerald-500/8"
                  : valueDifference < 0
                    ? "border-red-500/30 bg-red-500/8"
                    : "border-amber-500/30 bg-amber-500/8"
            }`}>
              {yourTotal === 0 && theirTotal === 0 ? (
                <p className={`${t.textSecondary} text-sm`}>Add dinosaurs to compare trade values</p>
              ) : valueDifference > 0 ? (
                <p className="text-emerald-400 font-bold text-base">You gain <span className="font-mono">{valueDifference.toFixed(1)}</span> value</p>
              ) : valueDifference < 0 ? (
                <p className="text-red-400 font-bold text-base">You lose <span className="font-mono">{Math.abs(valueDifference).toFixed(1)}</span> value</p>
              ) : (
                <p className="text-amber-400 font-bold text-base">Even trade</p>
              )}
            </div>
          </div>
        </section>

        {/* DNA Converters */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Dino to DNA */}
          <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
            <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
              <Dna className={`w-4 h-4 ${t.textAccent}`} />
              <div>
                <h2 className={`text-sm font-semibold ${t.textPrimary}`}>Dino to DNA</h2>
                <p className={`text-[10px] ${t.textSecondary}`}>Search a dinosaur to see its DNA worth</p>
              </div>
            </div>
            <div className="p-5">
              <div className="relative" ref={dinoSearchRef}>
                <div className={`flex items-center gap-2 ${t.inputBg} border ${t.inputBorder} rounded-xl px-3 py-2.5`}>
                  <Search className={`w-4 h-4 ${t.textSecondary} shrink-0`} />
                  <input
                    type="text"
                    value={dinoSearchQuery}
                    onChange={(e) => { setDinoSearchQuery(e.target.value); setShowDinoResults(true); if (!e.target.value.trim()) setSelectedDinoForDna(null) }}
                    onFocus={() => { if (dinoSearchQuery.trim()) setShowDinoResults(true) }}
                    placeholder="Type a dinosaur name..."
                    className={`bg-transparent outline-none w-full ${t.textPrimary} text-sm`}
                  />
                  {dinoSearchQuery && (
                    <button type="button" onClick={() => { setDinoSearchQuery(""); setSelectedDinoForDna(null); setShowDinoResults(false) }} className={`${t.textSecondary}`} aria-label="Clear search">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {showDinoResults && dinoSearchResults.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 mt-1.5 ${t.dropdownBg} border ${t.cardBorder} rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto`}>
                    {dinoSearchResults.map((dino) => (
                      <button
                        type="button"
                        key={dino.name}
                        onClick={() => { setSelectedDinoForDna(dino); setDinoSearchQuery(dino.name); setShowDinoResults(false) }}
                        className={`w-full text-left px-3 py-2.5 flex items-center justify-between ${t.buttonHover} transition-colors first:rounded-t-xl last:rounded-b-xl`}
                      >
                        <span className={`${t.textPrimary} text-sm`}>{dino.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${t.textAccent} font-mono`}>{dino.value}</span>
                          <span className={`text-[10px] font-bold ${getTierColor(dino.tier)}`}>{getTierLetter(dino.tier)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selectedDinoForDna && (
                <div className={`mt-4 p-4 rounded-xl ${t.inputBg} border ${t.inputBorder}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${t.textPrimary} text-sm`}>{selectedDinoForDna.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${t.rarityColors[selectedDinoForDna.rarity as keyof typeof t.rarityColors] || t.badgeBg} border font-bold`}>{selectedDinoForDna.rarity}</span>
                  </div>
                  <div className={`flex items-center gap-3 text-xs ${t.textSecondary}`}>
                    <span>Value: <span className={`font-bold ${t.textAccent} font-mono`}>{selectedDinoForDna.value}</span></span>
                    <span className={`${getTierColor(selectedDinoForDna.tier)} font-bold`}>{selectedDinoForDna.tier} Tier</span>
                  </div>
                  <div className={`mt-3 pt-3 border-t ${t.border}`}>
                    <p className={`text-[10px] ${t.textSecondary} uppercase tracking-wider mb-1`}>DNA Equivalent</p>
                    <p className={`text-base font-bold ${t.textAccent} font-mono`}>{dinoToDnaMin.toLocaleString()} - {dinoToDnaMax.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Value to DNA */}
          <section className={`${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden`}>
            <div className={`px-5 py-4 border-b ${t.border} flex items-center gap-2.5`}>
              <Dna className={`w-4 h-4 ${t.textAccent}`} />
              <div>
                <h2 className={`text-sm font-semibold ${t.textPrimary}`}>Value to DNA</h2>
                <p className={`text-[10px] ${t.textSecondary}`}>Enter any value to convert to DNA</p>
              </div>
            </div>
            <div className="p-5">
              <div className={`flex items-center gap-2 ${t.inputBg} border ${t.inputBorder} rounded-xl px-3 py-2.5`}>
                <span className={`text-xs ${t.textSecondary} shrink-0`}>Value:</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={valueAmount}
                  onChange={(e) => setValueAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                  placeholder="0"
                  className={`bg-transparent outline-none w-full ${t.textPrimary} text-sm font-mono`}
                />
              </div>
              {valueAmount && Number.parseFloat(valueAmount) > 0 && (
                <div className={`mt-4 p-4 rounded-xl ${t.inputBg} border ${t.inputBorder}`}>
                  <p className={`text-[10px] ${t.textSecondary} uppercase tracking-wider mb-1`}>DNA Equivalent</p>
                  <p className={`text-base font-bold ${t.textAccent} font-mono`}>{valueToDnaMin.toLocaleString()} - {valueToDnaMax.toLocaleString()}</p>
                  <p className={`text-[10px] ${t.textSecondary} mt-2 font-mono`}>Rate: {(DNA_CONVERSION_MIN / 1000).toFixed(0)}K-{(DNA_CONVERSION_MAX / 1000).toFixed(0)}K DNA per 1 value</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Add Dinosaur Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className={`relative w-full max-w-md ${t.cardBg} border ${t.cardBorder} rounded-2xl shadow-2xl overflow-hidden`}>
            <div className={`flex items-center justify-between px-5 py-4 border-b ${t.border}`}>
              <h3 className={`text-sm font-semibold ${t.textPrimary}`}>Add Dinosaur</h3>
              <button type="button" onClick={() => setModalOpen(false)} className={`${t.textSecondary} p-1 rounded-lg ${t.buttonHover} transition-colors`} aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <div className={`flex items-center gap-2 ${t.inputBg} border ${t.inputBorder} rounded-xl px-3 py-2.5 mb-3`}>
                <Search className={`w-4 h-4 ${t.textSecondary}`} />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search dinosaur..." className={`bg-transparent outline-none w-full ${t.textPrimary} text-sm`} autoFocus />
              </div>
              <div className="max-h-56 overflow-y-auto space-y-0.5 mb-4">
                {filteredDinos.slice(0, 50).map((dino) => (
                  <button
                    type="button"
                    key={`${dino.name}-${dino.tier}`}
                    onClick={() => setSelectedDino(dino)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      selectedDino?.name === dino.name && selectedDino?.tier === dino.tier
                        ? `${t.badgeBg} ${t.textPrimary} border ${t.border}`
                        : `${t.buttonHover} ${t.textPrimary} border border-transparent`
                    }`}
                  >
                    <span className="text-sm">{dino.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${t.textAccent} font-mono`}>{dino.value}</span>
                      {dino.rarity && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${t.rarityColors[dino.rarity as keyof typeof t.rarityColors] || ""} border font-bold`}>{dino.rarity}</span>
                      )}
                      <span className={`text-[10px] font-bold ${getTierColor(dino.tier)}`}>{getTierLetter(dino.tier)}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className={`flex items-center justify-between gap-3 p-3 rounded-xl ${t.inputBg} border ${t.inputBorder}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${t.textSecondary}`}>Qty</span>
                  <input type="text" inputMode="numeric" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(9, Number.parseInt(e.target.value) || 1)))} className={`w-10 text-center bg-transparent border ${t.inputBorder} rounded-lg px-1 py-1 ${t.textPrimary} text-sm font-mono`} />
                </div>
                <button
                  type="button"
                  onClick={addDinosaurToSlot}
                  disabled={!selectedDino}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedDino
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : `${t.buttonBg} ${t.textSecondary} cursor-not-allowed opacity-50`
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
