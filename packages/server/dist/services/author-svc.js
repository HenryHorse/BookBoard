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
var author_svc_exports = {};
__export(author_svc_exports, {
  default: () => author_svc_default
});
module.exports = __toCommonJS(author_svc_exports);
var import_models2 = require("../models");
function index() {
  return import_models2.AuthorModel.find();
}
function get(authorID) {
  return import_models2.AuthorModel.find({ _id: authorID }).populate([
    { path: "years", select: "year" },
    { path: "genres", select: "name" },
    { path: "books", select: "title" }
  ]).then((list) => list[0]).catch((err) => {
    throw `${authorID} Not Found`;
  });
}
function create(json) {
  const t = new import_models2.AuthorModel(json);
  return t.save();
}
function update(authorID, author) {
  return import_models2.AuthorModel.findOneAndUpdate({ _id: authorID }, author, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${authorID} not updated`;
    else return updated;
  });
}
function remove(authorID) {
  return import_models2.AuthorModel.findOneAndDelete({ _id: authorID }).then(
    (deleted) => {
      if (!deleted) throw `${authorID} not deleted`;
    }
  );
}
var author_svc_default = { index, get, create, update, remove };
