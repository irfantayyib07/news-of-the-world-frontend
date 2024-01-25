import { useFilter } from "../contexts/filterContext";
import { COUNTRIES } from "../constants/countries";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function Filter() {
 const { countryState, pageState } = useFilter();
 const [country, setCountry] = countryState;
 const [page, setPage] = pageState;

 const handleChange = (e) => {
  setCountry(e.target.value);
  setPage(1);
 }

 return (
  <div className="m-0 p-2 bg-body-secondary border border-secondary rounded-2 d-flex gap-2">
   <div className={`fi fi-${country}`}></div>
   <select name="country-select" id="country-select" className="form-select form-select-sm w-25 flex-grow-1" aria-label="Small select example" onChange={(e) => handleChange(e)} defaultValue={country}>
    {COUNTRIES.map(country => <option value={country.shortName} key={country.shortName}>{country.fullName}</option>)}
   </select>
  </div>
 )
}

export default Filter
