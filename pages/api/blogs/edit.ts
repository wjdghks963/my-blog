import { findTags } from "@libs/server/findTags";
import prismaclient from "@libs/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

import { EditPost } from "store/modules/editPost";

export default async function Edit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, title, markdown, tags }: EditPost = req.body;

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
            views: 0,
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
            views: 0,
          },
          where: {
            id,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ ok: false, message: `error occurred ${err}` });
    }

    return res.status(200).json({ ok: true });
  }
}
