export function LessonPricingSection() {
  return (
    <section className="content-section pricing-section" id="lesson-pricing">
      <div className="container lesson-pricing">
        <div className="lesson-pricing-head">
          <h3>레슨 가격표</h3>
        </div>

        <div className="lesson-pricing-grid">
          <article className="lesson-price-card">
            <h4>정기 레슨</h4>
            <ul className="lesson-price-list regular-plan-list">
              <li>
                <div>
                  <span>1회당 수업 (기간 무제한)</span>
                  <small>
                    <span className="original-price">50,000원</span> · 할인 없음
                  </small>
                </div>
                <strong>50,000원</strong>
              </li>
              <li>
                <div>
                  <span>1개월 (총 4회 수업)</span>
                  <small>
                    <span className="original-price">200,000원</span> · 50,000원 할인
                  </small>
                </div>
                <strong>150,000원</strong>
              </li>
              <li>
                <div>
                  <span>3개월 (총 12회 수업)</span>
                  <small>
                    <span className="original-price">600,000원</span> · 200,000원 할인
                  </small>
                </div>
                <strong>400,000원</strong>
              </li>
              <li>
                <div>
                  <span>6개월 (총 24회 수업)</span>
                  <small>
                    <span className="original-price">1,200,000원</span> · 400,000원 할인
                  </small>
                </div>
                <strong>800,000원</strong>
              </li>
              <li>
                <div>
                  <span>12개월 (총 48회 수업)</span>
                  <small>
                    <span className="original-price">2,400,000원</span> · 900,000원 할인
                  </small>
                </div>
                <strong>1,500,000원</strong>
              </li>
            </ul>
          </article>

          <article className="lesson-price-card">
            <h4>일반 클래스</h4>
            <ul className="lesson-price-list">
              <li>
                <span>1:1 클래스 (60분)</span>
                <strong>30,000원</strong>
              </li>
              <li>
                <span>2:1 클래스 (60분)</span>
                <strong>50,000원</strong>
              </li>
              <li>
                <span>3인 이상 클래스 (60분)</span>
                <strong>1인당 20,000원</strong>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
