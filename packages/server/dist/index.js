"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_services = require("./services");
var import_books = __toESM(require("./routes/books"));
var import_genres = __toESM(require("./routes/genres"));
var import_years = __toESM(require("./routes/years"));
var import_authors = __toESM(require("./routes/authors"));
var import_Book = require("./pages/Book");
var import_Genre = require("./pages/Genre");
var import_Year = require("./pages/Year");
var import_Author = require("./pages/Author");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
(0, import_mongo.connect)("BookBoardDB");
app.use(import_express.default.json());
app.use("/api/books", import_books.default);
app.use("/api/genres", import_genres.default);
app.use("/api/years", import_years.default);
app.use("/api/authors", import_authors.default);
app.use(import_express.default.static(staticDir));
app.get("/hello", (req, res) => {
  res.send("<h2>Hello World!</h2>");
});
app.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  import_services.Books.get(bookId).then((data) => {
    const page = new import_Book.BookPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/genres/:genreId", (req, res) => {
  const { genreId } = req.params;
  import_services.Genres.get(genreId).then((data) => {
    const page = new import_Genre.GenrePage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/years/:yearId", (req, res) => {
  const { yearId } = req.params;
  import_services.Years.get(yearId).then((data) => {
    const page = new import_Year.YearPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/authors/:authorId", (req, res) => {
  const { authorId } = req.params;
  import_services.Authors.get(authorId).then((data) => {
    const page = new import_Author.AuthorPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
