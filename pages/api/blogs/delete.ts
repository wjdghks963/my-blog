import prismaclient from "@libs/server/prismaclient";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPostJson } from "pages/blogs/post";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body.query;

    return res.status(200).json({ ok: true });
  }
}
