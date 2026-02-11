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
    emoji: "💌",
  },
  {
    href: "/gallery",
    icon: Camera,
    title: "ความทรงจำของเรา",
    desc: "แกลเลอรี่รูปภาพช่วงเวลาดี ๆ ที่มีกัน",
    emoji: "📸",
  },
  {
    href: "/reasons",
    icon: Sparkles,
    title: "เหตุผลที่รักเธอ",
    desc: "พลิกการ์ดเพื่ออ่านเหตุผลที่ซ่อนอยู่",
    emoji: "✨",
  },
  {
    href: "/scratch",
    icon: Heart,
    title: "ข้อความลับ",
    desc: "ขูดเพื่อเปิดเผยข้อความสุดพิเศษ",
    emoji: "🎁",
  },
  {
    href: "/quiz",
    icon: MessageCircleHeart,
    title: "เธอรู้จักฉันดีแค่ไหน?",
    desc: "ตอบคำถามเกี่ยวกับเราสองคน",
    emoji: "💕",
  },
]

export default function HomePage() {
  const [visible, setVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200)
    const t2 = setTimeout(() => setCardsVisible(true), 900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-10 pb-6 sm:px-6 sm:pt-16 sm:pb-10">
        <div
          className={`text-center transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Animated hearts row */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Heart
              className="text-primary animate-pulse-soft"
              size={16}
              fill="hsl(346, 60%, 55%)"
            />
            <Heart
              className="text-primary animate-pulse-soft"
              size={28}
              fill="hsl(346, 60%, 55%)"
              style={{ animationDelay: "0.3s" }}
            />
            <Heart
              className="text-primary animate-pulse-soft"
              size={16}
              fill="hsl(346, 60%, 55%)"
              style={{ animationDelay: "0.6s" }}
            />
          </div>

          <p className="text-muted-foreground font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4 sm:mb-5 font-medium">
            February 14, 2026
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl text-foreground leading-[1.1] mb-5 sm:mb-7 text-balance">
            Happy
            <br />
            <span className="text-primary">{"Valentine's"}</span>
            <br />
            Day
          </h1>

          <div className="w-12 h-px bg-primary/40 mx-auto mb-5 sm:mb-7" />

          <p className="font-sans text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-sm mx-auto leading-relaxed font-light">
            {"สำหรับคนพิเศษที่ทำให้ทุกวันเป็นวันแห่งความรัก"}
          </p>
        </div>
      </div>

      {/* Cards section */}
      <div className="px-5 pb-10 sm:px-6 sm:pb-16">
        <div className="max-w-md mx-auto">
          <p
            className={`text-center font-sans text-xs text-muted-foreground mb-5 sm:mb-6 transition-all duration-700 font-medium tracking-wide ${
              cardsVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {"กดเปิดดูแต่ละหน้าได้เลยนะ"}
          </p>

          <div className="flex flex-col gap-3 sm:gap-3.5">
            {pages.map((page, index) => (
              <Link
                key={page.href}
                href={page.href}
                className={`group relative bg-card border border-border rounded-2xl p-4 sm:p-5 transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 active:scale-[0.98] ${
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300 text-lg sm:text-xl">
                    {page.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-sm sm:text-base text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">
                      {page.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-1 font-light">
                      {page.desc}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all duration-300"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`pb-8 sm:pb-12 text-center transition-all duration-700 delay-[1200ms] ${
          cardsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-serif text-sm text-muted-foreground">made with love</p>
      </div>
    </main>
  )
}
