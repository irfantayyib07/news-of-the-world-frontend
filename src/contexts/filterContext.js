import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function useFilter() {
 return useContext(FilterContext);
}

function FilterProvider({ children }) {
 const countryState = useState("us");
 const pageState = useState(1);

 const filterData = {
  countryState,
  pageState
 }

 return (
  <>
   <FilterContext.Provider value={filterData}>
    {children}
   </FilterContext.Provider>
  </>
 )
}

export default FilterProvider
