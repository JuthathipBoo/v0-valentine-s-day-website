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
        { threshold: 0.3 }
      )
      observer.observe(ref)
      return observer
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <section className="px-6 py-20 max-w-2xl mx-auto">
      <div className="text-center mb-16">
        <Heart className="mx-auto text-primary mb-4" size={32} fill="hsl(346, 60%, 55%)" />
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-3 text-balance">
          {"เรื่องราวของเรา"}
        </h2>
        <p className="text-muted-foreground font-sans">
          {"ทุกช่วงเวลาที่มีเธอล้วนมีค่า"}
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="space-y-12">
          {moments.map((moment, index) => (
            <div
              key={moment.title}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`relative flex items-start gap-6 md:gap-0 transition-all duration-700 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Heart dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Heart size={18} className="text-primary-foreground" fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 ${
                  index % 2 === 0
                    ? "md:pr-[calc(50%+2rem)] md:text-right"
                    : "md:pl-[calc(50%+2rem)]"
                }`}
              >
                <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                  <h3 className="font-serif text-lg text-foreground mb-1">
                    {moment.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
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
