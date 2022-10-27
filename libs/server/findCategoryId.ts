import prismaclient from "./prismaClient";

export const findCategory = async (
  category?: string
): Promise<{ id: number } | null> => {
  if (category === null) return null;
  try {
    const CategoryId = await prismaclient.category.findFirst({
      where: {
        category,
      },
      select: {
        id: true,
      },
    });

    return CategoryId === null ? null : CategoryId;
  } catch (err) {
    console.log(err);
  }
  return null;
};
