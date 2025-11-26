export function cls(...clasName: string[]) {
  return clasName.join(" ");
}

export function setCollapse(content: string, limit: number) {
  if (content.length > limit) {
    return content.substring(0, limit) + "...";
  } else {
    return content;
  }
}

/**
 * 마크다운 콘텐츠의 예상 읽기 시간을 계산합니다.
 * 한국어 기준 분당 약 500자, 영어 기준 분당 약 200단어
 * @param content - 마크다운 콘텐츠
 * @returns 읽기 시간 (분)
 */
export function getReadingTime(content: string): number {
  if (!content) return 0;

  // 마크다운 문법 제거
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
    .replace(/`[^`]*`/g, "") // 인라인 코드 제거
    .replace(/!\[.*?\]\(.*?\)/g, "") // 이미지 제거
    .replace(/\[.*?\]\(.*?\)/g, "") // 링크 제거
    .replace(/#{1,6}\s/g, "") // 헤딩 제거
    .replace(/[*_~]+/g, "") // 강조 문법 제거
    .replace(/>\s/g, "") // 인용문 제거
    .replace(/\n+/g, " ") // 줄바꿈을 공백으로
    .trim();

  // 한국어 문자 수 (한글, 한자 등)
  const koreanChars = (plainText.match(/[\u3131-\uD79D]/g) || []).length;
  // 영어 단어 수
  const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length;

  // 한국어: 500자/분, 영어: 200단어/분
  const koreanMinutes = koreanChars / 500;
  const englishMinutes = englishWords / 200;

  const totalMinutes = koreanMinutes + englishMinutes;

  // 최소 1분으로 표시
  return Math.max(1, Math.round(totalMinutes));
}
