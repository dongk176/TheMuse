import Link from "next/link";
import { NAV_ITEMS, type NavKey } from "./constants";

export function SiteHeader({ active, onInquiryClick }: { active: NavKey; onInquiryClick: () => void }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/home" aria-label="TheMuse 홈으로 이동">
          <span className="brand-text">THE MUSE</span>
        </Link>

        <nav className="site-nav" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} href={item.href} className={item.key === active ? "active" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button type="button" className="pill-button primary compact" onClick={onInquiryClick}>
          문의하기
        </button>
      </div>
    </header>
  );
}
