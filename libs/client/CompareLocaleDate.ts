const localeDate = (date: Date, _date: Date): string => {
  const one = new Date(date);
  const two = new Date(_date);

  switch (one > two) {
    case true: {
      const convert = one.toLocaleDateString();
      return convert.substring(0, convert.length - 1);
    }
    case false: {
      const convert = two.toLocaleDateString();
      return convert.substring(0, convert.length - 1);
    }
    default: {
      const convert = one.toLocaleDateString();
      return convert.substring(0, convert.length - 1);
    }
  }
};

export default localeDate;
