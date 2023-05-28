type ImageUrl = string | undefined;

export const RegImageSrc = (data: ImageUrl) => {

  if (data === undefined || data === null) return null;
  const findUrl = new RegExp(
    `!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?[)]`,
    "g"
  );
  const withArray = findUrl.exec(data);
    return withArray?.groups!.filename.slice(1);
};
