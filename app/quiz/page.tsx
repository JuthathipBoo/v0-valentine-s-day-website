import { LoveQuiz } from "@/components/love-quiz"
import { PageWrapper } from "@/components/page-wrapper"

export const metadata = {
  title: "เบ๊บๆรู้จักเค้าดีแค่ไหน? | Valentine's Day",
}

export default function QuizPage() {
  return (
    <PageWrapper>
      <LoveQuiz />
    </PageWrapper>
  )
}
