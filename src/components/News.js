import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  // proptypes
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 8,
    apiKey: "",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(75);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  btnPrev = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  btnNext = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({
      page: this.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          Top News headlines
        </h1>
        {this.state.loading && <Spinner></Spinner>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((item) => {
                return (
                  <div key={item.title} className="col-md-4">
                    <NewsItem
                      title={item.title ? item.title.slice(0, 45) : ""}
                      description={
                        item.description ? item.description.slice(0, 88) : ""
                      }
                      imageUrl={item.urlToImage}
                      url={item.url}
                      author={item.author}
                      publishedAt={item.publishedAt}
                      source={item.source.name}
                    ></NewsItem>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
