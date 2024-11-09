"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Author_exports = {};
__export(Author_exports, {
  AuthorPage: () => AuthorPage
});
module.exports = __toCommonJS(Author_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class AuthorPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: ["/styles/author.css"],
      styles: [
        import_server.css``
      ],
      scripts: [
        `import { define } from "@calpoly/mustang";
                import { GenreListElement } from "/scripts/genres.js";
                import { BookListElement} from "/scripts/books.js";
                import {YearListElement} from "/scripts/years.js";
                import {HeaderElement} from "/scripts/header.js";
    
                define({
                    "genre-list": GenreListElement,
                    "book-list": BookListElement,
                    "year-list": YearListElement,
                    "bb-header": HeaderElement
                });`
      ]
      // add more parts here later
    });
  }
  renderBody() {
    const { _id, name } = this.data;
    const authorAPIURL = `/api/authors/${_id}`;
    return import_server.html`
            <body>
                <bb-header>
                </bb-header>
    
    
                <div class="page">
                    ${this.renderPageTitle(name)}
                    ${this.renderGenreList(authorAPIURL)}
                    ${this.renderYearList(authorAPIURL)}
                    ${this.renderBookList(authorAPIURL)}
                </div>
                <script type="module" src="/scripts/darkModeToggle.js"></script>
            </body>`;
  }
  renderPageTitle(title) {
    return import_server.html`
            <section class="page-title">
                ${title}
            </section>
        `;
  }
  renderGenreList(authorAPIURL) {
    return import_server.html`
            <section class="genres">
                <genre-list src="${authorAPIURL}"></genre-list>
            </section>
        `;
  }
  renderYearList(authorAPIURL) {
    return import_server.html`
            <section class="years">
                <year-list src="${authorAPIURL}"></year-list>
            </section>
        `;
  }
  renderBookList(authorAPIURL) {
    return import_server.html`
            <section class="books">
                <book-list src="${authorAPIURL}"></book-list>
            </section>
        `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthorPage
});
