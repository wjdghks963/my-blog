const compareLocaleDate = (
  create: Date | string,
  update: Date | string
): string => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (create !== update) {
    const convert = new Date(update).toLocaleDateString(
      "ko-KR",
      options as any
    );
    return convert;
  }

  const convert = new Date(create).toLocaleDateString("ko-KR", options as any);
  return convert;
};

export default compareLocaleDate;
