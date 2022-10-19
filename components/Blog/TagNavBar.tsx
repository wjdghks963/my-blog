import TagSpan from "@components/Post/TagSpan";
import { IPostArr } from "pages/blogs";
import { KeyedMutator } from "swr";

export default function TagNavBar({
  tags,
  mutate,
}: {
  tags: { tag: string }[];
  mutate: KeyedMutator<IPostArr[]>;
}) {
  return (
    <div className="hidden sm:flex flex-row gap-5 w-3/4 mx-auto mt-10 px-5 py-3 rounded-md overflow-x-scroll scrollbar-hide border-black border-2 dark:border-white shadow-slate-500 shadow-md">
      <TagSpan tag="all" mutate={mutate} tagName="ALL" clickOk={true} />
      {tags.map((tag, index) => (
        <TagSpan key={index} tag={tag?.tag} mutate={mutate} clickOk={true} />
      ))}
    </div>
  );
}
