const localeDate = (date: Date): string => {
  const convert = new Date(date).toLocaleDateString();
  return convert.substring(0, convert.length - 1);
};

export default localeDate;
