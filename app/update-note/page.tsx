import NoteList from "@domains/update-note/components/NoteList";
import NoteLists from "@domains/update-note/components/NoteLists";
import NoteTitle from "@domains/update-note/components/NoteTitle";
import React from "react";

const updateData = [
  {
    year: "2025",
    month: "07",
    items: ["Next13 -> Next15 업그레이드", "메인 페이지 리디자인"],
  },
  {
    year: "2025",
    month: "06",
    items: ["전체 폴더 구조 및 아키텍처 변경", "마크다운 머메이드 추가"],
  },
  {
    year: "2025",
    month: "03",
    items: ["마크다운 파서 스타일링 변경", "About-Me 페이지 리뉴얼"],
  },
  {
    year: "2025",
    month: "01",
    items: [
      "메인 페이지 최근/조회수 포스트 SSR로 변경",
      "LCP 개선: 불필요한 css 제거, tailwind.config.js safelist 수정",
      "react-markdown 버전 업그레이드 및 테이블 스타일 변경",
      "에디터 tags, categories 변경",
    ],
  },
  {
    year: "2024",
    month: "11",
    items: [
      "Post 쿼리(Detail Update) 네이티브 변경",
      "리팩토링 (불필요한 코드 삭제)",
      "메인 페이지 최근/조회수 포스트 CSR로 변경",
      "react-query suspense 옵션 추가",
      "전체적인 디자인 변경",
    ],
  },
  {
    year: "2024",
    month: "09",
    items: [
      "Post 쿼리(View +1 Update) 네이티브 사용해 속도 개선",
      "robots.txt 개선 & sitemap.ts 적용",
      "다크모드 배경색상 및 Post 페이지 css 변경",
      "레거시 코드 정리",
    ],
  },
  {
    year: "2024",
    month: "06",
    items: ["인피니티 스크롤 관련 api, 페이지 개선", "블로그 업데이트 노트 시작"],
  },
  {
    year: "2024",
    month: "03",
    items: ["PlanetScale => Superbase DB 서버 마이그레이션", "프리즈마 클라이언트 버전 업그레이드"],
  },
  {
    year: "2024",
    month: "01",
    items: [
      "폰트 추가",
      "리액트 쿼리 v4 => v5 업그레이드",
      "포스트의 revalidate 시간 연장",
      "리액트 마크다운 warning 고침",
      "인피니티 스크롤 고양이 애니메이션 추가",
    ],
  },
];

export default function UpdateNote() {
  return (
    <main className="min-h-screen pb-12 pt-20">
      <div className="page-shell">
        <section className="surface-card p-6 mobile:p-10">
          <p className="text-brand text-sm font-semibold uppercase tracking-[0.18em]">Timeline</p>
          <h1 className="mt-3 text-4xl font-bold mobile:text-5xl">Update Note</h1>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">
            기능 추가, 성능 개선, 구조 변경 기록을 월 단위로 관리합니다. 사용자 체감 품질에 영향을 주는 변경을 중심으로
            남깁니다.
          </p>
        </section>

        <section className="mt-8 space-y-5">
          {updateData.map((note) => (
            <article
              key={`${note.year}-${note.month}`}
              className="surface-card p-6"
            >
              <NoteTitle
                year={note.year}
                month={note.month}
              />
              <NoteLists>
                {note.items.map((item) => (
                  <NoteList
                    key={item}
                    content={item}
                  />
                ))}
              </NoteLists>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
