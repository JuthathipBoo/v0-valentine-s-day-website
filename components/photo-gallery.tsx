"use client"

import React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { Camera, ChevronLeft, ChevronRight, Heart, X } from "lucide-react"
import Image from "next/image"

const photos = [
  { src: "/gallery/memory-1.jpg", caption: "เดินด้วยกันในทุก ๆ ทาง" },
  { src: "/gallery/memory-2.jpg", caption: "คืนที่เงียบสงบ มีแค่เราสองคน" },
  { src: "/gallery/memory-3.jpg", caption: "แม้ฝนจะตก เรายังมีกัน" },
  { src: "/gallery/memory-4.jpg", caption: "พระอาทิตย์ตกที่สวยที่สุด" },
  { src: "/gallery/memory-5.jpg", caption: "ช่วงเวลาเล็ก ๆ ที่มีค่ามาก" },
  { src: "/gallery/memory-6.jpg", caption: "เต้นรำไปด้วยกันตลอดไป" },
]

export function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const goNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % photos.length)
  }, [selectedIndex])

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
  }, [selectedIndex])

  useEffect(() => {
    if (selectedIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null)
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedIndex, goNext, goPrev])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [selectedIndex])

  return (
    <section id="gallery" ref={ref} className="px-4 py-10 sm:px-6 sm:py-20 max-w-5xl mx-auto">
      <div className="text-center mb-8 sm:mb-16">
        <Camera className="mx-auto text-primary mb-3 sm:mb-4" size={28} />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-2 sm:mb-3 text-balance">
          {"ความทรงจำของเรา"}
        </h2>
        <p className="text-muted-foreground font-sans text-xs sm:text-sm">
          {"กดที่รูปเพื่อดูเต็ม ๆ"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-xl active:scale-[0.97] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.caption}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />

            {/* Caption -- always visible on mobile, hover on desktop */}
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-foreground/60 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-primary-foreground font-sans text-[10px] sm:text-xs md:text-sm text-left leading-tight">
                {photo.caption}
              </p>
            </div>

            {/* Like button -- always visible on mobile */}
            <button
              type="button"
              onClick={(e) => toggleLike(index, e)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={liked.has(index) ? "เอาหัวใจออก" : "กดหัวใจ"}
            >
              <Heart
                size={14}
                className={liked.has(index) ? "text-primary" : "text-muted-foreground"}
                fill={liked.has(index) ? "hsl(346, 60%, 55%)" : "none"}
              />
            </button>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/90 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="ดูรูปภาพ"
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors z-10"
            aria-label="ปิด"
          >
            <X size={18} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors z-10"
            aria-label="รูปก่อนหน้า"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors z-10"
            aria-label="รูปถัดไป"
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="relative w-full max-w-3xl aspect-[3/4] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedIndex].src || "/placeholder.svg"}
              alt={photos[selectedIndex].caption}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-foreground/70 to-transparent">
              <div className="flex items-center justify-between gap-2">
                <p className="text-primary-foreground font-sans text-sm sm:text-base md:text-lg leading-snug">
                  {photos[selectedIndex].caption}
                </p>
                <button
                  type="button"
                  onClick={(e) => toggleLike(selectedIndex, e)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shrink-0"
                  aria-label="กดหัวใจ"
                >
                  <Heart
                    size={18}
                    className={liked.has(selectedIndex) ? "text-primary" : "text-primary-foreground"}
                    fill={liked.has(selectedIndex) ? "hsl(346, 60%, 55%)" : "none"}
                  />
                </button>
              </div>
              <p className="text-primary-foreground/60 font-sans text-xs sm:text-sm mt-1">
                {selectedIndex + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
