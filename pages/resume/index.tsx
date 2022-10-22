import Layout from "@components/Base/Layout";
import Link from "next/link";
import React from "react";

export default function Resume() {
  return (
    <Layout
      title="최정환 이력서"
      url="/resume"
      className="px-10 mt-10"
      keywords="이력서"
    >
      <div className="mt-5 prose-h3:dark:text-white prose-h2:dark:text-white prose-li:dark:text-white  ">
        <div className="pb-5 flex font-extrabold text-2xl">
          안녕하세요
          <span className="ml-10 animate-[wave_2s_linear_infinite]">👋</span>
        </div>
        <span>Front-End 개발자 최정환입니다.</span>
        <span className="block break-words h-10">
          사용자 경험과 개발자로서의 경험을 중요하게 생각하며 이것들을 계속
          향상시키기 위해서 새로운 것을 배우는데 거부감이 없습니다.
        </span>

        <div className="prose flex w-full justify-between mt-5 gap-5">
          <div className="">
            <h3 className="mobile:font-bold text-lg">가지고 있는 스킬</h3>
            <ul>
              <li>React</li>
              <li>HTML,CSS</li>
              <li>Next.js</li>
            </ul>
            <h3 className="mobile:font-bold text-lg">익히고 있는 스킬</h3>
            <ul>
              <li>TailwindCSS</li>
              <li>Redcux</li>
              <li>Clean Code</li>
            </ul>
          </div>
          <div>
            <h3 className="mobile:font-bold text-lg">익숙한 프로그래밍 언어</h3>
            <ul>
              <li>JS</li>
              <li>Kotlin</li>
            </ul>
            <h3 className="mobile:font-bold text-lg">
              익히고 있거나 배우고 싶은 프로그래밍 언어
            </h3>
            <ul>
              <li>Rust</li>
            </ul>
          </div>
        </div>

        <hr />
        <div className=" mt-10 dark:text-white ">
          <div>
            <p className="font-extrabold text-3xl mb-5">이력</p>
            <div>
              <div className="flex flex-row w-full justify-between ">
                <span className="font-bold">코인 고스트</span>
                <span>2022.05 ~ 2022.08</span>
              </div>
              <div className="flex flex-col">
                <span className=" font-bold">직무 : 안드로이드 개발자</span>
                <span className=" font-bold mt-3">
                  기술 스택 : Kotlin, Android studio, volley
                </span>
                <span>
                  웹 프론트 엔드로 인턴을 진행했지만 안드로이드 개발자를 제의
                  받아 정규직으로 들어가 배우면서 일을 시작했습니다.
                </span>

                <li className=" mt-5">
                  <span className="font-bold">코고 로또</span>
                  <span className="block">
                    코인 고스트 모바일에서만 운영하는 이벤트 페이지로 회사가
                    발생한 GST 코인을 통해 경품을 응모할 수 있는 이벤트입니다.
                    <br />
                    처음 안드로이드를 배우면서 프로젝트를 맡아 같이
                    진행했습니다.
                    <br /> 디자이너와 figma를 사용하며 벡엔드와는 slack 등을
                    통해 소통을 하며 협업하는 방법을 알게되었습니다.
                  </span>
                  <li>전체적인 UI와 벡엔드와 통신을 하는 역할을 맡았습니다.</li>
                </li>
                <li className="mt-5">
                  <span className="font-bold">개인 충전 지갑 페이지</span>
                  <span className="block">
                    코인 고스트의 화폐인 pop와 코인인 GST를 교환 충전하는 내역
                    페이지
                  </span>
                </li>
                <li className="mt-5">
                  <span className="font-bold">코고 갤러리</span>
                  <span className="block">
                    pop과 GST를 이용해 NFT를 거래할 수 있는 플랫폼
                  </span>

                  <li className="list-none mt-3">
                    1. 메인 페이지
                    <br />
                    거래소에 올라온 NFT들을 인기&방금 올라온 것들을 나열한 것과
                    민팅 예정인 NFT를 볼 수 있는 페이지
                  </li>
                  <li className="list-none">
                    2. 민팅 페이지
                    <br />
                    민팅 예정인 NFT를 볼 수 있는 페이지
                  </li>
                </li>
              </div>
            </div>
          </div>
          <p className="font-extrabold text-3xl mt-20 mb-10">프로젝트</p>
          <div className="flex flex-col gap-16">
            <div className="">
              <div className="flex justify-between">
                <span className="font-bold text-xl">개인 Blog</span>
                <span>2022.10.10 ~ 2022.10.20</span>
              </div>

              <div className="flex flex-col">
                <span className=" font-bold">사용한 기술 </span>
                <span className="before:content-['Front-End'] before:font-extrabold">
                  : Next.js, TailwindCSS, Redux, Redux toolkit, SWR
                </span>
                <span className="before:content-['Back-End'] before:font-extrabold">
                  : Next.js, Prisma
                </span>
                <span className="dark:text-white font-bold mt-3">설명</span>
                Next, tailwindCSS, Redux를 사용해 기술들을 익히기 위해 만든
                포트폴리오 블로그
                <br />
                <Link
                  href={
                    "https://velog.io/@wjdghks963/%EA%B0%9C%EC%9D%B8-%EB%B8%94%EB%A1%9C%EA%B7%B8-%ED%9A%8C%EA%B3%A0%EB%A1%9D"
                  }
                >
                  <a className="dark:text-white mt-3">회고록 &rarr;</a>
                </Link>
                <Link href={"https://github.com/wjdghks963/my-blog"}>
                  <a className="dark:text-white">깃헙 레포 &rarr;</a>
                </Link>
              </div>
            </div>

            <div>
              <span className="font-bold text-xl">Youtube 클론코딩</span>

              <div className="flex flex-col">
                <span className=" font-bold">사용한 기술 </span>
                <span className="before:content-['Front-End'] before:font-extrabold">
                  : Vanilla JS, Pug, Sass
                </span>
                <span className="before:content-['Back-End'] before:font-extrabold">
                  : Node.js, Express, mongoDB
                </span>
                <span className="dark:text-white font-bold mt-3">설명</span>
                fullstack으로 클론코딩을 진행하여 웹에 대한 전체적인 플로우
                지식과 프론트와 벡엔드의 역할을 알게되고 라이브러리의 편의성을
                알게됨
                <Link href={"https://github.com/wjdghks963/minitu"}>
                  <a className="dark:text-white mt-3">깃헙 레포 &rarr;</a>
                </Link>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between">
                <span className="font-bold text-xl">아리따움</span>
                <span>2022.04 ~ 2022.05</span>
              </div>

              <div className="flex flex-col">
                <span className=" font-bold">사용한 기술 </span>
                <span className="before:content-['Front-End'] before:font-extrabold">
                  : React, styled-components, react-hook-form
                </span>
                <span className="before:content-['Back-End'] before:font-extrabold">
                  : Express, prisma
                </span>
                <span className="font-bold mt-3">설명</span>
                화장품 사이트 aritaum를 모티브한 팀 프로젝트
                <span className="font-bold mt-3">역할</span>
                <li>제품 상세 페이지</li>
                <li>리뷰 작성 팝업</li>
                <li>메인 페이지 추천 캐로셀</li>
                <br />
                <Link
                  href={
                    "https://velog.io/@wjdghks963/2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0"
                  }
                >
                  <a className="dark:text-white mt-3">회고록 &rarr;</a>
                </Link>
                <Link
                  href={
                    "https://github.com/wecode-bootcamp-korea/justcode-4-2nd-bcode-front/tree/main"
                  }
                >
                  <a className="dark:text-white">깃헙 레포 &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
