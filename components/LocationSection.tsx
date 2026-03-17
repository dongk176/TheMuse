import { KakaoMapPanel } from "@/components/KakaoMapPanel";

export function LocationSection() {
  return (
    <section className="content-section location-section" id="location">
      <div className="container">
        <div className="location-card">
          <div className="location-copy">
            <h2>찾아오시는 길</h2>

            <div className="location-list">
              <div className="location-item">
                <div className="location-icon">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <strong>주소</strong>
                  <p>서울 마포구 성지3길 19 지하1층</p>
                </div>
              </div>

              <div className="location-item">
                <div className="location-icon">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <strong>연락처</strong>
                  <p>010-5658-9984 | drum_92@naver.com</p>
                </div>
              </div>

              <div className="location-item">
                <div className="location-icon">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <strong>운영시간</strong>
                  <p>24시간 영업 · 연중무휴</p>
                </div>
              </div>
            </div>

            <div className="social-row">
              <a
                className="social-button"
                href="https://www.instagram.com/themuse_drumstudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인스타그램"
              >
                <img
                  src="/sns%20icons/instagram.png"
                  alt="인스타그램 아이콘"
                />
              </a>
              <a
                className="social-button"
                href="https://blog.naver.com/drum_92"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="네이버"
              >
                <img
                  src="/sns%20icons/naver.png"
                  alt="네이버 아이콘"
                />
              </a>
            </div>
          </div>

          <KakaoMapPanel address="서울 마포구 성지3길 19 지하1층" />
        </div>
      </div>
    </section>
  );
}
