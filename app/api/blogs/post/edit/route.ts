import { findTags } from "@libs/server/findTags";
import prismaclient from "@libs/server/prismaClient";

import {NextResponse} from 'next/server'
import {EditPost} from '@types'

export  async function POST(req: Request) {

    const { id, title, markdown, tags, description }: EditPost = await req.json();

    try {
      // 같은 tag가 존재한다면 해당 tag id 반환
      const [tagsTag, tagsId] = await findTags(tags);

      if (tagsTag?.length === 0 || (tags && tags.length > [tagsTag].length)) {
        let filterTags = tags?.filter((tag) => !tagsTag?.includes(tag));

        filterTags &&
          (await prismaclient.tag.createMany({
            data: filterTags?.map((tag) => ({ tag })),
            skipDuplicates: true,
          }));

        const combinedTags = [...new Set(tagsTag!.concat(filterTags!))];

        const relatedTags = await prismaclient.tag.findMany({
          where: {
            tag: { in: combinedTags },
          },
        });

        await prismaclient.post.update({
          data: {
            title: title!,
            content: markdown!,
            tags: {
              connect: relatedTags.map((tag) => ({ id: +tag.id })),
            },
            description,
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
              connect: tagsId!.map((tag) => ({ id: +tag })),
            },
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
          },
          where: {
            id,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ ok: false, message: `error occurred ${err}` });
    }

    return NextResponse.json({ ok: true });
  }

