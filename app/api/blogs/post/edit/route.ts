import { findTags } from "@libs/server/findTags";
import prismaclient from "@libs/server/prismaClient";

import {NextResponse} from 'next/server'
import {PostPostJson} from '@types'
import {findCategory} from '@libs/server/findCategoryId'


export async function POST(req: Request) {

    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id') ? parseInt(searchParams.get('id')+"") : 1;


    const {  title, markdown, tags, description, category }: PostPostJson = await req.json();


    try {

        const tagsId = await findTags(tags!);
        const CategoryId = await findCategory(category ?? "");


          await prismaclient.post.update({
              data: {
                  title: title!,
                  content: markdown!,
                  tags: {
                      set:[],
                      connect: tagsId?.map((itemId) => ({id: itemId})),
                  },
                  description,
                  category: category ? {
                      disconnect:true,
                      connect: {id: CategoryId?.id}
                  } : {},
              },
              where: {
                  id,
              },
          });

        return NextResponse.json({ok: true});
      }

    catch (err) {
        console.log(err);
        return NextResponse.json({ok: false, message: `error occurred ${err}`});
    }

}

