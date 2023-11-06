import React, { Component } from 'react'
import PropTypes from "prop-types"
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

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
   totalResults: null,
  }
 }

 async componentDidMount() {
  this.fetchArticles(this.state.page);
 }

 // MY FUNCTIONS

 async fetchArticles(pg) {
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=19e56a09dc7f4c94950f307de7c9b28c&page=${pg}&pageSize=${this.props.pageSize}`; // (1) this.state.pageSize also possible
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

 async fetchMoreData(pg) {
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=19e56a09dc7f4c94950f307de7c9b28c&page=${++pg}&pageSize=${this.props.pageSize}`; // (1) this.state.pageSize also possible
  this.setState({ loading: true });
  let data = await fetch(url);
  let json = await data.json();

  // console.log(json);

  this.setState({
   articles: this.state.articles?.concat(json.articles),
   totalResults: json.totalResults,
   totalPages: Math.ceil(this.state.totalResults / this.state.pageSize),
   loading: false,
  });
 };

 // RENDER

 render() {
  return (
   <div className='container'>
    <h4>Top Headlines</h4>
    <div className="row">
     <InfiniteScroll dataLength={this.state.articles?.length} next={this.fetchMoreData} hasMore={this.state.articles?.length !== this.state.totalResults} loader={<Spinner />}>
      <div className="container d-flex">
       {this.state.articles?.map((value) => {
        return <div className="col-md-4 my-3" key={value.url}>
         <NewsItems title={value.title?.slice(0, 45)} description={value.description?.slice(0, 88)} imgUrl={value.urlToImage} newsUrl={value.url} />
        </div>
       })}
      </div>
     </InfiniteScroll>
    </div>
   </div>
  )
 }
}

export default News
