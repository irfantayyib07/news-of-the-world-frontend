import loading from "./loading.gif"

export function Spinner() {
 return (
  <div className='text-center'>
   <img src={loading} alt="loading..." />
  </div>
 )
}

export default Spinner
