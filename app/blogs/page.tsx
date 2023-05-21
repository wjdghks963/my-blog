import TagNavBar from "@components/Blog/TagNavBar";
import { SearchBar } from "@components/Post/SearchBar";
import React, {
    Suspense,
} from "react";
import TagNavBarSkeleton from '@components/Blog/TagNavBarSkeleton'
import Header from '@components/Base/Header'
import InfiniteBlogs from '@components/Blog/InfiniteBlogs'




export default function Blogs() {


    return (
        < >
            <Header/>
            <Suspense fallback={<TagNavBarSkeleton/>}>
                <TagNavBar  />
            </Suspense>
            <SearchBar />
            <InfiniteBlogs/>
        </>
    );
}


