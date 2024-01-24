import { useEffect, useState } from "react";
import { useFilter } from "../contexts/filterContext";

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const articlesCache = new Map();
let totalPages = null;

export const useFetchNews = (category) => {
 // store prepared data
 const [articles, setArticles] = useState([]);
 const [page, setPage] = useState(1);
 const [loading, setLoading] = useState();
 const { countryState } = useFilter();
 const [country] = countryState;

 // fetch data
 useEffect(() => {
  const controller = new AbortController();
  const cacheKey = JSON.stringify({ page, category, country });

  async function fetchNews() {
   // decide what data to fetch
   const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=12`;

   try {
    // send the cached version if it exists
    if (articlesCache.has(cacheKey)) {
     console.log("sending from cache");
     setArticles(articlesCache.get(cacheKey));
     return;
    }

    // send the request to fetch the data
    console.log('request sent');
    setLoading(true);
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();
    if (!data) return;

    // collect data information
    totalPages = Math.ceil(data.totalResults / 12);

    // prepare data to send
    const filteredArticles = data.articles.filter(article => article.title !== "[Removed]");
    const uniq = [...new Set(filteredArticles)];
    articlesCache.set(cacheKey, uniq);
    setArticles(uniq);
    setLoading(false);
   } catch (err) {
    console.log(err);
   }
  }

  fetchNews();

  return () => controller.abort();
 }, [page, country])

 return [articles, setPage, totalPages, loading];
}