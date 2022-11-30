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

        <span className="block break-words mt-3">
          새로운 것을 체험하는 것을 좋아하고 내 손으로 무언가를 만드는 데에
          재미를 느껴 프론트엔드 개발자가 되었습니다.
          <br />
          사용자들의 입장이 되어서 다양한 상황을 생각하고 필요한 기능과 UI를
          만들고 다른 개발자들도 알아볼 수 있게 코드를 작성하기 위해 노력합니다.
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
              <li>Redux</li>
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
              <li>Swift</li>
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
                  받아 앱에 대해 배우면서 안드로이드 개발을 시작했습니다.
                </span>

                <ul className=" mt-5">
                  <span className="font-bold">코고 로또</span>
                  <span className="block">
                    코인 고스트 모바일에서만 운영하는 이벤트 페이지로 회사가
                    발생한 GST 코인을 통해 경품을 응모할 수 있는 이벤트입니다.
                    <br />
                    처음 안드로이드를 배우면서 프로젝트에 참여했습니다.
                    <br /> 디자이너와 figma를 사용하며 벡엔드와는 slack 등을
                    통해 소통을 하며 협업하는 방법을 알게되었습니다.
                  </span>
                  <li>전체적인 UI와 벡엔드와 통신을 하는 역할을 맡았습니다.</li>
                  <li className="mt-2">
                    구현 기능
                    <br />- 유저 정보 확인 및 응모 신청 팝업 (유저의 당첨 유무
                    파악 후)
                    <br />- 당첨자 닉네임, 당첨일 무한 스크롤
                    <br />- 경품 및 응모 비용 벡엔드 통신 통해 정보 가공 후
                    알맞게 표시
                    <br />- 룰렛 돌아가는 애니메이션 작성
                  </li>
                </ul>
                <li className="mt-5 list-none">
                  <span className="font-bold">개인 충전 지갑 페이지</span>
                  <span className="block">
                    코인 고스트의 화폐인 pop와 코인인 GST를 교환 충전하는 내역
                    <li className="mt-2">
                      구현 기능
                      <br />- recyclerview를 사용해서 인피니티 스크롤을 통해
                      내역 확인
                    </li>
                  </span>
                </li>
                <ul className="mt-5">
                  <span className="font-bold">코고 갤러리</span>
                  <span className="block">
                    pop과 GST를 이용해 NFT를 거래할 수 있는 플랫폼
                  </span>
                  <li className="list-none mt-3">
                    1. 메인 페이지
                    <br />
                    거래소에 올라온 NFT들을 인기&방금 올라온 것들을 나열한 것과
                    민팅 예정인 NFT를 볼 수 있는 페이지
                    <span className="mt-2">
                      구현 기능
                      <br />- 등록 및 구매 신청이 가능한 거래 페이지로 넘어 갈
                      수 있음
                      <br />- 세로 인피니티 스크롤 구현
                    </span>
                  </li>
                  <br />
                  <li className="list-none">
                    2. 민팅 페이지
                    <br />
                    민팅 예정인 NFT를 볼 수 있는 페이지
                    <span className="mt-2">
                      구현 기능
                      <br />- 민팅까지 남은 시간, 민팅 예정 NFT 정보를 볼 수
                      있으며 민팅 신청이 가능한 페이지로 넘어갈 수 있음
                    </span>
                  </li>
                </ul>
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

              <div className="flex flex-col mt-3">
                <span className=" font-bold">사용한 기술 </span>
                <span className="before:content-['Front-End'] before:font-extrabold">
                  : Next.js, TailwindCSS, Redux, Redux toolkit, SWR
                </span>
                <span className="before:content-['Back-End'] before:font-extrabold">
                  : Next.js, Prisma
                </span>
                <div className="dark:text-white mt-3">
                  <span className="font-bold block"> 설명</span>
                  Next를 통해 풀스택으로 웹앱을 제작해 SSR, SSG, ISR 등 서버
                  렌더링에 대하여 기본적인 지식을 쌓고 Redux Tool Kit을 사용해
                  상태관리 라이브러리의 사용방법을 익혔습니다. StoryBook을 통해
                  페이지와 컴포넌트에 대한 문서화를 했습니다. Lighthouse를
                  이용해 프로턱트의 성능 지표를 통해 코드를 좀 더 효율적으로
                  작성할 수 있었습니다. 호스팅과 ssl은 CloudFlare, 프론트는
                  vercel, DB 서버는 PlanetScale을 사용했습니다.
                </div>
                <ul className="list-none mt-3">
                  <li>구현 기능</li>
                  <li>- SSG 및 ISR을 통한 블로그 내용 클라이언트 전달 </li>
                  <li>- SSR을 통한 정보 처리 후 클라이언트 표시</li>
                  <li>- SWR을 사용해 벡엔드 통신 데이터 캐싱</li>
                  <li>- 반응형</li>
                  <li>
                    - 선택한 태그 상태 관리 및 blog 내용 edit 을 위한 Redux 사용
                  </li>
                  <li>- Prisma를 통해 벡엔드 데이터 가공 및 처리</li>
                  <li>- 태그에 따른 블로그들 인피니티 스크롤</li>
                  <li>- StoryBook을 통한 페이지 및 컴포넌트 문서화</li>
                </ul>
                <br />
                <Link
                  href={
                    "https://velog.io/@wjdghks963/%EA%B0%9C%EC%9D%B8-%EB%B8%94%EB%A1%9C%EA%B7%B8-%ED%9A%8C%EA%B3%A0%EB%A1%9D"
                  }
                >
                  <a className="dark:text-white mt-3 cursor-pointer font-bold">
                    회고록 &rarr;
                  </a>
                </Link>
                <Link href={"https://github.com/wjdghks963/my-blog"}>
                  <a className="dark:text-white cursor-pointer font-bold">
                    깃헙 레포 &rarr;
                  </a>
                </Link>
                <Link
                  href={
                    "https://63635e18291535f4d01657be-csrykgcgxo.chromatic.com/?path=/story/components-base-headerli--normal"
                  }
                >
                  <a className="dark:text-white cursor-pointer font-bold">
                    Story Book 구경가기 &rarr;{" "}
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="font-bold text-xl">아리따움</span>
                <span>2022.04 ~ 2022.05</span>
              </div>

              <div className="flex flex-col mt-3">
                <span className=" font-bold">사용한 기술 </span>
                <span className="before:content-['Front-End'] before:font-extrabold">
                  : React, styled-components, react-hook-form
                </span>
                <span className="before:content-['Back-End'] before:font-extrabold">
                  : Express, prisma
                </span>
                <span className="font-bold mt-3">설명</span>
                화장품 사이트 aritaum를 클론한 팀 프로젝트로 부트캠프에서
                프론트와 벡엔드 역할을 나눈 후 작업이 진행되었습니다.
                <div className="mt-2">
                  협업
                  <ul className="list-none">
                    <li>프로젝트 기간에 2번의 주간 스프린트 진행</li>
                    <li>
                      zoom을 통해 매일 아침 9시에 모여 진행하는데 어려움 및 진행
                      상황 공유
                    </li>
                    <li>slack을 통해 팀원들과 질문 공유 및 해결</li>
                  </ul>
                </div>
                <div className="mt-2">
                  개발
                  <ul className="list-none">
                    <li>
                      Git을 사용해서 브런치를 나누며 main에 merge하며 진행
                    </li>
                    <li>
                      PR을 3명 이상의 승인을 받아야하며 pr이 올라올 때 마다
                      슬랙에 알람
                    </li>
                  </ul>
                </div>
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
                  <a className="dark:text-white cursor-pointer font-bold mt-3">
                    회고록 &rarr;
                  </a>
                </Link>
                <Link
                  href={
                    "https://github.com/wecode-bootcamp-korea/justcode-4-2nd-bcode-front/tree/main"
                  }
                >
                  <a className="dark:text-white cursor-pointer font-bold">
                    깃헙 레포 &rarr;
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <span className="font-bold text-xl">Youtube 클론코딩</span>

              <div className="flex flex-col">
                <span className=" font-bold mt-3">사용한 기술 </span>
                <span className="before:content-['Front-End'] before:font-extrabold">
                  : Vanilla JS, Pug, Sass
                </span>
                <span className="before:content-['Back-End'] before:font-extrabold">
                  : Node.js, Express, mongoDB
                </span>
                <span className="dark:text-white font-bold mt-3">설명</span>
                최소한의 라이브러리를 사용하고 Vanilla Js를 사용해 최신 문법 및
                html 조작, web api의 작동 방식, Webpack 설정 등 기초적인 프론트
                분야의 웹의 작동 방식과 CSS의 사용 방법을 알게되었고 Express를
                통해 벡엔드를 구현해 프론트와 어떤식으로 통신이 가능한지
                알게되었습니다.
                <Link href={"https://github.com/wjdghks963/minitu"}>
                  <a className="dark:text-white cursor-pointer font-bold mt-3">
                    깃헙 레포 &rarr;
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
