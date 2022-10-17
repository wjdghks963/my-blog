export default function Loading({
  loadingRef,
}: {
  loadingRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div ref={loadingRef} className="animate-bounce">
      Loading ...
    </div>
  );
}
