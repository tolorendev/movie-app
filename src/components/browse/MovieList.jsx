import useHttp from "../../hooks/use-http";
import MovieDetail from "./MovieDetail";
import classes from "./MovieList.module.css";
import React, { useEffect, useState, useRef } from "react";

function MovieList(props) {
  const { httpError, isLoading, requestHttpHandler: fetchMovies } = useHttp();
  const [movies, setMovies] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});
  const movieDetailModalRef = useRef();
  const movieListRef = useRef();

  //==============================================
  // Fetch movies
  useEffect(() => {
    const dataHandler = (responseData) => {
      setMovies(responseData.results);
    };
    fetchMovies(props.endpointURL, dataHandler);
  }, [fetchMovies, props.endpointURL]);

  //===============================================
  // Handler: Handle when click "MovieList"
  const clickMovieHandler = (movie) => {
    if (movie.id === currentMovie.id) {
      console.log("click trùng lại phim");
      setCurrentMovie({});
      setIsShowDetail(false);
    } else {
      console.log("click phim Khác");
      setCurrentMovie(movie);
      setIsShowDetail(true);
    }
  };

  //==============================================
  // Handler: Handle when click outside of "MovieList" and "MovieDetail"
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click outside of "MovieList" and "MovieDetail"
      if (
        isShowDetail &&
        movieDetailModalRef.current &&
        !movieDetailModalRef.current.contains(event.target) &&
        movieListRef.current &&
        !movieListRef.current.contains(event.target)
      ) {
        console.log("click ra ngoài!");
        setIsShowDetail(false);
        setCurrentMovie({});
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isShowDetail]);

  //==============================================
  // Handle Loading and Error
  if (httpError) {
    return <div className={classes["error-text"]}>{httpError}</div>;
  }

  if (isLoading || movies.length === 0) {
    return <div></div>;
  }

  //==============================================
  // JSX elenments

  // CSS class
  const movieListClass =
    props.movieType === "ORIGINAL"
      ? `${classes.original} ${classes.movieList}`
      : classes.movieList;
  // Display movie type
  const movieTypeHeadingContent =
    props.movieType === "ORIGINAL" ? "" : <h3>{props.movieType}</h3>;
  // Make imagle URL
  const imageUrlHandler = (movie) =>
    `https://image.tmdb.org/t/p/w500${
      props.movieType === "ORIGINAL" ? movie.poster_path : movie.backdrop_path
    }`;

  const movieListContent = (
    <div className={movieListClass}>
      {movieTypeHeadingContent}
      <div className={classes["movieList-content"]} ref={movieListRef}>
        {movies.map((movie) => (
          <div
            className={`${classes.col} ${
              movie.id === currentMovie.id && classes["active-movie"]
            }`}
            key={movie.id}
            onClick={clickMovieHandler.bind(null, movie)}
          >
            <img
              src={imageUrlHandler(movie)}
              alt={` ${movie.name || movie.title}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {!isLoading && movies.length > 0 && movieListContent}
      {isShowDetail && (
        <div style={{ margin: "12px" }}>
          <MovieDetail currentMovie={currentMovie} ref={movieDetailModalRef} />
        </div>
      )}
    </React.Fragment>
  );
}
export default MovieList;
