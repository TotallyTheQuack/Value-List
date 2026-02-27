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

  // Close dino search dropdown on outside click
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

  // Value to DNA calculation
  const valueToDnaMin = valueAmount ? Number.parseFloat(valueAmount) * DNA_CONVERSION_MIN : 0
  const valueToDnaMax = valueAmount ? Number.parseFloat(valueAmount) * DNA_CONVERSION_MAX : 0

  // Dino to DNA calculation
  const dinoToDnaMin = selectedDinoForDna ? parseValue(selectedDinoForDna.value) * DNA_CONVERSION_MIN : 0
  const dinoToDnaMax = selectedDinoForDna ? parseValue(selectedDinoForDna.value) * DNA_CONVERSION_MAX : 0

  const renderSlot = (slot: TradeSlot, index: number, side: "your" | "their") => {
    if (slot.dinosaur) {
      const tierLetter = getTierLetter(slot.dinosaur.tier)
      const tierColor = getTierColor(slot.dinosaur.tier)
      return (
        <div key={index} className={`relative ${t.cardBg} border ${t.cardBorder} rounded-lg p-2 flex flex-col justify-between min-h-[80px]`}>
          <button
            type="button"
            onClick={() => removeFromSlot(side, index)}
            className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
            aria-label={`Remove ${slot.dinosaur.name}`}
          >
            <X className="w-3 h-3" />
          </button>
          <div>
            <span className={`text-[10px] font-bold ${tierColor}`}>{tierLetter}</span>
            <p className={`${t.textPrimary} text-[11px] font-medium leading-tight mt-0.5 pr-3`}>
              {slot.dinosaur.name}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-[10px] font-bold ${t.textAccent}`}>{slot.dinosaur.value}</span>
            {slot.dinosaur.rarity && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${t.rarityColors[slot.dinosaur.rarity as keyof typeof t.rarityColors] || t.badgeBg} border`}>
                {slot.dinosaur.rarity}
              </span>
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
        className={`border-2 border-dashed ${t.border} rounded-lg flex items-center justify-center min-h-[80px] ${t.buttonHover} transition-colors cursor-pointer`}
        aria-label={`Add dinosaur to ${side} slot ${index + 1}`}
      >
        <Plus className={`w-5 h-5 ${t.textSecondary}`} />
      </button>
    )
  }

  return (
    <div className={`min-h-screen ${t.background}`}>
      {/* Header */}
      <header className={`${t.headerBg} backdrop-blur-md border-b ${t.border} sticky top-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className={`${t.textPrimary} ${t.linkHover} transition-colors`}>
            <h1 className="text-xl font-bold">Dinosaur Simulator</h1>
            <p className={`text-xs ${t.textSecondary}`}>Trade Calculator</p>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors`}
                aria-label="Choose Theme"
              >
                <Paintbrush className="w-4 h-4" />
                <span className="hidden sm:inline">Themes</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${themeDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {themeDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg ${t.dropdownBg} border ${t.cardBorder} shadow-xl z-[200] max-h-72 overflow-y-auto`}>
                  <div className={`px-3 py-2 border-b ${t.border}`}>
                    <p className={`text-xs ${t.textSecondary}`}>Choose Theme</p>
                  </div>
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={`w-full text-left px-3 py-2 text-sm ${t.textPrimary} ${t.buttonHover} transition-colors ${theme === key ? t.badgeBg : ""}`}
                    >
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/" className={`px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors`}>
              Value List
            </Link>
            <Link href="/changelog" className={`px-3 py-1.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors hidden sm:block`}>
              Changelog
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Trade Calculator */}
        <div className={`${t.cardBg} border ${t.cardBorder} rounded-xl p-4 sm:p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <Calculator className={`w-5 h-5 ${t.textAccent}`} />
            <h2 className={`text-xl font-bold ${t.textPrimary}`}>Trade Calculator</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Your Side */}
            <div className="flex-1 w-full">
              <h3 className={`text-lg font-semibold ${t.textPrimary} mb-3`}>
                {"Your Offer"} <span className={`text-sm font-normal ${t.textSecondary}`}>({yourFilledSlots}/9)</span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {yourSlots.map((slot, i) => renderSlot(slot, i, "your"))}
              </div>
              <div className={`mt-3 ${t.inputBg} border ${t.inputBorder} rounded-lg py-2 text-center`}>
                <span className={`font-bold ${t.textAccent}`}>Total: {yourTotal.toFixed(1)}</span>
              </div>
              <button type="button" onClick={() => clearSide("your")} className={`w-full mt-2 py-2 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors`}>
                Clear Side
              </button>
            </div>

            {/* Swap Icon */}
            <div className="flex items-center justify-center lg:pt-24">
              <div className={`w-10 h-10 rounded-full ${t.badgeBg} flex items-center justify-center`}>
                <ArrowLeftRight className={`w-5 h-5 ${t.textSecondary}`} />
              </div>
            </div>

            {/* Their Side */}
            <div className="flex-1 w-full">
              <h3 className={`text-lg font-semibold ${t.textPrimary} mb-3`}>
                {"Their Offer"} <span className={`text-sm font-normal ${t.textSecondary}`}>({theirFilledSlots}/9)</span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {theirSlots.map((slot, i) => renderSlot(slot, i, "their"))}
              </div>
              <div className={`mt-3 ${t.inputBg} border ${t.inputBorder} rounded-lg py-2 text-center`}>
                <span className={`font-bold ${t.textAccent}`}>Total: {theirTotal.toFixed(1)}</span>
              </div>
              <button type="button" onClick={() => clearSide("their")} className={`w-full mt-2 py-2 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.buttonText} text-sm transition-colors`}>
                Clear Side
              </button>
            </div>
          </div>

          {/* Result */}
          <div className={`mt-6 p-4 rounded-xl border ${
            yourTotal === 0 && theirTotal === 0
              ? `${t.border} ${t.inputBg}`
              : valueDifference > 0
                ? "border-green-500/40 bg-green-500/10"
                : valueDifference < 0
                  ? "border-red-500/40 bg-red-500/10"
                  : "border-yellow-500/40 bg-yellow-500/10"
          } text-center`}>
            {yourTotal === 0 && theirTotal === 0 ? (
              <p className={`${t.textSecondary} font-medium`}>Enter dinosaurs on both sides to compare values.</p>
            ) : valueDifference > 0 ? (
              <p className="text-green-400 font-bold text-lg">You gain {valueDifference.toFixed(1)} value!</p>
            ) : valueDifference < 0 ? (
              <p className="text-red-400 font-bold text-lg">You lose {Math.abs(valueDifference).toFixed(1)} value!</p>
            ) : (
              <p className="text-yellow-400 font-bold text-lg">Even trade!</p>
            )}
          </div>
        </div>

        {/* DNA Converters */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Dino to DNA */}
          <div className={`${t.cardBg} border ${t.cardBorder} rounded-xl p-4 sm:p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Dna className={`w-5 h-5 ${t.textAccent}`} />
              <h2 className={`text-lg font-bold ${t.textPrimary}`}>Dino to DNA</h2>
            </div>
            <p className={`text-sm ${t.textSecondary} mb-4`}>Search for a dinosaur to see its DNA equivalent.</p>

            <div className="relative" ref={dinoSearchRef}>
              <div className={`flex items-center gap-2 ${t.inputBg} border ${t.inputBorder} rounded-lg px-3 py-2`}>
                <Search className={`w-4 h-4 ${t.textSecondary}`} />
                <input
                  type="text"
                  value={dinoSearchQuery}
                  onChange={(e) => {
                    setDinoSearchQuery(e.target.value)
                    setShowDinoResults(true)
                    if (!e.target.value.trim()) setSelectedDinoForDna(null)
                  }}
                  onFocus={() => { if (dinoSearchQuery.trim()) setShowDinoResults(true) }}
                  placeholder="Search dinosaur name..."
                  className={`bg-transparent outline-none w-full ${t.textPrimary} text-sm placeholder:${t.textSecondary}`}
                />
                {dinoSearchQuery && (
                  <button
                    type="button"
                    onClick={() => { setDinoSearchQuery(""); setSelectedDinoForDna(null); setShowDinoResults(false) }}
                    className={`${t.textSecondary} hover:${t.textPrimary}`}
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {showDinoResults && dinoSearchResults.length > 0 && (
                <div className={`absolute top-full left-0 right-0 mt-1 ${t.dropdownBg} border ${t.cardBorder} rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto`}>
                  {dinoSearchResults.map((dino) => (
                    <button
                      type="button"
                      key={dino.name}
                      onClick={() => {
                        setSelectedDinoForDna(dino)
                        setDinoSearchQuery(dino.name)
                        setShowDinoResults(false)
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between ${t.buttonHover} transition-colors`}
                    >
                      <span className={`${t.textPrimary} text-sm`}>{dino.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${t.textAccent}`}>{dino.value}</span>
                        <span className={`text-[10px] font-bold ${getTierColor(dino.tier)}`}>{getTierLetter(dino.tier)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedDinoForDna && (
              <div className={`mt-4 p-3 rounded-lg ${t.inputBg} border ${t.inputBorder}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${t.textPrimary} text-sm`}>{selectedDinoForDna.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${t.rarityColors[selectedDinoForDna.rarity as keyof typeof t.rarityColors] || t.badgeBg} border`}>
                    {selectedDinoForDna.rarity}
                  </span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${t.textSecondary}`}>
                  <span>Value: <span className={`font-bold ${t.textAccent}`}>{selectedDinoForDna.value}</span></span>
                  <span className={`${getTierColor(selectedDinoForDna.tier)} font-bold`}>{selectedDinoForDna.tier} Tier</span>
                </div>
                <div className={`mt-3 pt-3 border-t ${t.border}`}>
                  <p className={`text-sm ${t.textSecondary}`}>DNA Equivalent:</p>
                  <p className={`text-lg font-bold ${t.textAccent}`}>
                    {dinoToDnaMin.toLocaleString()} - {dinoToDnaMax.toLocaleString()} DNA
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Value to DNA */}
          <div className={`${t.cardBg} border ${t.cardBorder} rounded-xl p-4 sm:p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Dna className={`w-5 h-5 ${t.textAccent}`} />
              <h2 className={`text-lg font-bold ${t.textPrimary}`}>Value to DNA</h2>
            </div>
            <p className={`text-sm ${t.textSecondary} mb-4`}>Enter a value amount to see the DNA equivalent.</p>

            <div className={`flex items-center gap-2 ${t.inputBg} border ${t.inputBorder} rounded-lg px-3 py-2`}>
              <span className={`text-sm ${t.textSecondary}`}>Value:</span>
              <input
                type="text"
                inputMode="decimal"
                value={valueAmount}
                onChange={(e) => setValueAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="Enter value..."
                className={`bg-transparent outline-none w-full ${t.textPrimary} text-sm`}
              />
            </div>

            {valueAmount && Number.parseFloat(valueAmount) > 0 && (
              <div className={`mt-4 p-3 rounded-lg ${t.inputBg} border ${t.inputBorder}`}>
                <p className={`text-sm ${t.textSecondary}`}>DNA Equivalent:</p>
                <p className={`text-lg font-bold ${t.textAccent}`}>
                  {valueToDnaMin.toLocaleString()} - {valueToDnaMax.toLocaleString()} DNA
                </p>
                <p className={`text-xs ${t.textSecondary} mt-2`}>
                  Rate: {(DNA_CONVERSION_MIN / 1000).toFixed(0)}K-{(DNA_CONVERSION_MAX / 1000).toFixed(0)}K DNA per 1 value
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Dinosaur Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className={`relative w-full max-w-md ${t.cardBg} border ${t.cardBorder} rounded-xl shadow-2xl overflow-hidden`}>
            <div className={`flex items-center justify-between p-4 border-b ${t.border}`}>
              <h3 className={`text-lg font-bold ${t.textPrimary}`}>Add Dinosaur</h3>
              <button type="button" onClick={() => setModalOpen(false)} className={`${t.textSecondary}`} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className={`flex items-center gap-2 ${t.inputBg} border ${t.inputBorder} rounded-lg px-3 py-2 mb-3`}>
                <Search className={`w-4 h-4 ${t.textSecondary}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dinosaur..."
                  className={`bg-transparent outline-none w-full ${t.textPrimary} text-sm`}
                  autoFocus
                />
              </div>

              <div className="max-h-60 overflow-y-auto space-y-0.5 mb-4">
                {filteredDinos.slice(0, 50).map((dino) => (
                  <button
                    type="button"
                    key={`${dino.name}-${dino.tier}`}
                    onClick={() => setSelectedDino(dino)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      selectedDino?.name === dino.name && selectedDino?.tier === dino.tier
                        ? `${t.badgeBg} ${t.textPrimary}`
                        : `${t.buttonHover} ${t.textPrimary}`
                    }`}
                  >
                    <span className="text-sm">{dino.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${t.textAccent}`}>{dino.value}</span>
                      {dino.rarity && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.rarityColors[dino.rarity as keyof typeof t.rarityColors] || ""} border`}>
                          {dino.rarity}
                        </span>
                      )}
                      <span className={`text-[10px] font-bold ${getTierColor(dino.tier)}`}>{getTierLetter(dino.tier)}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className={`flex items-center justify-between gap-3 p-3 rounded-lg ${t.inputBg} border ${t.inputBorder}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${t.textSecondary}`}>Qty</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={quantity}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(9, Number.parseInt(e.target.value) || 1))
                      setQuantity(val)
                    }}
                    className={`w-10 text-center bg-transparent border ${t.inputBorder} rounded px-1 py-1 ${t.textPrimary} text-sm`}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={addDinosaurToSlot}
                    disabled={!selectedDino}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDino
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : `${t.buttonBg} ${t.textSecondary} cursor-not-allowed`
                    }`}
                  >
                    Add Dinosaur
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
