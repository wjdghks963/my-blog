import prismaclient from "@libs/server/prismaClient";

export default async function Tags() {
  const tags = await prismaclient.tag.findMany({
    select: {
      tag: true,
    },
  });

  return tags;
}
