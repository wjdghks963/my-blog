/**
 *
 * @param pageIndex 현재 페이지 index
 * @param previousPageData 전 페이지 데이터 | null
 * @param query tag || query
 * @param selector useSelector 둘 중 뭐 들어가나
 * @returns string | null
 */

type Query = "tag" | "query";

export default function infiniteBlogsGetKey(
  pageIndex: any,
  previousPageData: { nextCursor: string } | null,
  query: Query,
  selector: string
) {
  // nextCoursor가 done이면 종료
  if (previousPageData && previousPageData.nextCursor === "done") return null;
  // 전 데이터 없을때 맨 처음 받아옴 tag는 all로
  if (previousPageData === null && selector === "all") {
    return `/api/blogs?${query}=all&limit=5`;
  }

  if (previousPageData !== null && selector === "all") {
    return `/api/blogs?${query}=all&cursor=${previousPageData?.nextCursor}&limit=5`;
  }
  // 전 데이터 없고 tag가 all이 아니라면
  if (previousPageData === null && selector !== "all") {
    return `/api/blogs?${query}=${selector}&limit=5`;
  }

  // 전 데이터 있고 query 있다면
  if (previousPageData !== null && selector !== "") {
    return `/api/blogs?cursor=${previousPageData.nextCursor}&${query}=${selector}&limit=5`;
  }

  // 위의 상황이 아니라면 all을 기준으로 다음 데이터 받아옴
  return `/api/blogs?${query}=all&cursor=${previousPageData?.nextCursor}&limit=5`;
}
