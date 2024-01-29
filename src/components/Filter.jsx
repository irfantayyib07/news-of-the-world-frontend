import { useFilter } from "../hooks/useFilter";
import { COUNTRIES } from "../constants/countries";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function Filter() {
 const { countryState: [country, setCountry], pageState: [page, setPage] } = useFilter();

 const handleChange = (e) => {
  setCountry(e.target.value);
  setPage(1);
 }

 return (
  <div className="m-0 p-2 bg-body-secondary border border-secondary rounded-2 d-flex align-items-center gap-2">
   <p className="m-0 p-0 lh-base user-select-none">Presenting news from</p>
   <div className={`fi fi-${country}`}></div>
   <select name="country-select" id="country-select" className="form-select form-select-sm w-25 flex-grow-1" aria-label="Small select example" onChange={(e) => handleChange(e)} defaultValue={country}>
    {COUNTRIES.map(country => <option value={country.shortName} key={country.shortName}>{country.fullName}</option>)}
   </select>
  </div>
 )
}

export default Filter
