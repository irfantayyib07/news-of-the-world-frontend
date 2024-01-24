import React, { useEffect, useReducer, useState } from 'react'
import NewsItems from './NewsItems'
import { useFetchNews } from "../hooks/useFetchNews";
import Filter from "./Filter";
import Spinner from "./Spinner";

function News({ category }) {
 const [articles, setPage, totalPages, loading] = useFetchNews(category);
 const [prevIsDisabled, setPrevIsDisabled] = useState(true);
 const [nextIsDisabled, setNextIsDisabled] = useState(false);

 function handlePageChange(e) {
  const prevButton = document.querySelector(".prev-btn");

  if (e.target === prevButton) {
   setPage(prev => {
    if (--prev === 1) {
     setPrevIsDisabled(true);
     setNextIsDisabled(false);
    }
    setNextIsDisabled(false);
    return prev;
   })
  } else {
   setPage(prev => {
    if (++prev === totalPages) {
     setNextIsDisabled(true);
     setPrevIsDisabled(false);
    }
    setPrevIsDisabled(false);
    return prev;
   })
  }
 }

 return (
  <div className='container mt-4 mb-5'>
   <h2 className='display-6 my-4'>Top Headlines</h2>
   <Filter setPage={setPage} />

   {loading ? <Spinner /> :
    <div className="row g-3 mt-4">
     {articles.length !== 0 && articles.map((value) => {
      return <div className="col-sm-6 col-md-4" key={value.url}>
       <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
      </div>
     })}
    </div>
   }

   <div className="d-flex justify-content-center gap-5 mt-4">
    <button className="btn btn-secondary prev-btn" onClick={handlePageChange} disabled={prevIsDisabled}>Previous</button>
    <button className="btn btn-secondary next-btn" onClick={handlePageChange} disabled={nextIsDisabled}>Next</button>
   </div>
  </div>
 )
}

export default News
