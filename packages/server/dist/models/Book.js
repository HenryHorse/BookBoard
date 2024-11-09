"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Book_exports = {};
__export(Book_exports, {
  BookModel: () => BookModel
});
module.exports = __toCommonJS(Book_exports);
var import_mongoose = require("mongoose");
const BookSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Author" }],
    genres: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    publicationYear: { type: import_mongoose.Schema.Types.ObjectId, ref: "Year" },
    description: { type: String, required: true, trim: true }
  },
  { collection: "books" }
);
const BookModel = (0, import_mongoose.model)("Book", BookSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BookModel
});
