import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import Alert from './Alert'
import InfiniteScroll from 'react-infinite-scroll-component'

export function News(props) {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(null);
 const [totalResults, setTotalResults] = useState(null);
 const [data, setData] = useState(null);

 useEffect(() => {
  fetchMoreData();
 }, [])

 const fetchMoreData = async () => {
  setLoading(true)

  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  let res = await fetch(url);
  let data = await res.json();
  setData(data);

  setArticles(data.status !== "error" ? articles.concat(data.articles) : []);
  setLoading(data.status === "error" && false);
  setPage(page + 1);
  setTotalResults(data.totalResults);
  setTotalPages(Math.ceil(totalResults / props.pageSize));
 };

 return (
  <>
   <h4>Top Headlines</h4>
   <InfiniteScroll dataLength={articles?.length} next={fetchMoreData} hasMore={articles?.length !== totalResults} loader={loading ? <Spinner /> : <Alert message={data?.message} />}>
    <div className="container">
     <div className="row">
      {articles.length !== 0 && articles.map((value) => {
       return <div className="col-md-4 my-3" key={value.url}>
        <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
       </div>
      })}
     </div>
    </div>
   </InfiniteScroll>
  </>
 )
}

News.defaultProps = {
 pageSize: 9,
 country: "us",
 category: "general",
}

News.propTypes = {
 pageSize: PropTypes.number,
 country: PropTypes.string,
 category: PropTypes.string,
}

export default News
