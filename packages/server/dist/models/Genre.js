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
var Genre_exports = {};
__export(Genre_exports, {
  GenreModel: () => GenreModel
});
module.exports = __toCommonJS(Genre_exports);
var import_mongoose = require("mongoose");
const GenreSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    authors: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Author" }],
    books: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Book" }],
    years: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Year" }]
  },
  { collection: "genres" }
);
const GenreModel = (0, import_mongoose.model)("Genre", GenreSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GenreModel
});
