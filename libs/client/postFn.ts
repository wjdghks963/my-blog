import {CommentEditJson, CommentPostJson} from '@types'

export const postComment = async (commentJson:CommentPostJson) => {
    return await fetch(`/api/comment/post`, {
        method: 'POST',
        body: JSON.stringify(commentJson),
    });
};


export const editComment = async (commentJson:CommentEditJson) => {
    return await fetch(`/api/comment/edit`, {
        method: 'POST',
        body: JSON.stringify(commentJson),
    });
};

export const deleteComment = async (commentId:string) => {
    return await fetch(`/api/comment/delete`, {
        method: 'POST',
        body: JSON.stringify({id:commentId}),
    });
};

export const deletePost = async (postId:string) =>{
    return await fetch(`/api/blogs/delete`, {
        method: 'POST',
        body: JSON.stringify({id:postId}),
    });
}
