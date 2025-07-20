import { useEffect, useState } from "react";

export default function useVisibleScrollY(): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 브라우저 환경 체크
    if (typeof window === "undefined") return;

    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // 페이지 상단 100px 이내에서는 항상 보이게 함
      if (currentScrollPos <= 100) {
        setIsVisible(true);
        prevScrollPos = currentScrollPos;
        return;
      }

      // 스크롤 방향에 따른 가시성 제어
      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true); // 스크롤이 위로 올라갈 때 보이도록 설정
      } else {
        // 아래로 스크롤할 때만 숨김 (상단 100px 이후에만)
        setIsVisible(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
}
