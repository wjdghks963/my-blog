import prismaclient from "./prismaClient";

export const findTags = async (tags: string[]): Promise<number[] | null> => {
  if (tags[0] !== "") {
    const tagsObjectArray = await prismaclient.tag.findMany({
      where: {
        tag: { in: tags },
      },
      select: {
        id: true,
        tag: true,
      },
    });

    const filterTags = tags?.filter((tag) => !tagsObjectArray.map((item) => item.tag).includes(tag));

    if (filterTags.length !== 0) {
      await prismaclient.tag.createMany({
        data: filterTags?.map((tag) => ({ tag })),
        skipDuplicates: true,
      });

      const onlyTagsObjectArray = tagsObjectArray.map((item) => item.tag);

      const combinedTags = [...new Set(onlyTagsObjectArray!.concat(filterTags))];
      const relatedTags = await prismaclient.tag.findMany({
        where: {
          tag: { in: combinedTags },
        },
        select: {
          id: true,
        },
      });

      return relatedTags.map((item) => item.id);
    } else {
      return tagsObjectArray.map((item) => item.id);
    }
  }
  return null;
};
