import PostWithThumbnail from '@components/Home/PostWithThumbnail'
import React from 'react'
import {PostStatus, ThumbnailPostData} from '@types'
import process from 'process'


// @ts-ignore
export default async function PostsByStatus({status}:{status:PostStatus}) :any {
   const data =  await fetchData(status)

    return <div className="flex gap-2">
        {data?.json?.map((post : ThumbnailPostData, index:number) => {
            return <PostWithThumbnail key={index} data={post} className={index===8 ? "hidden mobile:flex":""}/>;
        })}
    </div>
}

async function fetchData(status:PostStatus) {
    const res = await fetch(
        process.env.APIDOMAIN+`/api/main/${status}`,
        { cache: 'no-store' },
    );
    return await res.json();
}
