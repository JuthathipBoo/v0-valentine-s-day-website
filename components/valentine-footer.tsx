"use client"

import { Heart } from "lucide-react"

export function ValentineFooter() {
  return (
    <footer className="py-12 text-center px-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Heart size={16} className="text-primary" fill="hsl(346, 60%, 55%)" />
        <Heart size={20} className="text-primary" fill="hsl(346, 60%, 55%)" />
        <Heart size={16} className="text-primary" fill="hsl(346, 60%, 55%)" />
      </div>
      <p className="font-serif text-lg text-foreground mb-2">
        {"Made with love"}
      </p>
      <p className="text-muted-foreground font-sans text-sm">
        {"Happy Valentine's Day 2026"}
      </p>
    </footer>
  )
}
