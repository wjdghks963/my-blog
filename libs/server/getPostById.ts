import prismaclient from "@libs/server/prismaClient";
import { Tag } from "@prisma/client";
import {NextRequest, NextResponse} from 'next/server'
import {UserInfo} from '@types'



export interface Comment{id:number, user:UserInfo,content:string }


  export interface IPost {
  title: string;
  content: string;
  views: number;
  tags: Tag[];
  description: string;
  category: { category: string } | null;
  createdAt: Date;
  updatedAt: Date;
  comments: (Comment | null) [];
}

export async function getPostById(id:string) {

  try {
    const post: IPost = await prismaclient.post.update({
      data: {
        views: {
          increment: 1,
        },
      },
      where: {
        id: +id!,
      },
      select: {
        title: true,
        content: true,
        views: true,
        tags: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            category: true,
          },
        },
        comments:{
          select: {
            id:true,
            content:true,
            user:{
              select:{
                email:true,
                name:true,
                image:true,
              }
            }
          }
        }
      },
    });


    return NextResponse.json({
      title: post?.title,
      content: post?.content,
      views: post?.views,
      tags: post?.tags,
      comments:post?.comments,
      description: post?.description,
      category: post?.category,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    })
  } catch (err) {
    console.log(err);
    return { ok: false, message: `error occurred ${err}` };
  }
}
