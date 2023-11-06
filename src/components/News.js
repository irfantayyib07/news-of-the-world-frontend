import React, { Component } from 'react'
import PropTypes from "prop-types"
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
 static defaultProps = {
  pageSize: 9,
  country: "jp",
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
   loading: false,
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
  let data = await fetch(url);
  let json = await data.json();

  this.setState({
   articles: this.state.articles?.concat(json.articles),
   totalResults: json.totalResults,
   totalPages: Math.ceil(this.state.totalResults / this.state.pageSize),
  });
 };

 // RENDER

 render() {
  return (
   <>
    <h4>Top Headlines</h4>
    {this.state.loading && <Spinner />}
    <InfiniteScroll dataLength={this.state.articles?.length} next={this.fetchMoreData} hasMore={this.state.articles?.length !== this.state.totalResults} loader={<Spinner />}>
     <div className="container">
      <div className="row">
       {this.state.articles?.map((value) => {
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
