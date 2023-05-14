import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";


export interface CommentPostJson {
    postId:string,
    userEmail:string,
    content:string
}

export default async function post(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { postId, userEmail, content }:CommentPostJson= req.body;

    try {
        const comment = await prismaclient.comment.create({
            data: {
                content,
                user: { connect: { email: userEmail } },
                post: { connect: { id: +postId } },
            },
        });
        return res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create comment.' });
    }

}
