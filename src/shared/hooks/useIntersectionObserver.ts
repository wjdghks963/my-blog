import { useEffect, useRef, useCallback } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  /** IntersectionObserver 콜백 호출을 제어합니다. true이면 onIntersect가 호출되지 않습니다. */
  disabled?: boolean;
}

export function useIntersectionObserver({
  onIntersect,
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  disabled = false,
}: UseIntersectionObserverProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  // onIntersect 콜백이 부모에서 memoize되지 않은 경우 불필요한 재실행을 방지하기 위해 ref를 사용합니다.
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  const targetRef = useCallback(
    (node: HTMLElement | null) => {
      // 브라우저 환경 체크
      if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
        return;
      }

      // 기존 observer 정리
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (node) {
        const observer = new IntersectionObserver(
          (entries) => {
            // disabled 상태가 아닐 때만 onIntersect 콜백 실행
            if (entries[0]?.isIntersecting && !disabled) {
              onIntersectRef.current();
            }
          },
          { root, rootMargin, threshold }
        );
        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [root, rootMargin, threshold, disabled] // disabled를 의존성 배열에 추가
  );

  // 컴포넌트 unmount 시 observer 정리
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return targetRef;
}
