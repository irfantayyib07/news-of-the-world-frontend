import { useEffect, useRef } from "react";
import { useFilter } from "../contexts/filterContext";

function Pagination({ totalPages, loading }) {
 const { pageState } = useFilter();
 const [page, setPage] = pageState;

 const prevButton = useRef();
 const nextButton = useRef();
 const pageButton = useRef();

 useEffect(() => {
  if (loading || !totalPages) {
   prevButton.current.setAttribute("disabled", "");
   nextButton.current.setAttribute("disabled", "");
   pageButton.current.setAttribute("disabled", "");
   return;
  };

  pageButton.current.removeAttribute("disabled");

  // enable the buttons
  if (page > 1) prevButton.current.removeAttribute("disabled");
  if (page < totalPages) nextButton.current.removeAttribute("disabled");

  // disable the buttons in case of receiving cached data
  if (page === 1) prevButton.current.setAttribute("disabled", "");
  if (page === totalPages) nextButton.current.setAttribute("disabled", "");
 }, [loading, page])

 const handleNext = (pgNum) => {
  if (pgNum) {
   setPage(pgNum)
  } else {
   setPage(prev => ++prev);
  }
 }

 const handlePrev = () => {
  setPage(prev => --prev);
 }

 return (
  <>
   <div className="pagination position-sticky mt-5 bg-secondary rounded-2 w-75 mx-auto d-flex justify-content-evenly p-2">
    <button className="btn btn-secondary prev-btn" ref={prevButton} onClick={handlePrev}>Previous</button>

    <div className="dropup-center dropup">
     <button className="btn btn-secondary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref={pageButton}>
      {page} / {totalPages}
     </button>
     <ul className="page-dropdown-menu dropdown-menu">
      {[...Array(totalPages).keys()].filter(pgNum => pgNum + 1 !== page).map(pgNum => <li className="dropdown-item user-select-none" onClick={() => handleNext(pgNum + 1)} key={pgNum}>{pgNum + 1}</li>)}
      <li className="dropdown-divider my-1"></li>
      <li className="dropdown-item user-select-none">{page}</li>
     </ul>
    </div>

    <button className="btn btn-secondary next-btn" ref={nextButton} onClick={() => handleNext()}>Next</button>
   </div>
  </>
 )
}

export default Pagination
