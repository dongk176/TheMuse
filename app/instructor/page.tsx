import { InstructorDetailSection } from "@/components/InstructorDetailSection";
import { InstructorGalleryCtaSection } from "@/components/InstructorGalleryCtaSection";
import { InstructorSection } from "@/components/InstructorSection";
import { PageShell } from "@/components/PageShell";

export default function InstructorPage() {
  return (
    <PageShell active="instructor">
      <InstructorSection />
      <InstructorDetailSection />
      <InstructorGalleryCtaSection />
    </PageShell>
  );
}
