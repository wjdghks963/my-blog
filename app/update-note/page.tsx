import NoteList from "@domains/update-note/components/NoteList";
import NoteLists from "@domains/update-note/components/NoteLists";
import NoteTitle from "@domains/update-note/components/NoteTitle";
import React from "react";

export default function UpdateNote() {
  return (
    <div className="container mx-auto px-4 py-8 cursor-pointer">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 dark:text-white">블로그 업데이트 노트</h1>
      <div className="space-y-6">
        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
          <NoteTitle
            year="2025"
            month="06"
          />
          <NoteLists>
            <NoteList content="1. 전체 폴더 구조 및 아키텍처 변경" />
            <NoteList content="2. 마크다운 머메이트 추가" />
          </NoteLists>
        </div>

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
          <NoteTitle
            year="2025"
            month="03"
          />
          <NoteLists>
            <NoteList content="1. 마크다운 파서 스타일링 변경" />
            <NoteList content="2. About-Me 페이지 리뉴얼" />
          </NoteLists>
        </div>

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
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

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
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

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
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

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
          <NoteTitle
            year="2024"
            month="06"
          />
          <NoteLists>
            <NoteList content="1. 인피니티 스크롤 관련 api, 페이지 개선" />
            <NoteList content="2. 블로그 업데이트 노트 시작" />
          </NoteLists>
        </div>

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
          <NoteTitle
            year="2024"
            month="03"
          />
          <NoteLists>
            <NoteList content="1. PlanetScale =&gt; Superbase DB 서버 마이그레이션" />
            <NoteList content="2. 프리즈마 클라이언트 버전 업그레이드" />
          </NoteLists>
        </div>

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6 group">
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
  );
}
