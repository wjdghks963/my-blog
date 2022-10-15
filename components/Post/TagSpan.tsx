import { cls } from "@libs/client/utils";

export default function TagSpan({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) {
  const hiddenFlex = className ? className : "";

  return (
    <span
      className={cls(
        hiddenFlex,
        "px-2 cursor-pointer border-2 border-black rounded-md hover:ring-2 ring-offset-2 ring-black dark:border-white dark:hover:ring-1 dark:hover:ring-white dark:hover:ring-offset-2"
      )}
    >
      {tag}
    </span>
  );
}
