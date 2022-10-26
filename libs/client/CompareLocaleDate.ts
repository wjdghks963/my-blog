const compareLocaleDate = (create: Date, update: Date): string => {
  if (create !== update) {
    const convert = new Date(update).toLocaleDateString();
    return convert.substring(0, convert.length - 1);
  }

  const convert = new Date(create).toLocaleTimeString();
  return convert.substring(0, convert.length - 1);
};

export default compareLocaleDate;
