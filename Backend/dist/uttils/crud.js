"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.deleteOne = exports.createOne = exports.getMany = exports.getOne = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getOne = model => async (req, res) => {
  const result = await model.findById(req.params.id);

  if (!result) {
    res.status(404).end();
  }

  res.status(200).json({
    data: result,
    errors: []
  });
};

exports.getOne = getOne;

const getMany = model => async (req, res) => {
  const result = await model.find({}).lean().exec();
  res.status(200).json({
    data: result,
    errors: []
  });
};

exports.getMany = getMany;

const createOne = model => async (req, res) => {
  try {
    const doc = await model.create(_objectSpread({}, req.body));
    res.status(201).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

exports.createOne = createOne;

const deleteOne = model => async (req, res) => {
  try {
    const id = req.params && req.params.id;
    const result = await model.findOneAndRemove({
      _id: id
    });

    if (result) {
      res.status(200).send({
        message: `User Deleted Suucessfully`,
        id: result._id,
        status: 'success'
      });
    } else {
      res.send({
        status: 'success',
        message: `${id} Id Not Found`
      });
    }
  } catch (error) {
    res.status(400).end({
      status: 'Failure'
    });
  }
};

exports.deleteOne = deleteOne;

const crudControllers = model => ({
  deleteOne: deleteOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});

exports.crudControllers = crudControllers;