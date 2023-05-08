import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Delete(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    try {
        if(id){
            const comment = await prismaclient.comment.delete({
                where: { id: +id },
            });
            return res.status(200).json(comment);
        }else{
            return res.status(400).json('Comment Not Found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete comment.' });
    }

}
