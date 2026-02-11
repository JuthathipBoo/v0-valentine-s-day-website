import { PromiseSection } from "@/components/promise-section"
import { ValentineFooter } from "@/components/valentine-footer"
import { PageWrapper } from "@/components/page-wrapper"

export const metadata = {
  title: "สัญญาจากใจ | Valentine's Day",
}

export default function PromisePage() {
  return (
    <PageWrapper>
      <PromiseSection />
      <ValentineFooter />
    </PageWrapper>
  )
}
