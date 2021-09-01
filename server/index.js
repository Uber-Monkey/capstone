/***
 *
 * https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
 *
 */

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const path = require("path");
const pool = require("./pgdb"); // Postgres / Heroku connection
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Test response from server!" });
});

/*****************************************************
 *
 * API for search- will return multiple movies if matfching
 *
 *******************************************************/
app.post("/searchMovie", async function (req, res) {
  // const d = new Date();
  // console.log(d.toString() + " :Request /search: " + req.body.searchMovie);

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
 * Return all pending movies for admin review
 *
 *******************************************************/
app.post("/adminReview", async function (req, res) {
  console.log("Request /adminReview ");

  const results = await queryReviews(null);

  return res.json(results);
});

/*****************************************************
 *
 * Updates Pending Status or Delete review
 *
 *******************************************************/
app.post("/updateReview", async function (req, res) {
  console.log(
    "Request /updateReview  id:" + req.body.id + "  action:" + req.body.action
  );

  const results = await updateReview(req.body.id, req.body.action);

  return res.json(results);
});

/*****************************************************
 *
 * Add New Review
 *
 *******************************************************/
app.post("/addReview", async function (req, res) {
   console.log( "Request /addReview");

  // console.log(
  //   "Request /addReview  id:" +
  //     req.body.movieID +
  //     "  name:" +
  //     req.body.name +
  //     " rating: " +
  //     req.body.rating +
  //     " comment: " +
  //     req.body.comment
  // );

  const results = await addReview(
    req.body.movieID,
    req.body.name,
    req.body.rating,
    req.body.comment
  );

  return res.json(results);
});

/*****************************************************
 *
 * Autenticate user
 *
 *******************************************************/
app.post("/authUser", async function (req, res) {
  console.log(
    "Request /authUser"  //user:" + req.body.user + "  pass:" + req.body.pass
  );

  const results = await authUser(req.body.user, req.body.pass);

  return res.json(results);
});

/*****************************************************
 *
 * internal support functions
 *
 *******************************************************/

/*****************************************************
 * Searchs OMDB and returns all matches.
 *******************************************************/
async function searchOMDB(search) {
  const results = await fetch(
    "http://www.omdbapi.com/?apiKey=53737baf&s=" + search
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  return results;
}

/*****************************************************
 * Gets specific movie from OMDB.
 *******************************************************/
async function getOMDB(movieID) {
  const results = await fetch(
    "http://www.omdbapi.com/?apiKey=53737baf&i=" + movieID
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  results.Reviews = await queryReviews(movieID);

  return results;
}

async function queryReviews(movieID) {
  try {
    const results =
      movieID == null
        ? await pool.query("select * from reviews where approved = false")
        : await pool.query(
            "select id, reviewed, rating, comment, reviewer from reviews where movieid = $1 and approved = true order by reviewed",
            [movieID]
          );

    return results.rows;
  } catch (error) {
    console.error("Error: " + error.message);
  }
}

async function updateReview(id, action) {
  try {
    const results =
      action == "approve"
        ? await pool.query("update reviews set approved = true where id = $1", [
            id,
          ])
        : await pool.query("delete from reviews where id = $1", [id]);

    return results;
  } catch (error) {
    console.error("Error: " + error.message);
  }
}

async function addReview(movieID, name, rating, comment) {
  let today = new Date(Date.now()).toLocaleString().split(",")[0];
  try {
    const results = await pool.query(
      "insert into reviews (movieid, reviewed, reviewer, rating, comment) values ($1, $2, $3, $4, $5)",
      [movieID, today, name, rating, comment]
    );

    return results;
  } catch (error) {
    console.error("Error: " + error.message);
  }
}

async function authUser(user, pass) {

  const hash = bcrypt.hashSync(pass, salt);

//  console.log("User: " + user + "  Pass: " + pass + "  hash: " + hash);

  try {
    const results = await pool.query('select pass from admin where "user" = $1', [user]);

    if (results.rowCount > 0)
    {
       // if we get a user back then compare password and return result
//      console.log(results.rows[0].pass);
      return await comparePassword(pass, results.rows[0].pass);
    } else
    {
      return false;
    }

  } catch (error) {
    console.error("Error: " + error.message);
  }
  return false;
}

async function comparePassword(password, hash)
{
  try {
      // Compare password
      return await bcrypt.compare(password, hash);
  } catch (error) {
      console.log(error);
  }

  // Return false if error
  return false;
};

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on Port: " + PORT);
});
