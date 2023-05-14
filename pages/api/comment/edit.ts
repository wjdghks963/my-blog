import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function edit(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id, content } = req.body;
    try {
        const comment = await prismaclient.comment.update({
            where: { id: +id },
            data: { content },
        });
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update comment.' });
    }
}
