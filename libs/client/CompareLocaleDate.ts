const compareLocaleDate = (create: Date | string, update?: Date | string): string => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const convert = new Date(create).toLocaleDateString("ko-KR", options as any);

  if (!update) return convert;

  if (create !== update) {
    const convert = new Date(update).toLocaleDateString("ko-KR", options as any);
    return convert;
  }

  return convert;
};

export default compareLocaleDate;
