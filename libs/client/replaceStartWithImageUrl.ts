export const replaceStartWithImageUrl = (content: string, title: string) => {
  if (content.startsWith("![]")) {
    return `이 포스트는 ${title}의 내용입니다.`;
  } else {
    return `${content}...`;
  }
};
