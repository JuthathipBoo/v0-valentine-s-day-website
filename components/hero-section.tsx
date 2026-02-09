"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div
        className={`transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart
            className="text-primary animate-pulse-soft"
            size={32}
            fill="hsl(346, 60%, 55%)"
          />
          <Heart
            className="text-primary animate-pulse-soft"
            size={48}
            fill="hsl(346, 60%, 55%)"
            style={{ animationDelay: "0.3s" }}
          />
          <Heart
            className="text-primary animate-pulse-soft"
            size={32}
            fill="hsl(346, 60%, 55%)"
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        <p className="text-muted-foreground font-sans text-sm tracking-[0.3em] uppercase mb-4">
          February 14
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6 text-balance">
          Happy
          <br />
          <span className="text-primary">{"Valentine's"}</span>
          <br />
          Day
        </h1>

        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
          {"สำหรับคนพิเศษที่ทำให้ทุกวันเป็นวันแห่งความรัก"}
        </p>

        <a
          href="#letter"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-sans font-medium text-base hover:opacity-90 transition-opacity"
        >
          <Heart size={18} fill="currentColor" />
          {"เปิดจดหมายรัก"}
        </a>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(346, 60%, 55%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
