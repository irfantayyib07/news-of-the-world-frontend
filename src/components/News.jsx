import NewsItems from './NewsItems'
import Alert from "./Alert";
import { useFetchNews } from "../hooks/useFetchNews";
import Filter from "./Filter";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

function News({ category }) {
 const { response, loading, totalPages } = useFetchNews(category);

 return (
  <div className='container mt-4 mb-5'>
   <h2 className='display-6 my-4'>Top Headlines</h2>
   <Filter />

   {loading || !response.status ? <Spinner /> :
    !response.articles ? <Alert message={response.message}/> :
    <div className="row g-3 mt-4">
     {response.length !== 0 && response.map((value) => {
      return <div className="col-sm-6 col-md-4" key={value.url}>
       <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
      </div>
     })}
    </div>}

   <Pagination totalPages={totalPages} loading={loading} />
  </div>
 )
}

export default News
