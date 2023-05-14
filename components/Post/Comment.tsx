import UserInfoBox from "@components/Comment/UserInfoBox";
import {useSession} from "next-auth/react";
import {UserInfo} from "../../pages/api/blogs/[id]";
import {useMutation} from "@libs/client/useMutation";
import {Comment} from "../../pages/api/blogs/[id]";
import {useRef, useState} from "react";
import LoadingSpinner from "@components/Base/LoadingSpinner";

export default function CommentBox({content, userInfo}:{content: Comment | null,userInfo?:UserInfo}){
    const {data:session} = useSession();
    const [editEditor, setEditEditor] = useState<boolean>(false);
    const commentRef = useRef<HTMLTextAreaElement>(null);


    const isMine = session?.user?.email === userInfo?.email
    const blogOwner = session?.user?.email === process.env.MY_EMAIL

    const [delComment, {loading:deleteLoading, error:deleteError}] = useMutation("/api/comment/delete");
    const [editComment, {loading:editLoading, error:editError}] = useMutation("/api/comment/edit");

    const deleteCommentClick = async () =>{
        if(deleteLoading) return ;
        await delComment
        deleteError ? alert("삭제에 실패했습니다") : null
    }

    const editCommentClick =  () =>{
        setEditEditor(true)
    }

    const editCommentSubmit = async () =>{
        if(editLoading) return
        const commentContent = commentRef.current?.value;

        const editJson = {
            id:content?.id,
            content: commentContent +""
        }
        await editComment(editJson).then(()=>setEditEditor(false))
        editError ? alert("수정에 실패했습니다") : null
    }

    return <div className={'flex flex-col gap-3'}>
        <div className={'flex justify-between gap-4 thin-round-border px-2.5 py-4'}>
            <UserInfoBox userInfo={userInfo}/>
            <span className={'whitespace-pre-wrap'}>{content?.content}</span>
            <div className={'flex flex-col gap-2 ml-auto'}>
                {isMine || blogOwner ? <div className={'cursor-pointer thin-round-border text-center p-1 h-8'} onClick={editCommentClick}>수정</div> : null}
                {isMine || blogOwner ? <div className={'cursor-pointer thin-round-border text-center p-1 h-8 '} onClick={deleteCommentClick}>삭제</div> : null}
            </div>
        </div>
        {editEditor ? (<form className={'flex gap-4 w-full'} onSubmit={editCommentSubmit}>
            <textarea className={'w-full thin-round-border resize-none p-2 focus:outline-none'} ref={commentRef}/>
            <button className={'h-full w-16 thin-round-border m-auto text-center hover:ring-2 hover:ring-offset-2 hover:ring-black'}>{editLoading ? <LoadingSpinner />:"등록"}</button>
        </form>) : null }

    </div>
}
