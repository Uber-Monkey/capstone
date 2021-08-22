const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = process.env.PORT || 80;

app.use(express.static("public"));
app.use(
   express.urlencoded({
     extended: true,
   })
 );
app.use(express.json());

app.listen(PORT, () => {
   console.log("Listening on Port: " + PORT);
});

/*****************************************************
 *
 * API for search- will return multiple movies if matching
 *
 *******************************************************/
app.post("/searchMovie", async function (req, res) {
  console.log("Request /search: " + req.body.searchMovie);

  const results = await searchOMDB(req.body.searchMovie);

  if (results.Response == "True") {
    ///SEARCH tag is removed to make it easier in the GUI
    return res.json(results.Search);
  } else {
    return res.json(results);
  }
});

/*****************************************************
 *
 * API for specific movie ID
 *
 *******************************************************/
app.post("/getMovie", async function (req, res) {
  console.log("Request /getMovie: " + req.body.movieID);

  const results = await getOMDB(req.body.movieID);

  return res.json(results);
});

/*****************************************************
 *
 * Searchs OMDB and returns all matches.
 *
 *******************************************************/
async function searchOMDB(search) {
  const result = await fetch(
    "http://www.omdbapi.com/?apiKey=53737baf&s=" + search
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  return result;
}

/*****************************************************
 *
 * Gets specific movie from OMDB.
 *
 *******************************************************/
async function getOMDB(movie) {
  const result = await fetch(
    "http://www.omdbapi.com/?apiKey=53737baf&i=" + movie
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  return result;
}
