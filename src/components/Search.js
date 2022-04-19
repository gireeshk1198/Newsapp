import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from 'react-router-dom';

export class Search extends Component {
  state = {
    newsData: {},
    articles: [],
    searchInput: '',
    page: 1,
    totalResults: 0,
    loading: false,
    isSearchButtonClicked: false,
  }
  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
     
    })
  }

  onClickSearchButton = () => {
    this.getNewsData()
    this.setState({
      isSearchButtonClicked: true,
    })
    
  

  }
  getNewsData = async () => {
    const { searchInput } = this.state
    this.setState({
      loading: true
    })
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchInput}&language=en&sortBy=publishedAt&apikey=057062e5baeb445094329531eaf355cd&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    const data = await response.json()
    this.setState({
      newsData: data,
      totalResults: data.totalResults,
      articles: data.articles,
      loading: false,
      page: this.state.page + 1
    })

  }
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    const response = await fetch(`https://newsapi.org/v2/everything?q=${this.state.searchInput}&language=en&sortBy=publishedAt&apikey=057062e5baeb445094329531eaf355cd&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    const data = await response.json()
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults
    })


  }



  render() {
    const { articles, totalResults, loading, isSearchButtonClicked, searchInput } = this.state
    return (
      <>
        <form className="  d-flex justify-content-center mx-3" style={{ 'marginTop': "20px" }}>
                                <label style={{ margin: "0.25px" }}><Link to="/search"><input className="me-2 searchButton" type="search" onChange={this.onChangeSearchInput} placeholder="Search" aria-label="Search" /></Link></label>
                                <button style={{ fontSize: "12px" }}type="button"  onClick={this.onClickSearchButton} className="btn btn-info sm" >Search </button>
                            </form>
        {isSearchButtonClicked && searchInput.length !== 0}
        <div className='container my-3'>
          
          <InfiniteScroll
            dataLength={articles.length}
            next={this.fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >
            <div className=" container row">
              {!loading && articles.map((element) => {
                return (<div className="col-lg-6 col-sm-12 my-3" key={articles.url}>
                  <NewsItem author={element.author} description={element.description} title={element.title} url={element.url} urlToImage={element.urlToImage} publishedAt={element.publishedAt} name={element.source.name} />
                </div>)
              })}
            </div>
          </InfiniteScroll>
        </div>
        {isSearchButtonClicked && searchInput.length !== 0 && totalResults === 0 && <p className='text-center'>No results Found</p>}
      </>

    )
  }
}

export default Search