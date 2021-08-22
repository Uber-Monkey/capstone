// using a global variable to hold search data for return button
var globalSearchData;

// add event for enter key
let input = document.querySelector("#searchMovie");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchMovie();
  }
});

//***************************************************************************
// SEARCH FOR MOVIE
//***************************************************************************
async function searchMovie() {
  // empty sections
  document.querySelector("#movie").innerHTML = "";
  document.querySelector("#movies").innerHTML = "";
  // reset error message
  document.querySelector("#error").textContent = "";

  let searchMovie = JSON.stringify({
    searchMovie: document.querySelector("#searchMovie").value
  });

  // we want to see what the movie being searched for
  console.log("Search Entered: " + searchMovie);

  postData("searchMovie", searchMovie).then((json) => {

    if (json.Response == "False")
    {
      document.querySelector("#error").textContent = json.Error;
    } else {
      globalSearchData = json;
      displayMovies();
    }
  });
}

//***************************************************************************
// GET MOVIE
//***************************************************************************
async function getMovie(movieID) {
  document.querySelector("#movie").innerHTML = "";
  document.querySelector("#movies").innerHTML = "";

  let getMovie = JSON.stringify({
    movieID: movieID,
  });

  // we want to see what the movie being searched for
  console.log("Getting Movie: " + movieID);

  postData("getMovie", getMovie).then((json) => {

      // unhide the return button
      document.querySelector("#button-return").hidden = false;
      let movie = document.createElement("section");

      // add image
      let poster = document.createElement("img");
      poster.setAttribute("src", json.Poster);

      // Add title to bottom
      let title = document.createElement("h2");
      title.textContent = `${json.Title}`;

      // Year and Rating
      let date = document.createElement("p");
      date.textContent = `${json.Released} - ${json.Rated}`;

      // Genre
      let genre = document.createElement("p");
      genre.textContent = `${json.Genre}`;

      //  IMDb Rating
      let imdb = document.createElement("p");
      imdb.textContent = `IMDb Rating: ${json.imdbRating}`;
     
      //  Meta Score 
      let meta = document.createElement("p");
      meta.textContent = `Metascore: ${json.Metascore}`;

      //  Awards
      let awards = document.createElement("p");
      awards.textContent = `Awards:  ${json.Awards}`;

      //  Box Office
      let office = document.createElement("p");
      office.textContent = `Box Office: ${json.BoxOffice}`;

      //  Plot
      let plot = document.createElement("p");
      plot.textContent = `${json.Plot}`;
  
      // add new items to the movie id
      movie.appendChild(poster);
      movie.appendChild(title);
      movie.appendChild(date);
      movie.appendChild(genre);
      movie.appendChild(imdb);
      movie.appendChild(meta);
      movie.appendChild(awards);
      movie.appendChild(office);
      movie.appendChild(plot);
      document.querySelector("#movie").appendChild(movie);

  });
}

//***************************************************************************
// Display single movie
//***************************************************************************
function displayMovies() {

  document.querySelector("#movie").innerHTML = "";
  document.querySelector("#movies").innerHTML = "";
  document.querySelector("#button-return").hidden = true;
  
  for (let cnt = 0; cnt < globalSearchData.length; cnt++) {
    let movies = document.createElement("section");
    let image = document.createElement("img");
    image.setAttribute("src", globalSearchData[cnt].Poster);
    image.addEventListener("click", function () {
      getMovie(globalSearchData[cnt].imdbID);
    });

    movies.appendChild(image);
    document.querySelector("#movies").appendChild(movies);
  }
}

//***************************************************************************
// Function to handle all API calls
//***************************************************************************
async function postData(callAPI, data) {
  const response = fetch(callAPI, {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then((response) => response.json());

  return response;
}
