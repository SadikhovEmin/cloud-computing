// require express and other modules
const express = require("express");
const app = express();
// Express Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + "/public"));

/************
 * DATABASE *
 ************/

const db = require("./models");

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get("/", function homepage(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/*
 * JSON API Endpoints
 */

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
      { method: "GET", path: "/api/profile", description: "Data about me" },
      {
        method: "GET",
        path: "/api/books/",
        description: "Get All books information",
      },
      {
        method: "POST",
        path: "/api/books/",
        description: "Insert a new book information",
      },
      {
        method: "PUT",
        path: "/api/books/",
        description: "Update a book information, based on id",
      },
      {
        method: "DELETE",
        path: "/api/books/",
        description: "Delete a book information, based on id",
      },
      // TODO: Write other API end-points description here like above
    ],
  });
});

app.get("/api/profile", (req, res) => {
  res.json({
    name: "John",
    homeCountry: "Winterfell",
    degreeProgram: "Night's Watch", //informatics or CSE.. etc
    email: "john@got.com",
    deployedURLLink: "", //leave this blank for the first exercise
    apiDocumentationURL: "", //leave this also blank for the first exercise
    currentCity: "The Wall",
    hobbies: ["Fight White Walkers"],
  });
});
/*
 * Get All books information
 */
app.get("/api/books/", (req, res) => {
  db.books.find({}, function (err, books) {
    if (err) throw err;

    res.json(books);
  });
});

app.post("/api/books/", (req, res) => {
  console.log(req.body);

  db.books.create(req.body, (err, newBook) => {
    if (err) throw err;
    res.json(newBook);
  });
});

app.put("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  db.books.findOneAndUpdate(
    { _id: bookId },
    bookNewData,
    { new: true },
    (err, updatedBookInfo) => {
      if (err) throw err;
      res.json(updatedBookInfo);
    }
  );
});

app.delete("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.books.findOneAndRemove({ _id: bookId }, (err, deletedBook) => {
    if (err) throw err;
    res.json(deletedBook);
  });
});

app.get("/api/exercise2/", (req, res) => {
  res.send("group 77 application deployed using docker");
});

// listen on the port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Express server is up and running on http://localhost:3000/");
});
