import React from "react";

import classes from "./Browse.module.css";
import NavBar from "../components/layout/NavBar";
import MovieList from "../components/browse/MovieList";
import Banner from "../components/browse/Banner";

import { endpointURLs } from "../lib/api";
function Browse() {
  return (
    <div className={classes.browse}>
      <NavBar />

      <Banner endpointURL={endpointURLs.fetchNetflixOriginals} />

      <section className={classes["movieList-section"]}>
        <MovieList
          endpointURL={endpointURLs.fetchNetflixOriginals}
          movieType={"ORIGINAL"}
        />
        <MovieList
          endpointURL={endpointURLs.fetchTrending}
          movieType={"Xu hướng"}
        />
        <MovieList
          endpointURL={endpointURLs.fetchTopRated}
          movieType={"Xếp hạng cao"}
        />
        <MovieList
          endpointURL={endpointURLs.fetchActionMovies}
          movieType={"Hành động"}
        />
        <MovieList
          endpointURL={endpointURLs.fetchComedyMovies}
          movieType={"Hài"}
        />
        <MovieList
          endpointURL={endpointURLs.fetchHorrorMovies}
          movieType={"Kinh dị"}
        />
        <MovieList
          endpointURL={endpointURLs.fetchRomanceMovies}
          movieType={"Lãng mạn"}
        />
        <MovieList
          endpointURL={endpointURLs.fetchDocumentaries}
          movieType={"Tài liệu"}
        />
      </section>
    </div>
  );
}

export default Browse;
