import movieTrailer from "movie-trailer";
import React, { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  /* Setting the state of the trailerUrl to an empty string. */
  const [trailerUrl, setTrailerUrl] = useState("");
  /* Setting the height and width of the YouTube video. */
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  /**
   * When the user hovers over a movie, the movieTrailer function is called and the trailerUrl state is
   * set to the value of the v parameter in the url.
   */
  const handleHover = async (Title) => {
    movieTrailer(Title || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
          onMouseOver={() => handleHover(Title)}
        />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
      {/* Checking if there is a trailerUrl, if there is, it will render the YouTube component. */}
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </div>
  );
};

export default MovieCard;
