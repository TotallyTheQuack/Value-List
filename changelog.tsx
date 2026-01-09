"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Clock, TrendingUp, TrendingDown, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"

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
  rarityColors: Record<string, string>
  valueBg?: string // Added for new tradables section
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
    inputBorder: "border-gray-800/50",
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
      "3/8": "bg-cyan-500 text-white border-cyan-400",
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
      "1/8": "bg-gray-500 text-white border-gray-400",
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
    dropdownBg: "bg-slate-900",
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
    scrollHeaderBg: "bg-blue-900/95",
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
  pb: {
    name: "Pitch Black",
    background: "bg-black",
    cardBg: "bg-zinc-950/50",
    cardBorder: "border-zinc-800/50",
    headerBg: "bg-black/90",
    textPrimary: "text-zinc-100",
    textSecondary: "text-zinc-400",
    textAccent: "text-zinc-300",
    border: "border-zinc-800/50",
    buttonBg: "bg-zinc-900/70",
    buttonHover: "hover:bg-zinc-800/70",
    buttonText: "text-zinc-200",
    inputBg: "bg-zinc-950/70",
    inputBorder: "border-zinc-800/50",
    badgeBg: "bg-zinc-800/60",
    badgeText: "text-zinc-100",
    scrollHeaderBg: "bg-black/95",
    dropdownBg: "bg-zinc-950",
    linkHover: "hover:text-zinc-100",
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
  oled: {
    name: "OLED Black",
    background: "bg-[#000000]",
    cardBg: "bg-zinc-950/40",
    cardBorder: "border-zinc-800/40",
    headerBg: "bg-[#000000]/95",
    textPrimary: "text-zinc-50",
    textSecondary: "text-zinc-400",
    textAccent: "text-cyan-400",
    border: "border-zinc-800/40",
    buttonBg: "bg-zinc-900/60",
    buttonHover: "hover:bg-zinc-800/60",
    buttonText: "text-zinc-100",
    inputBg: "bg-zinc-950/60",
    inputBorder: "border-zinc-800/40",
    badgeBg: "bg-zinc-800/50",
    badgeText: "text-zinc-50",
    scrollHeaderBg: "bg-[#000000]/98",
    dropdownBg: "bg-[#000000]",
    linkHover: "hover:text-cyan-300",
    rarityColors: {
      "8/8": "bg-purple-500 text-white border-purple-400",
      "7/8": "bg-red-500 text-white border-red-400",
      "6/8": "bg-orange-500 text-white border-orange-400",
      "5/8": "bg-yellow-400 text-black border-yellow-300",
      "4/8": "bg-green-500 text-white border-green-400",
      "3/8": "bg-cyan-400 text-black border-cyan-300",
      "2/8": "bg-blue-500 text-white border-blue-400",
      "1/8": "bg-slate-400 text-white border-slate-300",
    },
  },
}

interface ChangelogEntry {
  name: string
  oldValue: number | string
  newValue: number | string
  oldRarity: string
  newRarity: string
  isIncrease: boolean
  isAdjustment?: boolean
  isCollectors?: boolean
}

// Helper component for individual value change entries
const ValueChangeItem = ({
  name,
  oldValue,
  newValue,
  oldRarity,
  newRarity,
  theme,
  isDecrease,
}: {
  name: string
  oldValue: number | string
  newValue: number | string
  oldRarity: string
  newRarity: string
  theme: Theme
  isDecrease?: boolean
}) => {
  const isIncrease = !isDecrease
  const color = isIncrease ? "text-green-400" : "text-red-400"
  const dotColor = isIncrease ? "bg-green-500" : "bg-red-500"

  return (
    <div
      className={`${theme.cardBg} ${theme.cardBorder} border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`font-semibold ${theme.textPrimary} truncate`}>{name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`${color} text-sm`}>
              {oldValue} ({oldRarity})
            </span>
            <span className={`${color} text-xs`}>→</span>
            <span className={`${color} text-sm font-bold`}>{newValue}</span>
            <span className={`${color} text-sm`}>({newRarity})</span>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
      </div>
    </div>
  )
}

// Helper component for tier adjustment cards
const TierAdjustmentCard = ({
  name,
  change,
  theme,
  isIncrease,
}: {
  name: string
  change: string
  theme: Theme
  isIncrease: boolean
}) => {
  const textColor = isIncrease ? "text-green-300" : "text-red-300"
  const dotColor = isIncrease ? "bg-green-500" : "bg-red-500"

  return (
    <div className={`p-4 rounded-lg border ${theme.border} ${theme.cardBg}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        <h4 className={`font-semibold ${textColor}`}>{name}</h4>
      </div>
      <p className={`text-sm ${textColor}`}>{change}</p>
    </div>
  )
}

export default function ChangelogComponent() {
  const [theme, setTheme] = useState<string>("dark")
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("dinosaur-value-list-theme") || "dark"
    setTheme(savedTheme)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("dinosaur-value-list-theme", newTheme)
    setIsThemeMenuOpen(false)

    const url = new URL(window.location.href)
    url.searchParams.set("theme", newTheme)
    window.history.replaceState({}, "", url)
  }

  const currentTheme = themes[theme] || themes.dark
  const themeNames = Object.keys(themes)

  return (
    <div className={`min-h-screen ${currentTheme.background} pb-12`}>
      {/* Header */}
      <header className={`${currentTheme.headerBg} backdrop-blur-md border-b ${currentTheme.border} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className={`${currentTheme.textPrimary} ${currentTheme.linkHover} transition-colors`}>
                <h1 className="text-3xl font-bold">Dinosaur Simulator</h1>
                <p className={`text-sm ${currentTheme.textSecondary}`}>Value List</p>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} transition-colors`}
                  aria-label="Choose Theme"
                >
                  <Paintbrush className="w-5 h-5" />
                  Themes
                </button>

                {isThemeMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-56 rounded-lg ${currentTheme.dropdownBg} border ${currentTheme.cardBorder} shadow-lg overflow-hidden z-50`}
                  >
                    <div className={`px-4 py-3 border-b ${currentTheme.border}`}>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>Choose Theme</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {themeNames.map((themeName) => (
                        <button
                          key={themeName}
                          onClick={() => handleThemeChange(themeName)}
                          className={`w-full text-left px-4 py-3 ${currentTheme.textPrimary} ${currentTheme.buttonHover} transition-colors ${
                            theme === themeName ? `${currentTheme.badgeBg}` : ""
                          }`}
                        >
                          {themes[themeName].name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/info"
                className={`px-4 py-2 rounded-lg ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} transition-colors`}
              >
                Info
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className={`${currentTheme.cardBg} ${currentTheme.cardBorder} border backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className={`text-4xl ${currentTheme.textPrimary} text-center`}>Changelog</CardTitle>
            <p className={`text-center ${currentTheme.textSecondary} mt-2`}>Track all value updates and changes</p>
          </CardHeader>
          <CardContent>
            {/* LATEST VALUE UPDATE Banner */}
            <div className="mb-8 p-6 bg-gradient-to-r from-red-900/40 to-orange-800/40 border border-red-600/40 rounded-lg">
              <h2 className="text-2xl font-bold text-red-100 mb-3">LATEST VALUE UPDATE!</h2>
              <p className="text-red-200 leading-relaxed">
                Major market correction: Apparition Fossil Giganotosaurus soars to 570 value (8/8) and Eschaton
                Argentinosaurus reaches 470 value! Pitchygator surges to 175. DNA conversion decreased to 20-23K DNA per
                value, reflecting market stabilization after recent inflation. Several rarity adjustments and 2 new
                tradables added.
              </p>
            </div>

            {/* Value Increases Section - Updated with latest increases only */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <h3 className="text-2xl font-bold text-green-400">Value Increases</h3>
                <span className={`text-sm ${currentTheme.textSecondary}`}>21 items</span>
              </div>
              <div className="grid gap-3">
                <ValueChangeItem
                  name="Apparition Fossil Giganotosaurus"
                  oldValue="440"
                  newValue="570"
                  oldRarity="8/8"
                  newRarity="8/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Eschaton Argentinosaurus"
                  oldValue="400"
                  newValue="470"
                  oldRarity="8/8"
                  newRarity="8/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Pitch Wraith Terror"
                  oldValue="280"
                  newValue="290"
                  oldRarity="8/8"
                  newRarity="8/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Pitch Black Sunfish Shonisaurus"
                  oldValue="210"
                  newValue="220"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Wraith Terror"
                  oldValue="180"
                  newValue="190"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Pitchygator"
                  oldValue="140"
                  newValue="175"
                  oldRarity="7/8"
                  newRarity="7/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Hydralania"
                  oldValue="160"
                  newValue="165"
                  oldRarity="6/8"
                  newRarity="7/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Distorted King"
                  oldValue="130"
                  newValue="135"
                  oldRarity="7/8"
                  newRarity="8/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Pitch Black Moray Oxalaia"
                  oldValue="120"
                  newValue="122"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Cathedral Fasolatherium"
                  oldValue="96"
                  newValue="100"
                  oldRarity="6/8"
                  newRarity="7/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Nameless Barosaurus"
                  oldValue="75"
                  newValue="82"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Giant Albino Baryonyx"
                  oldValue="68"
                  newValue="70"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Aurora Borethalass"
                  oldValue="49"
                  newValue="62"
                  oldRarity="6/8"
                  newRarity="7/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Zomvinychus"
                  oldValue="52"
                  newValue="55"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Peak Spinosaurus"
                  oldValue="30"
                  newValue="30"
                  oldRarity="5/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Butterfly Alametus"
                  oldValue="26"
                  newValue="26"
                  oldRarity="5/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Carcharocles Megalodon"
                  oldValue="25"
                  newValue="28"
                  oldRarity="5/8"
                  newRarity="6/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Kaiju Gelioichthys"
                  oldValue="24"
                  newValue="26"
                  oldRarity="5/8"
                  newRarity="5/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Chaos Titanosaur"
                  oldValue="11"
                  newValue="13"
                  oldRarity="3/8"
                  newRarity="3/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Nidhogg"
                  oldValue="8"
                  newValue="10"
                  oldRarity="3/8"
                  newRarity="3/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Violex Parvulus"
                  oldValue="8"
                  newValue="9"
                  oldRarity="2/8"
                  newRarity="3/8"
                  theme={currentTheme}
                />
                <ValueChangeItem
                  name="Indomitable Thief"
                  oldValue="6"
                  newValue="7"
                  oldRarity="2/8"
                  newRarity="3/8"
                  theme={currentTheme}
                />
              </div>
            </div>

            {/* Value Decreases Section - Updated with latest decreases only */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-6 h-6 text-red-500" />
                <h3 className="text-2xl font-bold text-red-400">Value Decreases</h3>
                <span className={`text-sm ${currentTheme.textSecondary}`}>11 items</span>
              </div>
              <div className="grid gap-3">
                <ValueChangeItem
                  name="Pitch Black Baryonyx"
                  oldValue="200"
                  newValue="200"
                  oldRarity="6/8"
                  newRarity="5/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Fallen Gladiator"
                  oldValue="135"
                  newValue="135"
                  oldRarity="7/8"
                  newRarity="6/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Isisauriraptor"
                  oldValue="122"
                  newValue="115"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Orca Spinosaurus"
                  oldValue="85"
                  newValue="80"
                  oldRarity="6/8"
                  newRarity="6/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Reaper Gelioichthys"
                  oldValue="72"
                  newValue="69"
                  oldRarity="7/8"
                  newRarity="6/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Pitch Black Terror"
                  oldValue="70"
                  newValue="67"
                  oldRarity="6/8"
                  newRarity="6/7"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Pitch Luminescent Avinychus"
                  oldValue="60"
                  newValue="54"
                  oldRarity="5/8"
                  newRarity="5/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Spectre Fossil Megavore"
                  oldValue="28"
                  newValue="27"
                  oldRarity="4/8"
                  newRarity="4/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Rakebaby Guanlong"
                  oldValue="24"
                  newValue="23"
                  oldRarity="4/8"
                  newRarity="4/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Masquerade Gigantoraptor"
                  oldValue="22"
                  newValue="18"
                  oldRarity="4/8"
                  newRarity="4/8"
                  theme={currentTheme}
                  isDecrease
                />
                <ValueChangeItem
                  name="Lil UFO Pteranodon"
                  oldValue="13"
                  newValue="10"
                  oldRarity="2/8"
                  newRarity="2/8"
                  theme={currentTheme}
                  isDecrease
                />
              </div>
            </div>

            {/* Tier Adjustments Section - Updated with latest adjustments */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-6 h-6 text-orange-500" />
                <h3 className="text-2xl font-bold text-orange-400">Tier Adjustments</h3>
                <span className={`text-sm ${currentTheme.textSecondary}`}>
                  Rarity tier changes and value adjustments
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TierAdjustmentCard
                  name="Blue Whale Shastasaurus"
                  change="140 (7/8) → 155 (6/8)"
                  theme={currentTheme}
                  isIncrease={true}
                />
                <TierAdjustmentCard
                  name="Movie Mosasaurus"
                  change="70 (7/8) → 70 (6/8)"
                  theme={currentTheme}
                  isIncrease={false}
                />
                <TierAdjustmentCard
                  name="Pitch Coconut Brachiosaurus"
                  change="42 (4/8) → 40 (4/8)"
                  theme={currentTheme}
                  isIncrease={false}
                />
                <TierAdjustmentCard
                  name="Kaiju Spinofaarus"
                  change="36 (5/8) → 38 (5/8)"
                  theme={currentTheme}
                  isIncrease={true}
                />
                <TierAdjustmentCard
                  name="Spinofaarus"
                  change="35 (5/8) → 36 (5/8)"
                  theme={currentTheme}
                  isIncrease={true}
                />
                <TierAdjustmentCard
                  name="Kaiju Sauroposeidon"
                  change="11 (3/8) → 10 (3/8)"
                  theme={currentTheme}
                  isIncrease={false}
                />
                <TierAdjustmentCard
                  name="Pumpkin Megalodon"
                  change="5 (1/8) → 3 (1/8)"
                  theme={currentTheme}
                  isIncrease={false}
                />
                <TierAdjustmentCard
                  name="Singulafaarus"
                  change="8 (3/8) → 9 (3/8)"
                  theme={currentTheme}
                  isIncrease={true}
                />
              </div>
            </div>

            {/* New Tradables Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-cyan-500" />
                <h3 className="text-2xl font-bold text-cyan-400">New Tradables</h3>
                <span className={`text-sm ${currentTheme.textSecondary}`}>2 new skins added</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold ${currentTheme.text}`}>Pitch Black Shantungosaurus</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${currentTheme.valueBg || "bg-purple-500/20"} ${currentTheme.text}`}
                    >
                      12
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-300`}>
                      3/8
                    </span>
                    <span className={`text-xs ${currentTheme.textSecondary}`}>D Tier</span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold ${currentTheme.text}`}>Blinding White Shantungosaurus</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${currentTheme.valueBg || "bg-purple-500/20"} ${currentTheme.text}`}
                    >
                      8
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-300`}>
                      2/8
                    </span>
                    <span className={`text-xs ${currentTheme.textSecondary}`}>E Tier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DNA Conversion Section - Updated with DNA decrease */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-red-500" />
                <h3 className="text-2xl font-bold text-red-400">DNA Conversion</h3>
                <span className={`text-sm ${currentTheme.textSecondary}`}>Updated trading rates</span>
              </div>
              <div className={`p-6 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}>
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <h4 className={`font-bold text-lg ${currentTheme.text}`}>Value Decrease</h4>
                </div>
                <div className="flex items-center gap-4 text-2xl font-bold mb-2">
                  <span className="text-red-400">9-11K DNA = 1 Value</span>
                  <span className={currentTheme.textSecondary}>→</span>
                  <span className="text-red-500">20-23K DNA = 1 Value</span>
                </div>
                <p className={`text-sm ${currentTheme.textSecondary} italic`}>
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
