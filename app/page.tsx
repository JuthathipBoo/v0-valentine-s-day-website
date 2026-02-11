"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Heart,
  Mail,
  Camera,
  Sparkles,
  MessageCircleHeart,
  ArrowRight,
} from "lucide-react"

const pages = [
  {
    href: "/letter",
    icon: Mail,
    title: "จดหมายรัก",
    desc: "กดเปิดซองจดหมายเพื่ออ่านข้อความจากใจ",
    color: "from-primary/20 to-primary/5",
  },
  {
    href: "/gallery",
    icon: Camera,
    title: "ความทรงจำของเรา",
    desc: "แกลเลอรี่รูปภาพช่วงเวลาดี ๆ ที่มีกัน",
    color: "from-accent/30 to-accent/5",
  },
  {
    href: "/reasons",
    icon: Sparkles,
    title: "เหตุผลที่รักเธอ",
    desc: "พลิกการ์ดเพื่ออ่านเหตุผลที่ซ่อนอยู่",
    color: "from-primary/15 to-accent/10",
  },
  {
    href: "/scratch",
    icon: Heart,
    title: "ข้อความลับ",
    desc: "ขูดเพื่อเปิดเผยข้อความสุดพิเศษ",
    color: "from-accent/25 to-primary/5",
  },
  {
    href: "/quiz",
    icon: MessageCircleHeart,
    title: "เธอรู้จักฉันดีแค่ไหน?",
    desc: "ตอบคำถามเกี่ยวกับเราสองคน",
    color: "from-primary/20 to-accent/10",
  },

]

export default function Page() {
  const [visible, setVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200)
    const t2 = setTimeout(() => setCardsVisible(true), 800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10 sm:px-6 sm:py-16">
      {/* Hero */}
      <div
        className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Heart
            className="text-primary animate-pulse-soft"
            size={20}
            fill="hsl(346, 60%, 55%)"
          />
          <Heart
            className="text-primary animate-pulse-soft"
            size={32}
            fill="hsl(346, 60%, 55%)"
            style={{ animationDelay: "0.3s" }}
          />
          <Heart
            className="text-primary animate-pulse-soft"
            size={20}
            fill="hsl(346, 60%, 55%)"
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        <p className="text-muted-foreground font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
          February 14, 2026
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground leading-tight mb-4 sm:mb-6 text-balance">
          Happy
          <br />
          <span className="text-primary">{"Valentine's"}</span>
          <br />
          Day
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-xs sm:max-w-md mx-auto leading-relaxed">
          {"สำหรับคนพิเศษที่ทำให้ทุกวันเป็นวันแห่งความรัก"}
        </p>
      </div>

      {/* Page cards grid */}
      <div className="w-full max-w-4xl">
        <p
          className={`text-center font-sans text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 transition-all duration-700 ${
            cardsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {"เลือกกดเปิดดูแต่ละหน้าได้เลยนะ"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {pages.map((page, index) => {
            const Icon = page.icon
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`group relative overflow-hidden bg-card border border-border rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 active:scale-[0.98] ${
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon
                      size={20}
                      className="text-primary group-hover:scale-110 transition-transform duration-300 sm:[&]:w-[22px] sm:[&]:h-[22px]"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors duration-300">
                      {page.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {page.desc}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 sm:[&]:w-[18px] sm:[&]:h-[18px]"
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-10 sm:mt-16 text-center transition-all duration-700 delay-700 ${
          cardsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
          <Heart size={12} className="text-primary" fill="hsl(346, 60%, 55%)" />
          <Heart size={16} className="text-primary" fill="hsl(346, 60%, 55%)" />
          <Heart size={12} className="text-primary" fill="hsl(346, 60%, 55%)" />
        </div>
        <p className="font-serif text-xs sm:text-sm text-foreground">Made with love</p>
      </div>
    </main>
  )
}
