export function InstructorDetailSection() {
  return (
    <section className="content-section instructor-detail-section">
      <div className="container">
        <div className="instructor-detail-grid">
          <div className="instructor-detail-main">
            <div>
              <h3 className="instructor-detail-title">
                <span className="material-symbols-outlined">person</span>
                강사소개
              </h3>
              <div className="instructor-detail-card">
                <p>
                  안녕하세요, 드러머 이윤창입니다. 라이브, 페스티벌, 투어, 음악극 무대까지 폭넓은
                  현장 경험을 바탕으로 수강생 개개인의 목표에 맞는 현실적인 드럼 레슨을 제공합니다.
                </p>
                <p>
                  단순히 연주 기술만 전달하는 수업이 아니라, 리듬을 통해 음악적 표현력과 자신감을 함께
                  키우는 수업을 지향합니다. 처음 시작하는 분도 안정적으로 성장할 수 있게 단계별로 안내합니다.
                </p>
              </div>
            </div>

            <div>
              <h3 className="instructor-detail-title">
                <span className="material-symbols-outlined">school</span>
                경력
              </h3>
              <div className="instructor-exp-grid">
                <article className="instructor-exp-item">
                  <h4>학력</h4>
                  <ul>
                    <li>동국대학교 문화예술대학원 실용음악과 졸업</li>
                  </ul>
                </article>

                <article className="instructor-exp-item">
                  <h4>Major Performances</h4>
                  <ul>
                    <li>태화강 재즈 페스티벌</li>
                    <li>부안 재즈 페스티벌</li>
                    <li>파주 포크 페스티벌 등 다수 참가</li>
                  </ul>
                </article>

                <article className="instructor-exp-item">
                  <h4>Tour & Session</h4>
                  <ul>
                    <li>일본 오사카 Jazz on Top / MUSIC MK 김순영 재즈탭 투어 공연</li>
                    <li>이치현 · 김범룡 · 진시몬 · 최성수 히트맨 콘서트 드럼 세션</li>
                    <li>김현성(가을 우체국, 이등병의 편지 작곡가) 드럼 세션</li>
                  </ul>
                </article>

                <article className="instructor-exp-item">
                  <h4>Stage Works</h4>
                  <ul>
                    <li>김순영 재즈 탭 밴드 드럼 세션</li>
                    <li>윤동주 음악극 &lt;별을 스치는 바람&gt; 드럼 세션</li>
                    <li>전태일 음악극 &lt;불꽃&gt; 드럼 세션</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>

          <aside>
            <h3 className="instructor-detail-title">
              <span className="material-symbols-outlined">timeline</span>
              Timeline (연혁)
            </h3>
            <div className="instructor-timeline">
              <div className="timeline-item active">
                <span className="timeline-dot"></span>
                <div>
                  <strong>현재</strong>
                  <p>THE MUSE 대표 강사</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div>
                  <strong>투어 공연</strong>
                  <p>일본 오사카 Jazz on Top / MUSIC MK 투어 참여</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div>
                  <strong>페스티벌</strong>
                  <p>태화강 · 부안 재즈, 파주 포크 등 다수 무대 참여</p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div>
                  <strong>음악극 / 세션</strong>
                  <p>별을 스치는 바람, 불꽃 및 다수 콘서트 세션 진행</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="instructor-teaching">
          <div className="instructor-teaching-inner">
            <h3>Teaching Style & Recommendation</h3>
            <div className="instructor-style-grid">
              <article>
                <div className="style-icon">
                  <span className="material-symbols-outlined">timer</span>
                </div>
                <h5>기초 리듬 정착</h5>
                <p>첫 수업부터 기본 비트를 안정적으로 잡아드립니다.</p>
              </article>
              <article>
                <div className="style-icon">
                  <span className="material-symbols-outlined">edit_note</span>
                </div>
                <h5>맞춤형 커리큘럼</h5>
                <p>취미, 입시, 실전 무대 목적에 맞춰 수업을 설계합니다.</p>
              </article>
              <article>
                <div className="style-icon">
                  <span className="material-symbols-outlined">video_camera_front</span>
                </div>
                <h5>영상 피드백</h5>
                <p>연주 영상을 기반으로 자세와 타이밍을 정밀 점검합니다.</p>
              </article>
            </div>
            <p className="instructor-teaching-quote">
              "기초부터 실전까지, 오래 연주할 수 있는 리듬 감각을 함께 만듭니다."
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
