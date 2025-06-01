import { useSelector } from "react-redux";

import { ReduxSliceState } from "@store/modules";

export default function useTagSelector() {
  const { tag, isSelected } = useSelector((state: ReduxSliceState) => state.tagFilterReducer);
  return { tag, isSelected };
}
