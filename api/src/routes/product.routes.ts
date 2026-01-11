import express from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import { getProduct, getProducts } from '../controllers/product.controllers'

const router = express.Router()

router.get('/', asyncHandler(getProducts))

router.get('/:productId', asyncHandler(getProduct))

export default router