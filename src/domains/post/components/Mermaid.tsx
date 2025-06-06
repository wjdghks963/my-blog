"use client";

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

type Props = {
  chart: string;
};

// mermaid.js가 렌더링할 때 고유 ID가 필요합니다.
// 차트 내용이 바뀔 때마다 ID도 새로 생성하여 리렌더링을 보장합니다.
const generateId = () => `mermaid-chart-${Math.random().toString(36).substring(2, 9)}`;

export const Mermaid = ({ chart }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartId = useRef(generateId());

  useEffect(() => {
    // 컴포넌트가 마운트될 때 mermaid를 초기화합니다.
    // 테마는 기본값, 보안 수준은 'loose'로 설정하여 대부분의 차트가 문제 없이 렌더링되도록 합니다.
    mermaid.initialize({
      startOnLoad: false, // 페이지 로드 시 자동 렌더링 방지
      theme: "default",
      securityLevel: "loose",
    });

    // 컨테이너가 있고, 차트 내용이 비어있지 않다면 렌더링을 시도합니다.
    if (containerRef.current && chart) {
      // mermaid.render를 사용하여 SVG 코드를 생성합니다.
      mermaid
        .render(chartId.current, chart)
        .then(({ svg }) => {
          // 성공적으로 SVG가 생성되면 컨테이너의 내용을 SVG로 교체합니다.
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((error) => {
          // 렌더링 중 오류 발생 시 콘솔에 로그를 남기고,
          // 사용자에게는 원본 머메이드 코드를 보여주어 디버깅을 돕습니다.
          console.error(`Mermaid render error for chart:\n${chart}`, error);
        });
    }
  }, [chart]);

  // key prop에 chartId.current를 주어 차트 내용이 바뀔 때마다
  // React가 이 컴포넌트를 완전히 새로운 것으로 인식하고 재생성하도록 합니다.
  // 이는 mermaid의 내부 상태 문제를 방지하는 데 도움이 됩니다.
  return (
    <div
      key={chartId.current}
      ref={containerRef}
      className="mermaid-container my-6 flex justify-center rounded-lg bg-white p-4"
    />
  );
};
