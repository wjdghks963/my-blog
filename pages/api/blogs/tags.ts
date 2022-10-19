import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Tags(req: NextApiRequest, res: NextApiResponse) {
  const tags = await prismaclient.tag.findMany({
    select: {
      tag: true,
    },
  });

  return res.status(200).json(tags);
}
