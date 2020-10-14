import express from 'express'
import controllers from './item.controller'

const router = express.Router()

router.route('/').get(controllers.getMany).post(controllers.createOne)
router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.deleteOne)
  .put(controllers.update)

export default router
