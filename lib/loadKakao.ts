let kakaoReady: Promise<any> | null = null;

export function loadKakao(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR"));
  }

  const w = window as any;
  if (w.kakao?.maps) {
    return Promise.resolve(w.kakao);
  }

  if (!kakaoReady) {
    kakaoReady = new Promise((resolve, reject) => {
      const appkey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
      if (!appkey) {
        reject(new Error("Missing NEXT_PUBLIC_KAKAO_MAP_KEY"));
        return;
      }

      const scriptId = "kakao-maps-sdk";
      const existing = document.getElementById(scriptId);
      if (existing) {
        w.kakao.maps.load(() => resolve(w.kakao));
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appkey)}&autoload=false&libraries=services`;
      script.onload = () => w.kakao.maps.load(() => resolve(w.kakao));
      script.onerror = () => reject(new Error("Kakao SDK load failed"));
      document.head.appendChild(script);
    });
  }

  return kakaoReady;
}
