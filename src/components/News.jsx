import React, { Component } from 'react'
import PropTypes from "prop-types"
import NewsItems from './NewsItems'
import Spinner from './Spinner'

export class News extends Component {
 static defaultProps = {
  pageSize: 9,
  country: "in",
  category: "general",
 }

 static propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
 }

 constructor() { // (1) just to indicate that receiving props in state is possible || (2) constructor(props) with super(props) is also possible - then you can use this.props inside the constructor
  super();
  this.state = {
   articles: [],
   loading: false,
   page: 1,
   // pageSize: pageSize, (1)
   // pageSize: pageSize, (2)
   totalPages: null,
  }
 }

 async componentDidMount() {
  this.fetchArticles(this.state.page);
 }

 // MY FUNCTIONS

 async fetchArticles(pg) {
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={process.env.API_KEY}&page=${pg}&pageSize=${this.props.pageSize}`; // (1) this.state.pageSize also possible
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
