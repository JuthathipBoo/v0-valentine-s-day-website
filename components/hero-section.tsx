"use client"

import { useEffect, useState } from "react"
import {
  Heart,
  Mail,
  Camera,
  Sparkles,
  MessageCircleHeart,
  ChevronDown,
} from "lucide-react"

const navItems = [
  { href: "#letter", icon: Mail, label: "จดหมาย" },
  { href: "#gallery", icon: Camera, label: "รูปภาพ" },
  { href: "#reasons", icon: Sparkles, label: "เหตุผล" },
  { href: "#quiz", icon: MessageCircleHeart, label: "ควิซ" },
]

export function HeroSection() {
  const [visible, setVisible] = useState(false)
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), 300)
    const timer2 = setTimeout(() => setNavVisible(true), 1200)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
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

        {/* Interactive nav buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-6 transition-all duration-700 ${
            navVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {navItems.map((item, i) => {
            const Icon = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 bg-card border border-border px-5 py-3 rounded-full font-sans text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Icon size={16} className="group-hover:scale-110 transition-transform" />
                {item.label}
              </a>
            )
          })}
        </div>

        <a
          href="#letter"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-sans font-medium text-base hover:opacity-90 transition-opacity hover:shadow-lg"
        >
          <Heart size={18} fill="currentColor" />
          {"เปิดจดหมายรัก"}
        </a>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown size={28} className="text-primary" />
      </div>
    </section>
  )
}
