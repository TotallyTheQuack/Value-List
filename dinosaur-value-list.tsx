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
    setIsThemePanelOpen(false)
  }

  const theme = themes[currentTheme]

  const tiers: Tier[] = [
    {
      name: "S Tier (110+)",
      range: "110+ (3M-25M dna)",
      color: "from-red-500 to-pink-600",
      gradient: "bg-gradient-to-br from-red-800/60 to-pink-800/60",
      dinosaurs: [
        { name: "Blue Whale Shastasaurus", value: 115, rarity: "6/8" },
        { name: "Metron Praenintius", value: 1150, rarity: "5/8" },
        { name: "Pitch Wraith Terror", value: 290, rarity: "8/8" },
        { name: "Violex Magnus", value: 185, rarity: "7/8" },
        { name: "Hydralania", value: 180, rarity: "7/8" },
        { name: "Fallen Gladiator", value: 145, rarity: "7/8" },
        { name: "Wraith Terror", value: 180, rarity: "7/8" },
        { name: "Isisauriraptor", value: 125, rarity: "6/8" },
        { name: "Berserk Alametus", value: 125, rarity: "6/8" },
      ],
    },
    {
      name: "A Tier (50-110)",
      range: "50-110 (1.1M-3M dna)",
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-800/60 to-red-800/60",
      dinosaurs: [
        { name: "Albino Terror", value: 100, rarity: "8/8" },
        { name: "Megavore", value: 100, rarity: "8/8" },
        { name: "Zomvinychus", value: 78, rarity: "6/8" },
        { name: "Distorted King", value: 85, rarity: "7/8" },
        { name: "Galactic Barosaurus", value: 80, rarity: "6/8" },
        { name: "Orca Spinosaurus", value: 72, rarity: "6/8" },
        { name: "Reaper Gelioichthys", value: 68, rarity: "6/8" },
        { name: "Pitch Luminescent Avinychus", value: 65, rarity: "5/8" },
        { name: "Dolphin Ichthyovenator", value: 62, rarity: "6/8" },
        { name: "Movie Mosasaurus", value: 56, rarity: "6/8" },
        { name: "Luminescent Avinychus", value: 54, rarity: "6/8" },
        { name: "Pitch Black Terror", value: 54, rarity: "5/8" },
      ],
    },
    {
      name: "B Tier (30-49)",
      range: "30-49 (600K-1.1M dna)",
      color: "from-yellow-500 to-orange-500",
      gradient: "bg-gradient-to-br from-yellow-800/60 to-orange-800/60",
      dinosaurs: [
        { name: "Aurora Borethalass", value: 49, rarity: "6/8" },
        { name: "Kaiju Giraffatitan", value: 48, rarity: "5/8" },
        { name: "Scylla", value: 46, rarity: "6/8" },
        { name: "Spinofaarus", value: 45, rarity: "5/8" },
        { name: "Giant Albino Baryonyx", value: 45, rarity: "4/8" },
        { name: "Phantom Bringer Ceratosaurus", value: 42, rarity: "5/8" },
        { name: "Classic Pitch Black Terror", value: 39, rarity: "5/8" },
        { name: "Firebird", value: 32, rarity: "6/8" },
        { name: "Classic Albino Terror", value: 30, rarity: "4/8" },
        { name: "Early Winter Frost Sauroposeidon", value: 30, rarity: "4/8" },
        { name: "Classic Megavore", value: 30, rarity: "3/8" },
      ],
    },
    {
      name: "C Tier (15-29)",
      range: "15-29 (300K-600K dna)",
      color: "from-green-500 to-yellow-500",
      gradient: "bg-gradient-to-br from-green-800/60 to-yellow-800/60",
      dinosaurs: [
        { name: "Peak Spinosaurus", value: 28, rarity: "4/8" },
        { name: "Reindeer Istiodactylus", value: 28, rarity: "3/8" },
        { name: "White Walker Carcharodontosaurus", value: 27, rarity: "4/8" },
        { name: "Pitch Black Dolichomalosaurus", value: 26, rarity: "4/8" },
        { name: "Rakebaby Guanlong", value: 26, rarity: "4/8" },
        { name: "Pitch Black Apatosaurus", value: 25, rarity: "4/8" },
        { name: "Disco Stegosaurus", value: 25, rarity: "4/8" },
        { name: "Gold Fossil Tyrannosaurus", value: 23, rarity: "4/8" },
        { name: "Movie Spinosaurus", value: 23, rarity: "5/8" },
        { name: "Toy Train Mastodonsaurus", value: 23, rarity: "5/8" },
        { name: "Crossover Hybrid/Vinera", value: 22, rarity: "4/8" },
        { name: "Gold Fossil Spinosaurus", value: 22, rarity: "3/8" },
        { name: "Carcharocles Megalodon", value: 21, rarity: "5/8" },
        { name: "Headlessaurus", value: 20, rarity: "4/8" },
        { name: "Totem Terror Albertosaurus", value: 20, rarity: "4/8" },
        { name: "Phoenix Achillobator", value: 20, rarity: "3/8" },
        { name: "Krampus", value: 20, rarity: "4/8" },
        { name: "Kaiju Gelioichthys", value: 20, rarity: "5/8" },
        { name: "Alien Irritator", value: 19, rarity: "4/8" },
        { name: "Spawn Shunosaurus", value: 19, rarity: "5/8" },
        { name: "Forgotten Mutant", value: 18, rarity: "5/8" },
        { name: "Masquerade Gigantoraptor", value: 17, rarity: "5/8" },
        { name: "Cyber Ichthyovenator", value: 17, rarity: "3/8" },
        { name: "Coconut Brachiosaurus", value: 16, rarity: "3/8" },
        { name: "Santa Clawz", value: 16, rarity: "3/8" },
        { name: "Butterfly Alametus", value: 16, rarity: "4/8" },
        { name: "Kralkatorrik", value: 16, rarity: "2/8" },
      ],
    },
    {
      name: "D Tier (10-14)",
      range: "10-14 (200K-300K dna)",
      color: "from-blue-500 to-green-500",
      gradient: "bg-gradient-to-br from-blue-800/60 to-green-800/60",
      dinosaurs: [
        { name: "Clamarocles Megalodon", value: 13, rarity: "4/8" },
        { name: "Spider Troodon", value: 13, rarity: "2/8" },
        { name: "Snowflake Stegosaurus", value: 13, rarity: "2/8" },
        { name: "Lil UFO Pteranodon", value: 13, rarity: "2/8" },
        { name: "Indomitable Thief Gen 2", value: 14, rarity: "3/8" },
        { name: "Miresteed Baryonyx", value: 12, rarity: "4/8" },
        { name: "Indomitable King", value: 12, rarity: "5/8" },
        { name: "Kaiju Sauroposeidon", value: 12, rarity: "3/8" },
        { name: "Juramaia", value: 12, rarity: "3/8" },
        { name: "Mayhem Gojirasaurus", value: 12, rarity: "3/8" },
        { name: "Abandoned Matriarch", value: 12, rarity: "3/8" },
        { name: "Night Before Cretaceous", value: 11, rarity: "2/8" },
        { name: "Santa Ornithomimus", value: 10, rarity: "1/8" },
        { name: "Kaiju Titanosaurus", value: 10, rarity: "3/8" },
        { name: "Psychoceratops", value: 10, rarity: "2/8" },
        { name: "Movie Brachiosaurus", value: 10, rarity: "3/8" },
        { name: "Cozy Cabin Argentinosaurus", value: 10, rarity: "3/8" },
        { name: "Pumpkin Megalodon", value: 10, rarity: "2/8" },
        { name: "Spring Blossom Lusotitan", value: 10, rarity: "3/8" },
      ],
    },
    {
      name: "E Tier (4-9)",
      range: "4-9 (80K-200K dna)",
      color: "from-purple-500 to-blue-500",
      gradient: "bg-gradient-to-br from-purple-800/60 to-blue-800/60",
      dinosaurs: [
        { name: "Possessed Troodon", value: 9, rarity: "2/8" },
        { name: "Heartracer Concavenator", value: 9, rarity: "2/8" },
        { name: "Chaos Titanosaur", value: 9, rarity: "3/8" },
        { name: "Movie Triceratops", value: 8, rarity: "3/8" },
        { name: "Saurophaganax Remodel", value: 8, rarity: "3/8" },
        { name: "Singularfaarus", value: 8, rarity: "3/8" },
        { name: "Apatosaurus Plush", value: 8, rarity: "2/8" },
        { name: "Blackodile", value: 8, rarity: "3/8" },
        { name: "Christmas Shunosaurus", value: 8, rarity: "2/8" },
        { name: "Infected Camarasaurus", value: 8, rarity: "2/8" },
        { name: "Galactic Torvosaurus", value: 7.5, rarity: "3/8" },
        { name: "Fossil Spinosaurus", value: 7.5, rarity: "2/8" },
        { name: "Fossil Baryonyx", value: 7, rarity: "2/8" },
        { name: "Polar Grazer Puertasaurus", value: 7, rarity: "2/8" },
        { name: "Barosaurus Plush", value: 7, rarity: "1/8" },
        { name: "Kaiju Quetzalcoatlus", value: 7, rarity: "2/8" },
        { name: "Kaiju Archelon", value: 7, rarity: "3/8" },
        { name: "Neon Pulverizer Concavenator", value: 7, rarity: "2/8" },
        { name: "Christmas Dodo", value: 7, rarity: "3/8" },
        { name: "Christmas Stegoceras", value: 7, rarity: "2/8" },
        { name: "Gargoyle Hatzegopteryx", value: 6.5, rarity: "3/8" },
        { name: "Clay Iguanodon", value: 6, rarity: "3/8" },
        { name: "Violex Parvulus", value: 6, rarity: "2/8" },
        { name: "Putrefied Amargasaurus", value: 6, rarity: "2/8" },
        { name: "Gold Lily Saurolophus", value: 6, rarity: "2/8" },
        { name: "Indomitable Thief", value: 5, rarity: "3/8" },
        { name: "Chaos Spinosaurus", value: 5, rarity: "2/8" },
        { name: "Movie Spinofaarus", value: 5, rarity: "3/8" },
        { name: "Tree Elder Shantungosaurus", value: 5, rarity: "2/8" },
        { name: "Forest Dweller Shantungosaurus", value: 5, rarity: "2/8" },
        { name: "Steelforged Concavenator", value: 5, rarity: "1/8" },
        { name: "Fossil Cadger", value: 5, rarity: "3/8" },
        { name: "The Mimic", value: 5, rarity: "4/8" },
        { name: "Yeti Albertosaurus", value: 5, rarity: "2/8" },
        { name: "Maceball Stegosaurus", value: 5, rarity: "2/8" },
        { name: "Galactic Hatzegopteryx", value: 5, rarity: "2/8" },
        { name: "Chaos Mosasaurus", value: 5, rarity: "2/8" },
        { name: "Acrocanthorse", value: 5, rarity: "2/8" },
        { name: "Pop Candy Pachycephalosaurus", value: 5, rarity: "2/8" },
        { name: "Flying Dutchman", value: 5, rarity: "2/8" },
        { name: "Fossil Brachiosaurus", value: 4.5, rarity: "1/8" },
        { name: "Pitch Black Avimimus", value: 4.5, rarity: "3/8" },
        { name: "Fossil Carcharocles Megalodon", value: 4.5, rarity: "1/8" },
        { name: "Movie Giganotosaurus", value: 5, rarity: "3/8" },
        { name: "Kaiju Spinosaurus", value: 5, rarity: "1/8" },
      ],
    },
    {
      name: "F Tier (0-4)",
      range: "0-4 (20K-80K dna)",
      color: "from-gray-500 to-purple-500",
      gradient: "bg-gradient-to-br from-gray-800/60 to-purple-800/60",
      dinosaurs: [
        { name: "Voodoo Murusraptor", value: 4, rarity: "3/8" },
        { name: "Sneaky Bunny Guanlong", value: 4, rarity: "2/8" },
        { name: "Monarch Meganeura", value: 4, rarity: "2/8" },
        { name: "Honey Heist Gigatitan", value: 4, rarity: "2/8" },
        { name: "Collector Maip Macrothorax", value: 4, rarity: "2/8" },
        { name: "Vampire Batzegopteryx", value: 4, rarity: "1/8" },
        { name: "DNA Raptor", value: 3.5, rarity: "1/8" },
        { name: "Kaiju Helicoprion", value: 3.5, rarity: "2/8" },
        { name: "Movie Pyroraptor", value: 3, rarity: "2/8" },
        { name: "Movie Baryonyx", value: 3, rarity: "2/8" },
        { name: "Galactic Gallimimus", value: 3, rarity: "2/8" },
        { name: "Swan Deinocheirus", value: 3, rarity: "1/8" },
        { name: "Frosted Rex", value: 3, rarity: "1/8" },
        { name: "Fluffle Therizinosaurus", value: 3, rarity: "1/8" },
        { name: "Easter Gallimimus", value: 3, rarity: "1/8" },
        { name: "Fossil Thalassomedon", value: 3, rarity: "1/8" },
        { name: "Yang Tide", value: 3, rarity: "1/8" },
        { name: "Yin Flare", value: 3, rarity: "1/8" },
        { name: "Mammoth", value: 2.5, rarity: "2/8" },
        { name: "Galactic Euoplocephalus", value: 2.5, rarity: "1/8" },
        { name: "Ornament Utahraptor", value: 2.5, rarity: "1/8" },
        { name: "Glutton Elk Spinofaarus", value: 2.5, rarity: "1/8" },
        { name: "Galactic Fresnosaurus", value: 2.25, rarity: "1/8" },
        { name: "Twilight Pliosaurus", value: 2.25, rarity: "1/8" },
        { name: "Movie Ankylosaurus", value: 2, rarity: "2/8" },
        { name: "Hot Cocoa Ichthyovenator", value: 2, rarity: "1/8" },
        { name: "Tundra Grazer Triceratops", value: 2, rarity: "2/8" },
        { name: "Bone Eating Hibbertopterus", value: 2, rarity: "1/8" },
        { name: "Bloodwurm Tullimonstrum", value: 2, rarity: "1/8" },
        { name: "Fossil Sarcosuchus", value: 2, rarity: "1/8" },
        { name: "Fossil Mosasaurus", value: 2, rarity: "1/8" },
        { name: "Fossil Tyrannosaurus Rex", value: 2, rarity: "1/8" },
        { name: "Fossil Utahraptor", value: 2, rarity: "1/8" },
        { name: "Fossil Pteranodon", value: 2, rarity: "1/8" },
        { name: "Fossil Ornithomimus", value: 2, rarity: "1/8" },
        { name: "Valley Golem Machimosaurus", value: 2, rarity: "1/8" },
        { name: "Movie Gallimimus", value: 2, rarity: "2/8" },
        { name: "Novel Carnotaurus", value: 2, rarity: "2/8" },
        { name: "Movie Ceratosaurus", value: 2, rarity: "2/8" },
        { name: "Movie Quetzalcoatlus", value: 2, rarity: "2/8" },
        { name: "Movie Dilophosaurus", value: 2, rarity: "2/8" },
        { name: "Chaos Tyrannosaurus Rex", value: 2, rarity: "2/8" },
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
        { name: "Megafraud", value: 1.5, rarity: "1/8" },
        { name: "Manticore", value: 1.5, rarity: "1/8" },
        { name: "Zeus", value: 1.5, rarity: "1/8" },
        { name: "Thor", value: 1.5, rarity: "1/8" },
        { name: "The Kraken", value: 1.5, rarity: "1/8" },
        { name: "Makeship Triceratops", value: 1, rarity: "1/8" },
        { name: "Movie Pachycephalosaurus", value: 1, rarity: "2/8" },
        { name: "Movie Stegosaurus", value: 1, rarity: "2/8" },
        { name: "Movie Compsognathus", value: 1, rarity: "2/8" },
        { name: "Movie Tyrannosaurus Rex", value: 1, rarity: "1/8" },
        { name: "Cottontail Maiasaura", value: 1, rarity: "1/8" },
        { name: "Movie Velociraptor", value: 1, rarity: "1/8" },
        { name: "Movie Parasaurolophus", value: 1, rarity: "1/8" },
        { name: "Movie Allosaurus", value: 1, rarity: "1/8" },
        { name: "Movie Carnotaurus", value: 1, rarity: "1/8" },
        { name: "Movie Pteranodon", value: 1, rarity: "1/8" },
        { name: "Classified Tylosaurus", value: 1, rarity: "1/8" },
        { name: "Drinking Bird Gigantoraptor", value: 1, rarity: "1/8" },
        { name: "Chicken Egg Balaur", value: 1, rarity: "1/8" },
        { name: "Christmas Coelacanth", value: 1, rarity: "1/8" },
        { name: "Gingerbread Ichthyosaurus", value: 1, rarity: "1/8" },
        { name: "Chimerasuchus", value: 1, rarity: "1/8" },
        { name: "Late Valentines Plush", value: 1, rarity: "1/8" },
        { name: "Snow Globe Megalodon", value: 1, rarity: "1/8" },
        { name: "Cetus", value: 0.75, rarity: "1/8" },
        { name: "Hestiaceras", value: 0.5, rarity: "1/8" },
        { name: "Cerberus", value: 0.5, rarity: "1/8" },
        { name: "Griffin", value: 0.5, rarity: "1/8" },
        { name: "Balure", value: 0.5, rarity: "1/8" },
        { name: "Minotaurus", value: 0.5, rarity: "1/8" },
        { name: "Kentrallos", value: 0.5, rarity: "1/8" },
        { name: "Erymanthian Styracoboar", value: 0.5, rarity: "1/8" },
        { name: "Movie Therizinosaurus", value: 3, rarity: "1/8" },
      ],
    },
    {
      name: "Collectors' Tier",
      range: "Special",
      color: "from-amber-500 to-yellow-600",
      gradient: "bg-gradient-to-br from-amber-800/60 to-yellow-800/60",
      dinosaurs: [
        { name: "Branded Purrusaurus", value: "1850-2250", rarity: "1/8" },
        { name: "Golden Ectenosaurus", value: "100-170", rarity: "1/8" },
        { name: "Grayscale Fasolatherium", value: "70-120", rarity: "1/8" },
        { name: "Grayscale Albino Terror", value: "70-130", rarity: "1/8" },
        { name: "Grayscale Gelioichthys", value: "70-110", rarity: "1/8" },
        { name: "Grayscale Megavore", value: "70-110", rarity: "1/8" },
        { name: "Grayscale Dolichomalosaurus", value: "70-100", rarity: "1/8" },
        { name: "Grayscale Avinychus", value: "50-80", rarity: "1/8" },
        { name: "Grayscale Alametus", value: "70-100", rarity: "1/8" },
      ],
    },
    {
      name: "Throwbacks",
      range: "Egg Skins",
      color: "from-purple-500 to-indigo-600",
      gradient: "bg-gradient-to-br from-purple-800/60 to-indigo-800/60",
      dinosaurs: [
        { name: "Prebivaropus", value: 2, rarity: "2/8" },
        { name: "Throwback Avinychus", value: 2, rarity: "2/8" },
        { name: "Throwback Gelioichthys", value: 2, rarity: "2/8" },
        { name: "Throwback Dolichomalasaurus", value: 2, rarity: "2/8" },
        { name: "Throwback Fasolatherium", value: 2, rarity: "2/8" },
        { name: "Throwback Alametus", value: 2, rarity: "2/8" },
        { name: "Tartrap Spinosaurus", value: 1.5, rarity: "1/8" },
        { name: "Kaiju Triceratops", value: 1.5, rarity: "1/8" },
        { name: "Throwback Barosaurus", value: 1.5, rarity: "1/8" },
      ],
    },
    {
      name: "Retextures",
      range: "Special",
      color: "from-pink-500 to-rose-600",
      gradient: "bg-gradient-to-br from-pink-800/60 to-rose-800/60",
      dinosaurs: [
        { name: "Rainbow Albino Terror", value: 6, rarity: "2/8", sdna: "50 SDNA" },
        { name: "Rainbow Megavore", value: 6, rarity: "2/8", sdna: "50 SDNA" },
        { name: "Diamond Albino Terror", value: 5, rarity: "2/8", sdna: "250 SDNA" },
        { name: "Diamond Megavore", value: 5, rarity: "2/8", sdna: "250 SDNA" },
        { name: "Diamond Barosaurus", value: 3, rarity: "1/8", sdna: "250 SDNA" },
        { name: "Rainbow Barosaurus", value: 2, rarity: "1/8", sdna: "50 SDNA" },
      ],
    },
    {
      name: "Gamepasses",
      range: "Robux",
      color: "from-emerald-500 to-teal-600",
      gradient: "bg-gradient-to-br from-emerald-800/60 to-teal-800/60",
      dinosaurs: [
        { name: "Classic Pitch Black Terror V4", value: 10, rarity: "1/8", sdna: "750 SDNA" },
        { name: "Kaiju Spinosaurus", value: 5, rarity: "1/8" },
        { name: "Classic Krampus", value: 4, rarity: "1/8", sdna: "300 SDNA" },
        { name: "Riot Shield Triceratops", value: 3, rarity: "1/8" },
        { name: "Classic Headlessaurus", value: 3, rarity: "1/8", sdna: "200 SDNA" },
        { name: "Icicle Styracosaurus", value: 2, rarity: "1/8" },
        { name: "Classic Fossil Brachiosaurus", value: 2, rarity: "1/8", sdna: "150 SDNA" },
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
      {/* Theme Side Panel */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isThemePanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsThemePanelOpen(false)} />
        <div
          className={`relative w-72 max-w-[80vw] h-full ${theme.dropdownBg} ${theme.border} border-r transition-transform duration-300 ${isThemePanelOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b ${theme.border}">
            <h2 className={`font-semibold ${theme.textPrimary}`}>Select Theme</h2>
            <button
              onClick={() => setIsThemePanelOpen(false)}
              className={`${theme.buttonBg} ${theme.buttonHover} p-2 rounded-lg`}
            >
              <X className={`w-5 h-5 ${theme.textSecondary}`} />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {Object.entries(themes).map(([key, themeOption]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                  currentTheme === key
                    ? `${theme.buttonBg} ${theme.buttonText}`
                    : `${theme.textSecondary} ${theme.buttonHover.replace("hover:", "hover:")}`
                }`}
              >
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
        <div className={`${theme.scrollHeaderBg} backdrop-blur-xl ${theme.border} border-b shadow-lg`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <Input
              type="text"
              placeholder="Search dinosaurs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`h-10 ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary} placeholder:${theme.textSecondary} focus:${theme.inputBorder.replace("border-", "border-").replace("/50", "/70")} rounded-lg backdrop-blur-sm text-sm`}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div ref={headerControlsRef}>
          {/* Compact Header */}
          <div
            className={`w-full ${theme.headerBg} backdrop-blur-xl ${theme.border} border rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left: Theme Button */}
              <button
                onClick={() => setIsThemePanelOpen(true)}
                className={`px-3 py-2 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl backdrop-blur-sm ${theme.border} border transition-all duration-200 hover:scale-105 flex items-center gap-2 text-sm font-light`}
              >
                <Paintbrush className="w-4 h-4" />
                <span className="hidden sm:inline">Themes</span>
              </button>

              {/* Center: Title */}
              <div className="text-center flex-1">
                <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary}`}>Dinosaur Simulator</h1>
                <p className={`text-sm ${theme.textSecondary} font-light`}>Value List</p>
              </div>

              {/* Right: Navigation */}
              <div className="flex gap-2">
                <Link href={`/info?theme=${currentTheme}`}>
                  <button
                    className={`px-3 py-2 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl backdrop-blur-sm ${theme.border} border transition-all duration-200 hover:scale-105 text-sm font-light`}
                  >
                    Info
                  </button>
                </Link>
                <Link href={`/changelog?theme=${currentTheme}`}>
                  <button
                    className={`px-3 py-2 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl backdrop-blur-sm ${theme.border} border transition-all duration-200 hover:scale-105 text-sm font-light`}
                  >
                    Changelog
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Search and Filters - Organized */}
          <div className="space-y-4 mb-6">
            {/* Search Bar - Full Width */}
            <Input
              type="text"
              placeholder="Search dinosaurs, values, codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`h-12 ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary} placeholder:${theme.textSecondary} focus:${theme.inputBorder.replace("border-", "border-").replace("/50", "/70")} rounded-xl backdrop-blur-sm text-base`}
            />

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tier Filter */}
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className={`w-full h-11 px-4 ${theme.inputBg} ${theme.inputBorder} border ${theme.textPrimary} rounded-xl backdrop-blur-sm focus:${theme.inputBorder.replace("border-", "border-").replace("/50", "/70")} appearance-none cursor-pointer text-sm font-medium`}
                >
                  <option value="all" className="bg-gray-900 text-white">
                    All Tiers
                  </option>
                  {tiers.map((tier) => (
                    <option key={tier.name} value={tier.name} className="bg-gray-900 text-white">
                      {tier.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textSecondary} pointer-events-none`}
                />
              </div>

              {/* Sort Options */}
              <div className={`flex ${theme.inputBg} rounded-xl p-1 backdrop-blur-sm ${theme.inputBorder} border h-11`}>
                <button
                  onClick={() => setSortMode("value")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs ${sortMode === "value" ? `${theme.buttonBg} ${theme.buttonText}` : `${theme.textSecondary} hover:text-white`}`}
                >
                  <DollarSign className="w-3.5 h-3.5" /> Value
                </button>
                <button
                  onClick={() => setSortMode("alphabetical")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs ${sortMode === "alphabetical" ? `${theme.buttonBg} ${theme.buttonText}` : `${theme.textSecondary} hover:text-white`}`}
                >
                  <ArrowDownUp className="w-3.5 h-3.5" /> A-Z
                </button>
                <button
                  onClick={() => setSortMode("demand")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs ${sortMode === "demand" ? `${theme.buttonBg} ${theme.buttonText}` : `${theme.textSecondary} hover:text-white`}`}
                >
                  <BarChartHorizontalBig className="w-3.5 h-3.5" /> Demand
                </button>
              </div>

              {/* View Toggle */}
              <div className={`flex ${theme.inputBg} rounded-xl p-1 backdrop-blur-sm ${theme.inputBorder} border h-11`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === "grid" ? `${theme.buttonBg} ${theme.buttonText}` : `${theme.textSecondary} hover:text-white`}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === "list" ? `${theme.buttonBg} ${theme.buttonText}` : `${theme.textSecondary} hover:text-white`}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters & Quick Actions */}
          {(searchTerm || selectedTier !== "all" || sortMode !== "value") && (
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <span className={`${theme.textSecondary} text-xs`}>Active filters:</span>
              {searchTerm && (
                <Badge className={`${theme.badgeBg} ${theme.badgeText} text-xs`}>Search: {searchTerm}</Badge>
              )}
              {selectedTier !== "all" && (
                <Badge className={`${theme.badgeBg} ${theme.badgeText} text-xs`}>Tier: {selectedTier}</Badge>
              )}
              {sortMode !== "value" && (
                <Badge className={`${theme.badgeBg} ${theme.badgeText} text-xs`}>
                  Sort: {sortMode === "alphabetical" ? "A-Z" : "Demand"}
                </Badge>
              )}
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTier("all")
                  setSortMode("value")
                }}
                className={`text-xs ${theme.textAccent} ${theme.linkHover} underline`}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className={`${theme.textSecondary} text-sm`}>
              Showing <span className={`${theme.textAccent} font-semibold`}>{filteredAndSortedDinosaurs.length}</span>{" "}
              dinosaurs
            </p>
          </div>
        </div>

        <div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredAndSortedDinosaurs.map((dino, index) => (
                <Card
                  key={`${dino.name}-${index}`}
                  className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm hover:scale-105 transition-all duration-200 group shadow-lg`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3
                        className={`font-semibold ${theme.textPrimary} text-sm leading-tight group-hover:${theme.textAccent} transition-colors`}
                      >
                        {dino.name}
                      </h3>
                      <Badge
                        className={`${theme.badgeBg} ${theme.badgeText} border-0 ml-2 shrink-0 font-bold text-xs shadow-sm`}
                      >
                        {dino.value}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {dino.rarity && (
                        <Badge className={`text-xs ${getRarityColor(dino.rarity)} border shadow-sm shrink-0 font-bold`}>
                          {dino.rarity}
                        </Badge>
                      )}
                      {dino.code && (
                        <Badge className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 shadow-sm">
                          Code: {dino.code}
                        </Badge>
                      )}
                      {dino.sdna && (
                        <Badge className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shadow-sm">
                          {dino.sdna}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-3">
                      <Badge
                        className={`text-xs ${theme.textAccent} ${theme.border} border ${theme.inputBg} backdrop-blur-sm`}
                      >
                        {dino.tier}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAndSortedDinosaurs.map((dino, index) => (
                <Card
                  key={`${dino.name}-${index}`}
                  className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm ${theme.buttonHover.replace("hover:", "hover:")} transition-all duration-200 shadow-lg`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <h3 className={`font-semibold ${theme.textPrimary} text-sm flex-1 truncate`}>{dino.name}</h3>
                        <Badge
                          className={`${theme.badgeBg} ${theme.badgeText} border-0 font-bold text-xs shrink-0 shadow-sm`}
                        >
                          {dino.value}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 ml-3 sm:ml-4 flex-wrap">
                        {dino.rarity && (
                          <Badge className={`text-xs ${getRarityColor(dino.rarity)} border shadow-sm shrink-0`}>
                            {dino.rarity}
                          </Badge>
                        )}
                        {dino.code && (
                          <Badge className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 shrink-0 shadow-sm">
                            Code: {dino.code}
                          </Badge>
                        )}
                        {dino.sdna && (
                          <Badge className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shrink-0 shadow-sm">
                            {dino.sdna}
                          </Badge>
                        )}
                        <Badge
                          className={`text-xs ${theme.textAccent} ${theme.border} border ${theme.inputBg} shrink-0 backdrop-blur-sm`}
                        >
                          {dino.tier}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {filteredAndSortedDinosaurs.length === 0 && (
            <Card className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-lg`}>
              <CardContent className="text-center py-8 sm:py-12">
                <p className={`${theme.textSecondary} font-light`}>No dinosaurs found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className={`${theme.textSecondary} text-sm font-light`}>
            Directly forked from the{" "}
            <a
              href="https://discord.gg/kNPy4jwMWj"
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.textAccent} ${theme.linkHover} transition-colors underline decoration-current/60 hover:decoration-current`}
            >
              Dinosaur Simulator Trading Network
            </a>{" "}
            Discord Server with minor changes.
          </p>
        </div>
      </div>
    </div>
  )
}
