import { FloatingHearts } from "@/components/floating-hearts"
import { HeroSection } from "@/components/hero-section"
import { LoveLetter } from "@/components/love-letter"
import { PhotoGallery } from "@/components/photo-gallery"
import { ReasonsSection } from "@/components/reasons-section"
import { ScratchCard } from "@/components/scratch-card"
import { LoveQuiz } from "@/components/love-quiz"
import { TimelineSection } from "@/components/timeline-section"
import { LoveCounter } from "@/components/love-counter"
import { PromiseSection } from "@/components/promise-section"
import { ValentineFooter } from "@/components/valentine-footer"

export default function Page() {
  return (
    <main className="relative">
      <FloatingHearts />
      <HeroSection />
      <div className="relative z-10">
        <LoveLetter />
        <PhotoGallery />
        <ReasonsSection />
        <ScratchCard />
        <LoveQuiz />
        <TimelineSection />
        <LoveCounter />
        <PromiseSection />
        <ValentineFooter />
      </div>
    </main>
  )
}
