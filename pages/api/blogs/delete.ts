import prismaclient from "@libs/server/prismaclient";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPostJson } from "pages/blogs/post";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body.query;

    //     const deleted = await prismaclient.post.delete({
    //       where: {
    //         id: +id,
    //       },
    //     });
    //     if (deleted) {
    //       return res.status(200).json({ ok: true });
    //     }

    await prismaclient.post.deleteMany();
    await prismaclient.tag.deleteMany();
    await prismaclient.postTag.deleteMany();
  }
}
