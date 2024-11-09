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
var Author_exports = {};
__export(Author_exports, {
  AuthorModel: () => AuthorModel
});
module.exports = __toCommonJS(Author_exports);
var import_mongoose = require("mongoose");
const AuthorSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    genres: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    books: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Book" }],
    years: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Year" }]
  },
  { collection: "authors" }
);
const AuthorModel = (0, import_mongoose.model)("Author", AuthorSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthorModel
});
