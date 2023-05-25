import CommentBox from "@components/Post/Comment";
import {cls} from "@libs/client/utils";
import {CommentWithUser} from '@types'


export default function CommentList({commentList, className}:{commentList:(CommentWithUser | null)[], className?:string}){

    return <div className={cls(className ?? '','flex flex-col gap-6 w-2/3')}>
        {commentList.map((item)=>{
                return <CommentBox key={item?.id} userInfo={item?.user} content={item} />
            }
            )
        }
    </div>
}
