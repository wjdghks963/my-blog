"use client";

import Certificate from "@domains/about-me/components/Certificate";
import StickyHeader from "@domains/about-me/components/StickyHeader";
import { FooterStrip } from "@domains/home/components/editorial/Editorial";
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

  if (isLoading) return <p className="text-sm text-muted">Total Downloads 로딩 중...</p>;
  if (error) return <p className="text-sm text-muted">다운로드 수를 불러오지 못했습니다.</p>;

  return (
    <div className="inline-flex items-center justify-center rounded-lg bg-[#c84e3e] px-4 py-2.5 text-sm font-semibold text-white">
      Total Downloads: {data?.downloads?.toLocaleString() ?? "N/A"}
    </div>
  );
};

export default function Blogs() {
  const sectionClass = "border-b border-soft pb-10 last:border-b-0";
  const sectionTitleClass = "font-serif italic";
  const sectionTitleStyle = {
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: "var(--ink)",
    margin: 0,
  } as const;
  const textClass = "text-base mobile:text-lg";
  const textStyle = { color: "var(--ink-2)", lineHeight: 1.7 } as const;
  const actionBaseClass =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors";
  const githubButtonClass = `${actionBaseClass} bg-[#1f2b38] hover:bg-[#16202b]`;
  const linkedinButtonClass = `${actionBaseClass} bg-[#1f6fbb] hover:bg-[#195e9f]`;
  const appStoreButtonClass = `${actionBaseClass} bg-[#2f6db2] hover:bg-[#245a94]`;
  const playStoreButtonClass = `${actionBaseClass} bg-[#2c8f63] hover:bg-[#247953]`;
  const npmButtonClass = `${actionBaseClass} bg-[#c84e3e] hover:bg-[#b24031]`;
  const projectCardClass = "p-5 mobile:p-6";
  const projectCardStyle = {
    background: "var(--paper-2)",
    border: "1px solid var(--rule)",
    borderRadius: 6,
  } as const;
  const imageClass = "mt-6 w-full max-w-3xl";
  const imageStyle = { border: "1px solid var(--rule)", borderRadius: 4, padding: 8 } as const;

  return (
    <main className="min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <header
        className="px-6 mobile:px-14"
        style={{
          paddingTop: 44,
          paddingBottom: 28,
          borderBottom: "2px solid var(--ink)",
        }}
      >
        <div className="tiny-label" style={{ color: "var(--accent)", marginBottom: 14 }}>
          ABOUT
        </div>
        <h1
          className="font-serif"
          style={{
            margin: 0,
            fontSize: "clamp(40px, 6vw, 64px)",
            lineHeight: 1,
            fontWeight: 500,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          최정환<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: 580,
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--ink-2)",
          }}
        >
          웹/앱 풀사이클로 일하며 운영 안정성과 사용자 경험을 함께 챙기는 개발자입니다.
        </p>
      </header>

      <div className="px-6 mobile:px-14" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article style={{ minWidth: 0 }}>
            <div className="space-y-10">
            <section className={sectionClass}>
                <div className="flex flex-col gap-3">
                  <p className={textClass} style={textStyle}>문제를 빠르게 해결하면서도 구조적 개선까지 설계하는 개발자입니다.</p>
                  <p className={textClass} style={textStyle}>서비스 안정성과 팀 생산성을 함께 높이는 개발 경험을 쌓아가고 있습니다.</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="https://github.com/wjdghks963"
                    className={githubButtonClass}
                  >
                    <Image
                      src="/me/github_img.png"
                      className="mr-2 h-5 w-5"
                      alt="GitHub"
                      width={24}
                      height={24}
                    />
                    GitHub
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
                    className={linkedinButtonClass}
                  >
                    <Image
                      src="/me/linkedin_img.png"
                      className="mr-2 h-5 w-5"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                    />
                    LinkedIn
                  </Link>
                </div>
              </section>

            <section
              className={sectionClass}
              id="outcomes"
            >
              <h2 className={sectionTitleClass} style={sectionTitleStyle}>주요 성과</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border border-soft bg-white/60 px-3 py-2 text-sm dark:bg-white/5">
                  런타임 오류 개선
                  <span className="ml-2 font-bold text-brand">-90%</span>
                </div>
                <div className="rounded-lg border border-soft bg-white/60 px-3 py-2 text-sm dark:bg-white/5">
                  이벤트 리드타임
                  <span className="ml-2 font-bold text-brand">7일→3일</span>
                </div>
                <div className="rounded-lg border border-soft bg-white/60 px-3 py-2 text-sm dark:bg-white/5">
                  메시지 비용 절감
                  <span className="ml-2 font-bold text-brand">-80%</span>
                </div>
              </div>
            </section>

            <section
              className={sectionClass}
              id="career"
            >
              <h2 className={sectionTitleClass} style={sectionTitleStyle}>경력</h2>
              <div className="mt-4 space-y-2">
                <p className={textClass} style={textStyle}>프리텔레콤 - 웹 개발자(spring&jquery) | 2024.02 - 현재</p>
                <p className={textClass} style={textStyle}>해커스 홀딩스 - 프론트엔드 개발자 | 2023.05 - 2023.09</p>
                <p className={textClass} style={textStyle}>코인 고스트(인턴) - 안드로이드 개발자 | 2022.06 - 2022.08</p>
              </div>
            </section>

            <section
              className={sectionClass}
              id="certifications"
            >
              <h2 className={sectionTitleClass} style={sectionTitleStyle}>자격증</h2>
              <div className="mt-4 space-y-2">
                <p className={textClass} style={textStyle}>정보처리기사 - 2023.09</p>
                <Link href="https://www.credly.com/badges/5a24b923-2e52-413e-ab41-0e2fe7b21846/linked_in_profile">
                  <p className={textClass} style={{ ...textStyle, color: "var(--accent)" }}>AWS Certified Solutions Architect - Associate (SAA-C03) - 2024.06</p>
                </Link>
                <p className={textClass} style={textStyle}>SQLD - 2025.06</p>
                <p className={textClass} style={textStyle}>투자자산운용사 - 2026.01</p>
              </div>
            </section>

            <section
              className={sectionClass}
              id="skills"
            >
              <h2 className={sectionTitleClass} style={sectionTitleStyle}>기술스택</h2>
              <div className="mt-4 space-y-2">
                <p className={textClass} style={textStyle}>익숙함 : Next.js, RN, TailwindCSS, Redux toolkit, React Query, Spring boot</p>
                <p className={textClass} style={textStyle}>배우는 중 : Docker, SQL</p>
              </div>
            </section>

            <section
              id="projects"
              className={sectionClass}
            >
              <h2 className={sectionTitleClass} style={sectionTitleStyle}>프로젝트</h2>
              <div className="mt-7 flex flex-col gap-6">
                <section className={projectCardClass} style={projectCardStyle}>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Flow5</h3>
                  <p className={`mt-2 ${textClass}`} style={textStyle}>사용한 기술 : flutter, i18n</p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>설명 : flutter를 사용한 타이머 앱</p>
                  <div className="mt-3">
                    <Link
                      href="https://apps.apple.com/us/app/flow5/id6689514669"
                      className={appStoreButtonClass}
                    >
                      <Image
                        src="/me/apple_store_img.png"
                        className="mr-2 h-5 w-5"
                        alt="Apple Store"
                        width={24}
                        height={24}
                      />
                      애플 스토어
                    </Link>
                  </div>
                  <Image
                    className={imageClass}
                    style={imageStyle}
                    src="/me/flow5_img.png"
                    alt="앱 홍보 이미지"
                    width={400}
                    height={300}
                  />
                </section>

                <section className={projectCardClass} style={projectCardStyle}>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Planet Diary</h3>
                  <p className={`mt-2 ${textClass}`} style={textStyle}>사용한 기술 : flutter, spring boot, aws, cloudflare, open ai </p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>
                    설명 : 식물 일지를 작성하며 유저들과 소통하고 AI를 통해 식물에 대한 정보나 도움을 받을 수 있습니다.
                    <br />
                    디자인부터 배포까지 풀사이클 개인 프로젝트
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link
                      href="https://apps.apple.com/kr/app/planet-diary/id6473107463"
                      className={appStoreButtonClass}
                    >
                      <Image
                        src="/me/apple_store_img.png"
                        className="mr-2 h-5 w-5"
                        alt="Apple Store"
                        width={24}
                        height={24}
                      />
                      애플 스토어
                    </Link>
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.jung.planet"
                      className={playStoreButtonClass}
                    >
                      <Image
                        src="/me/google_store_img.png"
                        className="mr-2 h-5 w-5"
                        alt="Google Play"
                        width={24}
                        height={24}
                      />
                      구글 스토어
                    </Link>
                  </div>
                  <Image
                    className={imageClass}
                    style={imageStyle}
                    src="/me/planet_img.png"
                    alt="앱 홍보 이미지"
                    width={400}
                    height={300}
                  />
                </section>

                <section className={projectCardClass} style={projectCardStyle}>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">개인 블로그</h3>
                  <p className={`mt-2 ${textClass}`} style={textStyle}>사용한 기술 : Next.js, TailwindCSS, Redux tool kit, React-Query, Prisma</p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>설명 : Next를 사용해 만든 풀스택 개인 블로그. 이 블로그입니다.</p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>성과 : FCP 0.6s, LCP 1s, SEO 100점</p>
                </section>

                <section className={projectCardClass} style={projectCardStyle}>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">OA</h3>
                  <p className={`mt-2 ${textClass}`} style={textStyle}>사용한 기술 : Next.js, TailwindCSS, Redux tool kit, flutter, firebase</p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>설명 : Next를 사용해 웹을 만들고 flutter의 웹뷰를 사용해 표현한 AI 설정 앱입니다.</p>
                  <div className="mt-3">
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.jung.oa"
                      className={playStoreButtonClass}
                    >
                      <Image
                        src="/me/google_store_img.png"
                        className="mr-2 h-5 w-5"
                        alt="Google Play"
                        width={24}
                        height={24}
                      />
                      구글 스토어
                    </Link>
                  </div>
                  <Image
                    className={imageClass}
                    style={imageStyle}
                    src="/me/oa_img.png"
                    alt="앱 홍보 이미지"
                    width={400}
                    height={300}
                  />
                </section>

                <section className={projectCardClass} style={projectCardStyle}>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Picka</h3>
                  <p className={`mt-2 ${textClass}`} style={textStyle}>사용한 기술 : flutter</p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>설명 : 직접 만든 루틴들을 `카드` 로 저장하고 매일 한 장을 랜덤으로 뽑아 실행하는 루틴 앱</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link
                      href="https://apps.apple.com/kr/app/picka/id6744289311"
                      className={appStoreButtonClass}
                    >
                      <Image
                        src="/me/apple_store_img.png"
                        className="mr-2 h-5 w-5"
                        alt="Apple Store"
                        width={24}
                        height={24}
                      />
                      애플 스토어
                    </Link>
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.jung.picka"
                      className={playStoreButtonClass}
                    >
                      <Image
                        src="/me/google_store_img.png"
                        className="mr-2 h-5 w-5"
                        alt="Google Play"
                        width={24}
                        height={24}
                      />
                      구글 스토어
                    </Link>
                  </div>
                  <Image
                    className={imageClass}
                    style={imageStyle}
                    src="/me/picka_img.png"
                    alt="앱 홍보 이미지"
                    width={400}
                    height={300}
                  />
                </section>

                <section className={projectCardClass} style={projectCardStyle}>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Timbie</h3>
                  <p className={`mt-2 ${textClass}`} style={textStyle}>사용한 기술 : flutter</p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>설명 : 타임스탬프 카메라</p>
                  <div className="mt-3">
                    <Link
                      href="https://apps.apple.com/us/app/timbie/id6744580069"
                      className={appStoreButtonClass}
                    >
                      <Image
                        src="/me/apple_store_img.png"
                        className="mr-2 h-5 w-5"
                        alt="Apple Store"
                        width={24}
                        height={24}
                      />
                      애플 스토어
                    </Link>
                  </div>
                  <Image
                    className={imageClass}
                    style={imageStyle}
                    src="/me/timbie_img.png"
                    alt="앱 홍보 이미지"
                    width={400}
                    height={300}
                  />
                </section>

                <section className={projectCardClass} style={projectCardStyle}>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)]">RN-shuffle-pincode</h3>
                  <p className={`mt-2 ${textClass}`} style={textStyle}>사용한 기술 : React Native</p>
                  <p className={`mt-1 ${textClass}`} style={textStyle}>설명 : 키패드를 섞는 기능 RN UI 라이브러리</p>
                  <div className="mt-3">
                    <Link
                      href="https://www.npmjs.com/package/@wjdghks963/react-native-shuffle-pincode"
                      className={npmButtonClass}
                    >
                      NPM 주소
                    </Link>
                  </div>
                  <div className="mt-3">
                    <NpmDownloads />
                  </div>
                </section>
              </div>
            </section>

            <section
              className={sectionClass}
              id="courses"
            >
              <h2 className={sectionTitleClass} style={sectionTitleStyle}>수료증</h2>
              <div className="mt-4 space-y-4">
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
              </div>
            </section>
            </div>
          </article>

          <StickyHeader />
        </div>
      </div>
      <FooterStrip />
    </main>
  );
}
