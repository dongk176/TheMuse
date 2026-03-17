"use client";

import { createContext, useContext, useState } from "react";
import { InquiryModal } from "./InquiryModal";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import type { NavKey } from "./constants";

type InquiryModalContextValue = {
  openInquiry: () => void;
};

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

export function useInquiryModal() {
  const context = useContext(InquiryModalContext);
  if (!context) {
    throw new Error("useInquiryModal must be used within PageShell");
  }
  return context;
}

export function PageShell({ active, children }: { active: NavKey; children: React.ReactNode }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const openInquiry = () => setIsInquiryOpen(true);

  return (
    <InquiryModalContext.Provider value={{ openInquiry }}>
      <div className="page-shell">
        <SiteHeader active={active} onInquiryClick={openInquiry} />
        <main>{children}</main>
        <SiteFooter />
        <InquiryModal open={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      </div>
    </InquiryModalContext.Provider>
  );
}
