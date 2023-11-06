import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
 constructor() {
  super();
  this.state = {
   articles: [],
   loading: false,
   page: 1,
   pageSize: 30,
  }
 }

 async fetchArticles(pg) {
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b1b2cd43f3fd4a2a83db63b8d14d70bb&page=${pg}&pageSize=${this.state.pageSize}`;
  let data = await fetch(url);
  let json = await data.json();

  // console.log(json);

  this.setState({ articles: json.articles, totalResults: json.totalResults });
 }

 async componentDidMount() {
  this.fetchArticles(this.state.page);
 }

 handlePrev() {
  this.fetchArticles(--this.state.page);
 }

 handleNext(event) {
  this.fetchArticles(++this.state.page);
  if (this.state.page === Math.ceil(this.state.totalResults/this.state.pageSize)) event.target.disabled = "true"
 }

 render() {
  return (
   <div className='container'>
    <h4>Top Headlines</h4>
    <div className="row">
     {this.state.articles.map((value) => {
      return <div className="col-md-4 my-3" key={value.url}>
       <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
      </div>
     })}
    </div>
    <div className='container d-flex justify-content-between'>
     <button disabled={this.state.page<=1} className="btn btn-success" onClick={() => this.handlePrev.call(this)}>&larr; Previous</button>
     <button className="btn btn-success" onClick={(event) => this.handleNext.call(this, event)}>Next &rarr;</button>
    </div>
   </div>
  )
 }
}

export default News
