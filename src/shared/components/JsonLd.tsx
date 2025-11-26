import React from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 사이트 전체 정보
export const SITE_CONFIG = {
  name: "Jung's Tech Blog",
  url: "https://www.junglog.xyz",
  description:
    "프론트엔드 개발을 중심으로, 서버 인프라까지 다양한 기술 분야를 학습하고 다루는 최정환의 기술 블로그입니다.",
  author: {
    name: "최정환",
    url: "https://www.junglog.xyz/about-me",
    github: "https://github.com/wjdghks963",
    linkedin: "https://www.linkedin.com/in/junghwan-choi-a238b1228",
  },
  language: "ko-KR",
};

// WebSite 스키마 (홈페이지용)
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.language,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blogs?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Organization 스키마
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.author.url,
    sameAs: [SITE_CONFIG.author.github, SITE_CONFIG.author.linkedin],
  };
}

// BlogPosting 스키마 (블로그 포스트용)
type BlogPostSchemaProps = {
  title: string;
  description: string;
  content: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
  category?: string;
  tags?: string[];
};

export function getBlogPostingSchema({
  title,
  description,
  content,
  datePublished,
  dateModified,
  url,
  image,
  category,
  tags,
}: BlogPostSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    articleBody: content.substring(0, 5000), // 본문 일부만 포함
    datePublished: datePublished,
    dateModified: dateModified,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
    ...(category && { articleSection: category }),
    ...(tags && tags.length > 0 && { keywords: tags.join(", ") }),
    inLanguage: SITE_CONFIG.language,
  };
}

// BreadcrumbList 스키마 (네비게이션용)
type BreadcrumbItem = {
  name: string;
  url: string;
};

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Person 스키마 (About Me 페이지용)
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.author.url,
    jobTitle: "Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "프리텔레콤",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "React Native",
      "TailwindCSS",
      "Redux Toolkit",
      "React Query",
      "Spring Boot",
      "Docker",
      "AWS",
    ],
    sameAs: [SITE_CONFIG.author.github, SITE_CONFIG.author.linkedin],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "정보처리기사",
    },
  };
}

// ProfilePage 스키마 (About Me 페이지용)
export function getProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: getPersonSchema(),
    dateCreated: "2022-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}
