"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"

interface Dinosaur {
  name: string
  value: number | string
  rarity?: string
  code?: string
  sdna?: string
}

interface Tier {
  name: string
  range: string
  color: string
  dinosaurs: Dinosaur[]
  isOpen: boolean
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openTiers, setOpenTiers] = useState<Record<string, boolean>>({
    "S Tier": false,
    "A Tier": false,
    "B Tier": false,
    "C Tier": false,
    "D Tier": false,
    "E Tier": false,
    "F Tier": false,
    "Collectors' Tier": false,
    Gamepasses: false,
    "Classic Gamepass": false,
    "Halloween 2020": false,
    "Monster Madness Survival": false,
    SDNA: false,
    Codes: false,
    Retextures: false,
    Throwbacks: false,
    Greyscale: false,
    Inverteds: false,
  })

  const tiers: Tier[] = [
    {
      name: "Throwbacks",
      range: "Egg Skins",
      color: "bg-purple-500",
      dinosaurs: [
        { name: "Prebivaropus", value: 2, rarity: "2/8" },
        { name: "Throwback Avinychus", value: 2, rarity: "2/8" },
        { name: "Throwback Geliochthys", value: 2, rarity: "2/8" },
        { name: "Throwback Dolichomalasaurus", value: 2, rarity: "2/8" },
        { name: "Throwback Fasolatherium", value: 2, rarity: "2/8" },
        { name: "Throwback Alametus", value: 2, rarity: "2/8" },
        { name: "Tartrap Spinosaurus", value: 1.5, rarity: "1/8" },
        { name: "Kaiju Triceratops", value: 1.5, rarity: "1/8" },
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
      isOpen: openTiers["Throwbacks"],
    },
    {
      name: "Greyscale",
      range: "Egg Skins",
      color: "bg-gray-400",
      dinosaurs: [
        // Updated values
        { name: "Grayscale Megavore", value: 45, rarity: "1/8" },
        { name: "Grayscale Gelioichthys", value: 45, rarity: "1/8" },
        { name: "Grayscale Albino Terror", value: 42, rarity: "1/8" },
        { name: "Grayscale Alametus", value: 38, rarity: "1/8" },
        { name: "Grayscale Fasolatherium", value: 38, rarity: "1/8" },
        { name: "Grayscale Dolichomalosaurus", value: 30, rarity: "1/8" },
        { name: "Grayscale Avinychus", value: 30, rarity: "1/8" },
        // Purple - 0.5-1%
        { name: "Grayscale Mayhem Tripod", value: 5, rarity: "2/8" },
        { name: "Grayscale Argentinosaurus", value: 4, rarity: "1/8" },
        { name: "Grayscale Shastasaurus", value: 1, rarity: "1/8" },
        { name: "Grayscale Carcharocles Megalodon", value: 1, rarity: "1/8" },
        // Red - 9-10%
        { name: "Grayscale Barosaurus", value: 1, rarity: "1/8" },
        { name: "Grayscale Basilosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Brachiosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Mayhem Excavator", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Giraffatitan", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Futalognkosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Sauroposeidon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Puertasaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Leedsichthys", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Purussaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Kronosaurus Boyacensis", value: 0.1, rarity: "1/8" },
        // Orange - 20%
        { name: "Grayscale Apatosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Diplodocus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Pliosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Deinosuchus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Mosasaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Camarasaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Lusotitan", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Shantungosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Helicoprion", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Titanosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Tyrannosaurus Rex", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Saurolophus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Spinosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Spinofaarus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Parasaurolophus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Saltasaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Ankylosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Giganotosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Dacentrurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Stegosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Deinocheirus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Sarcosuchus", value: 0.1, rarity: "1/8" },
        // Blue - 30%
        { name: "Grayscale Eotriceratops", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Triceratops", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Woolly Mammoth", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Carcharodonotosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Tyrannotitan", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Mapusaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Thalassomedon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Prognathodon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Shunosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Acrocanthosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Therizinosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Hatzegopteryx", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Iguanodon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Oxalaia", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Tarbosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Chilantaisaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Maip Macrothorax", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Torvosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Elasmosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Chimerarachne", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Sauroniops", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Quetzalcoatlus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Euophlocephalus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Cretoxyrhina", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Suchomimus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Plateosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Corythosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Edmontonia", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Gigantoraptor", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Liopleurodon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Ichthyovenator", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Machimosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Saurophaganax", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Aegisuchus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Mastodonsaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Baryonyx", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Fresnosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Archelon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Amargasaurus", value: 0.1, rarity: "1/8" },
        // White - 40%
        { name: "Grayscale Megalania", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Styracosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Albertosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Kentrosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Carnotaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Fasolasuchus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Barinasuchus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Mayhem Wanderer", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Yutyrannus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Allosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Irritator", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Ceratosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Dilophosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Murusraptor", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Pachycephalosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Tusoteuthis", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Maiasaura", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Rhomaleosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Utahraptor", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Concavenator", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Dunkleosteus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Majungasaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Koolasuchus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Tropeognathus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Jackelopterus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Kosmoceratops", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Onchopristis", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Squalicorax", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Mayhem Crawler", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Gallimimus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Tiktalik", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Gigatitan", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Achillobator", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Coelacanth", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Ichthyosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Pteranodon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Guanlong", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Caveman 1", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Ectenosaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Dodo", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Tullimonstrum", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Hibbertopterus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Stegoceras", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Gojirasaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Sinosauropteryx", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Meganuera", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Trilobite", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Ornithomimus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Thalassodromeus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Troodon", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Coelophysis", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Istiodactylus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Anomalocaris", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Yandusaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Balaur", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Callichimaera", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Avimimus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Arizonasaurus", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Opabinia", value: 0.1, rarity: "1/8" },
        { name: "Grayscale Megalodon", value: 0.1, rarity: "1/8" },
      ],
      isOpen: openTiers["Greyscale"],
    },
    {
      name: "Inverteds",
      range: "Egg Skins",
      color: "bg-indigo-500",
      dinosaurs: [
        { name: "Inverted Albino Terror", value: "TBD", rarity: "8/8" },
        { name: "Inverted Alametus", value: "TBD", rarity: "8/8" },
        { name: "Inverted Megavore", value: "TBD", rarity: "7/8" },
        { name: "Inverted Fasolatherium", value: "TBD", rarity: "6/8" },
        { name: "Inverted Gelioichthys", value: "TBD", rarity: "6/8" },
        { name: "Inverted Dolichomalasaurus", value: "TBD", rarity: "6/8" },
        { name: "Inverted Mayhem Tripod", value: "TBD", rarity: "5/8" },
        { name: "Inverted Mayhem Excavator", value: "TBD", rarity: "4/8" },
        { name: "Inverted Argentinosaurus", value: "TBD", rarity: "4/8" },
        { name: "Inverted Carcharocles Megalodon", value: "TBD", rarity: "4/8" },
        { name: "Inverted Purussaurus", value: "TBD", rarity: "4/8" },
        { name: "Inverted Mayhem Wanderer", value: "TBD", rarity: "3/8" },
        { name: "Inverted Maip Macrothorax", value: "TBD", rarity: "3/8" },
        { name: "Inverted Avinychus", value: "TBD", rarity: "3/8" },
        { name: "Inverted Mayhem Crawler", value: "TBD", rarity: "2/8" },
      ],
      isOpen: openTiers["Inverteds"],
    },
    {
      name: "Retextures",
      range: "Special",
      color: "bg-pink-500",
      dinosaurs: [
        { name: "Rainbow Albino Terror", value: 6, rarity: "2/8", sdna: "50 SDNA" },
        { name: "Rainbow Megavore", value: 6, rarity: "2/8", sdna: "50 SDNA" },
        { name: "Diamond Albino Terror", value: 5, rarity: "2/8", sdna: "250 SDNA" },
        { name: "Diamond Megavore", value: 5, rarity: "2/8", sdna: "250 SDNA" },
        { name: "Diamond Barosaurus", value: 3, rarity: "1/8", sdna: "250 SDNA" },
        { name: "Rainbow Barosaurus", value: 2, rarity: "1/8", sdna: "50 SDNA" },
      ],
      isOpen: openTiers["Retextures"],
    },
    {
      name: "Codes",
      range: "Promo Codes",
      color: "bg-cyan-500",
      dinosaurs: [
        { name: "Wyvern", value: "0.1", rarity: "1/8", code: "Pokemantrainer" },
        { name: "Yutashu", value: "0.1", rarity: "1/8", code: "Burnt Burrito" },
      ],
      isOpen: openTiers["Codes"],
    },
    {
      name: "SDNA",
      range: "Purchasable",
      color: "bg-emerald-500",
      dinosaurs: [
        { name: "Permian Excavator", value: 4, rarity: "1/8" },
        { name: "Ultimallosaurus", value: 2, rarity: "1/8" },
        { name: "Apex Hothead Megavore", value: 2, rarity: "1/8" },
        { name: "Solar Bringer Megavore", value: 0.5, rarity: "1/8" },
        { name: "Deep Sea Megavore", value: 0.5, rarity: "1/8" },
        { name: "All Glass Skins", value: 0.3, rarity: "1/8", sdna: "20 SDNA" },
      ],
      isOpen: openTiers["SDNA"],
    },
    {
      name: "Monster Madness Survival",
      range: "Badges",
      color: "bg-orange-600",
      dinosaurs: [
        { name: "Zweinova-Blank", value: 8, rarity: "2/8" },
        { name: "Zenova", value: 3, rarity: "2/8" },
        { name: "Dimension Beast", value: 2, rarity: "1/8" },
      ],
      isOpen: openTiers["Monster Madness Survival"],
    },
    {
      name: "Halloween 2020",
      range: "Badges",
      color: "bg-orange-500",
      dinosaurs: [
        { name: "Withered Willow Futalognkosaurus", value: 0, rarity: "1/8" },
        { name: "Crow Istiodactylus", value: 0, rarity: "1/8" },
        { name: "Raven Hatzegopteryx", value: 0, rarity: "1/8" },
      ],
      isOpen: openTiers["Halloween 2020"],
    },
    {
      name: "Classic Gamepass",
      range: "Robux",
      color: "bg-amber-500",
      dinosaurs: [
        { name: "Classic Pitch Black Terror V4", value: 10, rarity: "1/8", sdna: "750 SDNA" },
        { name: "Classic Krampus", value: 4, rarity: "1/8", sdna: "300 SDNA" },
        { name: "Classic Headlessaurus", value: 3, rarity: "1/8", sdna: "200 SDNA" },
        { name: "Classic Fossil Brachiosaurus", value: 2, rarity: "1/8", sdna: "150 SDNA" },
        { name: "Classic Megavore V3", value: 1.5, rarity: "2/8", sdna: "100 SDNA" },
        { name: "Classic Albino Terror V4", value: 1.5, rarity: "1/8", sdna: "100 SDNA" },
        { name: "Classic Psychoceratops", value: 1.5, rarity: "1/8", sdna: "100 SDNA" },
      ],
      isOpen: openTiers["Classic Gamepass"],
    },
    {
      name: "Gamepasses",
      range: "Robux",
      color: "bg-yellow-500",
      dinosaurs: [
        { name: "Kaiju Spinosaurus", value: 5, rarity: "1/8" },
        { name: "Riot Shield Triceratops", value: 3, rarity: "1/8" },
        { name: "Icicle Styracosaurus", value: 2, rarity: "1/8" },
        { name: "Classic Pitch Black Terror V3", value: 1.5, rarity: "2/8" },
        { name: "Classic Albino Terror V3", value: 1.5, rarity: "2/8" },
        { name: "Albino T-Rex", value: 0.5, rarity: "1/8" },
        { name: "Scarred T-Rex", value: 0.5, rarity: "1/8" },
      ],
      isOpen: openTiers["Gamepasses"],
    },
    {
      name: "S Tier",
      range: "110+",
      color: "bg-red-500",
      dinosaurs: [
        { name: "Metron Praenintius", value: 1600, rarity: "7/8" },
        { name: "Pitch Wraith Terror", value: 220, rarity: "6/8" },
        { name: "Wraith Terror", value: 170, rarity: "6/8" },
        { name: "Hydralania", value: 165, rarity: "6/8" },
        { name: "Isisauriraptor", value: 140, rarity: "6/8" },
        { name: "Berserk Alametus", value: 130, rarity: "6/8" },
        { name: "Distorted King", value: 115, rarity: "6/8" },
        { name: "Violex Magnus", value: 120, rarity: "8/8" },
        { name: "Fallen Gladiator", value: 115, rarity: "7/8" },
      ],
      isOpen: openTiers["S Tier"],
    },
    {
      name: "A Tier",
      range: "50-110",
      color: "bg-orange-500",
      dinosaurs: [
        { name: "Albino Terror", value: 105, rarity: "8/8" },
        { name: "Megavore", value: 100, rarity: "8/8" },
        { name: "Blue Whale Shastasaurus", value: 95, rarity: "4/8" },
        { name: "Galactic Barosaurus", value: 90, rarity: "6/8" },
        { name: "Orca Spinosaurus", value: 80, rarity: "5/8" },
        { name: "Movie Mosasaurus", value: 75, rarity: "7/8" },
        { name: "Crossover Hybrid/Vinera", value: 70, rarity: "5/8" },
        { name: "Pitch Luminescent Avinychus", value: 68, rarity: "5/8" },
        { name: "Reaper Gelioichthys", value: 68, rarity: "6/8" },
        { name: "Dolphin Ichthyovenator", value: 65, rarity: "4/8" },
        { name: "Pitch Black Terror", value: 58, rarity: "7/8" },
        { name: "Luminescent Avinychus", value: 56, rarity: "6/8" },
        { name: "Giant Albino Baryonyx", value: 54, rarity: "6/8" },
        { name: "Spinofaarus", value: 52, rarity: "6/8" },
      ],
      isOpen: openTiers["A Tier"],
    },
    {
      name: "B Tier",
      range: "30-49",
      color: "bg-yellow-500",
      dinosaurs: [
        { name: "Aurora Borethalass", value: 48, rarity: "4/8" },
        { name: "Kaiju Giraffatitan", value: 47, rarity: "4/8" },
        { name: "Scylla", value: 46, rarity: "6/8" },
        { name: "Phantom Bringer Ceratosaurus", value: 45, rarity: "4/8" },
        { name: "Zomvinychus", value: 44, rarity: "5/8" },
        { name: "Classic Pitch Black Terror", value: 40, rarity: "3/8" },
        { name: "Kaiju Spinofaarus", value: 38, rarity: "6/8" },
        { name: "Pitch Coconut Brachiosaurus", value: 35, rarity: "4/8" },
        { name: "Peak Spinosaurus", value: 34, rarity: "4/8" },
        { name: "Alien Irritator", value: 33, rarity: "3/8" },
        { name: "Classic Albino Terror", value: 32, rarity: "3/8" },
        { name: "Early Winter Frost Sauroposeidon", value: 31, rarity: "3/8" },
        { name: "Alpha Kaiju Spinosaurus", value: 30, rarity: "5/8" },
        { name: "White Walker Carcharodontosaurus", value: 30, rarity: "3/8" },
        { name: "Classic Megavore", value: 30, rarity: "3/8" },
      ],
      isOpen: openTiers["B Tier"],
    },
    {
      name: "C Tier",
      range: "15-29",
      color: "bg-green-500",
      dinosaurs: [
        { name: "Pitch Black Dolichomalosaurus", value: 28, rarity: "4/8" },
        { name: "Reindeer Istiodactylus", value: 28, rarity: "3/8" },
        { name: "Pitch Black Apatosaurus", value: 27, rarity: "4/8" },
        { name: "Gold Fossil Tyrannosaurus", value: 27, rarity: "5/8" },
        { name: "Disco Stegosaurus", value: 25, rarity: "4/8" },
        { name: "Movie Mosasaurus", value: 25, rarity: "4/8" },
        { name: "Rakebaby Guanlong", value: 24, rarity: "5/8" },
        { name: "Firebird", value: 24, rarity: "6/8" },
        { name: "Toy Train Mastodonsaurus", value: 23, rarity: "5/8" },
        { name: "Gold Fossil Spinosaurus", value: 22, rarity: "3/8" },
        { name: "Movie Spinosaurus", value: 22, rarity: "5/8" },
        { name: "Headlessaurus", value: 20, rarity: "5/8" },
        { name: "Carcharocles Megalodon", value: 20, rarity: "4/8" },
        { name: "Chaos Mosasaurus", value: 20, rarity: "5/8" },
        { name: "Totem Terror Albertosaurus", value: 20, rarity: "4/8" },
        { name: "Phoenix Achillobator", value: 20, rarity: "3/8" },
        { name: "Krampus", value: 20, rarity: "4/8" },
        { name: "Forgotten Mutant", value: 20, rarity: "4/8" },
        { name: "Masquerade Gigantoraptor", value: 18, rarity: "5/8" },
        { name: "Spawn Shunosaurus", value: 18, rarity: "5/8" },
        { name: "Kaiju Gelioichthys", value: 18, rarity: "5/8" },
        { name: "Kralkatorrik", value: 18, rarity: "2/8" },
        { name: "Cyber Ichthyovenator", value: 17, rarity: "4/8" },
        { name: "Coconut Brachiosaurus", value: 16, rarity: "4/8" },
        { name: "Santa Clawz", value: 16, rarity: "2/8" },
      ],
      isOpen: openTiers["C Tier"],
    },
    {
      name: "D Tier",
      range: "10-14",
      color: "bg-blue-500",
      dinosaurs: [
        { name: "Butterfly Alametus", value: 13, rarity: "4/8" },
        { name: "Clamarocles Megalodon", value: 13, rarity: "4/8" },
        { name: "Kaiju Gelioichthys", value: 18, rarity: "5/8" },
        { name: "Spider Troodon", value: 13, rarity: "2/8" },
        { name: "Snowflake Stegosaurus", value: 13, rarity: "2/8" },
        { name: "Lil UFO Pteranodon", value: 13, rarity: "2/8" },
        { name: "Movie Tyrannosaurus Rex", value: 13, rarity: "4/8" },
        { name: "Chaos Spinosaurus", value: 13, rarity: "4/8" },
        { name: "Miresteed Baryonyx", value: 12, rarity: "4/8" },
        { name: "Kaiju Sauroposeidon", value: 12, rarity: "3/8" },
        { name: "Juramaia", value: 12, rarity: "3/8" },
        { name: "Mayhem Gojirasaurus", value: 12, rarity: "3/8" },
        { name: "Night Before Cretaceous", value: 11, rarity: "2/8" },
        { name: "Santa Ornithomimus", value: 10, rarity: "1/8" },
        { name: "Kaiju Titanosaurus", value: 10, rarity: "3/8" },
        { name: "Psychoceratops", value: 10, rarity: "2/8" },
        { name: "Movie Brachiosaurus", value: 10, rarity: "3/8" },
        { name: "Cozy Cabin Argentinosaurus", value: 10, rarity: "3/8" },
        { name: "Pumpkin Megalodon", value: 10, rarity: "2/8" },
        { name: "Classified Tylosaurus", value: 10, rarity: "2/8" },
        { name: "Movie Giganotosaurus", value: 14, rarity: "4/8" },
        { name: "Movie Therizinosaurus", value: 12, rarity: "4/8" },
        { name: "Chaos Titanosaur", value: 12, rarity: "3/8" },
      ],
      isOpen: openTiers["D Tier"],
    },
    {
      name: "E Tier",
      range: "4-9",
      color: "bg-purple-500",
      dinosaurs: [
        { name: "Possessed Troodon", value: 9, rarity: "2/8" },
        { name: "Heartracer Concavenator", value: 9, rarity: "2/8" },
        { name: "Movie Triceratops", value: 8, rarity: "3/8" },
        { name: "Apatosaurus Plush", value: 8, rarity: "2/8" },
        { name: "Blackodile", value: 8, rarity: "3/8" },
        { name: "Christmas Shunosaurus", value: 8, rarity: "2/8" },
        { name: "Infected Camarasaurus", value: 8, rarity: "2/8" },
        { name: "Saurophaganax Remodel", value: 8, rarity: "3/8" },
        { name: "Singularfaarus", value: 8, rarity: "3/8" },
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
        { name: "Violex Parvulus", value: 6, rarity: "2/8" },
        { name: "Clay Iguanodon", value: 6, rarity: "3/8" },
        { name: "Putrefied Amargasaurus", value: 6, rarity: "2/8" },
        { name: "Spring Blossom Lusotitan", value: 5, rarity: "2/8" },
        { name: "Tree Elder Ankylosaurus", value: 5, rarity: "2/8" },
        { name: "Forest Dweller Shantungosaurus", value: 5, rarity: "2/8" },
        { name: "Steelforged Concavenator", value: 5, rarity: "1/8" },
        { name: "Fossil Cadger", value: 5, rarity: "3/8" },
        { name: "The Mimic", value: 5, rarity: "4/8" },
        { name: "Yeti Albertosaurus", value: 5, rarity: "2/8" },
        { name: "Maceball Stegosaurus", value: 5, rarity: "2/8" },
        { name: "Galactic Hatzegopteryx", value: 5, rarity: "2/8" },
        { name: "Pop Candy Pachycephalosaurus", value: 5, rarity: "2/8" },
        { name: "Chaos Mosasaurus", value: 5, rarity: "2/8" },
        { name: "Fossil Brachiosaurus", value: 4.5, rarity: "1/8" },
        { name: "Pitch Black Avimimus", value: 4.5, rarity: "3/8" },
        { name: "Fossil Carcharocles Megalodon", value: 4.5, rarity: "1/8" },
        { name: "Voodoo Murusraptor", value: 4, rarity: "3/8" },
        { name: "Sneaky Bunny Guanlong", value: 4, rarity: "2/8" },
        { name: "Monarch Meganeura", value: 4, rarity: "2/8" },
        { name: "Honey Heist Gigatitan", value: 4, rarity: "2/8" },
        { name: "Collector Maip Macrothorax", value: 4, rarity: "2/8" },
        { name: "Vampire Batzegopteryx", value: 4, rarity: "1/8" },
        { name: "Movie Spinofaarus", value: 5, rarity: "3/8" },
      ],
      isOpen: openTiers["E Tier"],
    },
    {
      name: "F Tier",
      range: "0-4",
      color: "bg-gray-500",
      dinosaurs: [
        { name: "DNA Raptor", value: "3.5", rarity: "1/8" },
        { name: "Kaiju Helicoprion", value: "3.5", rarity: "2/8" },
        { name: "Flying Dutchman", value: "3.5", rarity: "1/8" },
        { name: "Classified Troodon", value: "3", rarity: "2/8" },
        { name: "Movie Velociraptor", value: "1", rarity: "1/8" },
        { name: "Kaiju Baryonyx", value: "3", rarity: "2/8" },
        { name: "Galactic Gallimimus", value: "3", rarity: "2/8" },
        { name: "Swan Deinocheirus", value: "3", rarity: "1/8" },
        { name: "Frosted Rex", value: "3", rarity: "1/8" },
        { name: "Fluffle Therizinosaurus", value: "3", rarity: "1/8" },
        { name: "Easter Gallimimus", value: "3", rarity: "1/8" },
        { name: "Fossil Thalassomedon", value: "3", rarity: "1/8" },
        { name: "Yang Tide", value: "3", rarity: "1/8" },
        { name: "Yin Flare", value: "3", rarity: "1/8" },
        { name: "Mammoth", value: "2.5", rarity: "2/8" },
        { name: "Galactic Euoplocephalus", value: "2.5", rarity: "1/8" },
        { name: "Ornament Utahraptor", value: "2.5", rarity: "1/8" },
        { name: "Glutton Elk Spinofaarus", value: "2.5", rarity: "1/8" },
        { name: "Galactic Fresnosaurus", value: "2.25", rarity: "1/8" },
        { name: "Twilight Pliosaurus", value: "2.25", rarity: "1/8" },
        { name: "Hot Cocoa Ichthyovenator", value: "2", rarity: "1/8" },
        { name: "Tundra Grazer Triceratops", value: "2", rarity: "2/8" },
        { name: "Bloodwurm Tullimonstrum", value: "2", rarity: "1/8" },
        { name: "Fossil Sarcosuchus", value: "2", rarity: "1/8" },
        { name: "Fossil Mosasaurus", value: "2", rarity: "1/8" },
        { name: "Fossil Tyrannosaurus Rex", value: "1", rarity: "1/8" },
        { name: "Fossil Utahraptor", value: "2", rarity: "1/8" },
        { name: "Fossil Pteranodon", value: "2", rarity: "1/8" },
        { name: "Fossil Onchopristis", value: "2", rarity: "1/8" },
        { name: "Fossil Ornithomimus", value: "2", rarity: "1/8" },
        { name: "Valley Golem Machimosaurus", value: "2", rarity: "1/8" },
        { name: "Movie Ankylosaurus", value: "2", rarity: "2/8" },
        { name: "Universal Dilophosaurus", value: "1.75", rarity: "1/8" },
        { name: "Nutcracker Wanderer", value: "1.75", rarity: "2/8" },
        { name: "Charybdis", value: "1.75", rarity: "1/8" },
        { name: "Stocking Gojirasaurus", value: "1.5", rarity: "1/8" },
        { name: "Candycane Kentrosaurus", value: "1.5", rarity: "1/8" },
        { name: "Terror Bunny Allosaurus", value: "1.5", rarity: "1/8" },
        { name: "Santa Guard Mammoth", value: "1.5", rarity: "1/8" },
        { name: "Lovebug Thalassodromeus", value: "1.5", rarity: "1/8" },
        { name: "Dreamhaze Fresnosaurus", value: "1.5", rarity: "1/8" },
        { name: "Megafraud", value: "1.5", rarity: "1/8" },
        { name: "Manticore", value: "1.5", rarity: "1/8" },
        { name: "Zeus", value: "1.5", rarity: "1/8" },
        { name: "Thor", value: "1.5", rarity: "1/8" },
        { name: "The Kraken", value: "1.5", rarity: "1/8" },
        { name: "Movie Hatzegopteryx", value: "1.5", rarity: "2/8" },
        { name: "Makeship Triceratops", value: "1", rarity: "1/8" },
        { name: "Cottontail Maiasaura", value: "1", rarity: "1/8" },
        { name: "Drinking Bird Gigantoraptor", value: "1", rarity: "1/8" },
        { name: "Chicken Egg Balaur", value: "1", rarity: "1/8" },
        { name: "Christmas Coelacanth", value: "1", rarity: "1/8" },
        { name: "Gingerbread Ichthyosaurus", value: "1", rarity: "1/8" },
        { name: "Chimerasuchus", value: "1", rarity: "1/8" },
        { name: "Late Valentines Plush", value: "1", rarity: "1/8" },
        { name: "Snow Globe Megalodon", value: "1", rarity: "1/8" },
        { name: "Movie Parasaurolophus", value: "1", rarity: "2/8" },
        { name: "Movie Allosaurus", value: "1", rarity: "2/8" },
        { name: "Movie Carnotaurus", value: "1", rarity: "2/8" },
        { name: "Movie Pteranodon", value: "1", rarity: "2/8" },
        { name: "Movie Tyrannosaurus Rex", value: "1", rarity: "1/8" },
        { name: "Classified Tylosaurus", value: "1", rarity: "1/8" },
        { name: "Movie Velociraptor", value: "1", rarity: "1/8" },
        { name: "Cetus", value: "0.75", rarity: "1/8" },
        { name: "Hestiaceras", value: "0.5", rarity: "1/8" },
        { name: "Cerberus", value: "0.5", rarity: "1/8" },
        { name: "Griffin", value: "0.5", rarity: "1/8" },
        { name: "Balure", value: "0.5", rarity: "1/8" },
        { name: "Minotaurus", value: "0.5", rarity: "1/8" },
        { name: "Kentrallos", value: "0.5", rarity: "1/8" },
        { name: "Erymanthian Styracoboar", value: "0.5", rarity: "1/8" },
        { name: "Movie Gallimimus", value: 2, rarity: "2/8" },
        { name: "Novel Carnotaurus", value: 2, rarity: "2/8" },
        { name: "Movie Ceratosaurus", value: 2, rarity: "2/8" },
        { name: "Movie Quetzalcoatlus", value: 2, rarity: "2/8" },
        { name: "Movie Dilophosaurus", value: 2, rarity: "2/8" },
        { name: "Chaos Tyrannosaurus Rex", value: 2, rarity: "2/8" },
        { name: "Movie Pachycephalosaurus", value: 1, rarity: "2/8" },
        { name: "Movie Stegosaurus", value: 1, rarity: "2/8" },
        { name: "Movie Compsognathus", value: 1, rarity: "2/8" },
      ],
      isOpen: openTiers["F Tier"],
    },
    {
      name: "Collectors",
      range: "Special",
      color: "bg-gray-500",
      dinosaurs: [
        { name: "Branded Purrusaurus", value: "2000", rarity: "2/8" },
        { name: "Golden Ectenosaurus", value: "80-150", rarity: "1/8" },
        { name: "Diamond Tusoteuthis", value: "20-33", rarity: "1/8" },
        { name: "Diamond Acrocanthosaurus", value: "16-28", rarity: "1/8" },
        { name: "Diamond Shunosaurus", value: "14-28", rarity: "1/8" },
        { name: "Diamond Maiasaurus", value: "10-22", rarity: "1/8" },
        { name: "Diamond Styracosaurus", value: "9-17", rarity: "1/8" },
        { name: "Diamond Pteranodon", value: "9-16", rarity: "1/8" },
        { name: "Diamond Thalassodromeus", value: "8-15", rarity: "1/8" },
        { name: "Diamond Parasaurolophus", value: "8-15", rarity: "1/8" },
        { name: "Diamond Concavenator", value: "8-13", rarity: "1/8" },
        { name: "Diamond Gojirasaurus", value: "6-11", rarity: "1/8" },
      ],
      isOpen: openTiers["Collectors"],
    },
  ]

  const filteredTiers = useMemo(() => {
    if (!searchTerm) return tiers

    return tiers
      .map((tier) => ({
        ...tier,
        dinosaurs: tier.dinosaurs.filter(
          (dino) =>
            dino.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dino.value.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            (dino.rarity && dino.rarity.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (dino.code && dino.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (dino.sdna && dino.sdna.toLowerCase().includes(searchTerm.toLowerCase())),
        ),
      }))
      .filter((tier) => tier.dinosaurs.length > 0)
  }, [searchTerm])

  const toggleTier = (tierName: string) => {
    setOpenTiers((prev) => ({
      ...prev,
      [tierName]: !prev[tierName],
    }))
  }

  const getRarityColor = (rarity: string) => {
    if (rarity.includes("8/8")) return "bg-purple-600/80 text-purple-100"
    if (rarity.includes("7/8")) return "bg-red-600/80 text-red-100"
    if (rarity.includes("6/8")) return "bg-orange-600/80 text-orange-100"
    if (rarity.includes("5/8")) return "bg-yellow-600/80 text-yellow-100"
    if (rarity.includes("4/8")) return "bg-green-600/80 text-green-100"
    if (rarity.includes("3/8")) return "bg-blue-600/80 text-blue-100"
    if (rarity.includes("2/8")) return "bg-indigo-600/80 text-indigo-100"
    if (rarity.includes("1/8")) return "bg-gray-600/80 text-gray-100"
    return "bg-gray-500/80 text-gray-100"
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-end gap-2 mb-4">
          <Link href="/info">
            <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-md text-sm font-light transition-colors border border-gray-700/50">
              Info
            </button>
          </Link>
          <Link href="/changelog">
            <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-md text-sm font-light transition-colors border border-gray-700/50">
              Changelog
            </button>
          </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-white mb-3 tracking-wide">Dinosaur Simulator</h1>
          <h2 className="text-xl font-extralight text-gray-400 mb-2">Value List</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto"></div>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search dinosaurs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-black border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 rounded-lg h-12"
          />
        </div>

        <div className="space-y-2">
          {filteredTiers.map((tier) => (
            <Card
              key={tier.name}
              className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/40 transition-all duration-200"
            >
              <Collapsible open={openTiers[tier.name]} onOpenChange={() => toggleTier(tier.name)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-800/20 transition-colors py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-white text-lg font-light tracking-wide">{tier.name}</CardTitle>
                        <Badge variant="outline" className="text-gray-400 border-gray-700 bg-transparent text-xs">
                          {tier.range}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-800/50 text-gray-300 text-xs border-0">
                          {tier.dinosaurs.length}
                        </Badge>
                      </div>
                      {openTiers[tier.name] ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {tier.dinosaurs.map((dino, index) => (
                        <div
                          key={index}
                          className="bg-gray-800/20 rounded-md p-3 border border-gray-800/30 hover:bg-gray-800/30 transition-colors group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-light text-white text-sm group-hover:text-gray-100 transition-colors">
                              {dino.name}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-gray-700/50 text-gray-300 border-0 ml-2 shrink-0"
                            >
                              {dino.value}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 items-center">
                            {dino.rarity && (
                              <Badge className={`text-xs ${getRarityColor(dino.rarity)} border-0`}>{dino.rarity}</Badge>
                            )}
                            {dino.code && (
                              <Badge className="text-xs bg-gray-600/80 text-gray-100 border-0">Code: {dino.code}</Badge>
                            )}
                            {dino.sdna && (
                              <Badge className="text-xs bg-emerald-600/80 text-emerald-100 border-0">{dino.sdna}</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredTiers.length === 0 && searchTerm && (
          <Card className="bg-gray-900/30 border-gray-800/50 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <p className="text-gray-400 font-light">No dinosaurs found matching "{searchTerm}"</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm font-light">
            Directly forked from the{" "}
            <a
              href="https://discord.gg/kNPy4jwMWj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors underline decoration-gray-600 hover:decoration-gray-400"
            >
              Dinosaur Simulator Trading Network
            </a>{" "}
            Discord Server with slight changes.
          </p>
        </div>
      </div>
    </div>
  )
}
