import { useEffect, useState } from "react";
import { useFilter } from "../contexts/filterContext";

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const articlesCache = new Map();
let totalPages = null;

export const useFetchNews = (category) => {
 // filter information
 const { countryState, pageState } = useFilter();
 const [country] = countryState;
 const [page, setPage] = pageState;

 // store prepared data
 const [response, setResponse] = useState([]);
 const [loading, setLoading] = useState();

 // fetch data
 useEffect(() => {
  const controller = new AbortController();
  const curerntCacheKey = JSON.stringify({ page, category, country });

  async function fetchNews() {
   // decide what data to fetch
   const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=12`;

   try {
    // send the cached version if it exists
    for (let key of articlesCache.keys()) {
     key = JSON.parse(key);

     let keyToCompareWith = { ...key };
     delete keyToCompareWith.totalPages;

     const keyToCompare = JSON.stringify(key);

     if (curerntCacheKey === JSON.stringify(keyToCompareWith)) {
      console.log("sending from cache");
      setResponse(articlesCache.get(keyToCompare));
      totalPages = key.totalPages;
      return;
     }
    }

    // send the request to fetch the data
    console.log('request sent');
    setLoading(true);
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();

    // if we do not have any articles, exit the function and send whatever we have
    if (!data.articles) {
     setLoading(false);
     setPage(1);
     setResponse(data);
     totalPages = undefined;
     return;
    };

    // collect data information
    totalPages = Math.ceil(data.totalResults / 12);

    // prepare cache
    const cacheKey = JSON.stringify({ page, category, country, totalPages });

    // prepare data to send
    const filteredArticles = data.articles.filter(article => article.title !== "[Removed]");
    const uniq = [...new Set(filteredArticles)];
    articlesCache.set(cacheKey, uniq);
    setResponse(uniq);
    setLoading(false);
   } catch (err) {
    console.log(err);
   }
  }

  fetchNews();

  return () => controller.abort();
 }, [page, country, category])

 return { response, loading, totalPages };
}