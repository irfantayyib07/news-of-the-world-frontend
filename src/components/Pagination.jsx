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

  if (page > 1) prevButton.current.removeAttribute("disabled");
  if (page < totalPages) nextButton.current.removeAttribute("disabled");
 }, [loading])

 const handleNext = () => {
  setPage(prev => ++prev);
 }

 const handlePrev = () => {
  setPage(prev => --prev);
 }

 return (
  <>
   <div className="d-flex justify-content-center gap-5 mt-4">
    <button className="btn btn-secondary prev-btn" ref={prevButton} onClick={handlePrev}>Previous</button>
    <button className="btn btn-secondary next-btn" ref={nextButton} onClick={handleNext}>Next</button>
   </div>
  </>
 )
}

export default Pagination
