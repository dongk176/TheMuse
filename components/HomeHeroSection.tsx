"use client";

import Link from "next/link";
import { useInquiryModal } from "./PageShell";
import { RESERVATION_URL } from "./constants";

export function HomeHeroSection() {
  const { openInquiry } = useInquiryModal();

  return (
    <section className="hero-section">
      <div className="hero-media">
        <div className="hero-overlay"></div>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQmeT9uXHrCfAWHBKXIkrbNceUnHQVm9GxQUFJTYnMghhUcUKznBOv3UQ5WxSMYpj8LaV0RQAcBgk4xP64T1oFKvBU3frACW5nbI3avgDEK13z8vXR3iDVYFR7WElkoYCjiGxfI4rwaLX_-uHi-7LMuMY7ZutnZG-dt_S2Juft43_VZWkEmkgHqzcpXAoX7_1qqoy_s5GqOXML6dLxMAjc2Teh0k91B31_V1DE_2z2420GFU6-R4Zjs-Z5ax-x-fnFkXRRDB1czoXN"
          alt="밝고 넓은 드럼 스튜디오 내부"
        />
      </div>

      <div className="container hero-content">
        <h1>
          The Muse
          <br />
          <span>Drum Studio</span>
        </h1>
        <div className="hero-actions">
          <a
            className="pill-button accent desktop-only-link"
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            지금 예약하기
          </a>
          <button type="button" className="pill-button accent mobile-only-link" onClick={openInquiry}>
            지금 문의하기
          </button>
          <Link className="pill-button ghost desktop-only-link" href="/gallery">
            스튜디오 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
