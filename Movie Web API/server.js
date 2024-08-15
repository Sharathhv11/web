import express from "express";
import fs from "fs";
import cors from "cors";

//?intializing the express app
const app = express();

// todo applying the middle ware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

//*mimicing the reading data from a data base
let movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));
let landingPage = fs.readFileSync("./index.html","utf-8");

//!this function handles searching of specific movie
function findData(id) {
  return Array.from(movies).filter((element) => {
    if (element.ID === +id) {
      return element;
    }
  });
}

// ^ port number on which app is running
const port = 8080;

const getMovies = (req, res) => {
  //*this function retrieves data from database and  sends all the movies to client
  const json = {
    status: "success",
    movies: [...movies],
    total: Object.keys(movies).length,
  };
  res.json(json);
};

const postMovie = (req, res) => {
  //*this function adds a new movie to the data base
  const ID = movies.length * 2 + 1000;
  const newMovie = {
    ...req.body,
    ID: ID,
  };

  movies = [...movies, newMovie];

  fs.writeFile("./movies.json", JSON.stringify(movies), "utf-8", (error) => {
    if (error) {
      res.send("an error occured");
    } else {
      res.status(201).send({
        status: "success",
        movie: newMovie,
      });
    }
  });
};

const getMovie = (req, res) => {
  //*this function retrieves data from database and  sends a specific movie to client
  const data = findData(req.params.id);
  if (!data.length) {
    res.json({
      result: 0,
    });
  } else {
    const json = {
      status: "success",
      movies: data[0],
    };
    res.json(json);
  }
};

const updateMovie = (req, res) => {
  //! contdition for checking whether user is trying to update movie id or not
  if (!(req.body.ID || req.body.id)) {
    //*if not we will pass the movies array in a map function and use the js es6 feature destructering to update movie object and set its index
    let index;
    let updatedArray = movies.map((mve, ind) => {
      if (mve.ID === req.params.id * 1) {
        index = ind;
        return {
          ...mve,
          ...req.body,
        };
      } else {
        return mve;
      }
    });
    //? assigning the new array to movies array
    movies = updatedArray;
    fs.writeFile("./movies.json", JSON.stringify(movies), "utf-8", (error) => {
      if (error) {
        res.json({
          status: "fail",
          message: `no movie found with ${res.params.id} ID`,
        });
      } else {
        res.json({
          status: "success",
          movie: {
            name: movies[index],
          },
        });
      }
    });

    //!if user is trying to update ID property which is handles by backend it will repond with this json
  } else {
    res.json({
      status: "fail",
      message: "you cant update id of a movie",
    });
  }
};

const deleteMovie = (req, res) => {
  //this function delets the movie in the database 
  const movieToDelete = Array.from(movies).find(
    (el) => el.ID === req.params.id * 1
  );
  if (movieToDelete) {
    const indexOfMovie = movies.indexOf(movieToDelete);
    movies.splice(indexOfMovie, 1);
    fs.writeFile("./movies.json", JSON.stringify(movies), "utf-8", (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json({
          status: "deleted",
        });
      }
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: `no movie found with ID ${req.params.id}`,
    });
  }
};

// //? end point for retreving  all movies
// app.get("/api/v1/movies", getMovies);

// //?end point too post movie
// app.post("/api/v1/movies",postMovie);

// //?end point to get movie by id
// app.get("/api/v1/movies/:id", getMovie);

// //? patch requests to update some properties in movie
// app.patch("/api/v1/movies/:id", updateMovie);

// //? this route handles the delete functionality
// app.delete("/api/v1/movies/:id",deleteMovie)
const getlandingpage = (req,res)=>{
  res.send(landingPage);
}
app.get("/",getlandingpage)
app
  .route("/api/v1/movies")
  .get(getMovies)
  .post(postMovie);

app
  .route("/api/v1/movies/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie);

app.listen(port, () => {
  console.log(`http://localhost:8080`);
});
