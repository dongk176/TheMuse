export function ReviewsSection() {
  return (
    <section className="content-section reviews-section" id="reviews">
      <div className="container">
        <div className="lesson-pricing-head">
          <h3>실제 수강생 후기</h3>
        </div>

        <div className="review-grid">
          <article className="review-card">
            <div className="review-media">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV79tV44L7DITqf4qdrHdc3cq93U6oSOz7u8y4epx-3uGOhULWz1BPsz43q-9zwM-8DwRfYdh-o4K7AS38E-D_EmrrVTI8U0CNVUBe-SkwJYHYC0y82QhcmzEFLJMGnh9cXvHqFEIMHxfKIC7o3Wv8gIjwYlGzXHD9hf_1JOA7wvDGAONbc74LKzUk4JwA-iyAdTgEHoUTWo_P3CgyHOQ0QnkMWZMx28_WUwb10sc8osmNaLTB_H2FtkUbxemqlc7L0U3Fv3M-k04U"
                alt="드럼을 연습하는 수강생"
              />
            </div>
            <div className="review-body">
              <div className="stars" aria-label="별점 5점">
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
              </div>
              <p>"드럼을 처음 시작했는데 너무 친절하게 알려주셔서 즐겁게 배우고 있습니다. 분위기가 정말 힙해요!"</p>
              <div className="reviewer">
                <div className="reviewer-badge primary-badge">SK</div>
                <div>
                  <strong>서강준</strong>
                  <span>수강 6개월차</span>
                </div>
              </div>
            </div>
          </article>

          <article className="review-card">
            <div className="review-media">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXHjc7ccM23G0uKqUM_x5FdibMVWSDCtOJ2GUOEkdlB2or0POQA8-TZAmlXiuHVfVpHXvz_HlxIhvL1_Vmk7zumuneAuFQuuBO3YQ2ZPCUE38fMGRfdN_g7-zFUGdozQ0_xo1kcTf6Wps7wArzlyXwi4X2U85LmBCOIbrWCgQ3YbZpjsvb_QHFf2BJoMrWSaaf8QB4Ynd4tNnMiek0KTpH-9BoPJkqvoQtwtiYNg_UMo4jufjUhhVhKoAXmNyO_9gg2KXOhpdH7rqT"
                alt="쾌적한 음악 스튜디오 내부"
              />
            </div>
            <div className="review-body">
              <div className="stars" aria-label="별점 5점">
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
              </div>
              <p>"연습실 시설이 역대급이에요. 깔끔하고 쾌적해서 매일 오고 싶어집니다. 녹음 장비도 최고!"</p>
              <div className="reviewer">
                <div className="reviewer-badge accent-badge">ML</div>
                <div>
                  <strong>이미래</strong>
                  <span>입시 준비생</span>
                </div>
              </div>
            </div>
          </article>

          <article className="review-card">
            <div className="review-media">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuk8rFzaLzqMZWsgHSA32FEiM72gn5kdQr8PdLp3Ebow8hOMBFs2flyDB4yckiRNJjUHD0AV0pwR-_4oxk5sezALhBeYQiDRcXEc1o2j1zeiZQl2jI7D01hFwQUpHbxEcxcjHLSkmdxCcAjWcaKXgqgGrbVU9GZxobSEOAmz4ImL7am0Sb6Duh3IDuCY6wlIFh2nOc3K0aGd2eiW35UROOVyDwpwXHQ_dwHJekIvoSivaVXiJOdSROXp6J0w192LxaWm_5R7nW6KVW"
                alt="드럼 스틱과 드럼 세트"
              />
            </div>
            <div className="review-body">
              <div className="stars" aria-label="별점 4점">
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined filled">star</span>
                <span className="material-symbols-outlined">star</span>
              </div>
              <p>"퇴근 후 힐링 루틴입니다. 선생님 실력은 말할 것도 없고 커뮤니티가 활발해서 너무 즐거워요."</p>
              <div className="reviewer">
                <div className="reviewer-badge dark-badge">PH</div>
                <div>
                  <strong>박현우</strong>
                  <span>취미반</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
