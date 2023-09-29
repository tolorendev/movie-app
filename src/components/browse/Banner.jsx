import useHttp from "../../hooks/use-http";
import classes from "./Banner.module.css";
import React, { useEffect, useRef, useState } from "react";

function Banner(props) {
  const [bannerMovie, setBannerMovie] = useState({});
  const { httpError, isLoading, requestHttpHandler } = useHttp();
  const effectRan = useRef(false);

  const findRandomMovieHandler = (responseData) => {
    const randomIndex = Math.floor(Math.random() * responseData.results.length);
    const randomMovie = responseData.results[randomIndex];
    setBannerMovie(randomMovie);
  };

  useEffect(() => {
    // Only run useEffect 1 time
    if (effectRan.current === false) {
      requestHttpHandler(props.endpointURL, findRandomMovieHandler);
    }
    return () => {
      effectRan.current = true;
    };
  }, [props.endpointURL, requestHttpHandler]);

  //=====================================
  // Handle Loading & Error
  if (httpError) {
    return (
      <section className={classes.banner}>
        <div>{httpError}</div>
      </section>
    );
  }
  if (isLoading || Object.keys(bannerMovie).length === 0) {
    return (
      <section className={`${classes.banner} ${classes.loading}`}>
        <div className={classes.loader}></div>
      </section>
    );
  }

  return (
    <section className={classes.banner}>
      <div className={classes.container}>
        <div className={classes["img-box"]}>
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/original${bannerMovie.poster_path}`}
            alt="original poster"
          />
          <img
            className={classes.backdrop}
            src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}
            alt="original backdrop"
          />
        </div>
        <h2>{bannerMovie.name}</h2>
        <div className={classes.actions}>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{bannerMovie.overview}</p>
      </div>
    </section>
  );
}
export default Banner;
