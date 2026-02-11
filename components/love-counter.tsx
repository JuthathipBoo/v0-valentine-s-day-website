"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
}

const colors = [
  "hsl(346, 60%, 55%)",
  "hsl(346, 60%, 70%)",
  "hsl(25, 50%, 75%)",
  "hsl(0, 50%, 70%)",
  "hsl(346, 40%, 80%)",
]

export function LoveCounter() {
  const [count, setCount] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [scale, setScale] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  const handleClick = () => {
    setCount((c) => c + 1)
    setScale(1.3)
    setTimeout(() => setScale(1), 200)

    // Burst particles
    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5
      return {
        id: Date.now() + i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * (60 + Math.random() * 40),
        vy: Math.sin(angle) * (60 + Math.random() * 40),
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      }
    })
    setParticles((prev) => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)))
    }, 800)
  }

  const getMessage = () => {
    if (count === 0) return "กดหัวใจเพื่อส่งความรักให้เธอ"
    if (count < 10) return "ส่งความรักต่อไปเลย!"
    if (count < 50) return "เธอรู้ไหมว่าฉันรักเธอมาก!"
    if (count < 100) return "หัวใจของฉันเต้นเพื่อเธอคนเดียว!"
    return "ฉันจะรักเธอตลอดไป ไม่มีวันหยุด!"
  }

  return (
    <section ref={ref} className="px-6 py-20 text-center">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3 text-balance">
          {"ส่งความรักให้เธอ"}
        </h2>
        <p className="text-muted-foreground font-sans text-sm mb-10">
          {"กดหัวใจกี่ครั้งก็ได้ ทุกครั้งคือความรักจากฉัน"}
        </p>

        <div className="relative inline-block">
          {/* Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: p.color,
                transform: `translate(${p.vx}px, ${p.vy}px) rotate(${p.rotation}deg)`,
                transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out",
                opacity: 0,
              }}
            />
          ))}

          <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors active:bg-primary/30"
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            aria-label="ส่งความรัก"
          >
            <Heart
              size={64}
              className="text-primary"
              fill="hsl(346, 60%, 55%)"
            />
          </button>
        </div>

        <div className="mt-8">
          <p className="font-serif text-5xl md:text-6xl text-primary mb-2">{count}</p>
          <p className="text-muted-foreground font-sans text-sm">{getMessage()}</p>
        </div>
      </div>
    </section>
  )
}
