"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = require("body-parser");

var _route = _interopRequireDefault(require("./resources/item/route"));

var _db = require("./uttils/db");

var _auth = require("./uttils/auth");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _morgan.default)('dev'));
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));

const firstMiddleware = (req, res, next) => {
  next();
};

app.post('/api/signup', _auth.signup);
app.post('/api/signin', _auth.signin);
app.use('/api/user-notes', _auth.protectedPath, _route.default); // Whenever there is anyhting use prefix api use router middleware

app.get('/', (req, res, next) => {
  res.send({
    message: 'Hello wWorld!'
  });
});
app.post('/', firstMiddleware, (req, res) => {
  console.log(req.body);
  res.send(req.body); // res.send({ message: 'Ok' })
});

const start = async () => {
  const mongoUrl = 'mongodb+srv://abhishek:akpandey.1994@cluster0.1ha1f.mongodb.net/api-design?retryWrites=true&w=majority';
  await (0, _db.connect)(mongoUrl);
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running at ${process.env.PORT}`);
  }); // app.listen(config.port, () => {
  //   console.log(`Server is running`)
  // })
};

exports.start = start;