import { useContext } from "react";
import { FilterContext } from "../contexts/filterContext";

export function useFilter() {
 return useContext(FilterContext);
}