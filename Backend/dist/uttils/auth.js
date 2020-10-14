"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedPath = exports.signin = exports.signup = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _user = require("../resources/user/user.model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
};

exports.newToken = newToken;

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
};

exports.verifyToken = verifyToken;

const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Email and Password Required'
    });
  }

  try {
    const user = await _user.UserSchema.create(req.body);
    const token = newToken(user);
    res.status(201).send({
      token
    });
  } catch (error) {
    console.error(error);
    res.status(400).end(error);
  }
};

exports.signup = signup;

const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Email and Password Required'
    });
  }

  const user = await _user.UserSchema.findOne({
    email: req.body.email
  }).select('-password').exec();

  if (!user) {
    res.status(400).end();
  }

  try {
    const match = user.checkPassword(req.body.password);

    if (!match) {
      res.status(401).send({
        message: 'Invalid Password'
      });
    }

    const token = newToken(user);
    res.status(201).json({
      token,
      user
    });
  } catch (error) {
    res.status(400).end();
  }
};

exports.signin = signin;

const protectedPath = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'No Auth'
    });
  }

  let token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send({
      message: 'No Auth'
    });
  }

  try {
    const payload = await verifyToken(token);
    const user = await _user.UserSchema.findById(payload.id).select('-password').exec();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Not Authorized'
    });
  }
};

exports.protectedPath = protectedPath;