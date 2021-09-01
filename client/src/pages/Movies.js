import React from "react"
import { useHistory, Link } from "react-router-dom"
import { GetMovieInfo } from "../ExpressAPI.js"
import myvars from "../global.js"
import "./Movies.css"

export default function SearchMovies() {
  const history = useHistory();
  const { data } = GetMovieInfo(myvars.searchValue, "movies");

  const getMovies = (data) => {
    let content = [];

    if (data !== "") {
      if (data.Response === "False") {
        content.push(<div className="error">{data.Error}</div>);
      } else {
        for (let item of data) {
          content.push(
            <section key={item.imdbID}>
              <img
                src={item.Poster}
                alt={item.Title}
                onClick={() => getMovie(item.imdbID)}
              />
            </section>
          );
        }
      }
    }

    return content;
  };

  const getMovie = (e) => {
    localStorage.setItem("movieID", e);
    myvars.movieID = e;
    history.push("/movie");
  };

  return (
    <div className="moviesPage">
      <img src="Logo.png" alt="sslogo" className="logo-alt" />
      <div className="button">
        <div className="Movies">
        <Link to="/">
          <button title="Search Page">
            <img src="home.png" alt="Home page button" />
          </button>
        </Link>
        </div>
      </div>
      <div className="movies">{getMovies(data)}</div>
    </div>
  );
}
