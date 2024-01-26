import NewsItems from './NewsItems'
import Alert from "./Alert";
import { useFetchNews } from "../hooks/useFetchNews";
import Filter from "./Filter";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import { capitalizeFirstLetter } from "../lib/utilityFunctions";

function News({ category }) {
 const { response, loading, totalPages } = useFetchNews(category);

 const isError = response.status === "error";

 return (
  <div className='container mt-4 position-relative'>
   <h2 className='display-6 my-4'>Top Headlines</h2>
   <div className="d-flex flex-wrap gap-3 align-items-center">
    <Filter />
    <p className="m-0 p-2 bg-body-tertiary border border-secondary rounded-2 user-select-none">Category: {capitalizeFirstLetter(category)}</p>
    <p className="m-0 p-2 bg-body-tertiary border border-secondary rounded-2 user-select-none">{response.length ? response.length : 0} results found</p>
   </div>

   {loading ? <Spinner /> :
    isError ? <Alert message={response.message} /> :
     <div className="row g-3 mt-5">
      {response.map((value) => {
       return <div className="col-sm-6 col-md-4" key={value.url}>
        <NewsItems title={value.title} description={value.description} imgUrl={value.urlToImage} newsUrl={value.url} />
       </div>
      })}
     </div>}

   <Pagination totalPages={totalPages} loading={loading} />
  </div>
 )
}

export default News
