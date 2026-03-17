import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE MUSE Drum Studio",
  description: "THE MUSE 드럼 스튜디오",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
