import React from 'react'
import {CategoryBox} from '@components/Home/CategoryBox'
import process from 'process'
import {Category} from '@types'




// @ts-ignore
export default async function CategoriesBox():any {

    const data:{categories:Category[]} = await fetchData();

    return( <div className="flex flex-row gap-5 overflow-x-scroll scrollbar-hide overflow-clip">
        {data.categories?.map((category, index) => (
            <CategoryBox key={index} category={category} />
        ))}
    </div>)
}


async function fetchData() {
    const res = await fetch(
        process.env.APIDOMAIN+`/api/categories`,
        { cache: 'no-store' },
    );
    return await res.json();
}
