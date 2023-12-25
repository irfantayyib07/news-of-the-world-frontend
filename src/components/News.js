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

 // 

 json = null;

 constructor() {
  super();
  this.state = {
   articles: [],
   loading: true,
   totalResults: null,
  }
 }

 async componentDidMount() {
  this.fetchMoreData();
 }

 // MY FUNCTIONS

 fetchMoreData = async () => {
  this.setState({ loading: true, })

  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page++}&pageSize=${this.props.pageSize}`;

  console.log(url);

  let data = await fetch(url);
  this.json = await data.json();

  if (this.json.status === "error") {
   this.setState({ loading: false })
   return;
  }

  this.setState({
   articles: this.state.articles.concat(this.json.articles),
   totalResults: this.json.totalResults,
  });
 };

 // RENDER

 render() {
  return (
   <>
    <h4>Top Headlines</h4>
    <InfiniteScroll
     dataLength={this.state.articles.length}
     next={this.fetchMoreData}
     hasMore={this.state.articles.length !== this.state.totalResults}
     loader={this.state.loading ? <Spinner /> : <Alert message={this.json.message} />}
    >

     <div className="container">

      <div className="row">
       {
        !!this.state.articles.length &&
        
        this.state.articles.map((article, i) => (
         <div className="col-md-4 my-3" key={i}>
          <NewsItems
           title={article.title?.slice(0, 45)}
           description={article.description?.slice(0, 88)}
           imgUrl={article.urlToImage}
           newsUrl={article.url}
          />
         </div>
        ))
       }
      </div>

     </div>

    </InfiniteScroll>
   </>
  )
 }
}

export default News
