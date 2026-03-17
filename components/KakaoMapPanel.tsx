"use client";

import { useEffect, useRef, useState } from "react";
import { loadKakao } from "@/lib/loadKakao";

const DEFAULT_LAT = 37.5563;
const DEFAULT_LNG = 126.9217;

type KakaoMapPanelProps = {
  address: string;
};

export function KakaoMapPanel({ address }: KakaoMapPanelProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const kakao = await loadKakao();
        if (!alive || !mapRef.current) {
          return;
        }

        const defaultCenter = new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG);
        const map = new kakao.maps.Map(mapRef.current, {
          center: defaultCenter,
          level: 3,
        });

        const marker = new kakao.maps.Marker({
          map,
          position: defaultCenter,
        });

        if (address && kakao.maps.services) {
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result: any[], status: string) => {
            if (!alive || !result?.length || status !== kakao.maps.services.Status.OK) {
              setReady(true);
              return;
            }

            const { x, y } = result[0];
            const center = new kakao.maps.LatLng(Number(y), Number(x));
            map.setCenter(center);
            marker.setPosition(center);
            setReady(true);
          });
          return;
        }

        setReady(true);
      } catch {
        if (alive) {
          setReady(false);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [address]);

  return (
    <div className="map-panel">
      <div ref={mapRef} className="kakao-map-canvas" />
      {!ready && (
        <div className="map-backdrop">
          <span className="material-symbols-outlined">map</span>
          <p>Mapo Seoul</p>
        </div>
      )}
      <div className="map-pin">
        <div className="ping-ring"></div>
        <div className="pin-core">
          <span className="material-symbols-outlined">music_note</span>
        </div>
      </div>
    </div>
  );
}
