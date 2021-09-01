import { useState, useEffect } from "react"

const GetMovieInfo = (value, action) => {
  const [data, setData] = useState("");

  let fetchValue;
  let bodyValue;
  if (action === "movies")
  {
    fetchValue = "searchMovie";
    bodyValue = JSON.stringify( {searchMovie: value});
  }
  else if (action === "movie")
  {
    fetchValue = "getMovie";
    bodyValue = JSON.stringify( {movieID: value});
  }

  //  alert("GetMovieAPI: " + movieID);
  useEffect(() => {
    //    const searchValue = JSON.stringify( {searchMovie: movieID});
    const fetchData = () => {
      fetch(fetchValue, {
        method: "POST",
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyValue,
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchData();
  }, [value]);

  return { data };
};

const GetReviews = () => {
  const [data, setData] = useState("");

  //  alert("GetMovieAPI: " + movieID);
  useEffect(() => {
    //    const searchValue = JSON.stringify( {searchMovie: movieID});
    const fetchData = () => {
      fetch("adminReview", {
        method: "POST",
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        // ,
        // body: JSON.stringify( {movieID: movieID})
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchData();
  }, []);

  return { data };
};

const UpdateReview = (id, action) => {

  const result = postData(
    "updateReview",
    JSON.stringify({ id: id, action: action })
  ).then((json) => {
    return JSON.stringify({ status: true });
  });
  return result;
};

const AddReview = (movieID, name, rating, comment) => {

  const result = postData(
    "addReview",
    JSON.stringify({ movieID : movieID, name: name, rating: rating, comment: comment })
  ).then((json) => {
    return JSON.stringify({ status: true });
  });
  return result;
};

const AuthUser = (user, pass) => {

  const result = postData(
    "authUser",
    JSON.stringify({ user : user, pass: pass })
  ).then((json) => {
    return json;
  });
  return result;
};

async function postData(callAPI, action) {
  const response = fetch(callAPI, {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: action,
  }).then((response) => response.json());

  return response;
}

export { GetReviews, GetMovieInfo, UpdateReview, AddReview, AuthUser };
