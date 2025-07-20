import NoteList from "@domains/update-note/components/NoteList";
import NoteLists from "@domains/update-note/components/NoteLists";
import NoteTitle from "@domains/update-note/components/NoteTitle";
import React from "react";

export default function UpdateNote() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background with Organic Blobs */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"></div>

        {/* Floating Organic Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-pink-300/30 to-purple-400/30 dark:from-pink-500/20 dark:to-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/25 to-cyan-400/25 dark:from-blue-500/15 dark:to-cyan-600/15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-green-300/20 to-emerald-400/20 dark:from-green-500/10 dark:to-emerald-600/10 blur-3xl animate-pulse delay-2000"></div>

        {/* Window Shadow Overlay */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%),
              linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%)
            `,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Timeline */}
        <div className="px-6 sm:px-10 pb-12">
          <div className="max-w-4xl mx-auto space-y-8 mt-5">
            {/* 2025년 7월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2025"
                month="07"
              />
              <NoteLists>
                <NoteList content="1. Next13 -> Next15 업그레이드" />
                <NoteList content="2. 메인 페이지 리디자인" />
              </NoteLists>
            </div>

            {/* 2025년 06월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2025"
                month="06"
              />
              <NoteLists>
                <NoteList content="1. 전체 폴더 구조 및 아키텍처 변경" />
                <NoteList content="2. 마크다운 머메이트 추가" />
              </NoteLists>
            </div>

            {/* 2025년 03월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2025"
                month="03"
              />
              <NoteLists>
                <NoteList content="1. 마크다운 파서 스타일링 변경" />
                <NoteList content="2. About-Me 페이지 리뉴얼" />
              </NoteLists>
            </div>

            {/* 2025년 01월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2025"
                month="01"
              />
              <NoteLists>
                <NoteList content="1. 메인 페이지 최근/조회수 포스트 SSR로 변경" />
                <NoteList content="2. LCP : 불필요한 css 제거, tailwind.config.js safelist 수정" />
                <NoteList content="3. react-markdown 버전 업그레이드 및 테이블 스타일 변경" />
                <NoteList content="4. 에디터 tags, categories 변경" />
              </NoteLists>
            </div>

            {/* 2024년 11월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2024"
                month="11"
              />
              <NoteLists>
                <NoteList content="1. Post 쿼리(Detail Update) 네이티브 변경" />
                <NoteList content="2. 리팩토링 (불필요한 코드 삭제)" />
                <NoteList content="2-1. 메인 페이지 최근/조회수 포스트 CSR로 변경" />
                <NoteList content="2-2. react-query suspense 옵션 추가" />
                <NoteList content="3. 전체적인 디자인 변경" />
              </NoteLists>
            </div>

            {/* 2024년 09월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2024"
                month="09"
              />
              <NoteLists>
                <NoteList
                  content={`1. Post 쿼리(View +1 Update) 네이티브 사용해 속도 개선 (Superbase 실행 기준) 13.6s > 1.2s`}
                />
                <NoteList content="2. robots.txt 개선 & sitemap.ts 적용 (동적 sitemap.xml 생성)" />
                <NoteList content="3. 다크모드 배경색상 변경 & Post 페이지 css 변경" />
                <NoteList content="4. 사용하지 않는 코드 & ISR 등 레거시 코드 삭제" />
              </NoteLists>
            </div>

            {/* 2024년 06월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2024"
                month="06"
              />
              <NoteLists>
                <NoteList content="1. 인피니티 스크롤 관련 api, 페이지 개선" />
                <NoteList content="2. 블로그 업데이트 노트 시작" />
              </NoteLists>
            </div>

            {/* 2024년 03월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2024"
                month="03"
              />
              <NoteLists>
                <NoteList content="1. PlanetScale =&gt; Superbase DB 서버 마이그레이션" />
                <NoteList content="2. 프리즈마 클라이언트 버전 업그레이드" />
              </NoteLists>
            </div>

            {/* 2024년 01월 */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-2 border-white/20 dark:border-gray-700/30 hover:border-indigo-300/50 dark:hover:border-indigo-500/50 rounded-3xl p-8 shadow-2xl transition-colors duration-300 group">
              <NoteTitle
                year="2024"
                month="01"
              />
              <NoteLists>
                <NoteList content="1. 폰트 추가" />
                <NoteList content="2. 리액트 쿼리 v4 =&gt; v5 업그레이드" />
                <NoteList content="3. 포스트의 revalidate 시간 연장" />
                <NoteList content="4. 리액트 마크다운 warning 고침" />
                <NoteList content="5. 인피니티 스크롤 고양이 애니메이션 추가" />
              </NoteLists>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
