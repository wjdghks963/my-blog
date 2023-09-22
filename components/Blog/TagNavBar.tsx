import process from "process";

import TagSpan from "@components/Base/TagSpan";

// @ts-ignore
export default async function TagNavBar(): any {
  const { tags } = await fetchData();

  return (
    <div className="hidden sm:flex flex-row gap-5 w-3/4 mx-auto mt-10 px-5 py-3 rounded-md overflow-x-scroll scrollbar-hide border-black border-2 dark:border-white shadow-slate-500 shadow-md">
      <TagSpan
        tag="all"
        tagName="ALL"
        clickOk={true}
      />
      {tags.map((item: { tag: string }, index: number) => (
        <TagSpan
          key={index}
          tag={item?.tag}
          clickOk={true}
        />
      ))}
    </div>
  );
}

async function fetchData() {
  w;
  const res = await fetch(process.env.APIDOMAIN + `/api/blogs/tags`, {
    cache: "no-store",
  });
  return await res.json();
}
