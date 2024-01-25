import loading from "../assets/gifgit.gif";

function Spinner() {
 return (
  <div className='text-center'>
   <img src={loading} alt="loading..." className="loader mt-5 mx-auto" />
  </div>
 )
}

export default Spinner
