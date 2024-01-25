import { useEffect, useRef } from "react";
import { useFilter } from "../contexts/filterContext";

function Pagination({ totalPages, loading }) {
 const { pageState } = useFilter();
 const [page, setPage] = pageState;

 const prevButton = useRef();
 const nextButton = useRef();

 useEffect(() => {
  if (loading) {
   prevButton.current.setAttribute("disabled", "");
   nextButton.current.setAttribute("disabled", "");
   return;
  };

  console.log("Loading stopped");

  // enable the buttons
  if (page > 1) prevButton.current.removeAttribute("disabled");
  if (page < totalPages) nextButton.current.removeAttribute("disabled");

  // disable the buttons in case of receiving cached data
  if (page === 1) prevButton.current.setAttribute("disabled", "");
  if (page === totalPages) nextButton.current.setAttribute("disabled", "");
 }, [loading, page])

 const handleNext = () => {
  setPage(prev => ++prev);
 }

 const handlePrev = () => {
  setPage(prev => --prev);
 }

 return (
  <>
   <div className="pagination position-sticky mt-5 bg-secondary rounded-2 w-75 mx-auto d-flex justify-content-around p-2">
    <button className="btn btn-secondary prev-btn" ref={prevButton} onClick={handlePrev}>Previous</button>
    <button className="btn btn-secondary next-btn" ref={nextButton} onClick={handleNext}>Next</button>
   </div>
  </>
 )
}

export default Pagination
