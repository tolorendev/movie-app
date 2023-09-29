import React, { useState } from "react";
import classes from "./Search.module.css";
import { API_KEY } from "../lib/api";
import { BASE_URL } from "../lib/api";

import NavBar from "../components/layout/NavBar";
import SearchForm from "../components/search/SearchForm";
import ResultList from "../components/search/ResultList";
import useHttp from "../hooks/use-http";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const { httpError, isLoading, requestHttpHandler: fetchMovies } = useHttp();
  const [isMovieNotFound, setIsMovieNotFound] = useState(false);

  //========================================================
  // Searching movies handler
  const searchHandler = (queryText) => {
    const URL = `${BASE_URL}/search/movie?language=en&api_key=${API_KEY}&query=${queryText}`;

    const dataHandler = (responseData) => {
      setMovies(responseData.results);
      // when movie not found
      if (responseData.results.length === 0) {
        setIsMovieNotFound(true);
      } else {
        setIsMovieNotFound(false);
      }
    };

    fetchMovies(URL, dataHandler);
  };

  //==========================================
  // JSX elements

  const loadingModalContent = <div> Searching ...</div>;

  const errorModalContent = <div className={classes.error}>{httpError}</div>;

  const movieNotFoundContent = (
    <div className={classes["not-found"]}>Result 0</div>
  );

  return (
    <div className={classes.search}>
      <NavBar />

      <SearchForm onSearch={searchHandler} />
      <section className={classes["resultList-section"]}>
        {movies.length > 0 && !isMovieNotFound && !isLoading && !httpError && (
          <ResultList movies={movies} />
        )}

        {isLoading && loadingModalContent}
        {httpError && !isLoading && errorModalContent}
        {isMovieNotFound && !httpError && !isLoading && movieNotFoundContent}
      </section>
    </div>
  );
};

export default Search;
