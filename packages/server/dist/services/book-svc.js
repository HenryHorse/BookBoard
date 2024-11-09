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
var book_svc_exports = {};
__export(book_svc_exports, {
  default: () => book_svc_default
});
module.exports = __toCommonJS(book_svc_exports);
var import_models2 = require("../models");
function index() {
  return import_models2.BookModel.find();
}
function get(bookID) {
  return import_models2.BookModel.find({ _id: bookID }).populate("publicationYear").populate("genres").populate("author").then((list) => list[0]).catch((err) => {
    throw err;
  });
}
function create(json) {
  const t = new import_models2.BookModel(json);
  return t.save();
}
function update(bookID, book) {
  return import_models2.BookModel.findOneAndUpdate({ _id: bookID }, book, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${bookID} not updated`;
    else return updated;
  });
}
function remove(bookID) {
  return import_models2.BookModel.findOneAndDelete({ _id: bookID }).then(
    (deleted) => {
      if (!deleted) throw `${bookID} not deleted`;
    }
  );
}
var book_svc_default = { index, get, create, update, remove };
