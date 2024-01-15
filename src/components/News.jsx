import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

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

function News(props) {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [totalResults, setTotalResults] = useState(null);

 console.log(page);

 const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
 console.log(url);

 useEffect(() => {
  const controller = new AbortController();

  const fetchNews = async () => {
   setLoading(true);

   try {
    const res = await fetch(url, {
     signal: controller.signal
    });
    const data = await res.json();

    const filteredArticles = data.articles.filter(article => article.title !== "[Removed]");
    const uniq = [...new Set(filteredArticles)];

    setArticles(articles.concat(uniq));
    setLoading(false);
   } catch (err) {
    console.log(err);
   }
  }

  fetchNews();

  return () => {
   controller.abort();
   console.log("Unmounted!");
  }
 }, [page])

 return (
  <div className='container mt-4 mb-5'>
   <h2 className='display-6 my-4'>Top Headlines</h2>
   <InfiniteScroll
    dataLength={articles?.length}
    next={() => setPage(prev => prev + 1)}
    hasMore={articles?.length !== totalResults}
    loader={loading && <Spinner />}
    className="row g-3"
   >
    {articles.length !== 0 && articles.map((value) => {
     return <div className="col-sm-6 col-md-4" key={value.url}>
      <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
     </div>
    })}
   </InfiniteScroll>
  </div>
 )
}

export default News
