import TagSpan from "../../app/TagSpan";
import { KeyedMutator } from "swr";
import {InfinitePostArr} from '@types'
import process from 'process'

// @ts-ignore
export default async function TagNavBar({mutate,}: { mutate?: KeyedMutator<InfinitePostArr[]> }): any {

  const {tags} = await fetchData()

  return (
    <div className="hidden sm:flex flex-row gap-5 w-3/4 mx-auto mt-10 px-5 py-3 rounded-md overflow-x-scroll scrollbar-hide border-black border-2 dark:border-white shadow-slate-500 shadow-md">
      <TagSpan tag="all"  tagName="ALL" clickOk={true} />
      {tags.map((item:{tag:string}, index:number) => (
        <TagSpan key={index} tag={item?.tag} clickOk={true} />
      ))}
    </div>
  );
}



async function fetchData() {
  const res = await fetch(
      process.env.APIDOMAIN+`/api/blogs/tags`,
      { cache: 'no-store' },
  );
  return await res.json();
}
