import React, { useState } from "react";
import classes from "./ResultList.module.css";
import MovieDetail from "../browse/MovieDetail";
import Modal from "../../components/UI/Modal";

function ResultList(props) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [currentMovie, setCurrentMovie] = useState();

  //========================================================
  // Handlers
  const clickMovieHandler = (movie) => {
    setCurrentMovie(movie);
    setIsShowDetail(true);
  };

  const closeModalHandler = () => {
    setIsShowDetail(false);
  };

  //======================================
  // JSX element
  const movieListContent = (
    <div className={classes.movieList}>
      <h3>Search Result</h3>
      <div className={classes["movieList-content"]}>
        {props.movies.map((movie) => (
          <div
            className={classes.col}
            key={movie.id}
            onClick={clickMovieHandler.bind(null, movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${
                movie.poster_path || movie.backdrop_path
              }`}
              alt={movie.name || movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {movieListContent}

      {isShowDetail && (
        <Modal onClose={closeModalHandler}>
          <MovieDetail currentMovie={currentMovie} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export default ResultList;
