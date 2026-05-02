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

  if (isLoading) return <span className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-muted">Loading downloads…</span>;
  if (error) return <span className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-muted">Failed to load downloads</span>;

  return (
    <span className="inline-flex items-center gap-2 border border-ink bg-paper-soft px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.24em]">
      Total Downloads · <span className="tabular-nums text-brand">{data?.downloads?.toLocaleString() ?? "N/A"}</span>
    </span>
  );
};

const ProjectImage = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    className="mt-6 w-full max-w-3xl border-[1.5px] border-ink"
    src={src}
    alt={alt}
    width={1200}
    height={900}
  />
);

export default function Blogs() {
  const sectionClass = "border-t border-soft pt-10";
  const sectionTitleClass = "font-display text-3xl font-bold tracking-[-0.02em] mobile:text-4xl";
  const sectionEyebrow = "eyebrow";
  const textClass = "text-base mobile:text-lg text-ink-soft";
  const linkBtn = "btn-ghost";
  const projectClass = "border-t-[1.5px] border-ink pt-8 mt-10";

  return (
    <main className="min-h-screen pb-20">
      <section className="border-b-[1.5px] border-ink">
        <div className="page-shell pt-10 mobile:pt-14">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Section</span>
            <span className="eyebrow">Colophon</span>
          </div>
          <hr className="rule-thick mt-3" />
          <div className="grid gap-8 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="display-headline text-5xl mobile:text-7xl lg:text-8xl">About.</h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-soft">
                문제를 빠르게 해결하면서도 구조적 개선까지 설계하는 개발자입니다.
                서비스 안정성과 팀 생산성을 함께 높이는 개발 경험을 쌓아가고 있습니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="https://github.com/wjdghks963"
                  className={linkBtn}
                >
                  GitHub ↗
                </Link>
                <Link
                  href="https://www.linkedin.com/in/junghwan-choi-a238b1228"
                  className={linkBtn}
                >
                  LinkedIn ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell pt-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article>
            <section
              className={sectionClass}
              id="outcomes"
            >
              <span className={sectionEyebrow}>01 · Outcomes</span>
              <h2 className={`mt-2 ${sectionTitleClass}`}>주요 성과</h2>
              <div className="mt-6 grid gap-0 border-y-[1.5px] border-ink sm:grid-cols-3">
                <div className="border-r border-soft px-4 py-5">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-muted">런타임 오류</span>
                  <p className="mt-2 font-display text-3xl font-bold text-brand">−90%</p>
                </div>
                <div className="border-r border-soft px-4 py-5">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-muted">이벤트 리드타임</span>
                  <p className="mt-2 font-display text-3xl font-bold text-brand">7→3 days</p>
                </div>
                <div className="px-4 py-5">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-muted">메시지 비용</span>
                  <p className="mt-2 font-display text-3xl font-bold text-brand">−80%</p>
                </div>
              </div>
            </section>

            <section
              className={sectionClass}
              id="career"
            >
              <span className={sectionEyebrow}>02 · Career</span>
              <h2 className={`mt-2 ${sectionTitleClass}`}>경력</h2>
              <div className="mt-4 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
                {[
                  { title: "프리텔레콤", role: "웹 개발자 (Spring & jQuery)", period: "2024.02 – 현재" },
                  { title: "해커스 홀딩스", role: "프론트엔드 개발자", period: "2023.05 – 2023.09" },
                  { title: "코인 고스트 (인턴)", role: "안드로이드 개발자", period: "2022.06 – 2022.08" },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="grid gap-2 py-4 mobile:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <p className="font-display text-lg font-bold tracking-[-0.01em]">{c.title}</p>
                      <p className="text-sm text-ink-soft">{c.role}</p>
                    </div>
                    <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{c.period}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className={sectionClass}
              id="certifications"
            >
              <span className={sectionEyebrow}>03 · Certifications</span>
              <h2 className={`mt-2 ${sectionTitleClass}`}>자격증</h2>
              <ul className="mt-4 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
                <li className="grid gap-2 py-3 mobile:grid-cols-[1fr_auto]">
                  <span className={textClass}>정보처리기사</span>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">2023.09</span>
                </li>
                <li className="grid gap-2 py-3 mobile:grid-cols-[1fr_auto]">
                  <Link
                    href="https://www.credly.com/badges/5a24b923-2e52-413e-ab41-0e2fe7b21846/linked_in_profile"
                    className={`${textClass} text-brand underline underline-offset-[6px] decoration-[1.5px]`}
                  >
                    AWS Certified Solutions Architect – Associate (SAA-C03)
                  </Link>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">2024.06</span>
                </li>
                <li className="grid gap-2 py-3 mobile:grid-cols-[1fr_auto]">
                  <span className={textClass}>SQLD</span>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">2025.06</span>
                </li>
                <li className="grid gap-2 py-3 mobile:grid-cols-[1fr_auto]">
                  <span className={textClass}>투자자산운용사</span>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">2026.01</span>
                </li>
              </ul>
            </section>

            <section
              className={sectionClass}
              id="skills"
            >
              <span className={sectionEyebrow}>04 · Skills</span>
              <h2 className={`mt-2 ${sectionTitleClass}`}>기술스택</h2>
              <div className="mt-4 grid gap-4 border-y border-[var(--line-soft)] py-4 mobile:grid-cols-[140px_1fr]">
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-muted">Comfortable</span>
                <p className={textClass}>Next.js, React Native, TailwindCSS, Redux toolkit, React Query, Spring Boot</p>
              </div>
              <div className="grid gap-4 border-b border-[var(--line-soft)] py-4 mobile:grid-cols-[140px_1fr]">
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-muted">Learning</span>
                <p className={textClass}>Docker, SQL</p>
              </div>
            </section>

            <section
              id="projects"
              className={sectionClass}
            >
              <span className={sectionEyebrow}>05 · Projects</span>
              <h2 className={`mt-2 ${sectionTitleClass}`}>프로젝트</h2>

              <section className={projectClass}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Flow5</h3>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">flutter · i18n</span>
                </div>
                <p className={`mt-2 ${textClass}`}>flutter를 사용한 타이머 앱.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="https://apps.apple.com/us/app/flow5/id6689514669"
                    className={linkBtn}
                  >
                    App Store ↗
                  </Link>
                </div>
                <ProjectImage
                  src="/me/flow5_img.png"
                  alt="Flow5 promotional image"
                />
              </section>

              <section className={projectClass}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Planet Diary</h3>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">flutter · spring · aws · openai</span>
                </div>
                <p className={`mt-2 ${textClass}`}>
                  식물 일지를 작성하며 유저들과 소통하고 AI를 통해 식물에 대한 정보나 도움을 받을 수 있습니다.
                  디자인부터 배포까지 풀사이클 개인 프로젝트.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="https://apps.apple.com/kr/app/planet-diary/id6473107463"
                    className={linkBtn}
                  >
                    App Store ↗
                  </Link>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.jung.planet"
                    className={linkBtn}
                  >
                    Google Play ↗
                  </Link>
                </div>
                <ProjectImage
                  src="/me/planet_img.png"
                  alt="Planet Diary promotional image"
                />
              </section>

              <section className={projectClass}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">개인 블로그</h3>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">next · tailwind · prisma</span>
                </div>
                <p className={`mt-2 ${textClass}`}>Next로 만든 풀스택 개인 블로그. 이 블로그입니다.</p>
                <p className={`mt-1 ${textClass}`}>성과: FCP 0.6s · LCP 1s · SEO 100점</p>
              </section>

              <section className={projectClass}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">OA</h3>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">next · flutter · firebase</span>
                </div>
                <p className={`mt-2 ${textClass}`}>Next로 웹을 만들고 flutter 웹뷰로 표현한 AI 설정 앱.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.jung.oa"
                    className={linkBtn}
                  >
                    Google Play ↗
                  </Link>
                </div>
                <ProjectImage
                  src="/me/oa_img.png"
                  alt="OA promotional image"
                />
              </section>

              <section className={projectClass}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Picka</h3>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">flutter</span>
                </div>
                <p className={`mt-2 ${textClass}`}>직접 만든 루틴들을 카드로 저장하고 매일 한 장을 랜덤으로 뽑아 실행하는 루틴 앱.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="https://apps.apple.com/kr/app/picka/id6744289311"
                    className={linkBtn}
                  >
                    App Store ↗
                  </Link>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.jung.picka"
                    className={linkBtn}
                  >
                    Google Play ↗
                  </Link>
                </div>
                <ProjectImage
                  src="/me/picka_img.png"
                  alt="Picka promotional image"
                />
              </section>

              <section className={projectClass}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Timbie</h3>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">flutter</span>
                </div>
                <p className={`mt-2 ${textClass}`}>타임스탬프 카메라.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="https://apps.apple.com/us/app/timbie/id6744580069"
                    className={linkBtn}
                  >
                    App Store ↗
                  </Link>
                </div>
                <ProjectImage
                  src="/me/timbie_img.png"
                  alt="Timbie promotional image"
                />
              </section>

              <section className={projectClass}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">RN-shuffle-pincode</h3>
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">react native</span>
                </div>
                <p className={`mt-2 ${textClass}`}>키패드를 섞는 기능 RN UI 라이브러리.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="https://www.npmjs.com/package/@wjdghks963/react-native-shuffle-pincode"
                    className={linkBtn}
                  >
                    NPM ↗
                  </Link>
                  <NpmDownloads />
                </div>
              </section>
            </section>

            <section
              className={sectionClass}
              id="courses"
            >
              <span className={sectionEyebrow}>06 · Courses</span>
              <h2 className={`mt-2 ${sectionTitleClass}`}>수료증</h2>
              <div className="mt-4">
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
          </article>

          <StickyHeader />
        </div>
      </div>
    </main>
  );
}
