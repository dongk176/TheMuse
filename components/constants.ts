export type NavKey = "home" | "rooms" | "instructor" | "reviews" | "gallery";
export type NavItemKey = NavKey | "lessonPricing";

export const NAV_ITEMS: Array<{ key: NavItemKey; label: string; href: string }> = [
  { key: "home", label: "홈", href: "/home" },
  { key: "instructor", label: "강사", href: "/instructor" },
  { key: "lessonPricing", label: "레슨 가격표", href: "/home#lesson-pricing" },
  { key: "reviews", label: "후기", href: "/reviews" },
  { key: "gallery", label: "갤러리", href: "/gallery" },
];

export const RESERVATION_URL =
  "https://map.naver.com/p/entry/place/1610078807?c=15.00,0,0,0,dh&placePath=/ticket?entry=ple&fromPanelNum=1&additionalHeight=76&timestamp=202603171007&locale=ko&svcName=map_pcv5&from=map";
