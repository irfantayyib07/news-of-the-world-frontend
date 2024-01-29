import loading from "../assets/gifgit.gif";

function Loader() {
 return (
  <div className='text-center min-vh-100'>
   <img src={loading} alt="loading..." className="loader mt-5 mx-auto" />
  </div>
 )
}

export default Loader
