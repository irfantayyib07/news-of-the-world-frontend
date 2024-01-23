import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const articlesCache = new Map();
let totalPages = null;

export const useFetchNews = () => {
 // store prepared data
 const [articles, setArticles] = useState([]);
 const [page, setPage] = useState(1);
 const [pageSize, setPageSize] = useState(12);
 const [country, setCountry] = useState("us");
 const [category, setCategory] = useState("general");

 // filter data
 const updatePageSize = (pageSize) => setPageSize(pageSize);
 const updateCountry = (country) => setCountry(country);
 const updateCategory = (category) => setCategory(category);

 // fetch data
 useEffect(() => {
  const controller = new AbortController();

  async function fetchNews() {
   // decide what data to fetch
   const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

   try {
    // send the cached version if it exists
    if (articlesCache.has(page)) {
     setArticles(articlesCache.get(page));
     return;
    }

    // send the request to fetch the data
    console.log('request sent');
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();
    if (!data) return;

    // collect data information
    totalPages = Math.ceil(data.totalResults / pageSize);
    console.log(page, "of", totalPages, `(PageSize: ${pageSize})`);

    // prepare data to send
    const filteredArticles = data.articles.filter(article => article.title !== "[Removed]");
    const uniq = [...new Set(filteredArticles)];
    articlesCache.set(page, uniq);
    setArticles(uniq);
   } catch (err) {
    console.log(err);
   }
  }

  // fetchNews();

  return () => controller.abort();
 }, [page, pageSize, country, category])

 return [articles, setPage, totalPages];
}