import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body;

    try {
      const deletePostTags = await prismaclient.post.delete({
        where: {
          id,
        },
        select: {
          tags: {
            select: {
              tag: true,
            },
          },
        },
      });

      const tags = deletePostTags.tags.map((tag) => tag.tag);

      const tagsPosts = await prismaclient.tag.findMany({
        where: {
          tag: { in: tags },
        },
        include: { _count: true },
      });

      tagsPosts.map(async (post) => {
        if (+post._count.posts === 0) {
          await prismaclient.tag.delete({
            where: { id: post.id },
          });
        }
      });

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ ok: false });
    }
  }
}
