import { GalleryGridSection } from "@/components/GalleryGridSection";
import { PageShell } from "@/components/PageShell";

export default function GalleryPage() {
  return (
    <PageShell active="gallery">
      <GalleryGridSection />
    </PageShell>
  );
}
