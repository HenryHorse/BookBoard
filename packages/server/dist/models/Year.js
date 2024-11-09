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
var Year_exports = {};
__export(Year_exports, {
  YearModel: () => YearModel
});
module.exports = __toCommonJS(Year_exports);
var import_mongoose = require("mongoose");
const YearSchema = new import_mongoose.Schema(
  {
    year: { type: Number, required: true, trim: true },
    books: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Book" }],
    authors: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Author" }],
    genres: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Genre" }]
  },
  { collection: "years" }
);
const YearModel = (0, import_mongoose.model)("Year", YearSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YearModel
});