"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _item = require("./item.model");

var _crud = require("../../uttils/crud");

var _default = (0, _crud.crudControllers)(_item.listSchema);

exports.default = _default;