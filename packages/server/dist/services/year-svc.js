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
var year_svc_exports = {};
__export(year_svc_exports, {
  default: () => year_svc_default
});
module.exports = __toCommonJS(year_svc_exports);
var import_models = require("../models");
function index() {
  return import_models.YearModel.find();
}
function get(yearID) {
  return import_models.YearModel.find({ yearID }).then((list) => list[0]).catch((err) => {
    throw `${yearID} Not Found`;
  });
}
function create(json) {
  const t = new import_models.YearModel(json);
  return t.save();
}
function update(yearID, year) {
  return import_models.YearModel.findOneAndUpdate({ _id: yearID }, year, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${yearID} not updated`;
    else return updated;
  });
}
function remove(yearID) {
  return import_models.YearModel.findOneAndDelete({ _id: yearID }).then(
    (deleted) => {
      if (!deleted) throw `${yearID} not deleted`;
    }
  );
}
var year_svc_default = { index, get, create, update, remove };
