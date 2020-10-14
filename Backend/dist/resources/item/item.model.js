"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const itemSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  description: String,
  status: {
    type: String,
    required: true,
    enum: ['active', 'complete', 'pastdue'],
    default: 'active'
  },
  notes: String,
  list: Array,
  due: Date,
  createdBy: {
    type: _mongoose.default.SchemaTypes.ObjectId,
    ref: 'user' // required: true,

  }
}, {
  timestamps: true
});
itemSchema.index({
  user: 1,
  name: 'Abhishek'
}, {
  unique: true
});

const listSchema = _mongoose.default.model('item', itemSchema);

exports.listSchema = listSchema;