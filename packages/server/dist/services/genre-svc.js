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
var genre_svc_exports = {};
__export(genre_svc_exports, {
  default: () => genre_svc_default
});
module.exports = __toCommonJS(genre_svc_exports);
var import_models2 = require("../models");
function index() {
  return import_models2.GenreModel.find();
}
function get(genreID) {
  return import_models2.GenreModel.find({ genreID }).then((list) => list[0]).catch((err) => {
    throw `${genreID} Not Found`;
  });
}
function create(json) {
  const t = new import_models2.GenreModel(json);
  return t.save();
}
function update(genreID, genre) {
  return import_models2.GenreModel.findOneAndUpdate({ _id: genreID }, genre, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${genreID} not updated`;
    else return updated;
  });
}
function remove(genreID) {
  return import_models2.GenreModel.findOneAndDelete({ _id: genreID }).then(
    (deleted) => {
      if (!deleted) throw `${genreID} not deleted`;
    }
  );
}
var genre_svc_default = { index, get, create, update, remove };
