import Link from "next/link";

export function InstructorSection() {
  return (
    <section className="content-section instructor-section">
      <div className="container split-layout">
        <div className="portrait-frame">
          <div className="corner corner-top"></div>
          <div className="corner corner-bottom"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC94PbvRq_AQrHwCcsfuHeAKd5-dXbwEd5zYMKuP2BfBSzgX3PugI4iYPQOacvpryKyCHSfMNcNbRkBQUq2a-5MZ0F8LClS6yDnQwp4XMz1GUEbijQxIcAyJmyW-e5UyF30rWNglglGoAFFI6AKmclg6cWIT1qrB6nwIBrM44n36Yuh-Yz3Crcb2RJfecl-AoRw1lzeld7xqjk-3HwNVCSFmCfNCjr_vrxt3YUtpVqLtmSVvsr87mLg3IXVQ2W-Bm-seW5b4CFF_z6E"
            alt="드럼 스틱을 든 전문 강사"
          />
        </div>

        <div className="copy-block">
          <p className="section-label">대표 강사</p>
          <h2>이윤창</h2>
          <ul className="check-list">
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              동국대학교 문화예술대학원 실용음악과 졸업
            </li>
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              태화강, 부안 재즈 페스티벌 · 파주 포크 페스티벌 등 다수 페스티벌 참가
            </li>
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              일본 오사카 Jazz on Top / MUSIC MK '김순영 재즈탭' 투어 공연 참여
            </li>
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              가수 이치현, 김범룡, 진시몬, 최성수 히트맨 콘서트 드럼 세션
            </li>
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              ('가을 우체국', '이등병의 편지' 작곡가) 김현성 드럼 세션
            </li>
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              김순영 재즈 탭 밴드 드럼 세션
            </li>
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              윤동주 음악극 '별을 스치는 바람' 드럼 세션
            </li>
            <li>
              <span className="check-icon material-symbols-outlined">check</span>
              전태일 음악극 '불꽃' 드럼 세션
            </li>
          </ul>
          <Link className="inline-link desktop-only-link" href="/reviews">
            수강 후기 보러가기
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link className="inline-link mobile-only-link" href="/home#reviews">
            수강 후기 보러가기
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
