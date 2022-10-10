import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  // TODO:: prisma 정상 저장완료시 ok 반환
  return res.status(200).json({ ok: true });
}
