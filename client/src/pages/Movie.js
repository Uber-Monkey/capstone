import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GetMovieInfo, AddReview } from "../ExpressAPI.js";
import Popup from "./Popup";
import myvars from "../global.js";

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
          <h2 className="movie-title"> {data.Title} </h2>
          <p className="move-details">Released: {data.Released}</p>
          <p className="move-details">Genre: {data.Genre}</p>
          <p className="move-details">MetaScore: {data.Metascore}</p>
          <p className="move-details">imdbRating: {data.imdbRating}</p>
          <p className="move-details">{data.Awards}</p>
          <p className="move-details">Box Office: {data.BoxOffice}</p>
          <p className="move-details"> {data.Plot}</p>
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
            <p className="review-header">
              {new Date(item.reviewed).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              : {item.reviewer} : {item.rating}
            </p>
            <p className="review-comment">{item.comment}</p>
          </section>
        );
      });
    }

    return content;
  };

  return (
    <div>
      <img src="Logo.png" alt="sslogo" className="logo logo-dark" />
      <Link to="/movies">
        <button className="button-medium" title="MoviesPage">
          <img src="back.png" alt="back arrow" />
        </button>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/">
        <button className="button-medium" title="SearchPage">
          <img src="home.png" alt="Home page button" />
        </button>
      </Link>
      <div className="movie">{getMovie(data)}</div>
      <div>
        <h2>User Review's</h2>
        <div className="reviews">{getReviews(data)}</div>
        {isOpen && (
          <Popup
            content={
              <div>
                <div>
                  <div>
                    <input
                      placeholder="Username"
                      onChange={(e) => {
                        setRatingUser(e.target.value);
                      }}
                    />
                  </div>
                  <br></br>
                  <div
                    className="slidecontainer"
                    onChange={(e) => {
                      setRatingNumber(e.target.value);
                    }}
                  >
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
                    <textarea
                      placeholder="Comment"
                      onChange={(e) => {
                        setRatingComment(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="buttons">
                  <button
                    disabled={!ratingUser || !ratingComment}
                    onClick={SubmitReview}
                  >
                    Submit
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={() => {
                      togglePopup();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            }
            handleClose={togglePopup}
          />
        )}
        {!isOpen && (
          <button className="button-medium button-review" onClick={togglePopup}>
            Add Review
          </button>
        )}
      </div>
    </div>
  );
}
