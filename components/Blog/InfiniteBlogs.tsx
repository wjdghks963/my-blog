"use client"

import MiniPost from '@components/Post/MiniPost'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import useTagSelector from '@libs/client/useTagSelector'
import useQuerySelector from '@libs/client/useQuerySelector'
import {useInfiniteQuery} from '@tanstack/react-query'
import {PostWithId} from '@types'
import Loading from '@components/Base/Loading'



const getPosts = async (query?:string, tag?:string , pageParam?:number) =>{
    const response = await fetch(`/api/blogs?query=${query}&tag=${tag}&page=${pageParam}&limit=5`);
    return response.json()
}


export default function InfiniteBlogs() {
    const [loading, setLoading] = useState(true);
    const loadingRef = useRef<HTMLDivElement>(null);
    const {tag} = useTagSelector();
    const {query} = useQuerySelector();


    const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery(
        {
            queryKey: ['posts', tag, query],
            queryFn:({pageParam=1}) =>getPosts( query, tag, pageParam),
            getNextPageParam: (lastPage, pages) => pages[pages.length -1].hasNextPage ? pages.length + 1 : false,
        },
    );

    const allData = useMemo(() => (data ? data.pages.reduce((prev, curr) => prev.concat(curr.data), []) : []), [data]);
    const halfOfAllDataLength = Math.floor(allData.length / 2);


    const handleObserver: IntersectionObserverCallback = useCallback(
        (entries) => {
            const target = entries[0];

            if (target.isIntersecting && hasNextPage) {
               return fetchNextPage()
            }
        },
        [isLoading, loading]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0.2,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loadingRef.current) observer.observe(loadingRef.current);
        return () => observer.disconnect();
    }, [handleObserver,loadingRef]);


    useEffect(()=>{
        setLoading(false)
    },[isLoading])


    return(
        <>
        <div className="flex flex-col items-center mt-20 pb-10 gap-14">
            {allData.length === 0 && !isLoading
                ? "결과 없음"
                : allData?.map((data:PostWithId, index:number) => <MiniPost key={data.id} data={data} isRef={index === halfOfAllDataLength ? loadingRef : null}/>)}
            {isLoading ? <Loading/> : null}
        </div>
    </>
)
}
