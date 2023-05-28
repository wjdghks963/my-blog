import { Tag} from '@prisma/client'

export type PostStatus = "popular" | "recent";


export interface ThumbnailPostData {
    id:number
    title: string,
    description:string,
    thumbnail?: string
}

export type Category = {
    category: string;
    posts: { id: number; title: string }[];
};



export type PostWithId = {
    id: number;
    title: string;
    content: string;
    views: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
};


export interface InfinitePostArr {
    nextCursor?: string;
    data: PostWithId[];
}

export type PostsIds = [{ id: number }]

export interface UserInfo {
    email:string,
    name:string,
    image:string
}


export interface CommentPostJson {
    postId:string,
    userEmail:string,
    content:string
}

export interface CommentEditJson {
    commentId :string;
    content:string
}


export interface Post {
    title: string
    content: string;
    views: number,
    tags: Tag[],
    description: string,
    createdAt: Date,
    updatedAt: Date,
    category: {category:string},
    comments: CommentWithUser[]

}

export type CommentWithUser = {id:number, content:string, user:UserInfo}


export interface EditPost extends Omit<Post, "tags" | "comments" | "createdAt" | "updatedAt" | "views" | "content"> {
    id: number;
    markdown: string;
    tags: string[];
}
