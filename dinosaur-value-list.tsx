"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Grid, List, Paintbrush, ChevronDown, ArrowDownUp, DollarSign, BarChartHorizontalBig, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Dinosaur {
  name: string
  value: number | string
  rarity?: string
  code?: string
  sdna?: string
  tier?: string
}

interface Tier {
  name: string
  range: string
  color: string
  gradient: string
  dinosaurs: Dinosaur[]
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
  arctic: {
    name: "Arctic Ice",
    background: "bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100",
    cardBg: "bg-white/70",
    cardBorder: "border-blue-200/60",
    headerBg: "bg-white/60",
    textPrimary: "text-slate-800",
    textSecondary: "text-slate-600",
    textAccent: "text-blue-700",
    border: "border-blue-300/50",
    buttonBg: "bg-blue-100/80",
    buttonHover: "hover:bg-blue-200/80",
    buttonText: "text-slate-700",
    inputBg: "bg-white/80",
    inputBorder: "border-blue-200/60",
    badgeBg: "bg-blue-200/70",
    badgeText: "text-slate-800",
    scrollHeaderBg: "bg-white/95",
    dropdownBg: "bg-white",
    linkHover: "hover:text-blue-800",
    rarityColors: {
      "8/8": "bg-indigo-600 text-white border-indigo-500",
      "7/8": "bg-blue-600 text-white border-blue-500",
      "6/8": "bg-cyan-500 text-white border-cyan-400",
      "5/8": "bg-teal-500 text-white border-teal-400",
      "4/8": "bg-emerald-500 text-white border-emerald-400",
      "3/8": "bg-sky-500 text-white border-sky-400",
      "2/8": "bg-sky-300 text-sky-800 border-sky-200",
      "1/8": "bg-slate-400 text-slate-800 border-slate-300",
    },
  },
  volcano: {
    name: "Volcanic Fire",
    background: "bg-gradient-to-br from-red-950 via-orange-950 to-yellow-950",
    cardBg: "bg-red-900/25",
    cardBorder: "border-orange-500/40",
    headerBg: "bg-red-950/60",
    textPrimary: "text-orange-100",
    textSecondary: "text-orange-300",
    textAccent: "text-yellow-300",
    border: "border-orange-400/50",
    buttonBg: "bg-red-800/50",
    buttonHover: "hover:bg-red-700/60",
    buttonText: "text-orange-100",
    inputBg: "bg-red-900/40",
    inputBorder: "border-orange-500/50",
    badgeBg: "bg-orange-600/60",
    badgeText: "text-orange-100",
    scrollHeaderBg: "bg-red-950/95",
    dropdownBg: "bg-red-950",
    linkHover: "hover:text-yellow-200",
    rarityColors: {
      "8/8": "bg-red-600 text-white border-red-500",
      "7/8": "bg-orange-600 text-white border-orange-500",
      "6/8": "bg-yellow-500 text-black border-yellow-400",
      "5/8": "bg-amber-500 text-black border-amber-400",
      "4/8": "bg-orange-700 text-white border-orange-600",
      "3/8": "bg-red-800 text-white border-red-700",
      "2/8": "bg-rose-800 text-white border-rose-700",
      "1/8": "bg-gray-600 text-white border-gray-500",
    },
  },
  forest: {
    name: "Deep Forest",
    background: "bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950",
    cardBg: "bg-green-900/25",
    cardBorder: "border-emerald-500/40",
    headerBg: "bg-green-950/60",
    textPrimary: "text-emerald-100",
    textSecondary: "text-emerald-300",
    textAccent: "text-teal-300",
    border: "border-emerald-400/50",
    buttonBg: "bg-green-800/50",
    buttonHover: "hover:bg-green-700/60",
    buttonText: "text-emerald-100",
    inputBg: "bg-green-900/40",
    inputBorder: "border-emerald-500/50",
    badgeBg: "bg-emerald-600/60",
    badgeText: "text-emerald-100",
    scrollHeaderBg: "bg-green-950/95",
    dropdownBg: "bg-green-950",
    linkHover: "hover:text-teal-200",
    rarityColors: {
      "8/8": "bg-emerald-500 text-white border-emerald-400",
      "7/8": "bg-green-500 text-white border-green-400",
      "6/8": "bg-lime-500 text-black border-lime-400",
      "5/8": "bg-yellow-500 text-black border-yellow-400",
      "4/8": "bg-green-600 text-white border-green-500",
      "3/8": "bg-teal-600 text-white border-teal-500",
      "2/8": "bg-emerald-700 text-white border-emerald-600",
      "1/8": "bg-gray-600 text-white border-gray-500",
    },
  },
  ocean: {
    name: "Deep Ocean",
    background: "bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950",
    cardBg: "bg-blue-900/25",
    cardBorder: "border-blue-400/40",
    headerBg: "bg-blue-950/60",
    textPrimary: "text-blue-100",
    textSecondary: "text-blue-300",
    textAccent: "text-indigo-300",
    border: "border-blue-400/50",
    buttonBg: "bg-blue-800/50",
    buttonHover: "hover:bg-blue-700/60",
    buttonText: "text-blue-100",
    inputBg: "bg-blue-900/40",
    inputBorder: "border-blue-500/50",
    badgeBg: "bg-blue-600/60",
    badgeText: "text-blue-100",
    scrollHeaderBg: "bg-blue-950/95",
    dropdownBg: "bg-blue-950",
    linkHover: "hover:text-indigo-200",
    rarityColors: {
      "8/8": "bg-blue-500 text-white border-blue-400",
      "7/8": "bg-cyan-500 text-white border-cyan-400",
      "6/8": "bg-teal-500 text-white border-teal-400",
      "5/8": "bg-sky-500 text-white border-sky-400",
      "4/8": "bg-blue-600 text-white border-blue-500",
      "3/8": "bg-indigo-600 text-white border-indigo-500",
      "2/8": "bg-purple-600 text-white border-purple-500",
      "1/8": "bg-gray-600 text-white border-gray-500",
    },
  },
  sunset: {
    name: "Golden Sunset",
    background: "bg-gradient-to-br from-amber-100 via-orange-100 to-red-100",
    cardBg: "bg-white/80",
    cardBorder: "border-amber-300/60",
    headerBg: "bg-amber-50/80",
    textPrimary: "text-amber-900",
    textSecondary: "text-amber-700",
    textAccent: "text-orange-700",
    border: "border-amber-400/60",
    buttonBg: "bg-amber-200/80",
    buttonHover: "hover:bg-amber-300/80",
    buttonText: "text-amber-800",
    inputBg: "bg-white/90",
    inputBorder: "border-amber-300/60",
    badgeBg: "bg-amber-300/80",
    badgeText: "text-amber-900",
    scrollHeaderBg: "bg-amber-50/95",
    dropdownBg: "bg-white",
    linkHover: "hover:text-orange-800",
    rarityColors: {
      "8/8": "bg-red-500 text-white border-red-400",
      "7/8": "bg-orange-500 text-white border-orange-400",
      "6/8": "bg-amber-500 text-black border-amber-400",
      "5/8": "bg-yellow-500 text-black border-yellow-400",
      "4/8": "bg-orange-600 text-white border-orange-500",
      "3/8": "bg-red-600 text-white border-red-500",
      "2/8": "bg-rose-600 text-white border-rose-500",
      "1/8": "bg-gray-600 text-white border-gray-500",
    },
  },
  cosmic: {
    name: "Cosmic Purple",
    background: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    cardBg: "bg-purple-900/20",
    cardBorder: "border-purple-400/30",
    headerBg: "bg-black/20",
    textPrimary: "text-white",
    textSecondary: "text-purple-300",
    textAccent: "text-pink-300",
    border: "border-purple-400/40",
    buttonBg: "bg-purple-800/40",
    buttonHover: "hover:bg-purple-700/50",
    buttonText: "text-white",
    inputBg: "bg-purple-900/30",
    inputBorder: "border-purple-500/40",
    badgeBg: "bg-purple-600/50",
    badgeText: "text-white",
    scrollHeaderBg: "bg-black/95",
    dropdownBg: "bg-purple-950",
    linkHover: "hover:text-pink-200",
    rarityColors: {
      "8/8": "bg-pink-500 text-white border-pink-400",
      "7/8": "bg-purple-500 text-white border-purple-400",
      "6/8": "bg-violet-500 text-white border-violet-400",
      "5/8": "bg-indigo-500 text-white border-indigo-400",
      "4/8": "bg-blue-500 text-white border-blue-400",
      "3/8": "bg-cyan-500 text-white border-cyan-400",
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
  royalGold: {
    name: "Royal Gold",
    background: "bg-slate-900",
    cardBg: "bg-blue-950/30",
    cardBorder: "border-amber-500/20",
    headerBg: "bg-blue-950/40",
    textPrimary: "text-amber-100",
    textSecondary: "text-amber-300",
    textAccent: "text-yellow-200",
    border: "border-amber-400/30",
    buttonBg: "bg-amber-800/20",
    buttonHover: "hover:bg-amber-700/30",
    buttonText: "text-amber-100",
    inputBg: "bg-blue-950/50",
    inputBorder: "border-amber-500/30",
    badgeBg: "bg-amber-600/40",
    badgeText: "text-amber-100",
    scrollHeaderBg: "bg-slate-900/95",
    dropdownBg: "bg-slate-950",
    linkHover: "hover:text-yellow-100",
    rarityColors: {
      "8/8": "bg-yellow-400 text-black border-yellow-300",
      "7/8": "bg-yellow-500 text-black border-yellow-400",
      "6/8": "bg-amber-500 text-white border-amber-400",
      "5/8": "bg-amber-600 text-white border-amber-500",
      "4/8": "bg-amber-700 text-white border-amber-600",
      "3/8": "bg-amber-800 text-white border-amber-700",
      "2/8": "bg-amber-900 text-white border-amber-800",
      "1/8": "bg-slate-700 text-slate-300 border-slate-600",
    },
  },
  dusk: {
    name: "Dusk",
    background: "bg-indigo-950",
    cardBg: "bg-purple-950/30",
    cardBorder: "border-purple-800/40",
    headerBg: "bg-indigo-950/50",
    textPrimary: "text-orange-200",
    textSecondary: "text-purple-300",
    textAccent: "text-orange-300",
    border: "border-purple-700/50",
    buttonBg: "bg-purple-900/40",
    buttonHover: "hover:bg-purple-800/50",
    buttonText: "text-orange-100",
    inputBg: "bg-purple-950/50",
    inputBorder: "border-purple-700/60",
    badgeBg: "bg-orange-800/40",
    badgeText: "text-orange-100",
    scrollHeaderBg: "bg-indigo-950/95",
    dropdownBg: "bg-indigo-950",
    linkHover: "hover:text-orange-100",
    rarityColors: {
      "8/8": "bg-orange-400 text-black border-orange-300",
      "7/8": "bg-orange-500 text-white border-orange-400",
      "6/8": "bg-purple-500 text-white border-purple-400",
      "5/8": "bg-purple-600 text-white border-purple-500",
      "4/8": "bg-purple-700 text-white border-purple-600",
      "3/8": "bg-purple-800 text-white border-purple-700",
      "2/8": "bg-purple-900 text-white border-purple-800",
      "1/8": "bg-slate-700 text-slate-300 border-slate-600",
    },
  },
  solarFlare: {
    name: "Solar Flare",
    background: "bg-gray-900",
    cardBg: "bg-gray-800/50",
    cardBorder: "border-orange-500/40",
    headerBg: "bg-gray-900/60",
    textPrimary: "text-orange-300",
    textSecondary: "text-orange-500",
    textAccent: "text-yellow-400",
    border: "border-orange-400/40",
    buttonBg: "bg-orange-800/50",
    buttonHover: "hover:bg-orange-700/60",
    buttonText: "text-orange-100",
    inputBg: "bg-gray-800/70",
    inputBorder: "border-orange-500/50",
    badgeBg: "bg-orange-600/60",
    badgeText: "text-orange-100",
    scrollHeaderBg: "bg-gray-900/95",
    dropdownBg: "bg-gray-900",
    linkHover: "hover:text-yellow-300",
    rarityColors: {
      "8/8": "bg-yellow-400 text-black border-yellow-300",
      "7/8": "bg-yellow-500 text-black border-yellow-400",
      "6/8": "bg-orange-500 text-white border-orange-400",
      "5/8": "bg-orange-600 text-white border-orange-500",
      "4/8": "bg-red-600 text-white border-red-500",
      "3/8": "bg-red-700 text-white border-red-600",
      "2/8": "bg-red-800 text-white border-red-700",
      "1/8": "bg-gray-700 text-gray-300 border-gray-600",
    },
  },
  sakura: {
    name: "Sakura",
    background: "bg-indigo-900",
    cardBg: "bg-indigo-800/40",
    cardBorder: "border-pink-400/30",
    headerBg: "bg-indigo-900/60",
    textPrimary: "text-pink-100",
    textSecondary: "text-pink-200",
    textAccent: "text-white",
    border: "border-pink-400/40",
    buttonBg: "bg-pink-800/40",
    buttonHover: "hover:bg-pink-700/50",
    buttonText: "text-pink-100",
    inputBg: "bg-indigo-800/50",
    inputBorder: "border-pink-400/40",
    badgeBg: "bg-pink-600/50",
    badgeText: "text-pink-100",
    scrollHeaderBg: "bg-indigo-900/95",
    dropdownBg: "bg-indigo-950",
    linkHover: "hover:text-white",
    rarityColors: {
      "8/8": "bg-white text-pink-700 border-pink-200",
      "7/8": "bg-pink-200 text-pink-800 border-pink-300",
      "6/8": "bg-pink-300 text-pink-900 border-pink-400",
      "5/8": "bg-pink-400 text-white border-pink-500",
      "4/8": "bg-pink-500 text-white border-pink-600",
      "3/8": "bg-purple-400 text-white border-purple-500",
      "2/8": "bg-purple-500 text-white border-purple-600",
      "1/8": "bg-indigo-700 text-indigo-200 border-indigo-600",
    },
  },
  synthwave: {
    name: "Synthwave",
    background: "bg-gradient-to-b from-purple-900 to-blue-900",
    cardBg: "bg-purple-950/40",
    cardBorder: "border-cyan-400/30",
    headerBg: "bg-purple-950/60",
    textPrimary: "text-cyan-300",
    textSecondary: "text-cyan-400",
    textAccent: "text-fuchsia-400",
    border: "border-cyan-400/40",
    buttonBg: "bg-fuchsia-800/40",
    buttonHover: "hover:bg-fuchsia-700/50",
    buttonText: "text-fuchsia-100",
    inputBg: "bg-purple-950/50",
    inputBorder: "border-cyan-400/30",
    badgeBg: "bg-cyan-600/50",
    badgeText: "text-cyan-100",
    scrollHeaderBg: "bg-purple-950/95",
    dropdownBg: "bg-purple-950",
    linkHover: "hover:text-fuchsia-300",
    rarityColors: {
      "8/8": "bg-fuchsia-400 text-white border-fuchsia-300",
      "7/8": "bg-fuchsia-500 text-white border-fuchsia-400",
      "6/8": "bg-purple-500 text-white border-purple-400",
      "5/8": "bg-purple-600 text-white border-purple-500",
      "4/8": "bg-cyan-500 text-white border-cyan-400",
      "3/8": "bg-cyan-600 text-white border-cyan-500",
      "2/8": "bg-blue-600 text-white border-blue-500",
      "1/8": "bg-slate-700 text-slate-200 border-slate-600",
    },
  },
  bloodMoon: {
    name: "Blood Moon",
    background: "bg-gradient-to-tr from-black via-red-950 to-black",
    cardBg: "bg-red-950/20",
    cardBorder: "border-red-600/30",
    headerBg: "bg-black/30",
    textPrimary: "text-red-200",
    textSecondary: "text-red-400",
    textAccent: "text-white",
    border: "border-red-700/40",
    buttonBg: "bg-red-900/30",
    buttonHover: "hover:bg-red-800/40",
    buttonText: "text-red-100",
    inputBg: "bg-red-950/40",
    inputBorder: "border-red-700/40",
    badgeBg: "bg-red-800/50",
    badgeText: "text-red-100",
    scrollHeaderBg: "bg-black/95",
    dropdownBg: "bg-black",
    linkHover: "hover:text-white",
    rarityColors: {
      "8/8": "bg-red-500 text-white border-red-400",
      "7/8": "bg-red-600 text-white border-red-500",
      "6/8": "bg-red-700 text-white border-red-600",
      "5/8": "bg-red-800 text-white border-red-700",
      "4/8": "bg-red-900 text-white border-red-800",
      "3/8": "bg-red-950 text-white border-red-900",
      "2/8": "bg-gray-800 text-gray-300 border-gray-700",
      "1/8": "bg-gray-900 text-gray-400 border-gray-800",
    },
  },
  "8Bit": {
    name: "8-Bit",
    background: "bg-blue-900",
    cardBg: "bg-blue-800/40",
    cardBorder: "border-cyan-400/50",
    headerBg: "bg-blue-950/60",
    textPrimary: "text-white",
    textSecondary: "text-blue-300",
    textAccent: "text-yellow-300",
    border: "border-blue-700/60",
    buttonBg: "bg-blue-700/50",
    buttonHover: "hover:bg-blue-600/50",
    buttonText: "text-white",
    inputBg: "bg-blue-800/60",
    inputBorder: "border-blue-600/70",
    badgeBg: "bg-blue-600/70",
    badgeText: "text-blue-100",
    scrollHeaderBg: "bg-blue-950/95",
    dropdownBg: "bg-blue-950",
    linkHover: "hover:text-yellow-200",
    rarityColors: {
      "8/8": "bg-pink-500 text-white border-pink-400",
      "7/8": "bg-red-500 text-white border-red-400",
      "6/8": "bg-orange-500 text-white border-orange-400",
      "5/8": "bg-yellow-400 text-black border-yellow-300",
      "4/8": "bg-lime-400 text-black border-lime-300",
      "3/8": "bg-green-500 text-white border-green-400",
      "2/8": "bg-cyan-400 text-white border-cyan-300",
      "1/8": "bg-gray-500 text-white border-gray-400",
    },
  },
  cyberpunkCity: {
    name: "Cyberpunk City",
    background: "bg-gradient-to-b from-black via-blue-950 to-slate-900",
    cardBg: "bg-slate-800/20",
    cardBorder: "border-cyan-500/30",
    headerBg: "bg-black/40",
    textPrimary: "text-cyan-200",
    textSecondary: "text-blue-300",
    textAccent: "text-yellow-300",
    border: "border-cyan-400/40",
    buttonBg: "bg-cyan-800/30",
    buttonHover: "hover:bg-cyan-700/40",
    buttonText: "text-cyan-100",
    inputBg: "bg-slate-900/50",
    inputBorder: "border-cyan-500/40",
    badgeBg: "bg-yellow-600/30",
    badgeText: "text-yellow-200",
    scrollHeaderBg: "bg-black/95",
    dropdownBg: "bg-slate-950",
    linkHover: "hover:text-yellow-200",
    rarityColors: {
      "8/8": "bg-yellow-400 text-black border-yellow-300",
      "7/8": "bg-cyan-400 text-black border-cyan-300",
      "6/8": "bg-fuchsia-500 text-white border-fuchsia-400",
      "5/8": "bg-blue-500 text-white border-blue-400",
      "4/8": "bg-blue-600 text-white border-blue-500",
      "3/8": "bg-indigo-600 text-white border-indigo-500",
      "2/8": "bg-indigo-700 text-white border-indigo-600",
      "1/8": "bg-slate-700 text-slate-200 border-slate-600",
    },
  },
  oled: {
    name: "TEST",
    background: "bg-black",
    cardBg: "bg-zinc-950/40",
    cardBorder: "border-zinc-800/30",
    headerBg: "bg-black/60",
    textPrimary: "text-zinc-100",
    textSecondary: "text-zinc-400",
    textAccent: "text-cyan-400",
    border: "border-zinc-800/40",
    buttonBg: "bg-zinc-900/50",
    buttonHover: "hover:bg-zinc-800/60",
    buttonText: "text-zinc-200",
    inputBg: "bg-black/60",
    inputBorder: "border-zinc-700/50",
    badgeBg: "bg-zinc-800/60",
    badgeText: "text-zinc-100",
    scrollHeaderBg: "bg-black",
    dropdownBg: "bg-black",
    linkHover: "hover:text-cyan-300",
    rarityColors: {
      "8/8": "bg-cyan-500 text-black border-cyan-400",
      "7/8": "bg-purple-500 text-white border-purple-400",
      "6/8": "bg-blue-500 text-white border-blue-400",
      "5/8": "bg-green-500 text-white border-green-400",
      "4/8": "bg-yellow-500 text-black border-yellow-400",
      "3/8": "bg-orange-500 text-white border-orange-400",
      "2/8": "bg-red-500 text-white border-red-400",
      "1/8": "bg-zinc-700 text-zinc-300 border-zinc-600",
    },
  },
}

type SortMode = "value" | "alphabetical" | "demand"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTier, setSelectedTier] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentTheme, setCurrentTheme] = useState<string>("dark") // Initialize with a default theme
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false)
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)
  const [sortMode, setSortMode] = useState<SortMode>("value")
  const [showFloatingSearch, setShowFloatingSearch] = useState(false)
  const [showObsoleteNotice, setShowObsoleteNotice] = useState(true)
  const headerControlsRef = useRef<HTMLDivElement>(null)

  // Load theme from localStorage or URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const themeFromUrl = urlParams.get("theme")
    const savedTheme = localStorage.getItem("dinosaur-value-list-theme")

    let newTheme = "dark"
    if (themeFromUrl && themes[themeFromUrl]) {
      newTheme = themeFromUrl
    } else if (savedTheme && themes[savedTheme]) {
      newTheme = savedTheme
    }

    setCurrentTheme(newTheme)
    setIsThemeLoaded(true)
  }, [])

  // Handle showing/hiding the floating search bar
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerControlsRef.current?.offsetHeight ?? 300
      setShowFloatingSearch(window.scrollY > headerHeight)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  // Save theme to localStorage when changed
  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName)
    localStorage.setItem("dinosaur-value-list-theme", themeName)
    const url = new URL(window.location.href)
    url.searchParams.set("theme", themeName)
    window.history.replaceState({}, "", url.toString())
    setIsThemePanelOpen(false)
  }

  const theme = themes[currentTheme]

  const tiers: Tier[] = [
    {
      name: "S Tier",
      range: "110+ (2.5M-10M dna)",
      color: "from-red-500 to-orange-500",
      gradient: "from-red-500/20 to-orange-500/20",
      dinosaurs: [
        { name: "Eschaton Argentinosaurus", value: 650, rarity: "8/8" },
        { name: "Apparition Fossil Giganotosaurus", value: 550, rarity: "8/8" },
        { name: "Pitch Wraith Terror", value: 285, rarity: "7/8" },
        { name: "Pitchygator", value: 220, rarity: "8/8" },
        { name: "Wraith Terror", value: 180, rarity: "6/8" },
        { name: "Hydralania", value: 165, rarity: "7/8" },
        { name: "Distorted King", value: 160, rarity: "8/8" },
        { name: "Blue Whale Shastasaurus", value: 155, rarity: "6/8" },
        { name: "Violex Magnus", value: 145, rarity: "6/8" },
        { name: "Fallen Gladiator", value: 135, rarity: "6/8" },
        { name: "Pitch Black Moray Oxalaia", value: 130, rarity: "7/8" },
        { name: "Berserk Alametus", value: 125, rarity: "6/8" },
      ],
    },
    {
      name: "A Tier",
      range: "50-110 (700K-2.5M dna)",
      color: "from-orange-500 to-yellow-500",
      gradient: "from-orange-500/20 to-yellow-500/20",
      dinosaurs: [
        { name: "Albino Terror", value: 100, rarity: "8/8" },
        { name: "Megavore", value: 100, rarity: "8/8" },
        { name: "Isisauriraptor", value: 100, rarity: "6/8" },
        { name: "Galactic Barosaurus", value: 98, rarity: "7/8" },
        { name: "Cathedral Fasolatherium", value: 97, rarity: "6/8" },
        { name: "Nameless Barosaurus", value: 90, rarity: "6/8" },
        { name: "Orca Spinosaurus", value: 80, rarity: "6/8" },
        { name: "Movie Mosasaurus", value: 70, rarity: "6/8" },
        { name: "Giant Albino Baryonyx", value: 70, rarity: "6/8" },
        { name: "Reaper Gelioichthys", value: 67, rarity: "6/7" },
        { name: "Dolphin Ichthyovenator", value: 65, rarity: "6/8" },
        { name: "Aurora Borethalass", value: 60, rarity: "6/8" },
        { name: "Pitch Black Terror", value: 60, rarity: "6/8" },
        { name: "Kaiju Giraffatitan", value: 56, rarity: "6/8" },
        { name: "Zomvinychus", value: 55, rarity: "6/8" },
        { name: "Pitch Luminescent Avinychus", value: 52, rarity: "5/8" },
      ],
    },
    {
      name: "B Tier",
      range: "25-49 (500K-700K dna)",
      color: "from-yellow-500 to-lime-500",
      gradient: "from-yellow-500/20 to-lime-500/20",
      dinosaurs: [
        { name: "Luminescent Avinychus", value: 48, rarity: "5/8" },
        { name: "Pitch Coconut Brachiosaurus", value: 40, rarity: "4/8" },
        { name: "Scylla", value: 38, rarity: "5/8" },
        { name: "Kaiju Spinofaarus", value: 38, rarity: "5/8" },
        { name: "Spinofaarus", value: 36, rarity: "5/8" },
        { name: "Phantom Bringer Ceratosaurus", value: 35, rarity: "4/8" },
        { name: "Classic Pitch Black Terror", value: 35, rarity: "4/8" },
        { name: "Crossover Hybrid/Vinera", value: 33, rarity: "5/8" },
        { name: "Firebird", value: 32, rarity: "6/8" },
        { name: "Carcharocles Megalodon", value: 30, rarity: "6/8" },
        { name: "Butterfly Alametus", value: 30, rarity: "6/8" },
        { name: "Peak Spinosaurus", value: 28, rarity: "6/8" },
        { name: "Spawn Shunosaurus", value: 27, rarity: "6/8" },
        { name: "Spectre Fossil Megavore", value: 27, rarity: "4/8" },
        { name: "Reindeer Istiodactylus", value: 27, rarity: "3/8" },
        { name: "Forgotten Mutant", value: 26, rarity: "5/8" },
        { name: "Kaiju Gelioichthys", value: 26, rarity: "5/8" },
      ],
    },
    {
      name: "C Tier",
      range: "15-25 (280K-500K dna)",
      color: "from-lime-500 to-green-500",
      gradient: "from-lime-500/20 to-green-500/20",
      dinosaurs: [
        { name: "Early Winter Frost Sauroposeidon", value: 25, rarity: "4/8" },
        { name: "Toy Train Mastodonsaurus", value: 24, rarity: "5/8" },
        { name: "Alpha Kaiju Spinosaurus", value: 24, rarity: "5/8" },
        { name: "Disco Stegosaurus", value: 24, rarity: "4/8" },
        { name: "Pitch Black Apatosaurus", value: 24, rarity: "4/8" },
        { name: "Pitch Black Dolichomalosaurus", value: 23, rarity: "4/8" },
        { name: "Rakebaby Guanlong", value: 22, rarity: "4/8" },
        { name: "Gold Fossil Giganotosaurus", value: 22, rarity: "3/8" },
        { name: "White Walker Carcharodontosaurus", value: 20, rarity: "4/8" },
        { name: "Headlessaurus", value: 19, rarity: "4/8" },
        { name: "Krampus", value: 19, rarity: "4/8" },
        { name: "Alien Irritator", value: 19, rarity: "4/8" },
        { name: "Totem Terror Albertosaurus", value: 18, rarity: "4/8" },
        { name: "Spring Blossom Lusotitan", value: 18, rarity: "4/8" },
        { name: "Phoenix Achillobator", value: 18, rarity: "3/8" },
        { name: "Masquerade Gigantoraptor", value: 18, rarity: "4/8" },
        { name: "Indomitable Thief Gen 2", value: 17, rarity: "4/8" },
        { name: "Cyber Ichthyovenator", value: 17, rarity: "3/8" },
        { name: "Coconut Brachiosaurus", value: 15, rarity: "3/8" },
      ],
    },
    {
      name: "D Tier",
      range: "10-14 (190K-280K dna)",
      color: "from-green-500 to-cyan-500",
      gradient: "from-green-500/20 to-cyan-500/20",
      dinosaurs: [
        { name: "Indomitable King", value: 14, rarity: "4/8" },
        { name: "Santa Clawz", value: 14, rarity: "3/8" },
        { name: "Movie Giganotosaurus", value: 14, rarity: "3/8" },
        { name: "Kralkatorrik", value: 14, rarity: "2/8" },
        { name: "Movie Therizinosaurus", value: 14, rarity: "2/8" },
        { name: "Frosteological Skelewyvern Quetzalcoatlus", value: 13, rarity: "4/8" },
        { name: "Abandoned Matriarch", value: 13, rarity: "4/8" },
        { name: "Gold Fossil Tyrannosaurus", value: 13, rarity: "3/8" },
        { name: "Chaos Titanosaur", value: 13, rarity: "3/8" },
        { name: "Gold Fossil Spinosaurus", value: 13, rarity: "2/8" },
        { name: "Pitch Black Shantungosaurus", value: 12, rarity: "3/8" },
        { name: "Miresteed Baryonyx", value: 12, rarity: "4/8" },
        { name: "Gold Lily Saurolophus", value: 12, rarity: "2/8" },
        { name: "Cozy Cabin Argentinosaurus", value: 10, rarity: "3/8" },
        { name: "Kaiju Sauroposeidon", value: 10, rarity: "3/8" },
        { name: "Nidhogg Purrrusaurus", value: 10, rarity: "3/8" },
        { name: "Lil UFO Pteranodon", value: 10, rarity: "2/8" },
      ],
    },
    {
      name: "E Tier",
      range: "4-9 (90K-190K dna)",
      color: "from-cyan-500 to-blue-500",
      gradient: "from-cyan-500/20 to-blue-500/20",
      dinosaurs: [
        { name: "Kaiju Titanosaurus", value: 9, rarity: "3/8" },
        { name: "Singulafaarus", value: 9, rarity: "3/8" },
        { name: "Violex Parvulus", value: 9, rarity: "3/8" },
        { name: "Snowflake Stegosaurus", value: 9, rarity: "2/8" },
        { name: "Heartracer Concavenator", value: 9, rarity: "2/8" },
        { name: "Clamarocles Megalodon", value: 9, rarity: "2/8" },
        { name: "Mayhem Gojirasaurus", value: 9, rarity: "2/8" },
        { name: "Saurophaganax Remodel", value: 8, rarity: "3/8" },
        { name: "Blinding White Shantungosaurus", value: 8, rarity: "2/8" },
        { name: "Night Before Cretaceous", value: 8, rarity: "2/8" },
        { name: "Blackodile", value: 8, rarity: "2/8" },
        { name: "Movie Brachiosaurus", value: 8, rarity: "2/8" },
        { name: "Apatosaurus Plush", value: 8, rarity: "2/8" },
        { name: "Putrefied Amargasaurus", value: 8, rarity: "2/8" },
        { name: "Fossil Spinosaurus", value: 7.5, rarity: "2/8" },
        { name: "Kaiju Archelon", value: 7, rarity: "3/8" },
        { name: "The Mimic", value: 7, rarity: "3/8" },
        { name: "Indomitable Thief", value: 7, rarity: "3/8" },
        { name: "Fossil Baryonyx", value: 7, rarity: "2/8" },
        { name: "Movie Spinosaurus", value: 7, rarity: "2/8" },
        { name: "Polar Grazer Puertasaurus", value: 7, rarity: "2/8" },
        { name: "Psychoceratops", value: 7, rarity: "1/8" },
        { name: "Fossil Cadger", value: 6, rarity: "3/8" },
        { name: "Kaiju Quetzalcoatlus", value: 6, rarity: "2/8" },
        { name: "Radiated Zomvinychus", value: 6, rarity: "1/8" },
        { name: "Bogmire Suchomimus", value: 6, rarity: "1/8" },
        { name: "Movie Spinofaarus", value: 5, rarity: "3/8" },
        { name: "Fossil Megavore", value: 5, rarity: "2/8" },
        { name: "Sunfish Shonisaurus", value: 5, rarity: "2/8" },
        { name: "Chaos Spinosaurus", value: 5, rarity: "2/8" },
        { name: "Movie Triceratops", value: 5, rarity: "2/8" },
        { name: "Yeti Albertosaurus", value: 5, rarity: "2/8" },
        { name: "Christmas Shunosaurus", value: 5, rarity: "2/8" },
        { name: "Chaos Mosasaurus", value: 5, rarity: "2/8" },
        { name: "Acrocanthorse", value: 5, rarity: "2/8" },
        { name: "Flying Dutchman", value: 5, rarity: "2/8" },
        { name: "Tree Elder Ankylosaurus", value: 5, rarity: "2/8" },
        { name: "Movie Pyroraptor", value: 5, rarity: "2/8" },
        { name: "Forest Dweller Shantungosaurus", value: 5, rarity: "2/8" },
        { name: "Steelforged Concavenator", value: 5, rarity: "1/8" },
        { name: "Juramaia", value: 5, rarity: "1/8" },
        { name: "Barosaurus Plush", value: 4.5, rarity: "1/8" },
        { name: "Galactic Torvosaurus", value: 4, rarity: "2/8" },
        { name: "Voodoo Murusraptor", value: 4, rarity: "2/8" },
        { name: "Canyon Finback Suchomimus", value: 4, rarity: "2/8" },
        { name: "Neon Pulverizer Concavenator", value: 4, rarity: "2/8" },
        { name: "Sneaky Bunny Guanlong", value: 4, rarity: "2/8" },
        { name: "Monarch Meganeura", value: 4, rarity: "2/8" },
        { name: "Infected Camarasaurus", value: 4, rarity: "2/8" },
        { name: "Honey Heist Gigatitan", value: 4, rarity: "2/8" },
        { name: "Collector Maip Macrothorax", value: 4, rarity: "2/8" },
        { name: "Vampire Batzegopteryx", value: 4, rarity: "1/8" },
        { name: "Gold Fossil Skulker", value: 4, rarity: "2/8" },
        { name: "Nomad Corythosaurus", value: 4, rarity: "1/8" },
        { name: "Possessed Troodon", value: 4, rarity: "1/8" },
      ],
    },
    {
      name: "F Tier",
      range: "0-4 (30K-90K dna)",
      color: "from-blue-500 to-indigo-500",
      gradient: "from-blue-500/20 to-indigo-500/20",
      dinosaurs: [
        { name: "Gargoyle Hatzegopteryx", value: 3.5, rarity: "2/8" },
        { name: "Kaiju Helicoprion", value: 3.5, rarity: "2/8" },
        { name: "Kaiju Baryonyx", value: 3, rarity: "2/8" },
        { name: "Classified Troodon", value: 3, rarity: "2/8" },
        { name: "Galactic Gallimimus", value: 3, rarity: "2/8" },
        { name: "Movie Baryonyx", value: 3, rarity: "2/8" },
        { name: "Rakefather Amargasaurus", value: 3, rarity: "1/8" },
        { name: "Pitch Black Plateosaurus", value: 3, rarity: "1/8" },
        { name: "Galactic Hatzegopteryx", value: 3, rarity: "1/8" },
        { name: "Pitch Black Avimimus", value: 3, rarity: "1/8" },
        { name: "Pop Candy Pachycephalosaurus", value: 3, rarity: "1/8" },
        { name: "Fluffle Therizinosaurus", value: 3, rarity: "1/8" },
        { name: "Fossil Thalassomedon", value: 3, rarity: "1/8" },
        { name: "Fossil Giganotosaurus", value: 3, rarity: "1/8" },
        { name: "Old Bark Nomad Corythosaurus", value: 3, rarity: "1/8" },
        { name: "Pristine Vessel Nomad Corythosaurus", value: 3, rarity: "1/8" },
        { name: "Sky High Nomad Corythosaurus", value: 3, rarity: "1/8" },
        { name: "Tiderider Nomad Corythosaurus", value: 3, rarity: "1/8" },
        { name: "Pumpkin Megalodon", value: 3, rarity: "1/8" },
        { name: "Scarecrow Thanatosdrakon", value: 3, rarity: "1/8" },
        { name: "Yang Tide", value: 3, rarity: "1/8" },
        { name: "Yin Flare", value: 3, rarity: "1/8" },
        { name: "Mammoth", value: 2.5, rarity: "2/8" },
        { name: "Galactic Euoplocephalus", value: 2.5, rarity: "1/8" },
        { name: "Ornament Utahraptor", value: 2.5, rarity: "1/8" },
        { name: "Glutton Elk Spinofaarus", value: 2.5, rarity: "1/8" },
        { name: "Galactic Fresnosaurus", value: 2.25, rarity: "1/8" },
        { name: "Twilight Pliosaurus", value: 2.25, rarity: "1/8" },
        { name: "Movie Gallimimus", value: 2, rarity: "2/8" },
        { name: "Novel Carnotaurus", value: 2, rarity: "2/8" },
        { name: "Movie Ceratosaurus", value: 2, rarity: "2/8" },
        { name: "Movie Quetzalcoatlus", value: 2, rarity: "2/8" },
        { name: "Movie Dilophosaurus", value: 2, rarity: "2/8" },
        { name: "Maceball Stegosaurus", value: 2, rarity: "2/8" },
        { name: "Blinding White Dodo", value: 2, rarity: "2/8" },
        { name: "Pitch Black Megalodon", value: 2, rarity: "2/8" },
        { name: "Chaos Tyrannosaurus Rex", value: 2, rarity: "2/8" },
        { name: "Movie Ankylosaurus", value: 2, rarity: "1/8" },
        { name: "Hot Cocoa Ichthyovenator", value: 2, rarity: "1/8" },
        { name: "Tundra Grazer Triceratops", value: 2, rarity: "2/8" },
        { name: "Bone Eating Hibbertopterus", value: 2, rarity: "1/8" },
        { name: "Bloodwurm Tullimonstrum", value: 2, rarity: "1/8" },
        { name: "Fossil Brachiosaurus", value: 2, rarity: "1/8" },
        { name: "Fossil Carcharocles Megalodon", value: 2, rarity: "1/8" },
        { name: "Fossil Sarcosuchus", value: 2, rarity: "1/8" },
        { name: "Fossil Mosasaurus", value: 2, rarity: "1/8" },
        { name: "Fossil Tyrannosaurus Rex", value: 2, rarity: "1/8" },
        { name: "Fossil Utahraptor", value: 2, rarity: "1/8" },
        { name: "Fossil Pteranodon", value: 2, rarity: "1/8" },
        { name: "Fossil Onchopristis", value: 2, rarity: "1/8" },
        { name: "Fossil Ornithomimus", value: 2, rarity: "1/8" },
        { name: "Fallen Caveman", value: 2, rarity: "1/8" },
        { name: "Fossil Acrocanthosaurus", value: 2, rarity: "1/8" },
        { name: "Fossil Basilosaurus", value: 2, rarity: "1/8" },
        { name: "Fossil Therizinosaurus", value: 2, rarity: "1/8" },
        { name: "Fossil Skulker", value: 2, rarity: "1/8" },
        { name: "Easter Gallimimus", value: 2, rarity: "1/8" },
        { name: "Valley Golem Machimosaurus", value: 2, rarity: "1/8" },
        { name: "Christmas Dodo", value: 2, rarity: "1/8" },
        { name: "Christmas Stegoceras", value: 2, rarity: "1/8" },
        { name: "Universal Dilophosaurus", value: 1.75, rarity: "1/8" },
        { name: "Nutcracker Wanderer", value: 1.75, rarity: "2/8" },
        { name: "Charybdis", value: 1.75, rarity: "1/8" },
        { name: "Movie Hatzegopteryx", value: 1.5, rarity: "2/8" },
        { name: "Stocking Gojirasaurus", value: 1.5, rarity: "1/8" },
        { name: "Candycane Kentrosaurus", value: 1.5, rarity: "1/8" },
        { name: "Terror Bunny Allosaurus", value: 1.5, rarity: "1/8" },
        { name: "Santa Guard Mammoth", value: 1.5, rarity: "1/8" },
        { name: "Lovebug Thalassodromeus", value: 1.5, rarity: "1/8" },
        { name: "Dreamhaze Fresnosaurus", value: 1.5, rarity: "1/8" },
        { name: "Swan Deinocheirus", value: 1.5, rarity: "1/8" },
        { name: "Megafraud", value: 1.5, rarity: "1/8" },
        { name: "Manticore", value: 1.5, rarity: "1/8" },
        { name: "Zeus", value: 1.5, rarity: "1/8" },
        { name: "Thor", value: 1.5, rarity: "1/8" },
        { name: "The Kraken", value: 1.5, rarity: "1/8" },
        { name: "Tartrap Spinosaurus", value: 1.5, rarity: "1/8" },
        { name: "Kaiju Triceratops", value: 1.5, rarity: "1/8" },
        { name: "Movie Pachycephalosaurus", value: 1, rarity: "2/8" },
        { name: "Movie Stegosaurus", value: 1, rarity: "2/8" },
        { name: "Movie Compsognathus", value: 1, rarity: "2/8" },
        { name: "Movie Tyrannosaurus Rex", value: 1, rarity: "1/8" },
        { name: "Cottontail Maiasaura", value: 1, rarity: "1/8" },
        { name: "Makeship Triceratops", value: 1, rarity: "1/8" },
        { name: "Movie Velociraptor", value: 1, rarity: "1/8" },
        { name: "Movie Parasaurolophus", value: 1, rarity: "1/8" },
        { name: "Movie Allosaurus", value: 1, rarity: "1/8" },
        { name: "Movie Carnotaurus", value: 1, rarity: "1/8" },
        { name: "Movie Pteranodon", value: 1, rarity: "1/8" },
        { name: "Frosted Rex", value: 1, rarity: "1/8" },
        { name: "Clay Iguanodon", value: 1, rarity: "1/8" },
        { name: "Classified Tylosaurus", value: 1, rarity: "1/8" },
        { name: "Drinking Bird Gigantoraptor", value: 1, rarity: "1/8" },
        { name: "DNA Raptor", value: 1, rarity: "1/8" },
        { name: "Chicken Egg Balaur", value: 1, rarity: "1/8" },
        { name: "Christmas Coelacanth", value: 1, rarity: "1/8" },
        { name: "Gingerbread Ichthyosaurus", value: 1, rarity: "1/8" },
        { name: "Chimerasuchus", value: 1, rarity: "1/8" },
        { name: "Fallen Excavator", value: 1, rarity: "1/8" },
        { name: "Overseer Wanderer", value: 1, rarity: "1/8" },
        { name: "Late Valentines Plush", value: 1, rarity: "1/8" },
        { name: "Snow Globe Megalodon", value: 1, rarity: "1/8" },
        { name: "Santa Ornithomimus", value: 1, rarity: "1/8" },
        { name: "Spider Troodon", value: 1, rarity: "1/8" },
        { name: "Cetus", value: 0.75, rarity: "1/8" },
        { name: "Hestiaceras", value: 0.5, rarity: "1/8" },
        { name: "Cerberus", value: 0.5, rarity: "1/8" },
        { name: "Griffin", value: 0.5, rarity: "1/8" },
        { name: "Balure", value: 0.5, rarity: "1/8" },
        { name: "Minotaurus", value: 0.5, rarity: "1/8" },
        { name: "Kentrallos", value: 0.5, rarity: "1/8" },
        { name: "Harpydactylus", value: 0.5, rarity: "1/8" },
        { name: "Erymanthian Styracoboar", value: 0.5, rarity: "1/8" },
      ],
    },
    {
      name: "Collectors' Tier",
      range: "Special",
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-500/20 to-pink-500/20",
      dinosaurs: [
        { name: "Branded Purrusaurus", value: "2800-3200", rarity: "1/8" },
        { name: "Metron Praenintius", value: "1700-1900", rarity: "2/8" },
        { name: "Pitch Black Sunfish Shonisaurus", value: 245, rarity: "6/8" },
        { name: "Pitch Black Elasmosaurus", value: 225, rarity: "6/8" },
        { name: "Pitch Black Baryonyx", value: 190, rarity: "2/8" },
        { name: "Golden Ectenosaurus", value: "150-300", rarity: "1/8" },
        { name: "Grayscale Fasolatherium", value: "240-260", rarity: "1/8" },
        { name: "Grayscale Albino Terror", value: "220-240", rarity: "1/8" },
        { name: "Grayscale Dolichomalosaurus", value: "200-220", rarity: "1/8" },
        { name: "Grayscale Gelioichthys", value: "200-220", rarity: "1/8" },
        { name: "Grayscale Megavore", value: "180-190", rarity: "1/8" },
        { name: "Grayscale Avinychus", value: "170-190", rarity: "1/8" },
        { name: "Grayscale Alametus", value: "160-170", rarity: "1/8" },
        { name: "Classic Albino Terror", value: "25-28", rarity: "3/8" },
        { name: "Classic Megavore", value: "25-28", rarity: "3/8" },
        { name: "Diamond Tusoteuthis", value: 10, rarity: "1/8" },
        { name: "Diamond Acrocanthosaurus", value: 10, rarity: "1/8" },
        { name: "Diamond Shunosaurus", value: 10, rarity: "1/8" },
        { name: "Diamond Maiasaurus", value: 10, rarity: "1/8" },
        { name: "Diamond Styracosaurus", value: 10, rarity: "1/8" },
        { name: "Diamond Pteranodon", value: 10, rarity: "1/8" },
        { name: "Diamond Thalassodromeus", value: 10, rarity: "1/8" },
        { name: "Diamond Parasaurolophus", value: 10, rarity: "1/8" },
        { name: "Diamond Concavenator", value: 10, rarity: "1/8" },
        { name: "Diamond Gojirasaurus", value: 10, rarity: "1/8" },
      ],
    },
    {
      name: "Throwbacks",
      range: "Limited",
      color: "from-indigo-500 to-purple-500",
      gradient: "from-indigo-500/20 to-purple-500/20",
      dinosaurs: [
        { name: "Prebivaropus", value: 2, rarity: "2/8" },
        { name: "Throwback Avinychus", value: 2, rarity: "2/8" },
        { name: "Throwback Gelioichthys", value: 2, rarity: "2/8" },
        { name: "Throwback Dolichomalasaurus", value: 2, rarity: "2/8" },
        { name: "Throwback Fasolatherium", value: 2, rarity: "2/8" },
        { name: "Throwback Alametus", value: 2, rarity: "2/8" },
        { name: "Throwback Barosaurus", value: 1.5, rarity: "1/8" },
        { name: "Throwback Argentinosaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Carcharocles Megalodon", value: 0.1, rarity: "1/8" },
        { name: "Throwback Mapusaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Basilosaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Spinofaarus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Yutyrannus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Barinasuchus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Shantungosaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Dunkleosteus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Purussaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Chimerarachne", value: 0.1, rarity: "1/8" },
        { name: "Throwback Suchomimus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Majungasaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Pachycephalosaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Jackelopterus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Tiktaalik", value: 0.1, rarity: "1/8" },
        { name: "Throwback Gigatitan", value: 0.1, rarity: "1/8" },
        { name: "Throwback Tullimonstrum", value: 0.1, rarity: "1/8" },
        { name: "Throwback Hibbertopterus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Fasolasuchus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Arizonasaurus", value: 0.1, rarity: "1/8" },
        { name: "Throwback Anomalocaris", value: 0.1, rarity: "1/8" },
        { name: "Throwback Opabinia", value: 0.1, rarity: "1/8" },
        { name: "Throwback Callichimaera", value: 0.1, rarity: "1/8" },
        { name: "Throwback Meganeura", value: 0.1, rarity: "1/8" },
        { name: "Throwback Trilobite", value: 0.1, rarity: "1/8" },
      ],
    },
    {
      name: "Retextures",
      range: "Special",
      color: "from-pink-500 to-rose-500",
      gradient: "from-pink-500/20 to-rose-500/20",
      dinosaurs: [
        { name: "Diamond Albino Terror", value: 6, rarity: "2/8" },
        { name: "Diamond Megavore", value: 6, rarity: "2/8" },
        { name: "Diamond Barosaurus", value: 5, rarity: "1/8" },
        { name: "Rainbow Albino Terror", value: 6, rarity: "2/8" },
        { name: "Rainbow Megavore", value: 6, rarity: "2/8" },
        { name: "Rainbow Barosaurus", value: 2, rarity: "1/8" },
        { name: "ALL Glass skins", value: 0.25, rarity: "1/8" },
        { name: "Inverted Albino Terror", value: "N/A", rarity: "8/8" },
        { name: "Inverted Alametus", value: "N/A", rarity: "8/8" },
        { name: "Inverted Megavore", value: "N/A", rarity: "7/8" },
        { name: "Inverted Fasolatherium", value: "N/A", rarity: "6/8" },
        { name: "Inverted Gelioichthys", value: "N/A", rarity: "6/8" },
        { name: "Inverted Dolichomalasaurus", value: "N/A", rarity: "6/8" },
        { name: "Inverted Mayhem Tripod", value: "N/A", rarity: "5/8" },
        { name: "Inverted Mayhem Excavator", value: "N/A", rarity: "4/8" },
        { name: "Inverted Argentinosaurus", value: "N/A", rarity: "4/8" },
        { name: "Inverted Carcharocles Megalodon", value: "N/A", rarity: "4/8" },
        { name: "Inverted Purussaurus", value: "N/A", rarity: "4/8" },
        { name: "Inverted Mayhem Wanderer", value: "N/A", rarity: "3/8" },
        { name: "Inverted Maip Machothorax", value: "N/A", rarity: "3/8" },
        { name: "Inverted Avinychus", value: "N/A", rarity: "3/8" },
        { name: "Inverted Mayhem Crawler", value: "N/A", rarity: "2/8" },
      ],
    },
    {
      name: "Gamepasses",
      range: "Obtainable",
      color: "from-violet-500 to-purple-500",
      gradient: "from-violet-500/20 to-purple-500/20",
      dinosaurs: [
        { name: "Classic Pitch Black Terror V4", value: 5, rarity: "1/8", sdna: "750 SDNA" },
        { name: "Classic Krampus", value: 3, rarity: "1/8", sdna: "300 SDNA" },
        { name: "Classic Headlessaurus", value: 2, rarity: "1/8", sdna: "200 SDNA" },
        { name: "Classic Fossil Brachiosaurus", value: 1, rarity: "1/8", sdna: "150 SDNA" },
        { name: "Classic Megavore V3", value: 1, rarity: "2/8", sdna: "100 SDNA" },
        { name: "Classic Albino Terror V4", value: 1, rarity: "1/8", sdna: "100 SDNA" },
        { name: "Classic Psychoceratops", value: 1, rarity: "1/8", sdna: "100 SDNA" },
        { name: "Classic Pitch Black Terror V3", value: 5, rarity: "2/8" },
        { name: "Classic Albino Terror V3", value: 5, rarity: "2/8" },
        { name: "Kaiju Spinosaurus", value: 5, rarity: "1/8" },
        { name: "Riot Shield Triceratops", value: 3, rarity: "1/8" },
        { name: "Icicle Styracosaurus", value: 2, rarity: "1/8" },
        { name: "Albino T-Rex", value: 1.5, rarity: "1/8" },
        { name: "Scarred T-Rex", value: 1.5, rarity: "1/8" },
      ],
    },
    {
      name: "Obtainables",
      range: "Codes & Events",
      color: "from-amber-500 to-yellow-500",
      gradient: "from-amber-500/20 to-yellow-500/20",
      dinosaurs: [
        { name: "Permian Excavator", value: 4, rarity: "1/8", tier: "SDNA" },
        { name: "Ultimallosaurus", value: 2, rarity: "1/8", tier: "SDNA" },
        { name: "Apex Hothead Megavore", value: 2, rarity: "1/8", tier: "SDNA" },
        { name: "Solar Bringer Megavore", value: 0.5, rarity: "1/8", tier: "SDNA" },
        { name: "Deep Sea Megavore", value: 0.5, rarity: "1/8", tier: "SDNA" },
        { name: "Zweinova-Blank", value: 7.5, rarity: "2/8", tier: "Monster Madness" },
        { name: "Zenova", value: 5, rarity: "2/8", tier: "Monster Madness" },
        { name: "Dimension Beast", value: 5, rarity: "1/8", tier: "Monster Madness" },
        { name: "Withered Willow Futalognkosaurus", value: 0, rarity: "1/8", tier: "Halloween 2020" },
        { name: "Crow Istiodactylus", value: 0, rarity: "1/8", tier: "Halloween 2020" },
        { name: "Raven Hatzegopteryx", value: 0, rarity: "1/8", tier: "Halloween 2020" },
        { name: "Wyvern", value: 0, rarity: "1/8", code: "Code" },
        { name: "Yutashu", value: 0, rarity: "1/8", code: "Code" },
      ],
    },
  ]

  const allDinosaurs = useMemo(() => {
    return tiers.flatMap((tier) => tier.dinosaurs.map((dino) => ({ ...dino, tier: tier.name })))
  }, [])

  const filteredAndSortedDinosaurs = useMemo(() => {
    let filtered = allDinosaurs

    if (selectedTier !== "all") {
      filtered = filtered.filter((dino) => dino.tier === selectedTier)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (dino) =>
          dino.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (dino.value ? dino.value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
          (dino.rarity && dino.rarity.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (dino.code && dino.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (dino.sdna && dino.sdna.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    const parseValue = (value: string | number): number => {
      if (typeof value === "number") return value
      if (typeof value === "string") {
        if (value.includes("-")) {
          const parts = value.split("-").map((part) => Number.parseFloat(part.trim()))
          return (parts[0] + parts[1]) / 2
        }
        return Number.parseFloat(value)
      }
      return 0
    }

    const parseDemand = (rarity: string | undefined): number => {
      if (!rarity) return 0
      return Number.parseInt(rarity.split("/")[0], 10)
    }

    const sorted = [...filtered]

    if (sortMode === "value") {
      sorted.sort((a, b) => parseValue(b.value) - parseValue(a.value))
    } else if (sortMode === "alphabetical") {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortMode === "demand") {
      sorted.sort((a, b) => parseDemand(b.rarity) - parseDemand(a.rarity))
    }

    return sorted
  }, [allDinosaurs, selectedTier, searchTerm, sortMode])

  const getRarityColor = (rarity: string) => {
    const rarityKey = rarity as keyof typeof theme.rarityColors
    return theme.rarityColors[rarityKey] || "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-400"
  }

  // Fix black screen issue: Check if theme is loaded before rendering the main content
  if (!isThemeLoaded) {
    return <div className="min-h-screen bg-black" />
  }

  return (
  <div className={`min-h-screen ${theme.background}`}>
  {/* Obsolete Notice Popup */}
  {showObsoleteNotice && (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Obsolete notice">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowObsoleteNotice(false)} />
      <div className={`relative max-w-md w-full ${theme.cardBg} border border-red-500/40 rounded-2xl overflow-hidden shadow-2xl`}>
        <div className="h-1 bg-red-500/60" />
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30">
              <X className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-400">Heads Up</h2>
              <p className={`text-xs ${theme.textSecondary}`}>Important notice</p>
            </div>
          </div>
          <p className={`${theme.textPrimary} text-sm leading-relaxed mb-2`}>
            This value list is currently <span className="text-red-400 font-semibold">not being updated</span> and may contain outdated information.
          </p>
          <p className={`${theme.textSecondary} text-xs leading-relaxed mb-5`}>
            Values shown may not reflect the current market. Do not rely on this list for trading decisions until further notice.
          </p>
          <button
            onClick={() => setShowObsoleteNotice(false)}
            className="w-full py-2.5 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 rounded-xl transition-all duration-200 text-sm font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Theme Side Panel */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isThemePanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsThemePanelOpen(false)} />
        <div
          className={`relative w-72 max-w-[80vw] h-full ${theme.dropdownBg} ${theme.border} border-r transition-transform duration-300 ${isThemePanelOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className={`flex items-center justify-between p-5 border-b ${theme.border}`}>
            <div>
              <h2 className={`font-semibold ${theme.textPrimary} text-sm`}>Appearance</h2>
              <p className={`text-xs ${theme.textSecondary} mt-0.5`}>Choose your theme</p>
            </div>
            <button
              onClick={() => setIsThemePanelOpen(false)}
              className={`${theme.buttonBg} ${theme.buttonHover} p-2 rounded-lg transition-colors`}
              aria-label="Close theme panel"
            >
              <X className={`w-4 h-4 ${theme.textSecondary}`} />
            </button>
          </div>
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
            {Object.entries(themes).map(([key, themeOption]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 text-sm flex items-center gap-3 ${
                  currentTheme === key
                    ? `${theme.buttonBg} ${theme.buttonText} ${theme.border} border`
                    : `${theme.textSecondary} ${theme.buttonHover} border border-transparent`
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${currentTheme === key ? "bg-current" : "bg-transparent"}`} />
                {themeOption.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Search Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showFloatingSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      >
        <div className={`${theme.scrollHeaderBg} backdrop-blur-xl ${theme.border} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <Input
              type="text"
              placeholder="Search dinosaurs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`h-10 ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary} rounded-xl text-sm`}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div ref={headerControlsRef}>
          {/* Header */}
          <div className={`w-full ${theme.headerBg} backdrop-blur-xl ${theme.border} border rounded-2xl p-5 sm:p-6 mb-5`}>
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setIsThemePanelOpen(true)}
                className={`px-3 py-2.5 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl ${theme.border} border transition-all duration-200 flex items-center gap-2 text-sm`}
                aria-label="Open theme panel"
              >
                <Paintbrush className="w-4 h-4" />
                <span className="hidden sm:inline">Themes</span>
              </button>

              <div className="text-center flex-1">
                <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary} tracking-tight text-balance`}>Dinosaur Simulator</h1>
                <p className={`text-xs ${theme.textSecondary} mt-1 tracking-wide uppercase`}>Value List</p>
              </div>

              <nav className="flex gap-2" aria-label="Main navigation">
                <Link href={`/info?theme=${currentTheme}`} className={`px-3 py-2.5 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl ${theme.border} border transition-all duration-200 text-sm hidden sm:block`}>
                  Info
                </Link>
                <Link href={`/changelog?theme=${currentTheme}`} className={`px-3 py-2.5 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl ${theme.border} border transition-all duration-200 text-sm`}>
                  Changelog
                </Link>
                <Link href={`/calculator?theme=${currentTheme}`} className={`px-3 py-2.5 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl ${theme.border} border transition-all duration-200 text-sm`}>
                  Calculator
                </Link>
              </nav>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3 mb-5">
            <Input
              type="text"
              placeholder="Search dinosaurs, values, codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`h-12 ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary} rounded-xl text-sm`}
            />

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[160px] max-w-xs">
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className={`w-full h-10 px-4 ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary} rounded-xl appearance-none cursor-pointer text-sm`}
                  aria-label="Filter by tier"
                >
                  <option value="all" className="bg-gray-900 text-white">All Tiers</option>
                  {tiers.map((tier) => (
                    <option key={tier.name} value={tier.name} className="bg-gray-900 text-white">{tier.name}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSecondary} pointer-events-none`} />
              </div>

              <div className={`flex ${theme.inputBg} rounded-xl p-1 ${theme.inputBorder} border h-10`}>
                {(["value", "alphabetical", "demand"] as SortMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSortMode(mode)}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 text-xs ${sortMode === mode ? `${theme.buttonBg} ${theme.buttonText}` : `${theme.textSecondary}`}`}
                  >
                    {mode === "value" && <><DollarSign className="w-3.5 h-3.5" /> Value</>}
                    {mode === "alphabetical" && <><ArrowDownUp className="w-3.5 h-3.5" /> A-Z</>}
                    {mode === "demand" && <><BarChartHorizontalBig className="w-3.5 h-3.5" /> Demand</>}
                  </button>
                ))}
              </div>

              <div className={`flex ${theme.inputBg} rounded-xl p-1 ${theme.inputBorder} border h-10`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-lg transition-all ${viewMode === "grid" ? `${theme.buttonBg} ${theme.buttonText}` : theme.textSecondary}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded-lg transition-all ${viewMode === "list" ? `${theme.buttonBg} ${theme.buttonText}` : theme.textSecondary}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedTier !== "all" || sortMode !== "value") && (
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <span className={`${theme.textSecondary} text-xs`}>Filters:</span>
              {searchTerm && <Badge className={`${theme.badgeBg} ${theme.badgeText} text-xs`}>{searchTerm}</Badge>}
              {selectedTier !== "all" && <Badge className={`${theme.badgeBg} ${theme.badgeText} text-xs`}>{selectedTier}</Badge>}
              {sortMode !== "value" && <Badge className={`${theme.badgeBg} ${theme.badgeText} text-xs`}>{sortMode === "alphabetical" ? "A-Z" : "Demand"}</Badge>}
              <button onClick={() => { setSearchTerm(""); setSelectedTier("all"); setSortMode("value") }} className={`text-xs ${theme.textAccent} underline`}>Clear</button>
            </div>
          )}

          <p className={`${theme.textSecondary} text-xs mb-4`}>
            <span className={`${theme.textAccent} font-semibold font-mono`}>{filteredAndSortedDinosaurs.length}</span> dinosaurs
          </p>
        </div>

        <div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredAndSortedDinosaurs.map((dino, index) => (
                <Card
                  key={`${dino.name}-${index}`}
                  className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm hover:translate-y-[-2px] transition-all duration-200 group overflow-hidden`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h3 className={`font-medium ${theme.textPrimary} text-sm leading-snug`}>{dino.name}</h3>
                      <span className={`${theme.textAccent} font-bold text-sm font-mono shrink-0 tabular-nums`}>{dino.value}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {dino.rarity && (
                        <Badge className={`text-[10px] ${getRarityColor(dino.rarity)} border font-bold px-1.5 py-0.5`}>{dino.rarity}</Badge>
                      )}
                      {dino.code && (
                        <Badge className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5">{dino.code}</Badge>
                      )}
                      {dino.sdna && (
                        <Badge className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5">{dino.sdna}</Badge>
                      )}
                      <Badge className={`text-[10px] ${theme.textSecondary} ${theme.border} border ${theme.inputBg} px-1.5 py-0.5`}>{dino.tier}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-1.5">
              {filteredAndSortedDinosaurs.map((dino, index) => (
                <div
                  key={`${dino.name}-${index}`}
                  className={`${theme.cardBg} ${theme.cardBorder} border rounded-xl px-4 py-3 flex items-center justify-between gap-3 ${theme.buttonHover} transition-colors`}
                >
                  <h3 className={`font-medium ${theme.textPrimary} text-sm truncate flex-1`}>{dino.name}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`${theme.textAccent} font-bold text-sm font-mono tabular-nums`}>{dino.value}</span>
                    {dino.rarity && (
                      <Badge className={`text-[10px] ${getRarityColor(dino.rarity)} border font-bold px-1.5 py-0.5`}>{dino.rarity}</Badge>
                    )}
                    <Badge className={`text-[10px] ${theme.textSecondary} ${theme.border} border ${theme.inputBg} px-1.5 py-0.5`}>{dino.tier}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
          {filteredAndSortedDinosaurs.length === 0 && (
            <div className={`${theme.cardBg} ${theme.cardBorder} border rounded-2xl py-16 text-center`}>
              <p className={`${theme.textSecondary} text-sm`}>No dinosaurs found matching your criteria</p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center">
          <p className={`${theme.textSecondary} text-xs leading-relaxed`}>
            Forked from the{" "}
            <a href="https://discord.gg/kNPy4jwMWj" target="_blank" rel="noopener noreferrer" className={`${theme.textAccent} ${theme.linkHover} transition-colors underline underline-offset-2`}>
              Dinosaur Simulator Trading Network
            </a>{" "}
            Discord server
          </p>
        </footer>
      </div>
    </div>
  )
}
