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
      className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12"
    >
      <div
        className={`w-full max-w-lg transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
      >
        <div className="text-center mb-8 sm:mb-12">
          <Mail className="mx-auto text-primary mb-3 sm:mb-4" size={28} />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-2 sm:mb-3">
            {"จดหมายรัก"}
          </h2>
          <p className="text-muted-foreground font-sans text-xs sm:text-sm">
            {"กดซองจดหมายเพื่อเปิดอ่าน..."}
          </p>
        </div>

        <div className="relative">
          {/* Envelope */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full transition-all duration-700 cursor-pointer ${isOpen ? "scale-95 opacity-60" : "scale-100 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            aria-label={isOpen ? "ปิดจดหมาย" : "เปิดจดหมาย"}
          >
            <div className="bg-card border-2 border-border rounded-2xl p-5 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-primary opacity-50" />
              <div className="flex items-center justify-center gap-2">
                <Heart size={16} className="text-primary sm:[&]:w-5 sm:[&]:h-5" fill="hsl(346, 60%, 55%)" />
                <span className="font-serif text-lg sm:text-xl text-foreground">
                  {"ถึงคนที่รักที่สุด"}
                </span>
                <Heart size={16} className="text-primary sm:[&]:w-5 sm:[&]:h-5" fill="hsl(346, 60%, 55%)" />
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 sm:mt-2 font-sans">
                {isOpen ? "กดเพื่อปิด" : "กดเพื่อเปิดอ่าน"}
              </p>
            </div>
          </button>

          {/* Letter Content */}
          <div
            className={`transition-all duration-700 overflow-hidden ${isOpen ? "max-h-[1000px] opacity-100 mt-4 sm:mt-6" : "max-h-0 opacity-0 mt-0"
              }`}
          >
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 md:p-10 shadow-xl relative">
              {/* Music toggle */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-3 left-3 sm:top-4 sm:left-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
              >
                {isMuted ? (
                  <VolumeX size={12} className="text-muted-foreground" />
                ) : (
                  <Volume2 size={12} className="text-primary" />
                )}
              </button>

              {/* Decorative corner hearts */}
              <Heart
                size={14}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-primary opacity-30"
                fill="hsl(346, 60%, 55%)"
              />
              <Heart
                size={10}
                className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-primary opacity-30"
                fill="hsl(346, 60%, 55%)"
              />

              <div className="space-y-4 sm:space-y-5 font-sans text-foreground leading-relaxed mt-3 sm:mt-4 text-sm sm:text-base">
                {letterParagraphs.map((paragraph, index) => (
                  <p
                    key={`paragraph-${index}`}
                    className={`transition-all duration-700 ${index === 0
                      ? "font-serif text-xl sm:text-2xl text-primary"
                      : ""
                      } ${revealedParagraphs.has(index)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                      }`}
                  >
                    {paragraph}
                  </p>
                ))}

                <p
                  className={`font-serif text-lg sm:text-xl text-primary pt-3 sm:pt-4 transition-all duration-700 ${revealedParagraphs.has(letterParagraphs.length - 1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${letterParagraphs.length * 400}ms` }}
                >
                  {"รักเบ๊บๆเสมอ,"}
                  <br />
                  <span className="text-foreground text-base sm:text-lg">
                    {"จากคนที่เบ๊บๆรักที่สุด"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
