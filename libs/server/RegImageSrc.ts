type ImageUrl = string | undefined;

export const RegImageSrc = (data: ImageUrl) => {
  if (data === undefined || data === null) return null;

  if (data) {
    const imageRegex = /!\[([^\]]*)\]\(([^)]*)\)/;

    // @ts-ignore
    return data.match(imageRegex) ? data?.match(imageRegex)[2] : null;
  }
};
