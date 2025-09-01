"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Clock, TrendingUp, TrendingDown, RotateCcw, Plus } from "lucide-react"
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

export default function Changelog() {
  const [currentTheme, setCurrentTheme] = useState<string>("dark")
  const [showSettings, setShowSettings] = useState(false)
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

  // Load theme from localStorage or URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const themeFromUrl = urlParams.get("theme")
    const savedTheme = localStorage.getItem("dinosaur-value-list-theme")

    let newTheme = "dark" // Default theme
    if (themeFromUrl && themes[themeFromUrl]) {
      newTheme = themeFromUrl
    } else if (savedTheme && themes[savedTheme]) {
      newTheme = savedTheme
    }

    setCurrentTheme(newTheme)
    setIsThemeLoaded(true)
  }, [])

  // Save theme to localStorage when changed
  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName)
    localStorage.setItem("dinosaur-value-list-theme", themeName)
    setShowSettings(false)
  }

  const theme = themes[currentTheme]

  const changelogEntries: ChangelogEntry[] = [
    // RISES
    {
      name: "Wraith Terror",
      oldValue: 140,
      newValue: 150,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: true,
    },
    {
      name: "Fallen Gladiator",
      oldValue: 140,
      newValue: 145,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: true,
    },
    {
      name: "Violex Magnus",
      oldValue: 140,
      newValue: 145,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: true,
    },
    {
      name: "Galactic Barosaurus",
      oldValue: 90,
      newValue: 95,
      oldRarity: "7/8",
      newRarity: "7/8",
      isIncrease: true,
    },
    {
      name: "Distorted King",
      oldValue: 60,
      newValue: 85,
      oldRarity: "5/8",
      newRarity: "7/8",
      isIncrease: true,
    },
    {
      name: "Zomvinychus",
      oldValue: 44,
      newValue: 46,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Firebird",
      oldValue: 26,
      newValue: 27,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: true,
    },
    {
      name: "Movie Mosasaurus",
      oldValue: 22,
      newValue: 25,
      oldRarity: "3/8",
      newRarity: "4/8",
      isIncrease: true,
    },
    {
      name: "Kralkatorrik",
      oldValue: 18,
      newValue: 18,
      oldRarity: "2/8",
      newRarity: "3/8",
      isIncrease: true,
    },
    {
      name: "Butterfly Alametus",
      oldValue: 13,
      newValue: 17,
      oldRarity: "4/8",
      newRarity: "4/8",
      isIncrease: true,
    },
    // DROPS
    {
      name: "Albino Terror",
      oldValue: 105,
      newValue: 100,
      oldRarity: "8/8",
      newRarity: "8/8",
      isIncrease: false,
    },
    {
      name: "Movie Spinosaurus",
      oldValue: 22,
      newValue: 18,
      oldRarity: "3/8",
      newRarity: "3/8",
      isIncrease: false,
    },
    {
      name: "Chaos Spinosaurus",
      oldValue: 9,
      newValue: 5,
      oldRarity: "3/8",
      newRarity: "2/8",
      isIncrease: false,
    },
    // ADJUSTMENTS
    {
      name: "Pitch Wraith Terror",
      oldValue: 190,
      newValue: 200,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: true,
      isAdjustment: true,
    },
    {
      name: "Hydralania",
      oldValue: 170,
      newValue: 175,
      oldRarity: "7/8",
      newRarity: "7/8",
      isIncrease: true,
      isAdjustment: true,
    },
    {
      name: "Isisauriraptor",
      oldValue: 130,
      newValue: 125,
      oldRarity: "6/8",
      newRarity: "6/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Blue Whale Shastasaurus",
      oldValue: 85,
      newValue: 80,
      oldRarity: "5/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Orca Spinosaurus",
      oldValue: 70,
      newValue: 65,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Dolphin Ichthyovenator",
      oldValue: 55,
      newValue: 55,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Phantom Bringer Ceratosaurus",
      oldValue: 45,
      newValue: 42,
      oldRarity: "4/8",
      newRarity: "5/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Peak Spinosaurus",
      oldValue: 34,
      newValue: 32,
      oldRarity: "3/8",
      newRarity: "4/8",
      isIncrease: false,
      isAdjustment: true,
    },
    {
      name: "Spring Blossom Lusotitan",
      oldValue: 6,
      newValue: 10,
      oldRarity: "2/8",
      newRarity: "2/8",
      isIncrease: true,
      isAdjustment: true,
    },
    // COLLECTORS' TIER
    {
      name: "Branded Purrusaurus",
      oldValue: 1350,
      newValue: "1250-1500",
      oldRarity: "1/8",
      newRarity: "1/8",
      isIncrease: false,
      isCollectors: true,
    },
    {
      name: "Crossover Hybrid/Vinera",
      oldValue: 45,
      newValue: 40,
      oldRarity: "4/8",
      newRarity: "4/8",
      isIncrease: false,
      isCollectors: true,
    },
  ]

  const newTradables = [
    { name: "Indomitable Thief Gen 2", value: 8, rarity: "3/8" },
    { name: "Indomitable King", value: 5, rarity: "2/8" },
    { name: "Indomitable Thief", value: 3, rarity: "2/8" },
    { name: "Movie Baryonyx", value: 3, rarity: "2/8" },
    { name: "Movie Pyroraptor", value: 3, rarity: "2/8" },
  ]

  return (
    <div className={`min-h-screen ${theme.background} transition-opacity duration-200 ${isThemeLoaded ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className={`relative z-20 ${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl`}>
          <div className="flex justify-between items-center">
            {/* Left Side: Settings Button */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`px-4 py-2 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl backdrop-blur-sm ${theme.border} border transition-all duration-200 hover:scale-105 flex items-center gap-2 text-sm font-light`}
              >
                <Paintbrush className="w-4 h-4" />
                <span className="hidden sm:inline">Themes</span>
              </button>
              {showSettings && (
                <div
                  className={`absolute top-full left-0 mt-2 ${theme.dropdownBg} backdrop-blur-xl ${theme.border} border rounded-xl p-3 min-w-[200px] z-50 shadow-2xl`}
                >
                  <div className={`${theme.textSecondary} text-xs font-medium mb-3 px-1`}>Choose Theme</div>
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm mb-1 ${
                        currentTheme === key
                          ? `${theme.buttonBg} ${theme.buttonText}`
                          : `${theme.textSecondary} ${theme.buttonHover.replace("hover:", "hover:")}`
                      }`}
                    >
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Middle: Title */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <Clock className={`w-8 h-8 ${theme.textAccent}`} />
                    <h1 className={`text-3xl sm:text-4xl font-bold ${theme.textPrimary}`}>Update History</h1>
                </div>
                <p className={`text-lg ${theme.textSecondary} font-light`}>Recent Value Changes & Market Updates</p>
            </div>

            {/* Right Side: Navigation Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <Link href={`/info?theme=${currentTheme}`}>
                <button
                  className={`px-4 py-2 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl backdrop-blur-sm ${theme.border} border transition-all duration-200 hover:scale-105 text-sm font-light`}
                >
                  Info
                </button>
              </Link>
              <Link href={`/?theme=${currentTheme}`}>
                <button
                  className={`px-4 py-2 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} rounded-xl backdrop-blur-sm ${theme.border} border transition-all duration-200 hover:scale-105 text-sm font-light`}
                >
                  Back to Value List
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:gap-8">
          {/* Market Summary */}
          <Card
            className={`relative z-10 ${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden`}
          >
            <CardHeader className={`bg-gradient-to-r from-green-900/20 to-emerald-900/20 ${theme.cardBorder} border-b`}>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <CardTitle className={`${theme.textPrimary} text-2xl font-bold`}>
                  Market Update - August 31, 2025
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4">
                <p className="text-green-400 text-sm font-medium leading-relaxed">
                  <strong>GOOD NEWS ALL TRADERS!</strong> The only major drop this update has been DNA! We have not
                  gotten a list with this much green for the entirety of 2025! Adds are recovering ever so slowly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Value Changes */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Rises */}
            <Card
              className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden`}
            >
              <CardHeader
                className={`bg-gradient-to-r from-green-900/20 to-emerald-900/20 ${theme.cardBorder} border-b`}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <CardTitle className={`${theme.textPrimary} text-xl font-bold`}>Value Increases</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {changelogEntries
                    .filter((entry) => entry.isIncrease && !entry.isCollectors && !entry.isAdjustment)
                    .map((entry, index) => (
                      <div
                        key={index}
                        className={`${theme.inputBg} ${theme.border} border rounded-lg p-3 hover:scale-[1.02] transition-transform duration-200`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className={`${theme.textPrimary} text-sm font-medium truncate`}>{entry.name}</p>
                            <p className={`${theme.textSecondary} text-xs`}>
                              {entry.oldValue} ({entry.oldRarity}) → {entry.newValue} ({entry.newRarity})
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Drops */}
            <Card
              className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden`}
            >
              <CardHeader className={`bg-gradient-to-r from-red-900/20 to-pink-900/20 ${theme.cardBorder} border-b`}>
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                  <CardTitle className={`${theme.textPrimary} text-xl font-bold`}>Value Decreases</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {changelogEntries
                    .filter((entry) => !entry.isIncrease && !entry.isAdjustment && !entry.isCollectors)
                    .map((entry, index) => (
                      <div
                        key={index}
                        className={`${theme.inputBg} ${theme.border} border rounded-lg p-3 hover:scale-[1.02] transition-transform duration-200`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className={`${theme.textPrimary} text-sm font-medium truncate`}>{entry.name}</p>
                            <p className={`${theme.textSecondary} text-xs`}>
                              {entry.oldValue} ({entry.oldRarity}) → {entry.newValue} ({entry.newRarity})
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Adjustments */}
          <Card
            className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden`}
          >
            <CardHeader className={`bg-gradient-to-r from-orange-900/20 to-yellow-900/20 ${theme.cardBorder} border-b`}>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-orange-400" />
                <CardTitle className={`${theme.textPrimary} text-xl font-bold`}>Tier Adjustments</CardTitle>
              </div>
              <p className={`${theme.textSecondary} text-sm mt-2`}>Rarity tier changes and value adjustments</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {changelogEntries
                  .filter((entry) => entry.isAdjustment)
                  .map((entry, index) => (
                    <div
                      key={index}
                      className={`${theme.inputBg} ${theme.border} border rounded-lg p-3 hover:scale-[1.02] transition-transform duration-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full shrink-0 ${entry.isIncrease ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className={`${theme.textPrimary} text-sm font-medium truncate`}>{entry.name}</p>
                          <p className={`${theme.textSecondary} text-xs`}>
                            {entry.oldValue} ({entry.oldRarity}) → {entry.newValue} ({entry.newRarity})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* New Additions & Special Updates */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* New Tradables */}
            <Card
              className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden`}
            >
              <CardHeader className={`bg-gradient-to-r from-blue-900/20 to-indigo-900/20 ${theme.cardBorder} border-b`}>
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6 text-blue-400" />
                  <CardTitle className={`${theme.textPrimary} text-xl font-bold`}>New Additions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {newTradables.map((item, index) => (
                    <div
                      key={index}
                      className={`${theme.inputBg} ${theme.border} border rounded-lg p-3 hover:scale-[1.02] transition-transform duration-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className={`${theme.textPrimary} text-sm font-medium truncate`}>{item.name}</p>
                          <p className={`${theme.textSecondary} text-xs`}>
                            NEW → {item.value} ({item.rarity})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Collectors' Updates */}
            <Card
              className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden`}
            >
              <CardHeader
                className={`bg-gradient-to-r from-amber-900/20 to-yellow-900/20 ${theme.cardBorder} border-b`}
              >
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-6 h-6 text-amber-400" />
                  <CardTitle className={`${theme.textPrimary} text-xl font-bold`}>Collectors' Tier</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {changelogEntries
                    .filter((entry) => entry.isCollectors)
                    .map((entry, index) => (
                      <div
                        key={index}
                        className={`${theme.inputBg} ${theme.border} border rounded-lg p-3 hover:scale-[1.02] transition-transform duration-200`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full shrink-0 ${entry.isIncrease ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <p className={`${theme.textPrimary} text-sm font-medium truncate`}>{entry.name}</p>
                            <p className={`${theme.textSecondary} text-xs`}>
                              {entry.oldValue} ({entry.oldRarity}) → {entry.newValue} ({entry.newRarity})
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* DNA Rate Change */}
          <Card
            className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden`}
          >
            <CardHeader className={`bg-gradient-to-r from-red-900/20 to-orange-900/20 ${theme.cardBorder} border-b`}>
              <CardTitle className={`${theme.textPrimary} text-xl font-bold`}>DNA Conversion Rate Update</CardTitle>
              <p className={`${theme.textSecondary} text-sm mt-2`}>Important changes to DNA trading rates</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className={`${theme.inputBg} ${theme.border} border rounded-lg p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full shrink-0"></div>
                  <div>
                    <p className={`${theme.textPrimary} text-sm font-medium`}>DNA Conversion Rate Change</p>
                    <p className={`${theme.textSecondary} text-xs`}>8-12K DNA = 1 Value → 12-13K DNA = 1 Value</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className={`${theme.cardBg} ${theme.cardBorder} border backdrop-blur-sm rounded-xl p-6 shadow-lg`}>
            <p className={`${theme.textSecondary} text-sm font-light`}>
              Directly forked from the{" "}
              <a
                href="https://discord.gg/kNPy4jwMWj"
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme.textAccent} ${theme.linkHover} transition-colors underline decoration-current/60 hover:decoration-current font-medium`}
              >
                Dinosaur Simulator Trading Network
              </a>{" "}
              Discord Server with slight changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
