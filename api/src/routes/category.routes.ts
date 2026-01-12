import express from 'express'
import { listCategoriesHandler } from '../controllers/category.controllers'
import asyncHandler from '../middlewares/asyncHandler'

const router = express.Router()

router.get('/', asyncHandler(listCategoriesHandler))

export default router