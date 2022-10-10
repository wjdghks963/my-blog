import prismaclient from "@libs/server/prismaclient";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPostJson } from "pages/blogs/post";

export default async function Post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, markdown, tags }: IPostJson = req.body;

    // 같은 tag가 존재한다면 해당 tag id 반환
    const tagsIdArray = await prismaclient.tag.findMany({
      where: {
        tag: { in: tags },
      },
      select: {
        id: true,
        tag: true,
      },
    });

    const tagsTag = tagsIdArray.map((tag) => tag.tag);
    const tagsId = tagsIdArray.map((tag) => Number(tag.id));

    // 만약 해당하는 tag id가 없거나 tags, tagsTag 길이다 다르다면 추가한다.
    if (tagsTag === null || (tags && tags?.length > [tagsTag].length)) {
      let filterTags = tags?.filter((tag) => !tagsTag.includes(tag));
      filterTags?.map(async (tag) => {
        const plusId = await prismaclient.tag.create({
          data: {
            tag,
          },
          select: {
            id: true,
          },
        });
        tagsId.push(plusId.id);
      });
    }

    const postId = await prismaclient.post.create({
      data: {
        title: title!,
        content: markdown!,
      },
      select: {
        id: true,
      },
    });

    tagsId.map(async (tagId) => {
      console.log(postId);
      await prismaclient.postTag.create({
        data: {
          tagId: +tagId,
          postId: +postId.id,
        },
      });
    });

    return res.status(200).json({ ok: true });
  }
}
