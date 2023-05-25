"use client"

import {FormEvent, useRef} from "react";
import {useParams, useRouter} from "next/navigation";
import {cls} from "@libs/client/utils";
import LoadingSpinner from "@components/Base/LoadingSpinner";
import UserInfoBox from "@components/Comment/UserInfoBox";
import {CommentPostJson, UserInfo} from '@types'
import {useSession} from 'next-auth/react'
import {useMutation} from '@tanstack/react-query'


const postComment = async (commentJson:CommentPostJson) => {
    return await fetch(`/api/comment/post`, {
        method: 'POST',
        body: JSON.stringify(commentJson),
    });
};


export const dynamic = 'force-dynamic';



export default function CommentWriter({ className}:{session?:any,className?:string}){

    const session = useSession();
    const router = useRouter();
    const {id:postId} = useParams()
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const postCommentMutation = useMutation((formData:CommentPostJson)=>postComment(formData));

    const isLoggedIn = session.data?.user

    const userInfo:UserInfo = {image: session.data?.user?.image ?? "", name: session.data?.user?.name ?? "", email:session.data?.user?.email ?? ""}

    const textAreaPlaceholder = session ? "댓글 등록 이후 10초가 지나면 확인 할 수 있습니다." : "댓글을 등록하려면 로그인이 필요합니다."
    const redirectToProfile  = () =>{
        if(!isLoggedIn){
            return router.push("/profile")
        }
        return ;
    }


    const submitComment = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(postCommentMutation.isLoading || !isLoggedIn) return;

        const commentContent = commentRef.current?.value;

        if(commentContent){
            const postData :CommentPostJson= {
                postId: postId+"",
                userEmail: session.data?.user?.email+"" ,
                content: commentContent+"",
            }
           return  postCommentMutation.mutate(postData)
        }else{
            return;
        }

    }



    return <div className={'flex justify-center w-2/3 gap-4 ml-3'} onClick={redirectToProfile}>
        {session ? <UserInfoBox userInfo={userInfo}/> : null}
        <form className={'flex gap-4 w-full'} onSubmit={(event)=>submitComment(event)}>
            <textarea placeholder={textAreaPlaceholder} disabled={!isLoggedIn} className={cls(!!isLoggedIn ? '':'cursor-not-allowed','w-full thin-round-border resize-none p-2 focus:outline-none')} ref={commentRef}/>
            <button className={'h-full w-16 thin-round-border m-auto text-center hover:ring-2 hover:ring-offset-2 hover:ring-black'}>{postCommentMutation.isLoading ? <LoadingSpinner />:"등록"}</button>
        </form>
    </div>
}
