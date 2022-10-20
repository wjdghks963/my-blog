import prismaclient from "@libs/server/prismaClient";

export default async function AllPostId(): Promise<{ id: number }[]> {
  const postsId = await prismaclient.post.findMany({
    select: {
      id: true,
    },
  });

  return postsId;
}
