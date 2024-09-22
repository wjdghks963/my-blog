"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import appleStoreImg from "@public/me/apple_store_img.png";
import flow5Img from "@public/me/flow5_img.png";
import githubImg from "@public/me/github_img.png";
import googleStoreImg from "@public/me/google_store_img.png";
import linkedinImg from "@public/me/linkedin_img.png";
import oaImg from "@public/me/oa_img.png";
import planetImg from "@public/me/planet_img.png";

export default function Blogs() {
  return (
    <div className="flex flex-col py-16 mobile:mx-32 mx-10 font-roboto-regular">
      <section className="flex flex-col gap-4 mt-5">
        <p>안녕하세요. 매일 배우며 어떤것이든 좋고 새롭게 만드는 것을 즐기는 개발자입니다.</p>
        <p>항상 소프트 스킬 향상을 위해 노력하고 있습니다.</p>

        <div className="flex gap-10">
          <Link
            href="https://github.com/wjdghks963"
            className="mobile:w-1/3 flex items-center justify-center  bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Image
              src={githubImg}
              className="h-6 w-6 mr-2"
              alt="GitHub"
            />
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
            className="mobile:w-1/3 flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Image
              src={linkedinImg}
              className="h-6 w-6 mr-2"
              alt="LinkedIn"
            />
            LinkedIn
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4 mt-16">
        <h2 className="text-2xl font-semibold">경력</h2>
        <p className="text-lg">해커스 홀딩스 - 프론트엔드 개발자 | 2023.05 - 2023.09</p>
        <p className="text-lg">코인 고스트 - 안드로이드 개발자 | 2022.06 - 2022.08</p>
      </section>

      <section className="flex flex-col gap-4 mt-16">
        <h2 className="text-2xl font-semibold">기술스택</h2>
        <p className="text-lg">익숙함 : Next.js, RN, TailwindCSS, Redux toolkit, React Query</p>
        <p className="text-lg">덜익숙함 : Spring boot</p>
        <p className="text-lg">배우는 중 : Docker, SQL</p>
      </section>

      <>
        <h2 className="text-2xl font-bold mt-14 mb-7">프로젝트</h2>
        <div className="flex flex-col gap-20">
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Flow5</h2>
            <p>사용한 기술 : flutter, i18n</p>
            <p>설명 : flutter를 사용한 타이머 앱</p>

            <Link
              href="https://apps.apple.com/us/app/flow5/id6689514669"
              className="mobile:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
            >
              <Image
                src={appleStoreImg}
                className="h-6 w-6 mr-2"
                alt="Apple Store"
              />
              애플 스토어
            </Link>
            <Image
              className="w-2/3 mt-10"
              src={flow5Img}
              alt="앱 홍보 이미지"
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Planet Diary</h2>
            <p>사용한 기술 : flutter, spring boot, aws, cloudflare, open ai </p>
            <p>
              설명 : 식물 일지를 작성하며 유저들과 소통하고 AI를 통해 식물에 대한 정보나 도움을 받을 수 있습니다.
              <br />
              디자인부터 배포까지 풀사이클 개인 프로젝트
            </p>
            <Link
              href="https://apps.apple.com/kr/app/planet-diary/id6473107463"
              className="mobile:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
            >
              <Image
                src={appleStoreImg}
                className="h-6 w-6 mr-2"
                alt="Apple Store"
              />
              애플 스토어
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.jung.planet"
              className="mobile:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
            >
              <Image
                src={googleStoreImg}
                className="h-6 w-6 mr-2"
                alt="Google Play"
              />
              구글 스토어
            </Link>

            <Image
              className="w-2/3 mt-10"
              src={planetImg}
              alt="앱 홍보 이미지"
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">개인 블로그</h2>
            <p>사용한 기술 : Next.js, TailwindCSS, Redux tool kit, React-Query, Prisma</p>
            <p>설명 : Next를 사용해 만든 풀스택 개인 블로그. 이 블로그입니다.</p>
            <p>성과 : FCP 0.6s, LCP 1s, SEO 100점</p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">OA</h2>
            <p>사용한 기술 : Next.js, TailwindCSS, Redux tool kit, flutter, firebase</p>
            <p>설명 : Next를 사용해 웹을 만들고 flutter의 웹뷰를 사용해 표현한 AI 설정 앱입니다.</p>

            <Link
              href="https://play.google.com/store/apps/details?id=com.jung.oa"
              className="mobile:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
            >
              <Image
                src={googleStoreImg}
                className="h-6 w-6 mr-2"
                alt="Google Play"
              />
              구글 스토어
            </Link>
            <Image
              className="w-2/3 mt-10"
              src={oaImg}
              alt="앱 홍보 이미지"
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">RN-shuffle-pincode</h2>
            <p>사용한 기술 : React Native</p>
            <p>설명 : 키패드를 섞는 기능 RN UI 라이브러리</p>
            <Link
              href="https://www.npmjs.com/package/@wjdghks963/react-native-shuffle-pincode"
              className="w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
            >
              NPM 주소
            </Link>
          </section>
        </div>
      </>
    </div>
  );
}
