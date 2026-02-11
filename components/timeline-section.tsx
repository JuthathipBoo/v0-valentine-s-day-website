"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

const moments = [
  { title: "วันที่เราเจอกัน", text: "จุดเริ่มต้นของเรื่องราวที่สวยงาม" },
  { title: "วันที่เราสารภาพรัก", text: "หัวใจเต้นแรงจนแทบหยุดหายใจ" },
  { title: "วันที่เราหัวเราะด้วยกัน", text: "ทุกเสียงหัวเราะคือความทรงจำที่มีค่า" },
  { title: "วันที่เราผ่านพ้นอุปสรรค", text: "เพราะมีเธอ ทุกอย่างจึงผ่านไปได้" },
  { title: "วันนี้ และทุก ๆ วัน", text: "ฉันจะรักเธอมากขึ้นกว่าเมื่อวาน" },
]

export function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(ref)
      return observer
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-20 max-w-2xl mx-auto">
      <div className="text-center mb-8 sm:mb-16">
        <Heart className="mx-auto text-primary mb-3 sm:mb-4" size={28} fill="hsl(346, 60%, 55%)" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-2 sm:mb-3 text-balance">
          {"เรื่องราวของเรา"}
        </h2>
        <p className="text-muted-foreground font-sans text-xs sm:text-sm">
          {"ทุกช่วงเวลาที่มีเธอล้วนมีค่า"}
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="space-y-8 sm:space-y-12">
          {moments.map((moment, index) => (
            <div
              key={moment.title}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`relative flex items-start transition-all duration-700 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Heart dot */}
              <div className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Heart size={14} className="text-primary-foreground sm:[&]:w-[18px] sm:[&]:h-[18px]" fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div
                className={`ml-14 sm:ml-16 md:ml-0 ${
                  index % 2 === 0
                    ? "md:pr-[calc(50%+2rem)] md:text-right"
                    : "md:pl-[calc(50%+2rem)]"
                }`}
              >
                <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
                  <h3 className="font-serif text-base sm:text-lg text-foreground mb-1">
                    {moment.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-xs sm:text-sm leading-relaxed">
                    {moment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
