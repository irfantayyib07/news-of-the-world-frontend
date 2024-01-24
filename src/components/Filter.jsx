import { useFilter } from "../contexts/filterContext";

function Filter() {
 const { countryState, pageState } = useFilter();
 const [country, setCountry] = countryState;
 const [page, setPage] = pageState;

 const countries = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]

 const handleChange = (e) => {
  setCountry(e.target.value);
  setPage(1);
 }

 return (
  <>
   <select name="country" id="country" className="form-select form-select-sm w-25" aria-label="Small select example" onChange={(e) => handleChange(e)} defaultValue={country}>
    {countries.map(country => <option value={country} key={country}>{country}</option>)}
   </select>
  </>
 )
}

export default Filter
