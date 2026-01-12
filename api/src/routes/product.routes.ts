import express from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import { listProductHandler, listProductsHandler } from '../controllers/product.controllers'

const router = express.Router()

router.get('/', asyncHandler(listProductsHandler))

router.get('/:productId', asyncHandler(listProductHandler))

export default router