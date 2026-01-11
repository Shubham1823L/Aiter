import express from 'express'
import { getCategories } from '../controllers/category.controllers'
import asyncHandler from '../middlewares/asyncHandler'

const router = express.Router()

router.get('/', asyncHandler(getCategories))

export default router