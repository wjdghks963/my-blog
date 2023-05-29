import prismaclient from "@libs/server/prismaClient";
import {Request} from 'next/dist/compiled/@edge-runtime/primitives/fetch'
import {NextResponse} from 'next/server'

export async function POST(
    req: Request
) {

    const {id} = await req.json();

    try {
        if (id) {
            const comment = await prismaclient.comment.delete({
                where: {id: +id},
            });
            return NextResponse.json(comment)
        } else {
            return NextResponse.json({message: 'Comment Not Found'})
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Failed to delete comment.'})
    }

}
