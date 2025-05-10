export function getDomainFromImageUrl(imageUrl: string): string | undefined {
  const domains = ["kakaocdn", "googleusercontent", "twimg", "githubusercontent"];
  const matches = imageUrl.match(/\/\/([^/]+)/);
  if (!matches) {
    return undefined;
  }
  const [, domain] = matches;
  const domainName = domains.find((d) => domain.includes(d));

  switch (domainName) {
    case "kakaocdn": {
      return "https://img.icons8.com/doodle/480/null/kakaotalk.png";
    }
    case "googleusercontent": {
      return "https://img.icons8.com/color/480/null/google-logo.png";
    }
    case "twimg": {
      return "https://img.icons8.com/color/480/null/twitter--v1.png";
    }
    case "githubusercontent": {
      return "https://img.icons8.com/ios-filled/500/null/github.png";
    }
  }
}
