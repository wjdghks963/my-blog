import {useMutation} from "@libs/client/useMutation";
import {FormEvent, useRef} from "react";
import {CommentPostJson} from "../../pages/api/comment/post";
import {useRouter} from "next/router";
import {Session} from "next-auth";
import {cls} from "@libs/client/utils";
import LoadingSpinner from "@components/Base/LoadingSpinner";
import UserInfoBox from "@components/Comment/UserInfoBox";
import {UserInfo} from "../../pages/api/blogs/[id]";


export default function CommentWriter({session, className}:{session: Session | null, className?:string}){
    const router = useRouter();
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [postComment, {data:postResponseData, loading:postLoading, error:postError}] =useMutation('/api/comment/post');
    const isLoggedIn = session?.user;

    const userInfo:UserInfo = {image: session?.user?.image ?? "", name: session?.user?.name ?? "", email:session?.user?.email ?? ""}

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



    return <div className={'flex justify-center w-2/3 gap-4 ml-3'}>
        <UserInfoBox userInfo={userInfo}/>
        <form className={'flex gap-4 w-full'} onSubmit={(event)=>submitComment(event)}>
            <textarea disabled={!isLoggedIn} className={cls(!!isLoggedIn ? '':'hover:cursor-pointer:cursor-not-allowed','w-full thin-round-border resize-none p-2 focus:outline-none')} ref={commentRef}/>
            <button className={'h-full w-16 thin-round-border m-auto text-center hover:ring-2 hover:ring-offset-2 hover:ring-black'}>{postLoading ? <LoadingSpinner />:"등록"}</button>
        </form>
    </div>
}
