import React from "react";
import TagSpan from "../../../TagSpan";
import MarkdownParser from "@components/Post/MarkdownParser";
import process from 'process'
import {Post, PostsIds} from '@types'
import CommentWriter from '@components/Post/CommentWriter'
import CommentList from '@components/Post/CommentList'
import compareLocaleDate from '@libs/client/CompareLocaleDate'
import TableOfContents from '@components/Post/MarkdownContentTable'
import {RegImageSrc} from '@libs/server/RegImageSrc'
import {Metadata} from 'next'
import PostEditDeleteBox from '@components/Post/PostEditDeleteBox'

type Props = {
    params: {
        id: string,
    },
}




export async function generateMetadata({params}:any):Promise<Metadata>{
    const data:Post = await fetchData(params.id)

    const ImageSrc = RegImageSrc(data.content) ?? null
    const SEOImage = ImageSrc?.substring(1, ImageSrc.length);
    return {
        title:data.title,
        description:data.description,
        keywords:data.tags.join(","),
        openGraph:{
            title:data.title,
            description:data.description,
            images:SEOImage,
        }
    }
}



export default async function Page({ params: { id } }: Props) {

    const postData:Post = await fetchData(id)

    const tags = postData.tags.length !== 0 ? postData.tags.map((tag:{tag:string}) => tag.tag) : [];

    const date = compareLocaleDate(postData.createdAt!, postData.updatedAt!);



    return (


        <div>

            <div className="flex flex-col mx-3 mobile:mx-10 p-5 border-2 border-gray-700 dark:border-white">
                <div className="flex w-full">
                    <span className="w-1/2">{date}</span>
                    <div className="flex flex-row gap-4 w-1/2 justify-end">
                        {tags
                            ? tags.map((tag: string, index: number) => (
                                <TagSpan key={index} tag={tag} clickOk={true} goBlog={true}/>
                            ))
                            : null}
                    </div>
                </div>
                {postData.category ? (
                    <span className="">카테고리 : {postData.category.category}</span>
                ) : null}
                <span className="my-3">조회 : {postData.views}</span>
                <h1 className="font-bold text-5xl mt-10">{postData.title}</h1>
                <TableOfContents markdown={postData.content}/>

                <div className="mt-20 prose h-full">
                    <MarkdownParser markdown={postData.content}/>
                </div>
            </div>
            <PostEditDeleteBox postData={postData}/>
            <div className={'flex flex-col items-center justify-center p-5  mx-3 mobile:mx-10'}>
                <CommentWriter/>
                <CommentList className={'mt-16'} commentList={postData.comments}/>
            </div>
        </div>
    );
}

async function fetchData(id: string) {
    const res = await fetch(
        process.env.APIDOMAIN+`/api/blogs/${id}`,
        { next: { revalidate: 15 } },
    );

    return await res.json();
}


export async function generateStaticParams() {
    const res = await fetch(process.env.APIDOMAIN+`/api/blogs/post/all-post-id`)
    const {postsId}:{postsId: PostsIds} = await res.json()

    return postsId.map(item=>item.id+"")
}
