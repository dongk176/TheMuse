"use client";

import { useState } from "react";
import { InquiryModal } from "./InquiryModal";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import type { NavKey } from "./constants";

export function PageShell({ active, children }: { active: NavKey; children: React.ReactNode }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="page-shell">
      <SiteHeader active={active} onInquiryClick={() => setIsInquiryOpen(true)} />
      <main>{children}</main>
      <SiteFooter />
      <InquiryModal open={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
