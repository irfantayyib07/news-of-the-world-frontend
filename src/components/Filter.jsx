import { useFilter } from "../contexts/filterContext";
import { COUNTRIES } from "../constants/countries";

function Filter() {
 const { countryState, pageState } = useFilter();
 const [country, setCountry] = countryState;
 const [page, setPage] = pageState;

 const handleChange = (e) => {
  setCountry(e.target.value);
  setPage(1);
 }

 return (
  <>
   <select name="country-select" id="country-select" className="form-select form-select-sm w-25" aria-label="Small select example" onChange={(e) => handleChange(e)} defaultValue={country}>
    {COUNTRIES.map(country => <option value={country.shortName} key={country.shortName}>{country.fullName}</option>)}
   </select>
  </>
 )
}

export default Filter
