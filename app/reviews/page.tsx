import { PageShell } from "@/components/PageShell";
import { ReviewsSection } from "@/components/ReviewsSection";

export default function ReviewsPage() {
  return (
    <PageShell active="reviews">
      <ReviewsSection />
    </PageShell>
  );
}
