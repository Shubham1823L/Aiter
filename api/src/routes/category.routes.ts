import express from 'express'
import { createCategory, listCategoriesHandler } from '../controllers/category.controllers'
import asyncHandler from '../middlewares/asyncHandler'

const router = express.Router()

router.get('/', asyncHandler(listCategoriesHandler))

router.post('/', asyncHandler(createCategory))

export default router