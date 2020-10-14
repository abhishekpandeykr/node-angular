"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
const config = {
  secrets: {
    jwt: 'learneverything'
  },
  dbUrl: 'mongodb://localhost/api-design'
}; //mongodb+srv://abhishek:<password>@cluster0.1ha1f.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://abhishek:<password>@cluster0.1ha1f.mongodb.net/<dbname>?retryWrites=true&w=majority

exports.config = config;