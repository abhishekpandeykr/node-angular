"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _item = _interopRequireDefault(require("./item.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/').get(_item.default.getMany).post(_item.default.createOne);
router.route('/:id').get(_item.default.getOne).delete(_item.default.deleteOne);
var _default = router;
exports.default = _default;