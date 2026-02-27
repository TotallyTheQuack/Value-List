"use client"

import { useState, useMemo, useEffect } from "react"
import { Plus, X, ArrowLeftRight, Paintbrush, ChevronDown, Calculator, Dna } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Dinosaur {
  name: string
  value: number | string
  rarity?: string
  tier?: string
}

interface TradeSlot {
  dinosaur: Dinosaur | null
  quantity: number
}

interface Theme {
  name: string
  background: string
  cardBg: string
  cardBorder: string
  headerBg: string
  textPrimary: string
  textSecondary: string
  textAccent: string
  border: string
  buttonBg: string
  buttonHover: string
  buttonText: string
  inputBg: string
  inputBorder: string
  badgeBg: string
  badgeText: string
  scrollHeaderBg: string
  dropdownBg: string
  linkHover: string
  rarityColors: {
    "8/8": string
    "7/8": string
    "6/8": string
    "5/8": string
    "4/8": string
    "3/8": string
    "2/8": string
    "1/8": string
  }
}

const themes: Record<string, Theme> = {
  dark: {
    name: "Dark Mode",
    background: "bg-black",
    cardBg: "bg-gray-900/30",
    cardBorder: "border-gray-800/50",
    headerBg: "bg-black/20",
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
    textAccent: "text-gray-300",
    border: "border-gray-700/50",
    buttonBg: "bg-gray-800/50",
    buttonHover: "hover:bg-gray-700/50",
    buttonText: "text-gray-300",
    inputBg: "bg-gray-900/50",
    inputBorder: "border-gray-700/50",
    badgeBg: "bg-gray-700/50",
    badgeText: "text-gray-200",
    scrollHeaderBg: "bg-black/95",
    dropdownBg: "bg-gray-900",
    linkHover: "hover:text-white",
    rarityColors: {
      "8/8": "bg-purple-600 text-white border-purple-500",
      "7/8": "bg-red-600 text-white border-red-500",
      "6/8": "bg-orange-500 text-white border-orange-400",
      "5/8": "bg-yellow-500 text-black border-yellow-400",
      "4/8": "bg-green-600 text-white border-green-500",
      "3/8": "bg-cyan-500 text-white border-cyan-400",
      "2/8": "bg-blue-600 text-white border-blue-500",
      "1/8": "bg-slate-500 text-white border-slate-400",
    },
  },
  pb: {
    name: "Pitch Black",
    background: "bg-black",
    cardBg: "bg-zinc-950/40",
    cardBorder: "border-zinc-800/60",
    headerBg: "bg-black/40",
    textPrimary: "text-zinc-100",
    textSecondary: "text-zinc-400",
    textAccent: "text-cyan-400",
    border: "border-zinc-800/60",
    buttonBg: "bg-zinc-900/60",
    buttonHover: "hover:bg-zinc-800/70",
    buttonText: "text-zinc-200",
    inputBg: "bg-zinc-950/60",
    inputBorder: "border-zinc-700/70",
    badgeBg: "bg-zinc-800/70",
    badgeText: "text-zinc-100",
    scrollHeaderBg: "bg-black/98",
    dropdownBg: "bg-black",
    linkHover: "hover:text-cyan-300",
    rarityColors: {
      "8/8": "bg-fuchsia-600 text-white border-fuchsia-500",
      "7/8": "bg-red-600 text-white border-red-500",
      "6/8": "bg-orange-600 text-white border-orange-500",
      "5/8": "bg-amber-500 text-black border-amber-400",
      "4/8": "bg-emerald-600 text-white border-emerald-500",
      "3/8": "bg-cyan-500 text-black border-cyan-400",
      "2/8": "bg-blue-600 text-white border-blue-500",
      "1/8": "bg-zinc-700 text-zinc-200 border-zinc-600",
    },
  },
  neon: {
    name: "Neon Cyber",
    background: "bg-gradient-to-br from-black via-purple-950 to-black",
    cardBg: "bg-purple-900/20",
    cardBorder: "border-purple-500/30",
    headerBg: "bg-black/40",
    textPrimary: "text-purple-100",
    textSecondary: "text-purple-300",
    textAccent: "text-pink-300",
    border: "border-purple-400/40",
    buttonBg: "bg-purple-800/40",
    buttonHover: "hover:bg-purple-700/50",
    buttonText: "text-purple-100",
    inputBg: "bg-purple-900/30",
    inputBorder: "border-purple-500/40",
    badgeBg: "bg-purple-600/50",
    badgeText: "text-purple-100",
    scrollHeaderBg: "bg-black/95",
    dropdownBg: "bg-purple-950",
    linkHover: "hover:text-pink-300",
    rarityColors: {
      "8/8": "bg-pink-500 text-white border-pink-400",
      "7/8": "bg-fuchsia-500 text-white border-fuchsia-400",
      "6/8": "bg-purple-500 text-white border-purple-400",
      "5/8": "bg-violet-500 text-white border-violet-400",
      "4/8": "bg-indigo-500 text-white border-indigo-400",
      "3/8": "bg-cyan-400 text-white border-cyan-300",
      "2/8": "bg-purple-700 text-white border-purple-600",
      "1/8": "bg-slate-600 text-white border-slate-500",
    },
  },
  matrix: {
    name: "Matrix",
    background: "bg-black",
    cardBg: "bg-green-950/20",
    cardBorder: "border-green-700/30",
    headerBg: "bg-black/30",
    textPrimary: "text-green-300",
    textSecondary: "text-green-500",
    textAccent: "text-lime-300",
    border: "border-green-800/50",
    buttonBg: "bg-green-900/30",
    buttonHover: "hover:bg-green-800/40",
    buttonText: "text-green-200",
    inputBg: "bg-green-950/40",
    inputBorder: "border-green-700/40",
    badgeBg: "bg-green-800/50",
    badgeText: "text-green-100",
    scrollHeaderBg: "bg-black/95",
    dropdownBg: "bg-black",
    linkHover: "hover:text-lime-200",
    rarityColors: {
      "8/8": "bg-green-400 text-black border-green-300",
      "7/8": "bg-green-500 text-black border-green-400",
      "6/8": "bg-green-600 text-white border-green-500",
      "5/8": "bg-green-700 text-white border-green-600",
      "4/8": "bg-green-800 text-white border-green-700",
      "3/8": "bg-green-900 text-white border-green-800",
      "2/8": "bg-green-950 text-white border-green-900",
      "1/8": "bg-gray-800 text-gray-400 border-gray-700",
    },
  },
}

// DNA conversion rate (DNA per 1 value)
const DNA_CONVERSION_MIN = 23000
const DNA_CONVERSION_MAX = 25000

// All dinosaurs data - this should match the main list
const allDinosaurs: Dinosaur[] = [
  // S Tier (110+)
  { name: "Eschaton Argentinosaurus", value: 650, rarity: "8/8", tier: "S" },
  { name: "Apparition Fossil Giganotosaurus", value: 570, rarity: "8/8", tier: "S" },
  { name: "Violex Magnus", value: 275, rarity: "7/8", tier: "S" },
  { name: "Pitchygator", value: 220, rarity: "7/8", tier: "S" },
  { name: "Distorted King", value: 160, rarity: "7/8", tier: "S" },
  { name: "Megavore", value: 155, rarity: "7/8", tier: "S" },
  { name: "Cyber Megavore", value: 140, rarity: "7/8", tier: "S" },
  { name: "Pitch Black Terror", value: 130, rarity: "7/8", tier: "S" },
  { name: "Cyber Sauroposeidon", value: 125, rarity: "7/8", tier: "S" },
  { name: "Albino Terror", value: 100, rarity: "6/8", tier: "A" },
  // A Tier (50-109)
  { name: "Blue Whale Shastasaurus", value: 95, rarity: "6/8", tier: "A" },
  { name: "Bloop", value: 90, rarity: "6/8", tier: "A" },
  { name: "Galactic Barosaurus", value: 88, rarity: "7/8", tier: "A" },
  { name: "Indominus Rex", value: 85, rarity: "6/8", tier: "A" },
  { name: "Zomvinychus", value: 75, rarity: "6/8", tier: "A" },
  { name: "Orca Spinosaurus", value: 72, rarity: "6/8", tier: "A" },
  { name: "Reaper Gelioichthys", value: 70, rarity: "7/8", tier: "A" },
  { name: "Giant Albino Baryonyx", value: 65, rarity: "7/8", tier: "A" },
  { name: "Pitch Luminescent Avinychus", value: 65, rarity: "5/8", tier: "A" },
  { name: "Megalodon", value: 60, rarity: "6/8", tier: "A" },
  { name: "Sauroposeidon", value: 55, rarity: "5/8", tier: "A" },
  { name: "Barosaurus", value: 52, rarity: "5/8", tier: "A" },
  { name: "Mosasaurus", value: 50, rarity: "5/8", tier: "A" },
  // B Tier (25-49)
  { name: "Classic Pitch Black Terror", value: 45, rarity: "5/8", tier: "B" },
  { name: "Triceratops", value: 42, rarity: "4/8", tier: "B" },
  { name: "Spinosaurus", value: 40, rarity: "5/8", tier: "B" },
  { name: "Peak Spinosaurus", value: 38, rarity: "5/8", tier: "B" },
  { name: "Gold Fossil Tyrannosaurus", value: 35, rarity: "5/8", tier: "B" },
  { name: "Tyrannosaurus Rex", value: 32, rarity: "5/8", tier: "B" },
  { name: "Giganotosaurus", value: 30, rarity: "5/8", tier: "B" },
  { name: "White Walker Carcharodontosaurus", value: 28, rarity: "4/8", tier: "B" },
  { name: "Alpha Kaiju Spinosaurus", value: 27, rarity: "4/8", tier: "B" },
  { name: "Pitch Black Dolichomalosaurus", value: 26, rarity: "4/8", tier: "B" },
  { name: "Movie Spinosaurus", value: 25, rarity: "5/8", tier: "B" },
  // C Tier (15-24)
  { name: "Toy Train Mastodonsaurus", value: 24, rarity: "5/8", tier: "C" },
  { name: "Crossover Hybrid/Vinera", value: 23, rarity: "4/8", tier: "C" },
  { name: "Gold Fossil Spinosaurus", value: 22, rarity: "4/8", tier: "C" },
  { name: "Alien Irritator", value: 20, rarity: "4/8", tier: "C" },
  { name: "Carcharocles Megalodon", value: 19, rarity: "5/8", tier: "C" },
  { name: "Pliosaurus", value: 18, rarity: "4/8", tier: "C" },
  { name: "Blackodile", value: 17, rarity: "4/8", tier: "C" },
  { name: "Disco Stegosaurus", value: 16, rarity: "4/8", tier: "C" },
  { name: "Pitch Black Apatosaurus", value: 15, rarity: "4/8", tier: "C" },
  // D Tier (10-14)
  { name: "Abandoned Matriarch", value: 13, rarity: "4/8", tier: "D" },
  { name: "Creepy Crawly Spinosaurus", value: 12, rarity: "4/8", tier: "D" },
  { name: "Indomitable King", value: 12, rarity: "5/8", tier: "D" },
  { name: "Nidhogg Purrrusaurus", value: 10, rarity: "3/8", tier: "D" },
  // E Tier (4-9)
  { name: "Acrocanthorse", value: 5, rarity: "3/8", tier: "E" },
  { name: "Kaprosuchus", value: 5, rarity: "3/8", tier: "E" },
  { name: "Styracosaurus", value: 4, rarity: "3/8", tier: "E" },
  // F Tier (0-3)
  { name: "Albino T-Rex", value: 1.5, rarity: "2/8", tier: "F" },
  { name: "Fossil Spinosaurus", value: 1, rarity: "2/8", tier: "F" },
  { name: "Ornithomimus", value: 0.5, rarity: "1/8", tier: "F" },
]

const getTierLetter = (tier: string | undefined): string => {
  switch (tier) {
    case "S": return "S"
    case "A": return "A"
    case "B": return "B"
    case "C": return "C"
    case "D": return "D"
    case "E": return "E"
    case "F": return "F"
    default: return "?"
  }
}

const getTierColor = (tier: string | undefined): string => {
  switch (tier) {
    case "S": return "text-red-400"
    case "A": return "text-orange-400"
    case "B": return "text-yellow-400"
    case "C": return "text-green-400"
    case "D": return "text-cyan-400"
    case "E": return "text-blue-400"
    case "F": return "text-purple-400"
    default: return "text-gray-400"
  }
}

export default function TradeCalculator() {
  const [theme, setTheme] = useState<string>("dark")
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const [yourSlots, setYourSlots] = useState<TradeSlot[]>(Array(9).fill({ dinosaur: null, quantity: 1 }))
  const [theirSlots, setTheirSlots] = useState<TradeSlot[]>(Array(9).fill({ dinosaur: null, quantity: 1 }))
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSide, setModalSide] = useState<"your" | "their">("your")
  const [modalSlotIndex, setModalSlotIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDino, setSelectedDino] = useState<Dinosaur | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [dnaAmount, setDnaAmount] = useState<string>("")

  const currentTheme = themes[theme] || themes.dark

  // Load theme from URL or localStorage on mount
  useEffect(() => {
    // First check URL params
    const urlParams = new URLSearchParams(window.location.search)
    const urlTheme = urlParams.get("theme")
    if (urlTheme && themes[urlTheme]) {
      setTheme(urlTheme)
      localStorage.setItem("dinosaur-value-list-theme", urlTheme)
      return
    }
    
    // Then check localStorage
    const savedTheme = localStorage.getItem("dinosaur-value-list-theme")
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
      // Update URL to reflect current theme
      const url = new URL(window.location.href)
      url.searchParams.set("theme", savedTheme)
      window.history.replaceState({}, "", url.toString())
    }
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("dinosaur-value-list-theme", newTheme)
    setThemeDropdownOpen(false)
    
    // Update URL parameter
    const url = new URL(window.location.href)
    url.searchParams.set("theme", newTheme)
    window.history.replaceState({}, "", url.toString())
  }

  const filteredDinos = useMemo(() => {
    if (!searchQuery.trim()) return allDinosaurs
    const query = searchQuery.toLowerCase()
    return allDinosaurs.filter(d => d.name.toLowerCase().includes(query))
  }, [searchQuery])

  const yourTotal = useMemo(() => {
    return yourSlots.reduce((sum, slot) => {
      if (slot.dinosaur) {
        const val = typeof slot.dinosaur.value === "number" ? slot.dinosaur.value : parseFloat(slot.dinosaur.value as string)
        return sum + (val * slot.quantity)
      }
      return sum
    }, 0)
  }, [yourSlots])

  const theirTotal = useMemo(() => {
    return theirSlots.reduce((sum, slot) => {
      if (slot.dinosaur) {
        const val = typeof slot.dinosaur.value === "number" ? slot.dinosaur.value : parseFloat(slot.dinosaur.value as string)
        return sum + (val * slot.quantity)
      }
      return sum
    }, 0)
  }, [theirSlots])

  const valueDifference = theirTotal - yourTotal
  const yourFilledSlots = yourSlots.filter(s => s.dinosaur !== null).length
  const theirFilledSlots = theirSlots.filter(s => s.dinosaur !== null).length

  const openModal = (side: "your" | "their", index: number) => {
    setModalSide(side)
    setModalSlotIndex(index)
    setSearchQuery("")
    setSelectedDino(null)
    setQuantity(1)
    setModalOpen(true)
  }

  const addDinosaurToSlot = () => {
    if (!selectedDino) return
    
    const newSlot: TradeSlot = { dinosaur: selectedDino, quantity }
    
    if (modalSide === "your") {
      const newSlots = [...yourSlots]
      newSlots[modalSlotIndex] = newSlot
      setYourSlots(newSlots)
    } else {
      const newSlots = [...theirSlots]
      newSlots[modalSlotIndex] = newSlot
      setTheirSlots(newSlots)
    }
    
    setModalOpen(false)
  }

  const removeFromSlot = (side: "your" | "their", index: number) => {
    if (side === "your") {
      const newSlots = [...yourSlots]
      newSlots[index] = { dinosaur: null, quantity: 1 }
      setYourSlots(newSlots)
    } else {
      const newSlots = [...theirSlots]
      newSlots[index] = { dinosaur: null, quantity: 1 }
      setTheirSlots(newSlots)
    }
  }

  const clearSide = (side: "your" | "their") => {
    if (side === "your") {
      setYourSlots(Array(9).fill({ dinosaur: null, quantity: 1 }))
    } else {
      setTheirSlots(Array(9).fill({ dinosaur: null, quantity: 1 }))
    }
  }

  const dnaToValue = useMemo(() => {
    const dna = parseFloat(dnaAmount)
    if (isNaN(dna) || dna <= 0) return { min: 0, max: 0 }
    return {
      min: Math.floor((dna / DNA_CONVERSION_MAX) * 100) / 100,
      max: Math.floor((dna / DNA_CONVERSION_MIN) * 100) / 100
    }
  }, [dnaAmount])

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.textPrimary} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border ${currentTheme.cardBorder} p-4 md:p-6 mb-6`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Theme Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className={`${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border ${currentTheme.border}`}
              >
                <Paintbrush className="w-4 h-4" />
                Themes
                <ChevronDown className={`w-4 h-4 transition-transform ${themeDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {themeDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 ${currentTheme.dropdownBg} border ${currentTheme.border} rounded-lg shadow-xl z-[100] min-w-[180px] max-h-[300px] overflow-y-auto`}>
                  <div className={`p-2 border-b ${currentTheme.border} ${currentTheme.textSecondary} text-sm`}>
                    Choose Theme
                  </div>
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={`w-full text-left px-4 py-2 ${currentTheme.buttonHover} ${
                        theme === key ? currentTheme.textAccent : currentTheme.textPrimary
                      } transition-colors`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="text-center flex-1">
              <h1 className={`text-2xl md:text-3xl font-bold ${currentTheme.textPrimary}`}>
                Trade Calculator
              </h1>
              <p className={`text-sm ${currentTheme.textSecondary}`}>Compare trade values</p>
            </div>

            {/* Navigation */}
            <div className="flex gap-2">
              <Link href="/?theme=dark">
                <button className={`${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} px-4 py-2 rounded-lg transition-colors border ${currentTheme.border}`}>
                  Value List
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trade Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 mb-6">
          {/* Your Offer */}
          <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border ${currentTheme.cardBorder} p-4`}>
            <h2 className={`text-lg font-bold ${currentTheme.textPrimary} mb-4`}>
              Your Offer ({yourFilledSlots}/9)
            </h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {yourSlots.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => !slot.dinosaur && openModal("your", index)}
                  className={`aspect-square border-2 border-dashed ${currentTheme.border} rounded-lg flex flex-col items-center justify-center cursor-pointer ${currentTheme.buttonHover} transition-colors relative overflow-hidden`}
                >
                  {slot.dinosaur ? (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFromSlot("your", index) }}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center z-10"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                      <span className={`absolute top-1 left-1 text-xs font-bold ${getTierColor(slot.dinosaur.tier)}`}>
                        {getTierLetter(slot.dinosaur.tier)}
                      </span>
                      <span className={`text-xs ${currentTheme.textPrimary} text-center px-1 mt-2`}>
                        {slot.dinosaur.name.length > 15 ? slot.dinosaur.name.substring(0, 15) + "..." : slot.dinosaur.name}
                      </span>
                      <span className={`text-xs ${currentTheme.textAccent}`}>
                        {slot.dinosaur.value}
                      </span>
                      {slot.quantity > 1 && (
                        <span className={`text-xs ${currentTheme.textSecondary}`}>x{slot.quantity}</span>
                      )}
                    </>
                  ) : (
                    <Plus className={`w-6 h-6 ${currentTheme.textSecondary}`} />
                  )}
                </div>
              ))}
            </div>
            <div className={`${currentTheme.buttonBg} rounded-lg p-3 text-center mb-2`}>
              <span className="text-cyan-400 font-bold">Total: {yourTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => clearSide("your")}
              className={`w-full ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} py-2 rounded-lg transition-colors border ${currentTheme.border}`}
            >
              Clear Side
            </button>
          </div>

          {/* Swap Icon */}
          <div className="flex items-center justify-center">
            <div className={`${currentTheme.buttonBg} p-3 rounded-full border ${currentTheme.border}`}>
              <ArrowLeftRight className={`w-6 h-6 ${currentTheme.textSecondary}`} />
            </div>
          </div>

          {/* Their Offer */}
          <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border ${currentTheme.cardBorder} p-4`}>
            <h2 className={`text-lg font-bold ${currentTheme.textPrimary} mb-4`}>
              Their Offer ({theirFilledSlots}/9)
            </h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {theirSlots.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => !slot.dinosaur && openModal("their", index)}
                  className={`aspect-square border-2 border-dashed ${currentTheme.border} rounded-lg flex flex-col items-center justify-center cursor-pointer ${currentTheme.buttonHover} transition-colors relative overflow-hidden`}
                >
                  {slot.dinosaur ? (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFromSlot("their", index) }}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center z-10"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                      <span className={`absolute top-1 left-1 text-xs font-bold ${getTierColor(slot.dinosaur.tier)}`}>
                        {getTierLetter(slot.dinosaur.tier)}
                      </span>
                      <span className={`text-xs ${currentTheme.textPrimary} text-center px-1 mt-2`}>
                        {slot.dinosaur.name.length > 15 ? slot.dinosaur.name.substring(0, 15) + "..." : slot.dinosaur.name}
                      </span>
                      <span className={`text-xs ${currentTheme.textAccent}`}>
                        {slot.dinosaur.value}
                      </span>
                      {slot.quantity > 1 && (
                        <span className={`text-xs ${currentTheme.textSecondary}`}>x{slot.quantity}</span>
                      )}
                    </>
                  ) : (
                    <Plus className={`w-6 h-6 ${currentTheme.textSecondary}`} />
                  )}
                </div>
              ))}
            </div>
            <div className={`${currentTheme.buttonBg} rounded-lg p-3 text-center mb-2`}>
              <span className="text-cyan-400 font-bold">Total: {theirTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => clearSide("their")}
              className={`w-full ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} py-2 rounded-lg transition-colors border ${currentTheme.border}`}
            >
              Clear Side
            </button>
          </div>
        </div>

        {/* Result Banner */}
        <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border-2 ${
          valueDifference > 0 ? "border-green-500" : valueDifference < 0 ? "border-red-500" : currentTheme.cardBorder
        } p-4 text-center mb-6`}>
          {yourFilledSlots === 0 && theirFilledSlots === 0 ? (
            <p className={currentTheme.textSecondary}>Enter dinosaurs on both sides to compare values.</p>
          ) : valueDifference > 0 ? (
            <p className="text-green-400 font-bold text-xl">You gain {valueDifference.toFixed(2)} value!</p>
          ) : valueDifference < 0 ? (
            <p className="text-red-400 font-bold text-xl">You lose {Math.abs(valueDifference).toFixed(2)} value!</p>
          ) : (
            <p className="text-yellow-400 font-bold text-xl">Trade is even!</p>
          )}
        </div>

        {/* DNA Calculator */}
        <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border ${currentTheme.cardBorder} p-4`}>
          <div className="flex items-center gap-2 mb-4">
            <Dna className={`w-5 h-5 ${currentTheme.textAccent}`} />
            <h2 className={`text-lg font-bold ${currentTheme.textPrimary}`}>DNA to Value Calculator</h2>
          </div>
          <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>
            Current rate: {(DNA_CONVERSION_MIN / 1000).toFixed(0)}K - {(DNA_CONVERSION_MAX / 1000).toFixed(0)}K DNA = 1 Value
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                type="number"
                placeholder="Enter DNA amount..."
                value={dnaAmount}
                onChange={(e) => setDnaAmount(e.target.value)}
                className={`${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.textPrimary} w-full`}
              />
            </div>
            <div className={`${currentTheme.buttonBg} rounded-lg p-3 text-center min-w-[200px]`}>
              {dnaToValue.min > 0 || dnaToValue.max > 0 ? (
                <span className={currentTheme.textAccent}>
                  = <span className="font-bold text-cyan-400">{dnaToValue.min.toFixed(2)} - {dnaToValue.max.toFixed(2)}</span> Value
                </span>
              ) : (
                <span className={currentTheme.textSecondary}>Enter DNA to calculate</span>
              )}
            </div>
          </div>
        </div>

        {/* Add Dinosaur Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className={`${currentTheme.dropdownBg} border ${currentTheme.border} rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className={`text-lg font-bold ${currentTheme.textPrimary}`}>Add Dinosaur</h3>
                <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4">
                <Input
                  placeholder="Search dinosaur or abbreviation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.textPrimary} w-full`}
                />
              </div>
              
              <div className="flex-1 overflow-y-auto px-4">
                {filteredDinos.map((dino, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDino(dino)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center justify-between ${
                      selectedDino?.name === dino.name ? "bg-cyan-600/30 border border-cyan-500" : `${currentTheme.buttonHover}`
                    } transition-colors`}
                  >
                    <span className={currentTheme.textPrimary}>{dino.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={currentTheme.textAccent}>{dino.value}</span>
                      <span className={`text-xs font-bold ${getTierColor(dino.tier)}`}>{getTierLetter(dino.tier)}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-700 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className={currentTheme.textSecondary}>Qty</span>
                  <Input
                    type="number"
                    min={1}
                    max={99}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className={`${currentTheme.inputBg} ${currentTheme.inputBorder} ${currentTheme.textPrimary} w-16 text-center`}
                  />
                </div>
                <button
                  onClick={addDinosaurToSlot}
                  disabled={!selectedDino}
                  className={`flex-1 py-2 rounded-lg font-bold transition-colors ${
                    selectedDino 
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white" 
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add Dinosaur
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
