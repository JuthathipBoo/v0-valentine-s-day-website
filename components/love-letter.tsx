"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Mail, Volume2, VolumeX } from "lucide-react"

const letterParagraphs = [
  "ถึงคนที่แสนพิเศษ,",
  "ในทุก ๆ วันที่ผ่านไป เธอทำให้โลกของฉันสว่างขึ้น ทำให้ทุกอย่างมีความหมาย และทำให้หัวใจฉันเต้นแรงขึ้นทุกครั้งที่ได้อยู่ใกล้เธอ",
  "เธอคือของขวัญที่ดีที่สุดที่ชีวิตมอบให้ เป็นแสงสว่างในวันที่มืดมน เป็นรอยยิ้มในวันที่เหนื่อยล้า และเป็นเหตุผลที่ทำให้ฉันอยากตื่นขึ้นมาทุกเช้า",
  "ขอบคุณที่เป็นเธอ ขอบคุณที่อยู่ข้าง ๆ ฉันเสมอ ขอบคุณที่รักฉันในแบบที่ฉันเป็น ฉันสัญญาว่าจะรักเธอมากขึ้นทุกวัน ไม่ว่าจะเกิดอะไรขึ้น",
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
      { threshold: 0.3 }
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
      id="letter"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-center mb-12">
          <Mail className="mx-auto text-primary mb-4" size={36} />
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-3">
            {"จดหมายรัก"}
          </h2>
          <p className="text-muted-foreground font-sans">
            {"กดซองจดหมายเพื่อเปิดอ่าน..."}
          </p>
        </div>

        <div className="relative max-w-lg mx-auto">
          {/* Envelope */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full transition-all duration-700 cursor-pointer ${
              isOpen ? "scale-95 opacity-60" : "scale-100 hover:scale-105"
            }`}
            aria-label={isOpen ? "ปิดจดหมาย" : "เปิดจดหมาย"}
          >
            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary opacity-50" />
              <div className="flex items-center justify-center gap-2">
                <Heart size={20} className="text-primary" fill="hsl(346, 60%, 55%)" />
                <span className="font-serif text-xl text-foreground">
                  {"ถึงคนที่รักที่สุด"}
                </span>
                <Heart size={20} className="text-primary" fill="hsl(346, 60%, 55%)" />
              </div>
              <p className="text-muted-foreground text-sm mt-2 font-sans">
                {isOpen ? "กดเพื่อปิด" : "กดเพื่อเปิดอ่าน"}
              </p>
            </div>
          </button>

          {/* Letter Content */}
          <div
            className={`transition-all duration-700 overflow-hidden ${
              isOpen ? "max-h-[1000px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-xl relative">
              {/* Music toggle */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
              >
                {isMuted ? (
                  <VolumeX size={14} className="text-muted-foreground" />
                ) : (
                  <Volume2 size={14} className="text-primary" />
                )}
              </button>

              {/* Decorative corner hearts */}
              <Heart
                size={16}
                className="absolute top-4 right-4 text-primary opacity-30"
                fill="hsl(346, 60%, 55%)"
              />
              <Heart
                size={12}
                className="absolute bottom-4 left-4 text-primary opacity-30"
                fill="hsl(346, 60%, 55%)"
              />

              <div className="space-y-5 font-sans text-foreground leading-relaxed mt-4">
                {letterParagraphs.map((paragraph, index) => (
                  <p
                    key={`paragraph-${index}`}
                    className={`transition-all duration-700 ${
                      index === 0
                        ? "font-serif text-2xl text-primary"
                        : ""
                    } ${
                      revealedParagraphs.has(index)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}

                <p
                  className={`font-serif text-xl text-primary pt-4 transition-all duration-700 ${
                    revealedParagraphs.has(letterParagraphs.length - 1)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${letterParagraphs.length * 400}ms` }}
                >
                  {"รักเธอเสมอ,"}
                  <br />
                  <span className="text-foreground text-lg">
                    {"จากคนที่รักเธอที่สุด"}
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
