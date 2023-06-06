// require express and other modules
const express = require("express");
const app = express();
// Express Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + "/public"));

const db = require("./models");

// HTML Endpoints
app.get("/", function homepage(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// JSON API Endpoints
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to my app api!",
    documentationUrl: "", //leave this also blank for the first exercise
    baseUrl: "", //leave this blank for the first exercise
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints",
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Data about me",
      },
      {
        method: "GET",
        path: "/api/books/",
        description: "Get All books information",
      },
      {
        method: "POST",
        path: "/api/books/",
        description: "Create a book with provided information",
      },
      {
        method: "PUT",
        path: "/api/books/:id",
        description: "Update book details with provided id number",
      },
      {
        method: "DELETE",
        path: "/api/books/:id",
        description: "Delete book details with provided id number",
      },
    ],
  });
});

app.get("/api/profile", (req, res) => {
  res.json({
    name: "Emin",
    homeCountry: "Azerbaijan",
    degreeProgram: "Informatics",
    email: "emin.sadikhov@tum.de",
    deployedURLLink: "",
    apiDocumentationURL: "",
    currentCity: "Munich",
    hobbies: ["Coding", "Swimming", "Guitar playing"],
  });
});

// Get All books information
app.get("/api/books/", (req, res) => {
  // use the books model and query to mongo database to get all objects
  db.books.find({}, function (err, books) {
    if (err) throw err;
    // return the object as array of json values
    res.json(books);
  });
});

// Add a book information into database
app.post("/api/books/", (req, res) => {
  // New Book information in req.body
  console.log(req.body);

  var newBook = {
    title: req.body.title,
    author: req.body.author,
    releaseDate: req.body.releaseDate,
    genre: req.body.genre,
    rating: req.body.rating,
    language: req.body.language,
  };

  console.log("logging new book");
  console.log(newBook);

  db.books.create(newBook, function (err, newBook) {
    if (err) {
      throw err;
    } else {
      res.json(newBook);
    }
  });
});

// Update a book information based upon the specified ID
app.put("/api/books/:id", (req, res) => {
  // Get the book ID and new information of book from the request parameters
  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  var updatedBookInfo = {
    title: req.body.title,
    author: req.body.author,
    releaseDate: req.body.releaseDate,
    genre: req.body.genre,
    rating: req.body.rating,
    language: req.body.language,
  };

  db.books.findByIdAndUpdate(
    { _id: bookId },
    bookNewData,
    function (err, updatedBookInfo) {
      if (err) {
        throw err;
      } else {
        res.json(updatedBookInfo);
      }
    }
  );
});

// Delete a book based upon the specified ID
app.delete("/api/books/:id", (req, res) => {
  // Get the book ID of book from the request parameters
  const bookId = req.params.id;

  var deletedBook = {};
  db.books.findByIdAndDelete({ _id: bookId }, function (err, deletedBook) {
    if (err) {
      throw err;
    } else {
      res.json(deletedBook);
    }
  });
});

// listen on the port 3000
app.listen(process.env.PORT || 80, () => {
  console.log("Express server is up and running on http://localhost:80/");
});
