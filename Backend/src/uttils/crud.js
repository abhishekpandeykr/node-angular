export const getOne = (model) => async (req, res) => {
  const result = await model.findById(req.params.id)
  if (!result) {
    res.status(404).end()
  }
  res.status(200).json({ data: result, errors: [] })
}

export const getMany = (model) => async (req, res) => {
  const result = await model.find({}).lean().exec()
  res.status(200).json({ data: result, errors: [] })
}

export const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const deleteOne = (model) => async (req, res) => {
  try {
    const id = req.params && req.params.id
    const result = await model.findOneAndRemove({ _id: id })
    if (result) {
      res.status(200).send({
        message: `User Deleted Suucessfully`,
        id: result._id,
        status: 'success',
      })
    } else {
      res.send({ status: 'success', message: `${id} Id Not Found` })
    }
  } catch (error) {
    res.status(400).end({ status: 'Failure' })
  }
}

export const updateOne = (model) => async (req, res) => {
  try {
    const id = req.params && req.params.id
    const result = await model.findOneAndUpdate(id, req.body, { new: true })
    if (res) {
      res.status(201).json({
        errors: [],
        data: result,
        status: 'success',
      })
    } else {
      res.status(201).json({ errors: [], message: 'No Id Found' })
    }
  } catch (e) {
    res.send({
      status: 'Failure',
      message: 'something went wrong',
      errors: [e],
    })
  }
}

export const crudControllers = (model) => ({
  deleteOne: deleteOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  update: updateOne(model),
})
