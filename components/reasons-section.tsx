"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Star, Sparkles, Sun, Coffee, Music } from "lucide-react"

const reasons = [
  {
    icon: Heart,
    title: "รอยยิ้มของเธอ",
    text: "ที่ทำให้ทุกวันสดใสขึ้น แม้ในวันที่แย่ที่สุด",
  },
  {
    icon: Star,
    title: "ความเข้าใจ",
    text: "เธอเข้าใจฉันโดยไม่ต้องอธิบาย รู้ใจกันเสมอ",
  },
  {
    icon: Sparkles,
    title: "เสียงหัวเราะ",
    text: "ที่ทำให้โลกทั้งใบหมุนช้าลง เหลือแค่เราสองคน",
  },
  {
    icon: Sun,
    title: "ความอบอุ่น",
    text: "ทุกครั้งที่อยู่ข้างเธอ รู้สึกเหมือนอยู่บ้าน",
  },
  {
    icon: Coffee,
    title: "ช่วงเวลาเล็ก ๆ",
    text: "ไม่ว่าจะนั่งเงียบ ๆ ด้วยกัน หรือคุยกันไม่หยุด ทุกนาทีมีค่า",
  },
  {
    icon: Music,
    title: "จังหวะหัวใจ",
    text: "ที่เต้นพร้อมกัน เหมือนเพลงที่แต่งขึ้นมาเพื่อเราสองคน",
  },
]

export function ReasonsSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((obs) => obs?.disconnect())
    }
  }, [])

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Sparkles className="mx-auto text-accent mb-4" size={32} />
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-3 text-balance">
          {"เหตุผลที่รักเธอ"}
        </h2>
        <p className="text-muted-foreground font-sans">
          {"มีอีกมากมายจนนับไม่ถ้วน แต่นี่คือบางเหตุผล..."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const Icon = reason.icon
          return (
            <div
              key={reason.title}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`bg-card border border-border rounded-2xl p-6 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {reason.text}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
