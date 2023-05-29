import TagNavBar from "@components/Blog/TagNavBar";
import { SearchBar } from "@components/Post/SearchBar";
import React, {
    Suspense,
} from "react";
import TagNavBarSkeleton from '@components/Blog/TagNavBarSkeleton'
import InfiniteBlogs from '@components/Blog/InfiniteBlogs'




export default function Blogs() {


    return (
        < >
            <Suspense fallback={<TagNavBarSkeleton/>}>
                <TagNavBar  />
            </Suspense>
            <SearchBar />
            <InfiniteBlogs/>
        </>
    );
}


