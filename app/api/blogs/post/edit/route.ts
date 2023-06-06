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
        const tagsArray = tags?.map(item=>item);
      // 같은 tag가 존재한다면 해당 tag id 반환
      const [tagsTag, tagsId] = await findTags(tagsArray);
        const CategoryId = await findCategory(category ?? "");

      if (tagsTag?.length === 0 || (tags && tags.length > [tagsTag].length)) {
        let filterTags = tags?.filter((item) => !tagsTag?.includes(item))

        filterTags &&
          (await prismaclient.tag.createMany({
            data: filterTags?.map((tag) => ({ tag})),
            skipDuplicates: true,
          }));

          const combinedTags = [...new Set(tagsTag!.concat(filterTags!))];

          const relatedTags = await prismaclient.tag.findMany({
              where: {
                  tag: {in: combinedTags},
              },
          });


          await prismaclient.post.update({
              data: {
                  title: title!,
                  content: markdown!,
                  tags: {
                      connect: relatedTags.map((tag) => ({id: +tag.id})),
                  },
                  description,
                  category: category ? {connect: {id: CategoryId?.id}} : {},
              },
              where: {
                  id,
              },
          });
      } else {
          await prismaclient.post.update({
              data: {
                  title: title!,
                  content: markdown!,
                  description,
                  tags: {
                      connect: tagsId!.map((tag) => ({id: +tag})),
                  },
                  category: category ? {connect: {id: CategoryId?.id}} : {},
              },
              where: {
                  id,
              },
          });
      }

        if (tags?.length === 0) {
            await prismaclient.post.update({
                data: {
                    title: title!,
                    content: markdown!,
                    description,
                    category: category ? {connect: {id: CategoryId?.id}} : {},

                },
                where: {
                    id,
                },
            });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ok: false, message: `error occurred ${err}`});
    }

    return NextResponse.json({ok: true});
}

