"use client"

import { useState, useMemo, useEffect } from "react"
import { Plus, X, ArrowLeftRight, Paintbrush, ChevronDown, Dna } from "lucide-react"
import Link from "next/link"

interface Dinosaur {
  name: string
  value: number | string
  rarity?: string
  tier?: string
  sdna?: string
  code?: string
}

interface TradeSlot {
  dinosaur: Dinosaur | null
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

// All dinosaurs - complete list matching main page
const allDinosaurs: Dinosaur[] = [
  // S Tier (110+)
  { name: "Eschaton Argentinosaurus", value: 650, rarity: "8/8", tier: "S" },
  { name: "Apparition Fossil Giganotosaurus", value: 550, rarity: "8/8", tier: "S" },
  { name: "Pitch Wraith Terror", value: 285, rarity: "7/8", tier: "S" },
  { name: "Pitchygator", value: 220, rarity: "8/8", tier: "S" },
  { name: "Wraith Terror", value: 180, rarity: "6/8", tier: "S" },
  { name: "Hydralania", value: 165, rarity: "7/8", tier: "S" },
  { name: "Distorted King", value: 160, rarity: "8/8", tier: "S" },
  { name: "Blue Whale Shastasaurus", value: 155, rarity: "6/8", tier: "S" },
  { name: "Violex Magnus", value: 145, rarity: "6/8", tier: "S" },
  { name: "Fallen Gladiator", value: 135, rarity: "6/8", tier: "S" },
  { name: "Pitch Black Moray Oxalaia", value: 130, rarity: "7/8", tier: "S" },
  { name: "Berserk Alametus", value: 125, rarity: "6/8", tier: "S" },
  // A Tier (50-109)
  { name: "Albino Terror", value: 100, rarity: "8/8", tier: "A" },
  { name: "Megavore", value: 100, rarity: "8/8", tier: "A" },
  { name: "Isisauriraptor", value: 100, rarity: "6/8", tier: "A" },
  { name: "Galactic Barosaurus", value: 98, rarity: "7/8", tier: "A" },
  { name: "Cathedral Fasolatherium", value: 97, rarity: "6/8", tier: "A" },
  { name: "Nameless Barosaurus", value: 90, rarity: "6/8", tier: "A" },
  { name: "Orca Spinosaurus", value: 80, rarity: "6/8", tier: "A" },
  { name: "Movie Mosasaurus", value: 70, rarity: "6/8", tier: "A" },
  { name: "Giant Albino Baryonyx", value: 70, rarity: "6/8", tier: "A" },
  { name: "Reaper Gelioichthys", value: 67, rarity: "6/7", tier: "A" },
  { name: "Dolphin Ichthyovenator", value: 65, rarity: "6/8", tier: "A" },
  { name: "Aurora Borethalass", value: 60, rarity: "6/8", tier: "A" },
  { name: "Pitch Black Terror", value: 60, rarity: "6/8", tier: "A" },
  { name: "Kaiju Giraffatitan", value: 56, rarity: "6/8", tier: "A" },
  { name: "Zomvinychus", value: 55, rarity: "6/8", tier: "A" },
  { name: "Pitch Luminescent Avinychus", value: 52, rarity: "5/8", tier: "A" },
  // B Tier (25-49)
  { name: "Luminescent Avinychus", value: 48, rarity: "5/8", tier: "B" },
  { name: "Pitch Coconut Brachiosaurus", value: 40, rarity: "4/8", tier: "B" },
  { name: "Scylla", value: 38, rarity: "5/8", tier: "B" },
  { name: "Kaiju Spinofaarus", value: 38, rarity: "5/8", tier: "B" },
  { name: "Spinofaarus", value: 36, rarity: "5/8", tier: "B" },
  { name: "Phantom Bringer Ceratosaurus", value: 35, rarity: "4/8", tier: "B" },
  { name: "Classic Pitch Black Terror", value: 35, rarity: "4/8", tier: "B" },
  { name: "Crossover Hybrid/Vinera", value: 33, rarity: "5/8", tier: "B" },
  { name: "Firebird", value: 32, rarity: "6/8", tier: "B" },
  { name: "Carcharocles Megalodon", value: 30, rarity: "6/8", tier: "B" },
  { name: "Butterfly Alametus", value: 30, rarity: "6/8", tier: "B" },
  { name: "Peak Spinosaurus", value: 28, rarity: "6/8", tier: "B" },
  { name: "Spawn Shunosaurus", value: 27, rarity: "6/8", tier: "B" },
  { name: "Spectre Fossil Megavore", value: 27, rarity: "4/8", tier: "B" },
  { name: "Reindeer Istiodactylus", value: 27, rarity: "3/8", tier: "B" },
  { name: "Forgotten Mutant", value: 26, rarity: "5/8", tier: "B" },
  { name: "Kaiju Gelioichthys", value: 26, rarity: "5/8", tier: "B" },
  // C Tier (15-25)
  { name: "Early Winter Frost Sauroposeidon", value: 25, rarity: "4/8", tier: "C" },
  { name: "Toy Train Mastodonsaurus", value: 24, rarity: "5/8", tier: "C" },
  { name: "Alpha Kaiju Spinosaurus", value: 24, rarity: "5/8", tier: "C" },
  { name: "Disco Stegosaurus", value: 24, rarity: "4/8", tier: "C" },
  { name: "Pitch Black Apatosaurus", value: 24, rarity: "4/8", tier: "C" },
  { name: "Pitch Black Dolichomalosaurus", value: 23, rarity: "4/8", tier: "C" },
  { name: "Rakebaby Guanlong", value: 22, rarity: "4/8", tier: "C" },
  { name: "Gold Fossil Giganotosaurus", value: 22, rarity: "3/8", tier: "C" },
  { name: "White Walker Carcharodontosaurus", value: 20, rarity: "4/8", tier: "C" },
  { name: "Headlessaurus", value: 19, rarity: "4/8", tier: "C" },
  { name: "Krampus", value: 19, rarity: "4/8", tier: "C" },
  { name: "Alien Irritator", value: 19, rarity: "4/8", tier: "C" },
  { name: "Totem Terror Albertosaurus", value: 18, rarity: "4/8", tier: "C" },
  { name: "Spring Blossom Lusotitan", value: 18, rarity: "4/8", tier: "C" },
  { name: "Phoenix Achillobator", value: 18, rarity: "3/8", tier: "C" },
  { name: "Masquerade Gigantoraptor", value: 18, rarity: "4/8", tier: "C" },
  { name: "Indomitable Thief Gen 2", value: 17, rarity: "4/8", tier: "C" },
  { name: "Cyber Ichthyovenator", value: 17, rarity: "3/8", tier: "C" },
  { name: "Coconut Brachiosaurus", value: 15, rarity: "3/8", tier: "C" },
  // D Tier (10-14)
  { name: "Indomitable King", value: 14, rarity: "4/8", tier: "D" },
  { name: "Santa Clawz", value: 14, rarity: "3/8", tier: "D" },
  { name: "Movie Giganotosaurus", value: 14, rarity: "3/8", tier: "D" },
  { name: "Kralkatorrik", value: 14, rarity: "2/8", tier: "D" },
  { name: "Movie Therizinosaurus", value: 14, rarity: "2/8", tier: "D" },
  { name: "Frosteological Skelewyvern Quetzalcoatlus", value: 13, rarity: "4/8", tier: "D" },
  { name: "Abandoned Matriarch", value: 13, rarity: "4/8", tier: "D" },
  { name: "Gold Fossil Tyrannosaurus", value: 13, rarity: "3/8", tier: "D" },
  { name: "Chaos Titanosaur", value: 13, rarity: "3/8", tier: "D" },
  { name: "Gold Fossil Spinosaurus", value: 13, rarity: "2/8", tier: "D" },
  { name: "Pitch Black Shantungosaurus", value: 12, rarity: "3/8", tier: "D" },
  { name: "Miresteed Baryonyx", value: 12, rarity: "4/8", tier: "D" },
  { name: "Gold Lily Saurolophus", value: 12, rarity: "2/8", tier: "D" },
  { name: "Cozy Cabin Argentinosaurus", value: 10, rarity: "3/8", tier: "D" },
  { name: "Kaiju Sauroposeidon", value: 10, rarity: "3/8", tier: "D" },
  { name: "Nidhogg Purrrusaurus", value: 10, rarity: "3/8", tier: "D" },
  { name: "Lil UFO Pteranodon", value: 10, rarity: "2/8", tier: "D" },
  // E Tier (4-9)
  { name: "Kaiju Titanosaurus", value: 9, rarity: "3/8", tier: "E" },
  { name: "Singulafaarus", value: 9, rarity: "3/8", tier: "E" },
  { name: "Violex Parvulus", value: 9, rarity: "3/8", tier: "E" },
  { name: "Snowflake Stegosaurus", value: 9, rarity: "2/8", tier: "E" },
  { name: "Heartracer Concavenator", value: 9, rarity: "2/8", tier: "E" },
  { name: "Clamarocles Megalodon", value: 9, rarity: "2/8", tier: "E" },
  { name: "Mayhem Gojirasaurus", value: 9, rarity: "2/8", tier: "E" },
  { name: "Saurophaganax Remodel", value: 8, rarity: "3/8", tier: "E" },
  { name: "Blinding White Shantungosaurus", value: 8, rarity: "2/8", tier: "E" },
  { name: "Night Before Cretaceous", value: 8, rarity: "2/8", tier: "E" },
  { name: "Blackodile", value: 8, rarity: "2/8", tier: "E" },
  { name: "Movie Brachiosaurus", value: 8, rarity: "2/8", tier: "E" },
  { name: "Apatosaurus Plush", value: 8, rarity: "2/8", tier: "E" },
  { name: "Putrefied Amargasaurus", value: 8, rarity: "2/8", tier: "E" },
  { name: "Fossil Spinosaurus", value: 7.5, rarity: "2/8", tier: "E" },
  { name: "Kaiju Archelon", value: 7, rarity: "3/8", tier: "E" },
  { name: "The Mimic", value: 7, rarity: "3/8", tier: "E" },
  { name: "Indomitable Thief", value: 7, rarity: "3/8", tier: "E" },
  { name: "Fossil Baryonyx", value: 7, rarity: "2/8", tier: "E" },
  { name: "Movie Spinosaurus", value: 7, rarity: "2/8", tier: "E" },
  { name: "Polar Grazer Puertasaurus", value: 7, rarity: "2/8", tier: "E" },
  { name: "Psychoceratops", value: 7, rarity: "1/8", tier: "E" },
  { name: "Fossil Cadger", value: 6, rarity: "3/8", tier: "E" },
  { name: "Kaiju Quetzalcoatlus", value: 6, rarity: "2/8", tier: "E" },
  { name: "Radiated Zomvinychus", value: 6, rarity: "1/8", tier: "E" },
  { name: "Bogmire Suchomimus", value: 6, rarity: "1/8", tier: "E" },
  { name: "Movie Spinofaarus", value: 5, rarity: "3/8", tier: "E" },
  { name: "Fossil Megavore", value: 5, rarity: "2/8", tier: "E" },
  { name: "Sunfish Shonisaurus", value: 5, rarity: "2/8", tier: "E" },
  { name: "Chaos Spinosaurus", value: 5, rarity: "2/8", tier: "E" },
  { name: "Movie Triceratops", value: 5, rarity: "2/8", tier: "E" },
  { name: "Yeti Albertosaurus", value: 5, rarity: "2/8", tier: "E" },
  { name: "Christmas Shunosaurus", value: 5, rarity: "2/8", tier: "E" },
  { name: "Chaos Mosasaurus", value: 5, rarity: "2/8", tier: "E" },
  { name: "Acrocanthorse", value: 5, rarity: "2/8", tier: "E" },
  { name: "Flying Dutchman", value: 5, rarity: "2/8", tier: "E" },
  { name: "Tree Elder Ankylosaurus", value: 5, rarity: "2/8", tier: "E" },
  { name: "Movie Pyroraptor", value: 5, rarity: "2/8", tier: "E" },
  { name: "Forest Dweller Shantungosaurus", value: 5, rarity: "2/8", tier: "E" },
  { name: "Steelforged Concavenator", value: 5, rarity: "1/8", tier: "E" },
  { name: "Juramaia", value: 5, rarity: "1/8", tier: "E" },
  { name: "Barosaurus Plush", value: 4.5, rarity: "1/8", tier: "E" },
  { name: "Galactic Torvosaurus", value: 4, rarity: "2/8", tier: "E" },
  { name: "Voodoo Murusraptor", value: 4, rarity: "2/8", tier: "E" },
  { name: "Canyon Finback Suchomimus", value: 4, rarity: "2/8", tier: "E" },
  { name: "Neon Pulverizer Concavenator", value: 4, rarity: "2/8", tier: "E" },
  { name: "Sneaky Bunny Guanlong", value: 4, rarity: "2/8", tier: "E" },
  { name: "Monarch Meganeura", value: 4, rarity: "2/8", tier: "E" },
  { name: "Infected Camarasaurus", value: 4, rarity: "2/8", tier: "E" },
  { name: "Honey Heist Gigatitan", value: 4, rarity: "2/8", tier: "E" },
  { name: "Collector Maip Macrothorax", value: 4, rarity: "2/8", tier: "E" },
  { name: "Vampire Batzegopteryx", value: 4, rarity: "1/8", tier: "E" },
  { name: "Gold Fossil Skulker", value: 4, rarity: "2/8", tier: "E" },
  { name: "Nomad Corythosaurus", value: 4, rarity: "1/8", tier: "E" },
  { name: "Possessed Troodon", value: 4, rarity: "1/8", tier: "E" },
  // F Tier (0-4)
  { name: "Gargoyle Hatzegopteryx", value: 3.5, rarity: "2/8", tier: "F" },
  { name: "Kaiju Helicoprion", value: 3.5, rarity: "2/8", tier: "F" },
  { name: "Kaiju Baryonyx", value: 3, rarity: "2/8", tier: "F" },
  { name: "Classified Troodon", value: 3, rarity: "2/8", tier: "F" },
  { name: "Galactic Gallimimus", value: 3, rarity: "2/8", tier: "F" },
  { name: "Movie Baryonyx", value: 3, rarity: "2/8", tier: "F" },
  { name: "Rakefather Amargasaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Pitch Black Plateosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Galactic Hatzegopteryx", value: 3, rarity: "1/8", tier: "F" },
  { name: "Pitch Black Avimimus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Pop Candy Pachycephalosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Fluffle Therizinosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Fossil Thalassomedon", value: 3, rarity: "1/8", tier: "F" },
  { name: "Fossil Giganotosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Old Bark Nomad Corythosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Pristine Vessel Nomad Corythosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Sky High Nomad Corythosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Tiderider Nomad Corythosaurus", value: 3, rarity: "1/8", tier: "F" },
  { name: "Pumpkin Megalodon", value: 3, rarity: "1/8", tier: "F" },
  { name: "Scarecrow Thanatosdrakon", value: 3, rarity: "1/8", tier: "F" },
  { name: "Yang Tide", value: 3, rarity: "1/8", tier: "F" },
  { name: "Yin Flare", value: 3, rarity: "1/8", tier: "F" },
  { name: "Mammoth", value: 2.5, rarity: "2/8", tier: "F" },
  { name: "Galactic Euoplocephalus", value: 2.5, rarity: "1/8", tier: "F" },
  { name: "Ornament Utahraptor", value: 2.5, rarity: "1/8", tier: "F" },
  { name: "Glutton Elk Spinofaarus", value: 2.5, rarity: "1/8", tier: "F" },
  { name: "Galactic Fresnosaurus", value: 2.25, rarity: "1/8", tier: "F" },
  { name: "Twilight Pliosaurus", value: 2.25, rarity: "1/8", tier: "F" },
  { name: "Movie Gallimimus", value: 2, rarity: "2/8", tier: "F" },
  { name: "Novel Carnotaurus", value: 2, rarity: "2/8", tier: "F" },
  { name: "Movie Ceratosaurus", value: 2, rarity: "2/8", tier: "F" },
  { name: "Movie Quetzalcoatlus", value: 2, rarity: "2/8", tier: "F" },
  { name: "Movie Dilophosaurus", value: 2, rarity: "2/8", tier: "F" },
  { name: "Maceball Stegosaurus", value: 2, rarity: "2/8", tier: "F" },
  { name: "Blinding White Dodo", value: 2, rarity: "2/8", tier: "F" },
  { name: "Pitch Black Megalodon", value: 2, rarity: "2/8", tier: "F" },
  { name: "Chaos Tyrannosaurus Rex", value: 2, rarity: "2/8", tier: "F" },
  { name: "Movie Ankylosaurus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Hot Cocoa Ichthyovenator", value: 2, rarity: "1/8", tier: "F" },
  { name: "Tundra Grazer Triceratops", value: 2, rarity: "2/8", tier: "F" },
  { name: "Bone Eating Hibbertopterus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Bloodwurm Tullimonstrum", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Brachiosaurus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Carcharocles Megalodon", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Sarcosuchus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Mosasaurus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Tyrannosaurus Rex", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Utahraptor", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Pteranodon", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Onchopristis", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Ornithomimus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fallen Caveman", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Acrocanthosaurus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Basilosaurus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Therizinosaurus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Fossil Skulker", value: 2, rarity: "1/8", tier: "F" },
  { name: "Easter Gallimimus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Valley Golem Machimosaurus", value: 2, rarity: "1/8", tier: "F" },
  { name: "Christmas Dodo", value: 2, rarity: "1/8", tier: "F" },
  { name: "Christmas Stegoceras", value: 2, rarity: "1/8", tier: "F" },
  { name: "Universal Dilophosaurus", value: 1.75, rarity: "1/8", tier: "F" },
  { name: "Nutcracker Wanderer", value: 1.75, rarity: "2/8", tier: "F" },
  { name: "Charybdis", value: 1.75, rarity: "1/8", tier: "F" },
  { name: "Movie Hatzegopteryx", value: 1.5, rarity: "2/8", tier: "F" },
  { name: "Stocking Gojirasaurus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Candycane Kentrosaurus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Terror Bunny Allosaurus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Santa Guard Mammoth", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Lovebug Thalassodromeus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Dreamhaze Fresnosaurus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Swan Deinocheirus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Megafraud", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Manticore", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Zeus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Thor", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "The Kraken", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Tartrap Spinosaurus", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Kaiju Triceratops", value: 1.5, rarity: "1/8", tier: "F" },
  { name: "Movie Pachycephalosaurus", value: 1, rarity: "2/8", tier: "F" },
  { name: "Movie Stegosaurus", value: 1, rarity: "2/8", tier: "F" },
  { name: "Movie Compsognathus", value: 1, rarity: "2/8", tier: "F" },
  { name: "Movie Tyrannosaurus Rex", value: 1, rarity: "1/8", tier: "F" },
  { name: "Cottontail Maiasaura", value: 1, rarity: "1/8", tier: "F" },
  { name: "Makeship Triceratops", value: 1, rarity: "1/8", tier: "F" },
  { name: "Movie Velociraptor", value: 1, rarity: "1/8", tier: "F" },
  { name: "Movie Parasaurolophus", value: 1, rarity: "1/8", tier: "F" },
  { name: "Movie Allosaurus", value: 1, rarity: "1/8", tier: "F" },
  { name: "Movie Carnotaurus", value: 1, rarity: "1/8", tier: "F" },
  { name: "Movie Pteranodon", value: 1, rarity: "1/8", tier: "F" },
  { name: "Frosted Rex", value: 1, rarity: "1/8", tier: "F" },
  { name: "Clay Iguanodon", value: 1, rarity: "1/8", tier: "F" },
  { name: "Classified Tylosaurus", value: 1, rarity: "1/8", tier: "F" },
  { name: "Drinking Bird Gigantoraptor", value: 1, rarity: "1/8", tier: "F" },
  { name: "DNA Raptor", value: 1, rarity: "1/8", tier: "F" },
  { name: "Chicken Egg Balaur", value: 1, rarity: "1/8", tier: "F" },
  { name: "Christmas Coelacanth", value: 1, rarity: "1/8", tier: "F" },
  { name: "Gingerbread Ichthyosaurus", value: 1, rarity: "1/8", tier: "F" },
  { name: "Chimerasuchus", value: 1, rarity: "1/8", tier: "F" },
  { name: "Fallen Excavator", value: 1, rarity: "1/8", tier: "F" },
  { name: "Overseer Wanderer", value: 1, rarity: "1/8", tier: "F" },
  { name: "Late Valentines Plush", value: 1, rarity: "1/8", tier: "F" },
  { name: "Snow Globe Megalodon", value: 1, rarity: "1/8", tier: "F" },
  { name: "Santa Ornithomimus", value: 1, rarity: "1/8", tier: "F" },
  { name: "Spider Troodon", value: 1, rarity: "1/8", tier: "F" },
  { name: "Cetus", value: 0.75, rarity: "1/8", tier: "F" },
  { name: "Hestiaceras", value: 0.5, rarity: "1/8", tier: "F" },
  { name: "Cerberus", value: 0.5, rarity: "1/8", tier: "F" },
  { name: "Griffin", value: 0.5, rarity: "1/8", tier: "F" },
  { name: "Balure", value: 0.5, rarity: "1/8", tier: "F" },
  { name: "Minotaurus", value: 0.5, rarity: "1/8", tier: "F" },
  { name: "Kentrallos", value: 0.5, rarity: "1/8", tier: "F" },
  { name: "Harpydactylus", value: 0.5, rarity: "1/8", tier: "F" },
  { name: "Erymanthian Styracoboar", value: 0.5, rarity: "1/8", tier: "F" },
  // Collectors' Tier
  { name: "Branded Purrusaurus", value: "2800-3200", rarity: "1/8", tier: "Collectors'" },
  { name: "Metron Praenintius", value: "1700-1900", rarity: "2/8", tier: "Collectors'" },
  { name: "Pitch Black Sunfish Shonisaurus", value: 245, rarity: "6/8", tier: "Collectors'" },
  { name: "Pitch Black Elasmosaurus", value: 225, rarity: "6/8", tier: "Collectors'" },
  { name: "Pitch Black Baryonyx", value: 190, rarity: "2/8", tier: "Collectors'" },
  { name: "Golden Ectenosaurus", value: "150-300", rarity: "1/8", tier: "Collectors'" },
  { name: "Grayscale Fasolatherium", value: "240-260", rarity: "1/8", tier: "Collectors'" },
  { name: "Grayscale Albino Terror", value: "220-240", rarity: "1/8", tier: "Collectors'" },
  { name: "Grayscale Dolichomalosaurus", value: "200-220", rarity: "1/8", tier: "Collectors'" },
  { name: "Grayscale Gelioichthys", value: "200-220", rarity: "1/8", tier: "Collectors'" },
  { name: "Grayscale Megavore", value: "180-190", rarity: "1/8", tier: "Collectors'" },
  { name: "Grayscale Avinychus", value: "170-190", rarity: "1/8", tier: "Collectors'" },
  { name: "Grayscale Alametus", value: "160-170", rarity: "1/8", tier: "Collectors'" },
  { name: "Classic Albino Terror", value: "25-28", rarity: "3/8", tier: "Collectors'" },
  { name: "Classic Megavore", value: "25-28", rarity: "3/8", tier: "Collectors'" },
  { name: "Diamond Tusoteuthis", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Acrocanthosaurus", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Shunosaurus", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Maiasaurus", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Styracosaurus", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Pteranodon", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Thalassodromeus", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Parasaurolophus", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Concavenator", value: 10, rarity: "1/8", tier: "Collectors'" },
  { name: "Diamond Gojirasaurus", value: 10, rarity: "1/8", tier: "Collectors'" },
  // Throwbacks
  { name: "Prebivaropus", value: 2, rarity: "2/8", tier: "Throwbacks" },
  { name: "Throwback Avinychus", value: 2, rarity: "2/8", tier: "Throwbacks" },
  { name: "Throwback Gelioichthys", value: 2, rarity: "2/8", tier: "Throwbacks" },
  { name: "Throwback Dolichomalasaurus", value: 2, rarity: "2/8", tier: "Throwbacks" },
  { name: "Throwback Fasolatherium", value: 2, rarity: "2/8", tier: "Throwbacks" },
  { name: "Throwback Alametus", value: 2, rarity: "2/8", tier: "Throwbacks" },
  { name: "Throwback Barosaurus", value: 1.5, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Argentinosaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Carcharocles Megalodon", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Mapusaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Basilosaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Spinofaarus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Yutyrannus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Barinasuchus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Shantungosaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Dunkleosteus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Purussaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Chimerarachne", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Suchomimus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Majungasaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Pachycephalosaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Jackelopterus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Tiktaalik", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Gigatitan", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Tullimonstrum", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Hibbertopterus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Fasolasuchus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Arizonasaurus", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Anomalocaris", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Opabinia", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Callichimaera", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Meganeura", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  { name: "Throwback Trilobite", value: 0.1, rarity: "1/8", tier: "Throwbacks" },
  // Retextures
  { name: "Diamond Albino Terror", value: 6, rarity: "2/8", tier: "Retextures" },
  { name: "Diamond Megavore", value: 6, rarity: "2/8", tier: "Retextures" },
  { name: "Diamond Barosaurus", value: 5, rarity: "1/8", tier: "Retextures" },
  { name: "Rainbow Albino Terror", value: 6, rarity: "2/8", tier: "Retextures" },
  { name: "Rainbow Megavore", value: 6, rarity: "2/8", tier: "Retextures" },
  { name: "Rainbow Barosaurus", value: 2, rarity: "1/8", tier: "Retextures" },
  { name: "ALL Glass skins", value: 0.25, rarity: "1/8", tier: "Retextures" },
  // Gamepasses
  { name: "Classic Pitch Black Terror V4", value: 5, rarity: "1/8", tier: "Gamepasses" },
  { name: "Classic Krampus", value: 3, rarity: "1/8", tier: "Gamepasses" },
  { name: "Classic Headlessaurus", value: 2, rarity: "1/8", tier: "Gamepasses" },
  { name: "Classic Fossil Brachiosaurus", value: 1, rarity: "1/8", tier: "Gamepasses" },
  { name: "Classic Megavore V3", value: 1, rarity: "2/8", tier: "Gamepasses" },
  { name: "Classic Albino Terror V4", value: 1, rarity: "1/8", tier: "Gamepasses" },
  { name: "Classic Psychoceratops", value: 1, rarity: "1/8", tier: "Gamepasses" },
  { name: "Classic Pitch Black Terror V3", value: 5, rarity: "2/8", tier: "Gamepasses" },
  { name: "Classic Albino Terror V3", value: 5, rarity: "2/8", tier: "Gamepasses" },
  { name: "Kaiju Spinosaurus", value: 5, rarity: "1/8", tier: "Gamepasses" },
  { name: "Riot Shield Triceratops", value: 3, rarity: "1/8", tier: "Gamepasses" },
  { name: "Icicle Styracosaurus", value: 2, rarity: "1/8", tier: "Gamepasses" },
  { name: "Albino T-Rex", value: 1.5, rarity: "1/8", tier: "Gamepasses" },
  { name: "Scarred T-Rex", value: 1.5, rarity: "1/8", tier: "Gamepasses" },
  // Obtainables
  { name: "Permian Excavator", value: 4, rarity: "1/8", tier: "Obtainables" },
  { name: "Ultimallosaurus", value: 2, rarity: "1/8", tier: "Obtainables" },
  { name: "Apex Hothead Megavore", value: 2, rarity: "1/8", tier: "Obtainables" },
  { name: "Solar Bringer Megavore", value: 0.5, rarity: "1/8", tier: "Obtainables" },
  { name: "Deep Sea Megavore", value: 0.5, rarity: "1/8", tier: "Obtainables" },
  { name: "Zweinova-Blank", value: 7.5, rarity: "2/8", tier: "Obtainables" },
  { name: "Zenova", value: 5, rarity: "2/8", tier: "Obtainables" },
  { name: "Dimension Beast", value: 5, rarity: "1/8", tier: "Obtainables" },
  { name: "Withered Willow Futalognkosaurus", value: 0, rarity: "1/8", tier: "Obtainables" },
  { name: "Crow Istiodactylus", value: 0, rarity: "1/8", tier: "Obtainables" },
  { name: "Raven Hatzegopteryx", value: 0, rarity: "1/8", tier: "Obtainables" },
  { name: "Wyvern", value: 0, rarity: "1/8", tier: "Obtainables" },
  { name: "Yutashu", value: 0, rarity: "1/8", tier: "Obtainables" },
]

const parseValue = (value: number | string): number => {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    if (value === "N/A") return 0
    if (value.includes("-")) {
      const parts = value.split("-").map((p) => Number.parseFloat(p.trim()))
      return (parts[0] + parts[1]) / 2
    }
    return Number.parseFloat(value) || 0
  }
  return 0
}

const getTierLetter = (tier: string | undefined): string => {
  if (!tier) return "?"
  if (tier.startsWith("S")) return "S"
  if (tier.startsWith("A")) return "A"
  if (tier.startsWith("B")) return "B"
  if (tier.startsWith("C")) return "C"
  if (tier.startsWith("D")) return "D"
  if (tier.startsWith("E")) return "E"
  if (tier.startsWith("F")) return "F"
  if (tier.includes("Collect")) return "CT"
  if (tier.includes("Throw")) return "TB"
  if (tier.includes("Retex")) return "RT"
  if (tier.includes("Game")) return "GP"
  if (tier.includes("Obtain")) return "OB"
  return "?"
}

const getTierColor = (tier: string | undefined): string => {
  if (!tier) return "text-gray-400"
  if (tier.startsWith("S")) return "text-red-400"
  if (tier.startsWith("A")) return "text-orange-400"
  if (tier.startsWith("B")) return "text-yellow-400"
  if (tier.startsWith("C")) return "text-green-400"
  if (tier.startsWith("D")) return "text-cyan-400"
  if (tier.startsWith("E")) return "text-blue-400"
  if (tier.startsWith("F")) return "text-indigo-400"
  if (tier.includes("Collect")) return "text-purple-400"
  if (tier.includes("Throw")) return "text-violet-400"
  if (tier.includes("Retex")) return "text-pink-400"
  if (tier.includes("Game")) return "text-fuchsia-400"
  if (tier.includes("Obtain")) return "text-amber-400"
  return "text-gray-400"
}

export default function TradeCalculator() {
  const [theme, setTheme] = useState<string>("dark")
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const [yourSlots, setYourSlots] = useState<TradeSlot[]>(Array(9).fill(null).map(() => ({ dinosaur: null })))
  const [theirSlots, setTheirSlots] = useState<TradeSlot[]>(Array(9).fill(null).map(() => ({ dinosaur: null })))
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSide, setModalSide] = useState<"your" | "their">("your")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDino, setSelectedDino] = useState<Dinosaur | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [valueAmount, setValueAmount] = useState<string>("")
  const [dinoForDna, setDinoForDna] = useState<string>("")

  const currentTheme = themes[theme] || themes.dark

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlTheme = urlParams.get("theme")
    if (urlTheme && themes[urlTheme]) {
      setTheme(urlTheme)
      localStorage.setItem("dinosaur-value-list-theme", urlTheme)
      return
    }
    const savedTheme = localStorage.getItem("dinosaur-value-list-theme")
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
      const url = new URL(window.location.href)
      url.searchParams.set("theme", savedTheme)
      window.history.replaceState({}, "", url.toString())
    }
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("dinosaur-value-list-theme", newTheme)
    setThemeDropdownOpen(false)
    const url = new URL(window.location.href)
    url.searchParams.set("theme", newTheme)
    window.history.replaceState({}, "", url.toString())
  }

  const filteredDinos = useMemo(() => {
    if (!searchQuery.trim()) return allDinosaurs
    const query = searchQuery.toLowerCase()
    return allDinosaurs.filter((d) => d.name.toLowerCase().includes(query))
  }, [searchQuery])

  const yourTotal = useMemo(() => {
    return yourSlots.reduce((sum, slot) => {
      if (slot.dinosaur) return sum + parseValue(slot.dinosaur.value)
      return sum
    }, 0)
  }, [yourSlots])

  const theirTotal = useMemo(() => {
    return theirSlots.reduce((sum, slot) => {
      if (slot.dinosaur) return sum + parseValue(slot.dinosaur.value)
      return sum
    }, 0)
  }, [theirSlots])

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

    if (modalSide === "your") {
      setYourSlots(slots)
    } else {
      setTheirSlots(slots)
    }

    setModalOpen(false)
  }

  const removeFromSlot = (side: "your" | "their", index: number) => {
    if (side === "your") {
      const newSlots = [...yourSlots]
      newSlots[index] = { dinosaur: null }
      setYourSlots(newSlots)
    } else {
      const newSlots = [...theirSlots]
      newSlots[index] = { dinosaur: null }
      setTheirSlots(newSlots)
    }
  }

  const clearSide = (side: "your" | "their") => {
    const empty = Array(9).fill(null).map(() => ({ dinosaur: null }))
    if (side === "your") setYourSlots(empty)
    else setTheirSlots(empty)
  }

  // Value to DNA converter
  const valueToDna = useMemo(() => {
    const val = Number.parseFloat(valueAmount)
    if (Number.isNaN(val) || val <= 0) return { min: 0, max: 0 }
    return {
      min: Math.round(val * DNA_CONVERSION_MIN),
      max: Math.round(val * DNA_CONVERSION_MAX),
    }
  }, [valueAmount])

  // Dino to DNA converter
  const dinoToDna = useMemo(() => {
    if (!dinoForDna) return null
    const dino = allDinosaurs.find((d) => d.name === dinoForDna)
    if (!dino) return null
    const val = parseValue(dino.value)
    if (val <= 0) return { dino, min: 0, max: 0 }
    return {
      dino,
      min: Math.round(val * DNA_CONVERSION_MIN),
      max: Math.round(val * DNA_CONVERSION_MAX),
    }
  }, [dinoForDna])

  const getAvailableSlots = (side: "your" | "their") => {
    const slots = side === "your" ? yourSlots : theirSlots
    return slots.filter((s) => !s.dinosaur).length
  }

  const renderSlotGrid = (slots: TradeSlot[], side: "your" | "their") => (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {slots.map((slot, index) => (
        <div
          key={`${side}-${index}`}
          onClick={() => !slot.dinosaur && openModal(side)}
          className={`aspect-square border-2 border-dashed ${currentTheme.border} rounded-lg flex flex-col items-center justify-center cursor-pointer ${currentTheme.buttonHover} transition-colors relative overflow-hidden`}
        >
          {slot.dinosaur ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFromSlot(side, index)
                }}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center z-10"
              >
                <X className="w-3 h-3 text-white" />
              </button>
              <span className={`absolute top-1 left-1 text-xs font-bold ${getTierColor(slot.dinosaur.tier)}`}>
                {getTierLetter(slot.dinosaur.tier)}
              </span>
              <span className={`text-[10px] leading-tight ${currentTheme.textPrimary} text-center px-1 mt-3`}>
                {slot.dinosaur.name.length > 18 ? `${slot.dinosaur.name.substring(0, 18)}...` : slot.dinosaur.name}
              </span>
              <span className={`text-xs font-bold ${currentTheme.textAccent} mt-1`}>
                {slot.dinosaur.value}
              </span>
            </>
          ) : (
            <Plus className={`w-6 h-6 ${currentTheme.textSecondary}`} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.textPrimary} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border ${currentTheme.cardBorder} p-4 md:p-6 mb-6 relative z-50`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className={`${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border ${currentTheme.border}`}
              >
                <Paintbrush className="w-4 h-4" />
                Themes
                <ChevronDown className={`w-4 h-4 transition-transform ${themeDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {themeDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 ${currentTheme.dropdownBg} border ${currentTheme.border} rounded-lg shadow-xl z-[200] min-w-[180px] max-h-[300px] overflow-y-auto`}>
                  <div className={`p-2 border-b ${currentTheme.border} ${currentTheme.textSecondary} text-sm`}>
                    Choose Theme
                  </div>
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      type="button"
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
            <div className="text-center flex-1">
              <h1 className={`text-2xl md:text-3xl font-bold ${currentTheme.textPrimary}`}>
                Trade Calculator
              </h1>
              <p className={`text-sm ${currentTheme.textSecondary}`}>Compare trade values</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/?theme=${theme}`}>
                <button type="button" className={`${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} px-4 py-2 rounded-lg transition-colors border ${currentTheme.border}`}>
                  Value List
                </button>
              </Link>
              <Link href={`/changelog?theme=${theme}`}>
                <button type="button" className={`${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText} px-4 py-2 rounded-lg transition-colors border ${currentTheme.border}`}>
                  Changelog
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
            {renderSlotGrid(yourSlots, "your")}
            <div className={`${currentTheme.buttonBg} rounded-lg p-3 text-center mb-2`}>
              <span className="text-cyan-400 font-bold">Total: {yourTotal % 1 === 0 ? yourTotal : yourTotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
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
            {renderSlotGrid(theirSlots, "their")}
            <div className={`${currentTheme.buttonBg} rounded-lg p-3 text-center mb-2`}>
              <span className="text-cyan-400 font-bold">Total: {theirTotal % 1 === 0 ? theirTotal : theirTotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
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
            <p className="text-green-400 font-bold text-xl">You gain {valueDifference % 1 === 0 ? valueDifference : valueDifference.toFixed(2)} value!</p>
          ) : valueDifference < 0 ? (
            <p className="text-red-400 font-bold text-xl">You lose {Math.abs(valueDifference) % 1 === 0 ? Math.abs(valueDifference) : Math.abs(valueDifference).toFixed(2)} value!</p>
          ) : (
            <p className="text-yellow-400 font-bold text-xl">Trade is even!</p>
          )}
        </div>

        {/* DNA Calculators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dino to DNA Calculator */}
          <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border ${currentTheme.cardBorder} p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Dna className={`w-5 h-5 ${currentTheme.textAccent}`} />
              <h2 className={`text-lg font-bold ${currentTheme.textPrimary}`}>Dino to DNA</h2>
            </div>
            <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>
              Select a dinosaur to see its DNA equivalent
            </p>
            <select
              value={dinoForDna}
              onChange={(e) => setDinoForDna(e.target.value)}
              className={`w-full ${currentTheme.inputBg} border ${currentTheme.inputBorder} ${currentTheme.textPrimary} rounded-lg px-3 py-2 mb-3 appearance-none`}
            >
              <option value="">Select a dinosaur...</option>
              {allDinosaurs.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.value})
                </option>
              ))}
            </select>
            <div className={`${currentTheme.buttonBg} rounded-lg p-3 text-center`}>
              {dinoToDna ? (
                <div>
                  <span className={currentTheme.textPrimary}>{dinoToDna.dino.name}</span>
                  <span className={`block font-bold text-cyan-400 mt-1`}>
                    {dinoToDna.min > 0 ? `${(dinoToDna.min / 1000).toFixed(1)}K - ${(dinoToDna.max / 1000).toFixed(1)}K DNA` : "No DNA value"}
                  </span>
                </div>
              ) : (
                <span className={currentTheme.textSecondary}>Select a dino to calculate</span>
              )}
            </div>
          </div>

          {/* Value to DNA Calculator */}
          <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-2xl border ${currentTheme.cardBorder} p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Dna className={`w-5 h-5 ${currentTheme.textAccent}`} />
              <h2 className={`text-lg font-bold ${currentTheme.textPrimary}`}>Value to DNA</h2>
            </div>
            <p className={`text-sm ${currentTheme.textSecondary} mb-3`}>
              Current rate: {(DNA_CONVERSION_MIN / 1000).toFixed(0)}K - {(DNA_CONVERSION_MAX / 1000).toFixed(0)}K DNA = 1 Value
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                inputMode="decimal"
                placeholder="Enter value amount..."
                value={valueAmount}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "" || /^\d*\.?\d*$/.test(v)) setValueAmount(v)
                }}
                className={`${currentTheme.inputBg} border ${currentTheme.inputBorder} ${currentTheme.textPrimary} rounded-lg px-3 py-2 w-full`}
              />
              <div className={`${currentTheme.buttonBg} rounded-lg p-3 text-center`}>
                {valueToDna.min > 0 || valueToDna.max > 0 ? (
                  <span className={currentTheme.textAccent}>
                    {"= "}
                    <span className="font-bold text-cyan-400">
                      {valueToDna.min >= 1000 ? `${(valueToDna.min / 1000).toFixed(1)}K` : valueToDna.min.toLocaleString()}
                      {" - "}
                      {valueToDna.max >= 1000 ? `${(valueToDna.max / 1000).toFixed(1)}K` : valueToDna.max.toLocaleString()}
                    </span>
                    {" DNA"}
                  </span>
                ) : (
                  <span className={currentTheme.textSecondary}>Enter a value to calculate</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Dinosaur Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[150] p-4">
            <div className={`${currentTheme.dropdownBg} border ${currentTheme.border} rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col`}>
              <div className={`flex items-center justify-between p-4 border-b ${currentTheme.border}`}>
                <h3 className={`text-lg font-bold ${currentTheme.textPrimary}`}>Add Dinosaur</h3>
                <button type="button" onClick={() => setModalOpen(false)} className={`${currentTheme.textSecondary} hover:text-white`}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search dinosaur or abbreviation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${currentTheme.inputBg} border ${currentTheme.inputBorder} ${currentTheme.textPrimary} rounded-lg px-3 py-2 w-full`}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                {filteredDinos.map((dino) => (
                  <button
                    type="button"
                    key={dino.name}
                    onClick={() => setSelectedDino(dino)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-1 flex items-center justify-between ${
                      selectedDino?.name === dino.name ? "bg-cyan-600/30 border border-cyan-500" : currentTheme.buttonHover
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

              <div className={`p-4 border-t ${currentTheme.border} flex items-center gap-3`}>
                <div className="flex items-center gap-2">
                  <span className={currentTheme.textSecondary}>Qty</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={quantity}
                    onChange={(e) => {
                      const v = Number.parseInt(e.target.value) || 1
                      const maxAvailable = getAvailableSlots(modalSide)
                      setQuantity(Math.max(1, Math.min(v, maxAvailable)))
                    }}
                    className={`${currentTheme.inputBg} border ${currentTheme.inputBorder} ${currentTheme.textPrimary} rounded-lg px-2 py-1 w-14 text-center`}
                  />
                </div>
                <button
                  type="button"
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
