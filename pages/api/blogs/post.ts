import prismaclient from "@libs/server/prismaclient";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPostJson } from "pages/blogs/post";

export default async function Post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, markdown, tags }: IPostJson = req.body;

    const postId = await prismaclient.post.create({
      data: {
        title: title!,
        content: markdown!,
      },
      select: {
        id: true,
      },
    });

    tags?.map(async (tag) => {
      await prismaclient.tag.create({
        data: {
          tag,
          postId: postId.id,
        },
      });
    });

    return res.status(200).json({ ok: true });
  }
}
