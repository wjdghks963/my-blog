const compareLocaleDate = (
  create: Date | string,
  update: Date | string
): string => {
  if (create !== update) {
    const convert = new Date(update).toLocaleDateString();
    return convert.substring(0, convert.length - 1);
  }

  const convert = new Date(create).toLocaleDateString();
  return convert.substring(0, convert.length - 1);
};

export default compareLocaleDate;
