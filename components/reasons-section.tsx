"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Star, Sparkles, Sun, Coffee, Music } from "lucide-react"

const reasons = [
  {
    icon: Heart,
    title: "รอยยิ้มของเธอ",
    front: "กดเพื่ออ่าน...",
    back: "ที่ทำให้ทุกวันสดใสขึ้น แม้ในวันที่แย่ที่สุด แค่เห็นเธอยิ้ม ทุกอย่างก็ดีขึ้น",
  },
  {
    icon: Star,
    title: "ความเข้าใจ",
    front: "กดเพื่ออ่าน...",
    back: "เธอเข้าใจฉันโดยไม่ต้องอธิบาย รู้ใจกันเสมอ เหมือนเราเชื่อมต่อกันด้วยหัวใจ",
  },
  {
    icon: Sparkles,
    title: "เสียงหัวเราะ",
    front: "กดเพื่ออ่าน...",
    back: "ที่ทำให้โลกทั้งใบหมุนช้าลง เหลือแค่เราสองคน ฉันอยากฟังเสียงนี้ไปตลอด",
  },
  {
    icon: Sun,
    title: "ความอบอุ่น",
    front: "กดเพื่ออ่าน...",
    back: "ทุกครั้งที่อยู่ข้างเธอ รู้สึกเหมือนอยู่บ้าน ปลอดภัยและอบอุ่นที่สุด",
  },
  {
    icon: Coffee,
    title: "ช่วงเวลาเล็ก ๆ",
    front: "กดเพื่ออ่าน...",
    back: "ไม่ว่าจะนั่งเงียบ ๆ ด้วยกัน หรือคุยกันไม่หยุด ทุกนาทีกับเธอมีค่ามากกว่าทุกสิ่ง",
  },
  {
    icon: Music,
    title: "จังหวะหัวใจ",
    front: "กดเพื่ออ่าน...",
    back: "ที่เต้นพร้อมกัน เหมือนเพลงที่แต่งขึ้นมาเพื่อเราสองคน ฉันรักเธอในทุกจังหวะ",
  },
]

export function ReasonsSection() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
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
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <section id="reasons" className="px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Sparkles className="mx-auto text-accent mb-4" size={32} />
        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-3 text-balance">
          {"เหตุผลที่รักเธอ"}
        </h2>
        <p className="text-muted-foreground font-sans">
          {"กดการ์ดแต่ละใบเพื่ออ่านเหตุผล..."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const Icon = reason.icon
          const isFlipped = flipped.has(index)
          return (
            <div
              key={reason.title}
              ref={(el) => { refs.current[index] = el }}
              className={`transition-all duration-700 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                perspective: "1000px",
              }}
            >
              <button
                type="button"
                onClick={() => toggleFlip(index)}
                className="relative w-full h-52 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                aria-label={isFlipped ? "ปิดการ์ด" : `เปิดอ่าน: ${reason.title}`}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-xs">
                    {reason.front}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-primary rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Icon size={20} className="text-primary-foreground mb-3 opacity-60" />
                  <p className="text-primary-foreground font-sans text-sm leading-relaxed">
                    {reason.back}
                  </p>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      <p className="text-center text-muted-foreground font-sans text-xs mt-8">
        {"กดการ์ดอีกครั้งเพื่อพลิกกลับ"}
      </p>
    </section>
  )
}
