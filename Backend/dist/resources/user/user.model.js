"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String
}, {
  timestamps: true
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hash = await _bcrypt.default.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    _bcrypt.default.compare(password, passwordHash, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

const UserSchema = _mongoose.default.model('UserSchema', userSchema);

exports.UserSchema = UserSchema;