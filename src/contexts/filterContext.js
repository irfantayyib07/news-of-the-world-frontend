import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function useFilter() {
 return useContext(FilterContext);
}

function FilterProvider({ children }) {
 const countryState = useState("us");

 const filterData = {
  countryState
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
