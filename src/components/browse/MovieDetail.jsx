import React, { useState, useEffect } from "react";
import classes from "./MovieDetail.module.css";
import { API_KEY } from "../../lib/api";
import useHttp from "../../hooks/use-http";

const MovieDetail = React.forwardRef((props, ref) => {
  const [videoKey, setVideoKey] = useState();

  const {
    httpError,
    isLoading,
    requestHttpHandler: fetchMovieVideos,
  } = useHttp();

  //========================================================
  // Handler: Find video key
  const findVideoKeyHandler = (responseData) => {
    const loadedVideos = responseData.results;
    // Find trailer videos and teaser video
    const trailerVideos = loadedVideos.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    const teaserVideos = loadedVideos.filter(
      (video) => video.site === "YouTube" && video.type === "Teaser"
    );
    // Find video key (Priority: trailer > teaser)
    if (trailerVideos.length > 0) {
      setVideoKey(trailerVideos[0].key);
    } else if (teaserVideos.length > 0) {
      setVideoKey(teaserVideos[0].key);
    } else {
      setVideoKey("NOT_FOUND");
    }
  };

  //========================================================
  //  Fetch Videos of current Movie and find 1 video key
  useEffect(() => {
    setVideoKey(null);
    const movie_id = props.currentMovie.id;
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`;
    fetchMovieVideos(url, findVideoKeyHandler);
  }, [fetchMovieVideos, props.currentMovie.id]);

  //====================================================
  // JSX  1. Movie information content
  const movieInfoContent = (
    <div>
      <h4>{props.currentMovie.title || props.currentMovie.name}</h4>
      <hr />
      <div className={classes["date-and-vote"]}>
        <p>
          Release Date:{" "}
          {props.currentMovie.release_date || props.currentMovie.first_air_date}
        </p>
        <p>Vote: {props.currentMovie.vote_average} / 10</p>
      </div>
      <p className={classes.overview}>{props.currentMovie.overview}</p>
    </div>
  );

  //====================================================
  // JSX  2. Video content

  // Video content while loading... and  loaded success
  const videoBoxClasses = isLoading
    ? `${classes["video-box"]} ${classes["video-box__loading"]}`
    : classes["video-box"];
  const youtubeClasses = !isLoading
    ? `${classes.youtube} ${classes.ready}`
    : classes.youtube;

  let videoModalContent;
  if (videoKey !== "NOT_FOUND") {
    videoModalContent = (
      <div className={videoBoxClasses}>
        {videoKey && !isLoading && (
          <iframe
            title="youtube"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoKey}`}
            className={youtubeClasses}
          ></iframe>
        )}
        {isLoading && <div className={classes.loader}></div>}
      </div>
    );
  }

  // Video content when  Failed to load of Not found
  if (httpError || videoKey === "NOT_FOUND") {
    console.log('if === "NOT_FOUND"');
    videoModalContent = (
      <div className={classes["image-box"]}>
        <img
          src={`https://image.tmdb.org/t/p/w500${props.currentMovie.backdrop_path}`}
          alt={props.currentMovie.name || props.currentMovie.title}
        />
        {httpError && (
          <p className={classes["load-video__error"]}>* Failed to load video</p>
        )}
        {videoKey === "NOT_FOUND" && (
          <p className={classes["load-video__notFound"]}>
            * Video is not Found
          </p>
        )}
      </div>
    );
  }

  return (
    <section className={classes.movieDetail} ref={ref}>
      {movieInfoContent}
      {videoModalContent}
    </section>
  );
});
export default MovieDetail;
