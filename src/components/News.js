import React, { Component } from 'react'
import PropTypes from "prop-types"
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import Alert from './Alert'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
 static defaultProps = {
  pageSize: 9,
  country: "us",
  category: "general",
 }

 static propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
 }

 constructor() {
  super();
  this.state = {
   articles: [],
   loading: true,
   page: 1,
   totalPages: null,
   totalResults: null,
  }
 }

 async componentDidMount() {
  this.fetchMoreData();
 }

 // MY FUNCTIONS

 fetchMoreData = async () => {
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page++}&pageSize=${this.props.pageSize}`;
  // console.log(url);
  let data = await fetch(url);
  let json = await data.json();

  this.setState({
   articles: json.status!=="error" ? this.state.articles.concat(json.articles) : [],
   loading: json.status==="error" && false,
   totalResults: json.totalResults,
   totalPages: Math.ceil(this.state.totalResults / this.state.pageSize),
  });
 };

 // RENDER

 render() {
  // console.log(this.state.loading)
  return (
   <>
    <h4>Top Headlines</h4>
    <InfiniteScroll dataLength={this.state.articles?.length} next={this.fetchMoreData} hasMore={this.state.articles?.length !== this.state.totalResults} loader={this.state.loading ? <Spinner /> : <Alert />}>
     <div className="container">
      <div className="row">
       {this.state.articles.length !== 0 && this.state.articles.map((value) => {
        // console.log(this.state.articles, value)
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
}

export default News
