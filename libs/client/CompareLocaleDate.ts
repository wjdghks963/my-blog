const compareLocaleDate = (create: Date, update: Date): string => {
  if (create !== update) {
    const convert = new Intl.DateTimeFormat("kr").format(new Date(update));
    return convert;
  }

  const convert = new Intl.DateTimeFormat("kr").format(new Date(create));
  return convert;
};

export default compareLocaleDate;
