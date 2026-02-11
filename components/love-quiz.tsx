"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, MessageCircleHeart, RotateCcw } from "lucide-react"

const questions = [
  {
    question: "สิ่งที่ฉันชอบที่สุดเกี่ยวกับเธอคืออะไร?",
    options: ["รอยยิ้ม", "เสียงหัวเราะ", "ความใจดี", "ทุกอย่าง"],
    answer: 3,
  },
  {
    question: "ฉันอยากไปเที่ยวกับเธอที่ไหนมากที่สุด?",
    options: ["ทะเล", "ภูเขา", "ต่างประเทศ", "ที่ไหนก็ได้ถ้ามีเธอ"],
    answer: 3,
  },
  {
    question: "ฉันจะรักเธอนานแค่ไหน?",
    options: ["1 ปี", "10 ปี", "100 ปี", "ตลอดไป"],
    answer: 3,
  },
  {
    question: "อะไรคือเหตุผลที่ฉันรักเธอ?",
    options: ["หน้าตา", "นิสัย", "ความเก่ง", "ไม่ต้องมีเหตุผล"],
    answer: 3,
  },
]

export function LoveQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([])
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

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return
    setSelected(optionIndex)

    const isCorrect = optionIndex === questions[currentQ].answer
    if (isCorrect) {
      setScore((s) => s + 1)
      // Spawn confetti
      const newConfetti = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ["hsl(346,60%,55%)", "hsl(25,50%,75%)", "hsl(0,50%,70%)", "hsl(346,60%,75%)"][
          Math.floor(Math.random() * 4)
        ],
      }))
      setConfetti(newConfetti)
      setTimeout(() => setConfetti([]), 1500)
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1)
        setSelected(null)
      } else {
        setShowResult(true)
      }
    }, 1200)
  }

  const reset = () => {
    setCurrentQ(0)
    setScore(0)
    setSelected(null)
    setShowResult(false)
  }

  const q = questions[currentQ]

  return (
    <section id="quiz" ref={ref} className="px-6 py-20 max-w-lg mx-auto">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-center mb-10">
          <MessageCircleHeart className="mx-auto text-primary mb-4" size={32} />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3 text-balance">
            {"เธอรู้จักฉันดีแค่ไหน?"}
          </h2>
          <p className="text-muted-foreground font-sans text-sm">
            {"ลองตอบคำถามเหล่านี้ดูสิ"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
          {/* Mini confetti */}
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute w-2 h-2 rounded-full animate-fade-in-up pointer-events-none"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                backgroundColor: c.color,
                animationDuration: "0.8s",
              }}
            />
          ))}

          {!showResult ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-6">
                {questions.map((_, i) => (
                  <div
                    key={`progress-${i}`}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      i <= currentQ ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground font-sans text-xs mb-2">
                {"คำถามที่"} {currentQ + 1} / {questions.length}
              </p>

              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-6">
                {q.question}
              </h3>

              <div className="flex flex-col gap-3">
                {q.options.map((option, i) => {
                  const isAnswer = i === q.answer
                  const isSelected = i === selected
                  let optionStyle = "bg-secondary text-secondary-foreground hover:bg-primary/10"

                  if (selected !== null) {
                    if (isAnswer) {
                      optionStyle = "bg-primary text-primary-foreground"
                    } else if (isSelected && !isAnswer) {
                      optionStyle = "bg-muted text-muted-foreground"
                    } else {
                      optionStyle = "bg-secondary text-secondary-foreground opacity-50"
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full text-left px-5 py-4 rounded-xl font-sans transition-all duration-300 ${optionStyle} ${
                        selected === null ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-background/50 flex items-center justify-center text-xs font-medium shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(4)].map((_, i) => (
                  <Heart
                    key={`result-heart-${i}`}
                    size={28}
                    className="text-primary animate-pulse-soft"
                    fill={i < score ? "hsl(346, 60%, 55%)" : "none"}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                {score === 4 ? "เธอเข้าใจฉันที่สุดเลย!" : score >= 2 ? "เธอรู้จักฉันดีมาก!" : "มาทำความรู้จักกันเพิ่มนะ"}
              </h3>

              <p className="text-muted-foreground font-sans mb-2">
                {"ตอบถูก"} {score} / {questions.length} {"ข้อ"}
              </p>

              <p className="font-sans text-primary text-lg mb-8">
                {score === 4
                  ? "เธอคือคนที่รู้ใจฉันมากที่สุด"
                  : "แต่ไม่ว่ายังไง ฉันก็รักเธอเสมอ"}
              </p>

              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-sans text-sm hover:opacity-90 transition-opacity"
              >
                <RotateCcw size={14} />
                {"เล่นอีกครั้ง"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
