import { useEffect, useRef } from "react";
import { useFilter } from "../contexts/filterContext";

let isFirstPage = true;

function Pagination({ totalPages }) {
 const { pageState } = useFilter();
 const [page, setPage] = pageState;

 const prevButton = useRef();
 const nextButton = useRef();

 if (page === 1) isFirstPage = true;
 const isLastPage = page === totalPages;

 console.log(page, "of", totalPages, isLastPage);

 useEffect(() => {
  if (isFirstPage) {
   prevButton.current.setAttribute("disabled", "");
  } else if (isLastPage) {
   nextButton.current.setAttribute("disabled", "");
  } else if (!isLastPage) {
   prevButton.current.removeAttribute("disabled");
  }
 }, [page])

 const handleNext = () => {
  setPage(prev => ++prev);
  isFirstPage = false;
 }

 const handlePrev = () => {
  setPage(prev => --prev);
  nextButton.current.removeAttribute("disabled");
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
