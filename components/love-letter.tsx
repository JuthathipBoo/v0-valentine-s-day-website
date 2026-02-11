"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Mail, Volume2, VolumeX } from "lucide-react"

const letterParagraphs = [
  "ถึงเบ๊บๆของเค้า,",
  "Happy Valentine ในปีแรกของเรานะคะ ดีใจนะคับที่อยู่ด้วยกันมาอีกเดือนแล้ว",
  "เบ๊บๆยังคอยดูแลเค้าเสมอเยย ถึงเค้าจะดื้อไปหน่อย แต่เบ๊บๆก็ยังโอ๋ๆตลอด",
  "ขอบคุณทุกอย่างที่ทำให้นะคับ เค้าอยู่ข้างๆเบ๊บๆเสมอ",
]

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [revealedParagraphs, setRevealedParagraphs] = useState<Set<number>>(new Set())
  const [isMuted, setIsMuted] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isOpen) {
      letterParagraphs.forEach((_, index) => {
        setTimeout(() => {
          setRevealedParagraphs((prev) => new Set([...prev, index]))
        }, 400 * (index + 1))
      })
    } else {
      setRevealedParagraphs(new Set())
    }
  }, [isOpen])

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-center px-5 py-10 sm:px-6 sm:py-16"
    >
      <div
        className={`w-full max-w-md transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="text-primary" size={22} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2">
            {"จดหมายรัก"}
          </h2>
          <p className="text-muted-foreground font-sans text-xs sm:text-sm font-light">
            {"กดซองจดหมายเพื่อเปิดอ่าน"}
          </p>
        </div>

        {/* Envelope */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full transition-all duration-500 cursor-pointer ${
            isOpen ? "scale-[0.97] opacity-50" : "hover:scale-[1.01] active:scale-[0.99]"
          }`}
          aria-label={isOpen ? "ปิดจดหมาย" : "เปิดจดหมาย"}
        >
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/30" />
            <div className="flex items-center justify-center gap-2.5">
              <Heart size={14} className="text-primary" fill="hsl(346, 55%, 52%)" />
              <span className="font-sans text-sm sm:text-base text-foreground font-medium">
                {"ถึงคนที่รักที่สุด"}
              </span>
              <Heart size={14} className="text-primary" fill="hsl(346, 55%, 52%)" />
            </div>
            <p className="text-muted-foreground text-[10px] sm:text-xs mt-1.5 font-sans font-light">
              {isOpen ? "กดเพื่อปิด" : "กดเพื่อเปิดอ่าน"}
            </p>
          </div>
        </button>

        {/* Letter Content */}
        <div
          className={`transition-all duration-700 ease-out overflow-hidden ${
            isOpen ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 shadow-sm relative">
            {/* Music toggle */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors"
              aria-label={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
            >
              {isMuted ? (
                <VolumeX size={12} className="text-muted-foreground" />
              ) : (
                <Volume2 size={12} className="text-primary" />
              )}
            </button>

            {/* Corner hearts */}
            <Heart
              size={12}
              className="absolute top-3 right-3 text-primary opacity-20"
              fill="hsl(346, 55%, 52%)"
            />

            <div className="space-y-4 font-sans text-foreground leading-relaxed mt-4 text-sm sm:text-base">
              {letterParagraphs.map((paragraph, index) => (
                <p
                  key={`paragraph-${index}`}
                  className={`transition-all duration-700 ease-out ${
                    index === 0
                      ? "font-serif text-xl sm:text-2xl text-primary"
                      : "font-light"
                  } ${
                    revealedParagraphs.has(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              <p
                className={`font-serif text-lg sm:text-xl text-primary pt-4 transition-all duration-700 ease-out ${
                  revealedParagraphs.has(letterParagraphs.length - 1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${letterParagraphs.length * 400}ms` }}
              >
                {"รักเบ๊บๆเสมอ,"}
                <br />
                <span className="text-foreground text-sm sm:text-base font-sans font-light">
                  {"จากคนที่เบ๊บๆรักที่สุด"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
