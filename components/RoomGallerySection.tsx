"use client";

import { useEffect, useRef, useState } from "react";
import { RESERVATION_URL } from "./constants";

type RoomImage = {
  src: string;
  alt: string;
};

type Room = {
  name: string;
  subtitle: string;
  images: RoomImage[];
  detailLines: string[];
  features?: string[];
  note?: string;
};

const rooms: Room[] = [
  {
    name: "A room",
    subtitle: "고정예약 전용 (레슨, 정기 이용자)",
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqzpuEQ2uG0YsttWk6ixb4PnAvvQRxM-JBf1M28dVJl0icj_-db-VCZRkP98qKx7Q7b-aiSqXv9Nzk-XpooFx6TY_Loba6lHGp99lJtUbPYYJKGBrYqRoQF2ivMsTQaT0cglfTSd9ei5qjLTqcN887fShdW6nUKzgkXm2tGEeU7aI5VyEP3c9uEEcmNV5MlOsRP-d5IHbUAuuCk_la3aLWngGTfmFirqrZ4tQBWrpCmDS1ko3B1MK2FH3xX5lqNE6UQVbL5DyIKqH6",
        alt: "A룸 드럼 연습실",
      },
    ],
    detailLines: [
      "레슨 및 월정액 이용자를 위한 고정예약 전용 드럼 연습실입니다.",
      "안정적인 레슨 진행과 정기 이용 고객의 편의를 위해 운영되는 공간입니다.",
    ],
  },
  {
    name: "B room",
    subtitle: "현장 카드 결제 가능",
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7k1XBj5J9FZKF0JSNLhBKHFKSNvZSdzhWB9o9luVgOZ-KGQqRwHavgO4KU-_JNWehgnaH8vsR-hoPNVlXriOjku4iwVIFytts8JAREqzYbacyJVfvPq0GGJsJCUEpu_YV6oKuX5Mt-ywSjI1jaoGbsm99LlKVLntanON9sqOoUKSu9oF-XCnxsOrsMHoIY--O1TeoIDfKYTaEUN7m5jbuT3VwZzXLaQcQelDgEaWXTNL318Z3yk63lpyVpJ5hOWnc5vXmKCAdk9Aq",
        alt: "B룸 드럼 연습실",
      },
    ],
    detailLines: ["프리미엄 드럼 연습실입니다."],
    features: [
      "Pearl 디케이드 드럼세트",
      "이스탄불 심벌 조합",
      "에어컨 설치",
      "엠프, 연결가능한 젠더",
      "휴대폰 충전기",
      "보면대 비치",
    ],
    note: "※ 드럼스틱은 별도입니다. 개인지참 또는 현장 옵션 대여 가능합니다.",
  },
  {
    name: "C room",
    subtitle: "드럼 연습실 시간제",
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhgjxHnkz5NGOn9hupn1XcIuMy0E3EEMiUZn7unvpQTUq9pkJAkqHJnkrfPo6xoNzdh_SDJv4XcZuJ5AFzM0QsV6I1IrFgwhaQ-cjOuvdoCDK6yaCkhM5CQ9J2WIgC7mg-0hiV9L2sxGEA1ztSXHBwdPNLphcDJH1DBEqTgEbiin7etcssk_0KS6NhP7AcJ2uFCP1TPTOmDvG4I9fQ5Wi8VwHqvaet4s2XPCjGDG0Id5cr8pwfWJgI08M-ZeC7xpoVGrybQkCJnYyy",
        alt: "C룸 드럼 연습실",
      },
    ],
    detailLines: ["프리미엄 드럼 연습실입니다."],
    features: [
      "TAMA 임페리얼 스타 드럼세트",
      "이스탄불 심벌 조합",
      "에어컨 설치",
      "블루투스 모니터 스피커",
      "휴대폰 충전기",
      "보면대 비치",
    ],
    note: "※ 드럼스틱은 별도입니다. 개인지참 또는 현장 옵션 대여 가능합니다.",
  },
  {
    name: "D Room",
    subtitle: "드럼 연습실 시간제",
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7k1XBj5J9FZKF0JSNLhBKHFKSNvZSdzhWB9o9luVgOZ-KGQqRwHavgO4KU-_JNWehgnaH8vsR-hoPNVlXriOjku4iwVIFytts8JAREqzYbacyJVfvPq0GGJsJCUEpu_YV6oKuX5Mt-ywSjI1jaoGbsm99LlKVLntanON9sqOoUKSu9oF-XCnxsOrsMHoIY--O1TeoIDfKYTaEUN7m5jbuT3VwZzXLaQcQelDgEaWXTNL318Z3yk63lpyVpJ5hOWnc5vXmKCAdk9Aq",
        alt: "D룸 드럼 연습실",
      },
    ],
    detailLines: ["프리미엄 드럼 연습실입니다."],
    features: [
      "Gretsch Energy 드럼세트",
      "메이늘 심벌 조합",
      "에어컨 설치",
      "블루투스 모니터 스피커",
      "휴대폰 충전기",
      "보면대 비치",
    ],
    note: "※ 드럼스틱은 별도입니다. 개인지참 또는 현장 옵션 대여 가능합니다.",
  },
];

export function RoomGallerySection({ id }: { id?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ roomIndex: number; imageIndex: number } | null>(null);
  const [mobileSheetRoomIndex, setMobileSheetRoomIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const activeRoom = lightbox ? rooms[lightbox.roomIndex] : null;
  const activeImages = activeRoom?.images ?? [];
  const activeImage = lightbox ? activeImages[lightbox.imageIndex] : null;
  const canSlide = activeImages.length > 1;
  const mobileSheetRoom = mobileSheetRoomIndex !== null ? rooms[mobileSheetRoomIndex] : null;

  const scrollTrack = (direction: "prev" | "next") => {
    if (!trackRef.current) return;
    const amount = Math.min(trackRef.current.clientWidth * 0.9, 420);
    trackRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const openLightbox = (roomIndex: number, imageIndex = 0) => {
    setLightbox({ roomIndex, imageIndex });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const moveLightbox = (direction: "prev" | "next") => {
    if (!lightbox) return;
    const total = rooms[lightbox.roomIndex].images.length;
    if (total < 2) return;
    setLightbox((prev) => {
      if (!prev) return prev;
      const nextIndex =
        direction === "next"
          ? (prev.imageIndex + 1) % total
          : (prev.imageIndex - 1 + total) % total;
      return { ...prev, imageIndex: nextIndex };
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 820px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    updateMobile();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMobile);
      return () => mediaQuery.removeEventListener("change", updateMobile);
    }
    mediaQuery.addListener(updateMobile);
    return () => mediaQuery.removeListener(updateMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMobileSheetRoomIndex(null);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        setMobileSheetRoomIndex(null);
      }
      if (!lightbox) return;
      if (event.key === "Escape") {
        return;
      }
      if (event.key === "ArrowLeft") {
        moveLightbox("prev");
      }
      if (event.key === "ArrowRight") {
        moveLightbox("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <section className="content-section gallery-section" id={id}>
      <div className="container">
        <div className="section-head between">
          <div>
            <h2>연습실</h2>
          </div>
          <div className="gallery-controls">
            <button className="icon-button" type="button" onClick={() => scrollTrack("prev")} aria-label="이전 연습실 보기">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="icon-button" type="button" onClick={() => scrollTrack("next")} aria-label="다음 연습실 보기">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="gallery-track" ref={trackRef}>
          {rooms.map((room, roomIndex) => (
            <article className="studio-card" key={room.name}>
              <button className="card-media" type="button" onClick={() => openLightbox(roomIndex, 0)} aria-label={`${room.name} 사진 크게 보기`}>
                <img src={room.images[0].src} alt={room.images[0].alt} />
              </button>
              {isMobile ? (
                <>
                  <button
                    className="room-mobile-trigger"
                    type="button"
                    onClick={() => setMobileSheetRoomIndex(roomIndex)}
                    aria-label={`${room.name} 세부 정보 보기`}
                  >
                    <div className="room-mobile-head">
                      <h3>{room.name}</h3>
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                    <p className="room-subtitle-text">{room.subtitle}</p>
                    <div className="card-meta">
                      <span>
                        2,500~3,500
                        <span className="price-unit">원</span>
                      </span>
                    </div>
                  </button>
                  <a className="room-book-button mobile" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">
                    예약하기
                  </a>
                </>
              ) : (
                <>
                  <h3>{room.name}</h3>
                  <details className="room-accordion">
                    <summary>
                      <span className="room-subtitle-text">{room.subtitle}</span>
                      <span className="material-symbols-outlined room-accordion-icon">expand_more</span>
                    </summary>
                    <div className="room-accordion-content">
                      {room.detailLines.map((line) => (
                        <p key={`${room.name}-${line}`}>{line}</p>
                      ))}
                      {room.features ? (
                        <ul className="room-feature-list">
                          {room.features.map((feature) => (
                            <li key={`${room.name}-${feature}`}>{feature}</li>
                          ))}
                        </ul>
                      ) : null}
                      {room.note ? <p className="room-note">{room.note}</p> : null}
                    </div>
                  </details>
                  <div className="studio-card-bottom">
                    <div className="card-meta">
                      <span>
                        2,500~3,500
                        <span className="price-unit">원</span>
                      </span>
                    </div>
                    <a className="room-book-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">
                      예약하기
                    </a>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>

      {lightbox && activeRoom && activeImage ? (
        <div className="room-lightbox" role="dialog" aria-modal="true" aria-label={`${activeRoom.name} 이미지 상세`} onClick={closeLightbox}>
          <div className="room-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button className="room-lightbox-close" type="button" onClick={closeLightbox} aria-label="닫기">
              <span className="material-symbols-outlined">close</span>
            </button>

            {canSlide ? (
              <button
                className="room-lightbox-nav prev"
                type="button"
                onClick={() => moveLightbox("prev")}
                aria-label="이전 사진"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            ) : null}

            <img className="room-lightbox-image" src={activeImage.src} alt={activeImage.alt} />

            {canSlide ? (
              <button
                className="room-lightbox-nav next"
                type="button"
                onClick={() => moveLightbox("next")}
                aria-label="다음 사진"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            ) : null}

            <div className="room-lightbox-counter">
              {lightbox.imageIndex + 1} / {activeImages.length}
            </div>
          </div>
        </div>
      ) : null}

      {isMobile && mobileSheetRoom ? (
        <div className="room-sheet-backdrop" role="dialog" aria-modal="true" aria-label={`${mobileSheetRoom.name} 세부 정보`} onClick={() => setMobileSheetRoomIndex(null)}>
          <div className="room-sheet" onClick={(event) => event.stopPropagation()}>
            <button className="room-sheet-close" type="button" aria-label="닫기" onClick={() => setMobileSheetRoomIndex(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3>{mobileSheetRoom.name}</h3>
            <p className="room-subtitle-text">{mobileSheetRoom.subtitle}</p>

            <div className="room-accordion-content">
              {mobileSheetRoom.detailLines.map((line) => (
                <p key={`${mobileSheetRoom.name}-sheet-${line}`}>{line}</p>
              ))}
              {mobileSheetRoom.features ? (
                <ul className="room-feature-list">
                  {mobileSheetRoom.features.map((feature) => (
                    <li key={`${mobileSheetRoom.name}-sheet-${feature}`}>{feature}</li>
                  ))}
                </ul>
              ) : null}
              {mobileSheetRoom.note ? <p className="room-note">{mobileSheetRoom.note}</p> : null}
            </div>

            <div className="room-sheet-bottom">
              <div className="card-meta">
                <span>
                  2,500~3,500
                  <span className="price-unit">원</span>
                </span>
              </div>
              <a className="room-book-button" href={RESERVATION_URL} target="_blank" rel="noopener noreferrer">
                예약하기
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
