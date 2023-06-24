import { useSelector } from "react-redux";

import { ReduxSliceState } from "@store/modules";

export default function useQuerySelector() {
  const { query, isSelected } = useSelector((state: ReduxSliceState) => state.searchQueryReducer);
  return { query, isSelected };
}
