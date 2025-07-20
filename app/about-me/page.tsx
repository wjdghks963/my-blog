"use client";

import Certificate from "@domains/about-me/components/Certificate";
import StickyHeader from "@domains/about-me/components/StickyHeader";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type DownloadData = {
  downloads: number;
};

const NpmDownloads: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://api.npmjs.org/downloads/point/2000-01-01:${today}/@wjdghks963/react-native-shuffle-pincode`;

  const { data, isLoading, error } = useQuery<DownloadData>({
    queryKey: ["npmDownloads"],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch download data");
      }
      return response.json();
    },
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading download count</p>;

  return (
    <div className="w-2/3 bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
      Total Downloads: {data?.downloads?.toLocaleString() ?? "N/A"}
    </div>
  );
};

export default function Blogs() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col py-16 mobile:mx-32 mx-10 font-roboto-regular">
        <section className="flex flex-col gap-4 mt-5">
          <p>안녕하세요. 새로운 도전과 내실 다지기를 즐기는 개발자입니다.</p>
          <p>소프트 스킬 향상을 위해 노력하고 있습니다.</p>

          <div className="flex gap-10">
            <Link
              href="https://github.com/wjdghks963"
              className="mobile:w-1/3 flex items-center justify-center  bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <Image
                src="/me/github_img.png"
                className="h-6 w-6 mr-2"
                alt="GitHub"
                width={24}
                height={24}
              />
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
              className="mobile:w-1/3 flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <Image
                src="/me/linkedin_img.png"
                className="h-6 w-6 mr-2"
                alt="LinkedIn"
                width={24}
                height={24}
              />
              LinkedIn
            </Link>
          </div>
        </section>

        <section
          className="flex flex-col gap-4 mt-16"
          id="career"
        >
          <h2 className="text-2xl font-semibold">경력</h2>
          <p className="text-lg">프리텔레콤 - 웹 개발자(spring&jquery) | 2024.02 - 현재</p>
          <p className="text-lg">해커스 홀딩스 - 프론트엔드 개발자 | 2023.05 - 2023.09</p>
          <p className="text-lg">코인 고스트(인턴) - 안드로이드 개발자 | 2022.06 - 2022.08</p>
        </section>

        <section
          className="flex flex-col gap-4 mt-16"
          id="certifications"
        >
          <h2 className="text-2xl font-semibold">자격증</h2>
          <p className="text-lg">정보처리기사 - 2024년 취득</p>
          <Link href="https://www.credly.com/badges/5a24b923-2e52-413e-ab41-0e2fe7b21846/linked_in_profile">
            <p className="text-lg text-blue-500">AWS Certified Solutions Architect - Associate (SAA-C03) - 2023년</p>
          </Link>
        </section>

        <section
          className="flex flex-col gap-4 mt-16"
          id="skills"
        >
          <h2 className="text-2xl font-semibold">기술스택</h2>
          <p className="text-lg">익숙함 : Next.js, RN, TailwindCSS, Redux toolkit, React Query, Spring boot</p>
          <p className="text-lg">배우는 중 : Docker, SQL</p>
        </section>

        <section id="projects">
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
                  src="/me/apple_store_img.png"
                  className="h-6 w-6 mr-2"
                  alt="Apple Store"
                  width={24}
                  height={24}
                />
                애플 스토어
              </Link>
              <Image
                className="w-2/3 mt-10"
                src="/me/flow5_img.png"
                alt="앱 홍보 이미지"
                width={400}
                height={300}
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
                  src="/me/apple_store_img.png"
                  className="h-6 w-6 mr-2"
                  alt="Apple Store"
                  width={24}
                  height={24}
                />
                애플 스토어
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.jung.planet"
                className="mobile:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <Image
                  src="/me/google_store_img.png"
                  className="h-6 w-6 mr-2"
                  alt="Google Play"
                  width={24}
                  height={24}
                />
                구글 스토어
              </Link>

              <Image
                className="w-2/3 mt-10"
                src="/me/planet_img.png"
                alt="앱 홍보 이미지"
                width={400}
                height={300}
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
                  src="/me/google_store_img.png"
                  className="h-6 w-6 mr-2"
                  alt="Google Play"
                  width={24}
                  height={24}
                />
                구글 스토어
              </Link>
              <Image
                className="w-2/3 mt-10"
                src="/me/oa_img.png"
                alt="앱 홍보 이미지"
                width={400}
                height={300}
              />
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Picka</h2>
              <p>사용한 기술 : flutter</p>
              <p>설명 : 직접 만든 루틴들을 `카드` 로 저장하고 매일 한 장을 랜덤으로 뽑아 실행하는 루틴 앱</p>
              <Link
                href="https://apps.apple.com/kr/app/picka/id6744289311"
                className="mobile:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <Image
                  src="/me/apple_store_img.png"
                  className="h-6 w-6 mr-2"
                  alt="Apple Store"
                  width={24}
                  height={24}
                />
                애플 스토어
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.jung.picka"
                className="mobile:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <Image
                  src="/me/google_store_img.png"
                  className="h-6 w-6 mr-2"
                  alt="Google Play"
                  width={24}
                  height={24}
                />
                구글 스토어
              </Link>

              <Image
                className="w-2/3 mt-10"
                src="/me/picka_img.png"
                alt="앱 홍보 이미지"
                width={400}
                height={300}
              />
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Timbie</h2>
              <p>사용한 기술 : flutter</p>
              <p>설명 : 타임스탬프 카메라</p>
              <Link
                href="https://apps.apple.com/us/app/timbie/id6744580069"
                className="mobile:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <Image
                  src="/me/apple_store_img.png"
                  className="h-6 w-6 mr-2"
                  alt="Apple Store"
                  width={24}
                  height={24}
                />
                애플 스토어
              </Link>

              <Image
                className="w-2/3 mt-10"
                src="/me/timbie_img.png"
                alt="앱 홍보 이미지"
                width={400}
                height={300}
              />
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">RN-shuffle-pincode</h2>
              <p>사용한 기술 : React Native</p>
              <p>설명 : 키패드를 섞는 기능 RN UI 라이브러리</p>
              <Link
                href="https://www.npmjs.com/package/@wjdghks963/react-native-shuffle-pincode"
                className="w-2/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                NPM 주소
              </Link>
              <NpmDownloads />
            </section>
          </div>
        </section>

        <section
          className="flex flex-col gap-4 mt-16"
          id="courses"
        >
          <h2 className="text-2xl font-semibold">수료증</h2>
          <Certificate
            course="실전! 스프링 부트와 JPA 활용1 - 웹 애플리케이션 개발"
            date="2023년 10월 13일"
            skills={["Spring", "JPA"]}
            certificateUrl="https://www.inflearn.com/certificate/516577-324119-12175113"
          />
          <Certificate
            course="스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술"
            date="2023년 9월 28일"
            skills={["Spring"]}
            certificateUrl="https://www.inflearn.com/certificate/516577-326674-11013819"
          />
          <Certificate
            course="모든 개발자를 위한 HTTP 웹 기본 지식"
            date="2023년 8월 19일"
            skills={["Network"]}
            certificateUrl="https://www.inflearn.com/certificate/516577-326277-11013821"
          />
          <Certificate
            course="스프링 핵심 원리 - 기본"
            date="2023년 1월 18일"
            skills={["Spring"]}
            certificateUrl="https://www.inflearn.com/certificate/516577-325969-11013820"
          />
          <Certificate
            course="React JS 마스터클래스"
            date="2022년 11월 12일"
            skills={["React"]}
            certificateUrl="https://nomadcoders.co/certs/e6683429-8490-49ee-90d0-a98ab72fd8f9"
          />
          <Certificate
            course="캐럿마켓"
            date="2022년 10월 17일"
            skills={["Nextjs", "Tailwind", "Prisma"]}
            certificateUrl="https://nomadcoders.co/certs/706aeaea-3bde-4413-8a5c-22c538cb59ce"
          />
          <Certificate
            course="살용주의 프로그래머"
            date="2022년 4월 15일"
            skills={["Theory"]}
            certificateUrl="https://nomadcoders.co/certs/263cc894-6411-4ed1-a6f9-e836be4bbc6f"
          />
          <Certificate
            course="클린코드"
            date="2022년 3월 18일"
            skills={["Theory"]}
            certificateUrl="https://nomadcoders.co/certs/e2d21997-2213-4992-aa79-430747cbb2a2"
          />
          <Certificate
            course="유튜브 클론 6주 완성반"
            date="2022년 2월 22일"
            skills={["Node", "Express", "Pug", "MongoDB"]}
            certificateUrl="https://nomadcoders.co/certs/42fcb5d6-3699-4f25-b8d6-bf348ce7b95f"
          />
        </section>
      </div>

      <StickyHeader />
    </div>
  );
}
