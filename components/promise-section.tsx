"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Infinity } from "lucide-react"

export function PromiseSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <div
        className={`max-w-xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <Infinity className="mx-auto text-primary mb-6" size={48} />

        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-8 text-balance">
          {"สัญญาจากใจ"}
        </h2>

        <div className="space-y-6 font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
          <p>{"ฉันสัญญาว่าจะอยู่เคียงข้างเธอ"}</p>
          <p>{"ในวันที่ฟ้าสดใส และในวันที่ฝนตก"}</p>
          <p>{"ในวันที่หัวเราะ และในวันที่น้ำตาไหล"}</p>
          <p>{"ฉันจะเป็นที่พักพิงให้เธอเสมอ"}</p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <Heart size={24} className="text-primary animate-pulse-soft" fill="hsl(346, 60%, 55%)" />
          <span className="font-serif text-2xl md:text-3xl text-primary">
            {"รักเธอตลอดไป"}
          </span>
          <Heart
            size={24}
            className="text-primary animate-pulse-soft"
            fill="hsl(346, 60%, 55%)"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="mt-16 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={`heart-row-${i}`}
              size={14 + i * 4}
              className="text-primary"
              fill="hsl(346, 60%, 55%)"
              style={{ opacity: 0.3 + i * 0.15 }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <Heart
              key={`heart-row-reverse-${i}`}
              size={30 - i * 4}
              className="text-primary"
              fill="hsl(346, 60%, 55%)"
              style={{ opacity: 0.75 - i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
