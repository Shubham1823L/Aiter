import express from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import { createProduct, listProductHandler, listProductsHandler } from '../controllers/product.controllers'

const router = express.Router()

router.get('/', asyncHandler(listProductsHandler))

router.get('/:productId', asyncHandler(listProductHandler))

router.post('/', asyncHandler(createProduct))

export default router