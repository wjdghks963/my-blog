import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPostJson } from "pages/blogs/post";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body;

    try {
      await prismaclient.post.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ ok: false });
    }
  }
}
