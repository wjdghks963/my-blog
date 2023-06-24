import prismaclient from "./prismaClient";

export const findCategory = async (category?: string): Promise<{ id: number } | null> => {
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

    const confirmCategoryId = async () => {
      if (CategoryId === null && category !== "") {
        const newCategory = await prismaclient.category.create({
          data: {
            category: category!,
          },
          select: {
            id: true,
          },
        });
        return newCategory;
      }

      return CategoryId;
    };

    return confirmCategoryId();
  } catch (err) {
    console.log(err);
  }
  return null;
};
