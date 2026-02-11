import { LoveCounter } from "@/components/love-counter"
import { PageWrapper } from "@/components/page-wrapper"

export const metadata = {
  title: "ส่งความรักให้เธอ | Valentine's Day",
}

export default function LovePage() {
  return (
    <PageWrapper>
      <LoveCounter />
    </PageWrapper>
  )
}
