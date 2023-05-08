import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function post(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { postId, userId, content }:{postId:string, userId:string, content:string} = req.body;
    try {
        const comment = await prismaclient.comment.create({
            data: {
                content,
                user: { connect: { id: +userId } },
                post: { connect: { id: +postId } },
            },
        });
        return res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create comment.' });
    }

}
