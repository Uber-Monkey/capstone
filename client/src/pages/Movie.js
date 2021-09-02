import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GetMovieInfo, AddReview } from "../ExpressAPI.js";
import Popup from "./Popup";
import myvars from "../global.js";
import "./Movie.css";

export default function GetMovie() {
  const { data } = GetMovieInfo(myvars.movieID, "movie");
  const [isOpen, setIsOpen] = useState(false);

  const [ratingUser, setRatingUser] = useState("");
  const [ratingNumber, setRatingNumber] = useState(5);
  const [ratingComment, setRatingComment] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setRatingUser("");
    setRatingNumber(5);
    setRatingComment("");
  };

  const SubmitReview = () => {
    AddReview(myvars.movieID, ratingUser, ratingNumber, ratingComment).then(
      (json) => {
        togglePopup();
        alert("Your review will be visible after approval.");
      }
    );
  };

  const getMovie = (data) => {
    let content = [];

    if (data !== "") {
      content.push(
        <section key="1">
          <img src={data.Poster} alt={data.Title} />
          <h2> {data.Title} </h2>
          <p>Released: {data.Released}</p>
          <p>Genre: {data.Genre}</p>
          <p>MetaScore: {data.Metascore}</p>
          <p>imdbRating: {data.imdbRating}</p>
          <p>{data.Awards}</p>
          <p>Box Office: {data.BoxOffice}</p>
          <p> {data.Plot}</p>
        </section>
      );
    }
    return content;
  };

  const getReviews = (data) => {
    let content = [];
    if (data !== "") {
      data.Reviews.forEach((item) => {
        content.push(
          <section key={item.id}>
            <span>
              {new Date(item.reviewed).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              : {item.reviewer} : {item.rating}
            </span>
            <p>{item.comment}</p>
          </section>
        );
      });
    }

    return content;
  };

  return (
    <div className="moviePage">
      <img src="Logo.png" alt="sslogo" className="logo-alt" />
      <div className="button">
        <div className="Movie">
          <Link to="/movies">
            <button title="MoviesPage">
              <img src="back.png" alt="back arrow" />
            </button>
          </Link>
          <Link to="/">
            <button title="SearchPage">
              <img src="home.png" alt="Home page button" />
            </button>
          </Link>
        </div>
      </div>
      <div className="movie">{getMovie(data)}</div>
      <div>
        <h2>User Review's</h2>
        <div className="reviews">{getReviews(data)}</div>
        <div className="button reviewButton">
          {isOpen && (
            <Popup
              content={
                <div>
                  <div className="buttons">
                    <div>
                      {/* Name */}{" "}
                      <input
                        placeholder="Username"
                        onChange={(e) => {
                          setRatingUser(e.target.value);
                        }}
                      />
                    </div>
                    <br></br>
                    <div
                      // slider
                      className="slidecontainer"
                      onChange={(e) => {
                        setRatingNumber(e.target.value);
                      }}
                    >
                      {/* Rate */}{" "}
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={ratingNumber}
                        className="slider"
                      />
                      <br></br>
                      <label>Rating: {ratingNumber}</label>
                    </div>
                    <div>
                      {/* Comment */}{" "}
                      <textarea placeholder="Comment" onChange={(e) => {setRatingComment(e.target.value) }}/>
                    </div>
                  </div>
                  <div className="pop-button">
                    <button disabled={!ratingUser || !ratingComment} onClick={SubmitReview}>Submit</button>
                  {/* </div>
                  <div className="pop-button"> */}
                    <button onClick={() => {togglePopup(); }}>Cancel</button>
                  </div>
                </div>
              }
              handleClose={togglePopup}
            />
          )}
          {!isOpen && <button onClick={togglePopup}>Add Review</button>}
        </div>
      </div>
    </div>
  );
}
