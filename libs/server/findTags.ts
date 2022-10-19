import prismaclient from "@libs/server/prismaClient";

export const findTags = async (
  tags: string[] | undefined | void
): Promise<[string[], number[]] | [null, null]> => {
  if (tags) {
    const tagsIdArray = await prismaclient.tag.findMany({
      where: {
        tag: { in: tags },
      },
      select: {
        id: true,
        tag: true,
      },
    });

    const tagsTag = tagsIdArray.map((tag) => tag.tag);
    const tagsId = tagsIdArray.map((tag) => Number(tag.id));

    return [tagsTag, tagsId];
  }
  return [null, null];
};
