type ImageUrl = string | undefined;

export const RegImageSrc = (data: ImageUrl) => {
  if (data === undefined) return null;
  const findUrl = new RegExp(
    `!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?[)]`,
    "g"
  );

  const src = findUrl.exec(data);
  return src;
};
