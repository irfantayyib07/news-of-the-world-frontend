import NewsItems from './NewsItems'
import { useFetchNews } from "../hooks/useFetchNews";
import Filter from "./Filter";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

function News({ category }) {
 const { articles, loading, totalPages } = useFetchNews(category);

 return (
  <div className='container mt-4 mb-5'>
   <h2 className='display-6 my-4'>Top Headlines</h2>
   <Filter />

   {loading ? <Spinner /> :
    <div className="row g-3 mt-4">
     {articles.length !== 0 && articles.map((value) => {
      return <div className="col-sm-6 col-md-4" key={value.url}>
       <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
      </div>
     })}
    </div>}

   <Pagination totalPages={totalPages} />
  </div>
 )
}

export default News
