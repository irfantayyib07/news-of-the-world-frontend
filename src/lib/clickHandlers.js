export const handlePrev = (e) => {
 e.target.nextElementSibling.removeAttribute("disabled");
 setPage(prev => --prev);
}

export const handleNext = (e) => {
 console.log("NEXT");
 if (page !== totalPages) {
  setPage(prev => ++prev);
  e.target.previousElementSibling.removeAttribute("disabled");
  console.log(e.target.previousElementSibling.outerHTML);
 } else {
  e.target.previousElementSibling.setAttribute("disabled", true);
 }
}