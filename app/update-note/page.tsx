import React from "react";

export default function UpdateNote() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 dark:text-white">블로그 업데이트 노트</h1>
      <div className="space-y-6">
        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">2024년 9월 업데이트</h2>
          <ul className="mt-4 text-gray-600">
            <li className="border-b py-2">
              1. Post 쿼리(Update) 네이티브 사용해 속도 개선 (Superbase 실행 기준) 13.6s {">"} 1.2s
            </li>
            <li className="border-b py-2">2. robots.txt 개선 & sitemap.ts 적용 (동적 sitemap.xml 생성)</li>
            <li className="border-b py-2">3. 다크모드 배경색상 변경 & Post 페이지 css 변경</li>
            <li className="border-b py-2">4. 사용하지 않는 코드 & ISR 등 레거시 코드 삭제</li>
          </ul>
        </div>

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">2024년 6월 업데이트</h2>
          <ul className="mt-4 text-gray-600">
            <li className="border-b py-2">1. 인피니티 스크롤 관련 api, 페이지 개선</li>
            <li className="border-b py-2">2. 블로그 업데이트 노트 시작</li>
          </ul>
        </div>

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">2024년 3월 업데이트</h2>
          <ul className="mt-4 text-gray-600">
            <li className="border-b py-2">1. PlanetScale =&gt; Superbase DB 서버 마이그레이션 </li>
            <li className="border-b py-2">2. 프리즈마 클라이언트 버전 업그레이드</li>
          </ul>
        </div>

        <div className="bg-white transition-shadow shadow-lg hover:shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">2024년 1월 업데이트</h2>
          <ul className="mt-4 text-gray-600">
            <li className="border-b py-2">1. 폰트 추가</li>
            <li className="border-b py-2">2. 리액트 쿼리 v4 =&gt; v5 업그레이드</li>
            <li className="border-b py-2">3. 포스트의 revalidate 시간 연장</li>
            <li className="border-b py-2">4. 리액트 마크다운 warning 고침</li>
            <li className="border-b py-2">5. 인피니티 스크롤 고양이 애니메이션 추가</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
