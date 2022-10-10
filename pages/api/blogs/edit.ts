import prismaclient from "@libs/server/prismaclient";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPostJson } from "pages/blogs/post";

export default async function Edit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.body.query;
    const { title, markdown, tags }: IPostJson = req.body;

    // await prismaclient.post.upsert({
    //   where: {
    //     id: +id,
    //   },
    //   update: {
    //     title,
    //     content: markdown,
    //   },
    //   create: {},
    // });

    // tags?.map(async (tag) => {
    //     await prismaclient.tag.create({
    //       data: {
    //         tag,
    //         postId: postId.id,
    //       },
    //     });
    //   });

    return res.status(200).json({ ok: true });
  }
}
