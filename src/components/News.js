import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ category, apiKey, country, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 6;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setProgress(0);
    setLoading(true);
    
    try {
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=6afd466d46c540e489503c56fd4f2e62&q=${country}&page=${page}&pageSize=${pageSize}`
      );
      setProgress(30);
      let parsedData = await data.json();
      setProgress(70);
      
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setHasMore(parsedData.articles.length < parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setHasMore(false);
    }
    setProgress(100);
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      let data = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=6afd466d46c540e489503c56fd4f2e62&q=${country}&page=${nextPage}&pageSize=${pageSize}`
      );
      let parsedData = await data.json();
      
      setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
      setPage(nextPage);
      setHasMore(articles.length + parsedData.articles.length < totalResults);
    } catch (error) {
      console.error("Error fetching more data:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - InsightDaily`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const badgeColors = {
    entertainment: "bg-danger",
    business: "bg-info",
    general: "bg-warning",
    health: "bg-success",
    science: "bg-primary",
    sports: "bg-secondary",
    technology: "bg-info",
  };

  return (
    <div className='container my-3'>
      <h1 className='text-center' style={{ margin: '35px' }}>
        InsightDaily - Top {capitalizeFirstLetter(!category ? "" : category)} Headlines
      </h1>
      
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen all the news!</b>
          </p>
        }
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element, index) => {
              const badgeColor = badgeColors[category.toLowerCase()] || "bg-warning";
              return (
                <div className='col-md-4' key={`${element.url}-${index}`}>
                  <Newsitem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={element.urlToImage || "https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png"}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    badgeColor={badgeColor}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  country: PropTypes.string,
  setProgress: PropTypes.func.isRequired
};

News.defaultProps = {
  category: 'general',
  country: 'in'
};

export default News;
