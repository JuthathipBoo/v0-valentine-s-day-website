import { FloatingHearts } from "@/components/floating-hearts"
import { HeroSection } from "@/components/hero-section"
import { LoveLetter } from "@/components/love-letter"
import { ReasonsSection } from "@/components/reasons-section"
import { TimelineSection } from "@/components/timeline-section"
import { PromiseSection } from "@/components/promise-section"
import { ValentineFooter } from "@/components/valentine-footer"

export default function Page() {
  return (
    <main className="relative">
      <FloatingHearts />
      <HeroSection />
      <div className="relative z-10">
        <LoveLetter />
        <ReasonsSection />
        <TimelineSection />
        <PromiseSection />
        <ValentineFooter />
      </div>
    </main>
  )
}
