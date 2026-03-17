import { HomeHeroSection } from "@/components/HomeHeroSection";
import { InstructorSection } from "@/components/InstructorSection";
import { LessonPricingSection } from "@/components/LessonPricingSection";
import { LocationSection } from "@/components/LocationSection";
import { PageShell } from "@/components/PageShell";
import { ReviewsSection } from "@/components/ReviewsSection";
import { RoomGallerySection } from "@/components/RoomGallerySection";

export default function HomePage() {
  return (
    <PageShell active="home">
      <HomeHeroSection />

      <RoomGallerySection id="gallery" />
      <InstructorSection />
      <LessonPricingSection />
      <ReviewsSection />
      <LocationSection />
    </PageShell>
  );
}
