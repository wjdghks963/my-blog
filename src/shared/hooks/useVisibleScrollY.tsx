import { useEffect, useState } from "react";

export default function useVisibleScrollY(): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 브라우저 환경 체크
    if (typeof window === "undefined") return;

    let prevScrollPos = window.scrollY;
    const minDelta = 10;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const diff = currentScrollPos - prevScrollPos;

      // 페이지 상단 100px 이내에서는 항상 보이게 함
      if (currentScrollPos <= 100) {
        setIsVisible(true);
        prevScrollPos = currentScrollPos;
        return;
      }

      if (Math.abs(diff) < minDelta) {
        return;
      }

      // 스크롤을 조금이라도 올리면 보이고, 내리면 숨김
      setIsVisible(diff < 0);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
}
