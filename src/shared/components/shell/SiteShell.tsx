import SiteFooter from "@shared/components/shell/SiteFooter";
import SiteNav from "@shared/components/shell/SiteNav";
import React from "react";

/**
 * 전역 골격.
 * - lg 이상: 좌측 고정 사이드바 + 본문 컬럼
 * - lg 미만: 상단 바(드로어 메뉴) + 본문
 * 본문 좌우 여백/최대 폭은 각 섹션의 `.shell-x` 가 담당한다.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <SiteNav />
      <div className="site-main">
        <div className="site-content">{children}</div>
        <SiteFooter />
      </div>
    </div>
  );
}
