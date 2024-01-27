import { createContext, useState } from "react";

export const FilterContext = createContext();

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
