import { PageShell } from "@/components/PageShell";
import { RoomGallerySection } from "@/components/RoomGallerySection";

export default function RoomsPage() {
  return (
    <PageShell active="rooms">
      <RoomGallerySection />
    </PageShell>
  );
}
