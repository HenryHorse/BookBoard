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
var Year_exports = {};
__export(Year_exports, {
  YearPage: () => YearPage
});
module.exports = __toCommonJS(Year_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class YearPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: ["/styles/year.css"],
      styles: [
        import_server.css``
      ],
      scripts: [
        `import { define } from "@calpoly/mustang";
                import { GenreListElement } from "/scripts/genres.js";
                import { AuthorListElement} from "/scripts/authors.js";
                import {BookListElement} from "/scripts/books.js";
                import {HeaderElement} from "/scripts/header.js";
    
                define({
                    "book-list": BookListElement,
                    "author-list": AuthorListElement,
                    "genre-list": GenreListElement,
                    "bb-header": HeaderElement
                });`
      ]
      // add more parts here later
    });
  }
  renderBody() {
    const { _id, year } = this.data;
    const yearAPIURL = `/api/years/${_id}`;
    return import_server.html`
            <body>
                <bb-header>
                </bb-header>
    
    
                <div class="page">
                    ${this.renderPageTitle(year)}
                    ${this.renderBookList(yearAPIURL)}
                    ${this.renderGenreList(yearAPIURL)}
                    ${this.renderAuthorList(yearAPIURL)}
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
  renderBookList(yearAPIURL) {
    return import_server.html`
            <section class="books">
                <book-list src="${yearAPIURL}"></book-list>
            </section>
        `;
  }
  renderGenreList(yearAPIURL) {
    return import_server.html`
            <section class="genres">
                <genre-list src="${yearAPIURL}"></genre-list>
            </section>
        `;
  }
  renderAuthorList(yearAPIURL) {
    return import_server.html`
            <section class="authors">
                <author-list src="${yearAPIURL}"></author-list>
            </section>
        `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YearPage
});
