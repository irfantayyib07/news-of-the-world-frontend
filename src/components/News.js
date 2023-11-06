import React, { Component, useEffect } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'

export class News extends Component {
 constructor({ pageSize }) {
  super();
  this.state = {
   articles: [],
   loading: false,
   page: 1,
   pageSize: pageSize,
   totalPages: null,
  }
 }

 async componentDidMount() {
  this.fetchArticles(this.state.page);
 }

 // MY FUNCTIONS

 async fetchArticles(pg) {
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b1b2cd43f3fd4a2a83db63b8d14d70bb&page=${pg}&pageSize=${this.state.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  let json = await data.json();

  // console.log(json);

  this.setState({
   articles: json.articles,
   totalResults: json.totalResults,
   totalPages: Math.ceil(this.state.totalResults / this.state.pageSize),
   loading: false,
  });
 }

 handlePrev(event) {
  this.fetchArticles(--this.state.page);
  if (!(this.state.page === this.state.totalPages)) event.target.nextElementSibling.removeAttribute("disabled")
 }

 handleNext(event) {
  this.fetchArticles(++this.state.page);
  if (this.state.page === this.state.totalPages) event.target.setAttribute("disabled", "");
 }

 // RENDER

 render() {
  return (
   <div className='container'>
    {this.state.loading && <Spinner />}
    <h4>Top Headlines</h4>
    <div className="row">
     {!this.state.loading && this.state.articles.map((value) => {
      return <div className="col-md-4 my-3" key={value.url}>
       <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
      </div>
     })}
    </div>
    <div className='container d-flex justify-content-between'>
     <button href="/" disabled={this.state.page === 1} className="btn btn-success" onClick={(event) => this.handlePrev.call(this, event)}>&larr; Previous</button>
     <button href="/" className="btn btn-success" onClick={(event) => this.handleNext.call(this, event)}>Next &rarr;</button>
    </div>
   </div>
  )
 }
}

export default News
