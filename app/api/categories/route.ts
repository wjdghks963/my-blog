import prismaclient from "@libs/server/prismaClient";
import {NextResponse} from 'next/server'
import {Request} from 'next/dist/compiled/@edge-runtime/primitives/fetch'



export async function GET(_: Request) {
    try {

        const categories = await prismaclient.category.findMany({
            orderBy: {category: "desc"},
            select: {
                category: true,
                posts: {
                    select: {
                        title: true,
                        id: true,
                    },
                },
            },
        });

        return NextResponse.json({categories});
    } catch (err) {
        console.error(err)
        return NextResponse.json({ok: false, error_message: err})
    }
}
