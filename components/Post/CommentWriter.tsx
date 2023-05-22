"use client"

import {useMutation} from "@libs/client/useMutation";
import {FormEvent, useRef} from "react";
import {useRouter} from "next/navigation";
import {Session} from "next-auth";
import {cls} from "@libs/client/utils";
import LoadingSpinner from "@components/Base/LoadingSpinner";
import UserInfoBox from "@components/Comment/UserInfoBox";
import {CommentPostJson, UserInfo} from '@types'
import {useSession} from 'next-auth/react'


export default function CommentWriter({a, className}:{a?: Session | null, className?:string}){
    const session = useSession();
    const router = useRouter();
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [postComment, {data:postResponseData, loading:postLoading, error:postError}] =useMutation('/api/comment/post');
    const isLoggedIn = session?.user;

    const userInfo:UserInfo = {image: session?.user?.image ?? "", name: session?.user?.name ?? "", email:session?.user?.email ?? ""}

    const textAreaPlaceholder = session ? "댓글 등록 이후 1분이 지나면 확인 할 수 있습니다." : "댓글을 등록하려면 로그인이 필요합니다."
    const redirectToProfile  = () =>{
        if(!isLoggedIn){
            return router.push("/auth/profile")
        }
        return ;
    }


    const submitComment = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(postLoading || !isLoggedIn) return;
        const {id:postId} = router.query
        const commentContent = commentRef.current?.value;

        if(commentContent){
            const postData :CommentPostJson= {
                postId: postId+"",
                userEmail: session?.user?.email+"" ,
                content: commentContent+"",
            }
            await postComment(postData).then(()=>commentRef.current!.value="")
        }else{
            return;
        }

    }



    return <div className={'flex justify-center w-2/3 gap-4 ml-3'} onClick={redirectToProfile}>
        {session ? <UserInfoBox userInfo={userInfo}/> : null}
        <form className={'flex gap-4 w-full'} onSubmit={(event)=>submitComment(event)}>
            <textarea placeholder={textAreaPlaceholder} disabled={!isLoggedIn} className={cls(!!isLoggedIn ? '':'cursor-not-allowed','w-full thin-round-border resize-none p-2 focus:outline-none')} ref={commentRef}/>
            <button className={'h-full w-16 thin-round-border m-auto text-center hover:ring-2 hover:ring-offset-2 hover:ring-black'}>{postLoading ? <LoadingSpinner />:"등록"}</button>
        </form>
    </div>
}
