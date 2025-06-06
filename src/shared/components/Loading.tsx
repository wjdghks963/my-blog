import { cls } from "@shared/utils/utils";

export default function Loading({
  loadingRef,
  className,
}: {
  loadingRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div
      ref={loadingRef ? loadingRef : null}
      className={cls("animate-bounce", className ?? "")}
    >
      Loading ...
    </div>
  );
}
