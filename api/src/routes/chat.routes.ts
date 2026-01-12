import express from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import { createConversatonIdHandler, deleteConversationIdHandler, streamLLMResponseHandler } from '../controllers/chat.controllers'

const router = express.Router()

router.post('/', asyncHandler(createConversatonIdHandler))

router.delete('/', asyncHandler(deleteConversationIdHandler))

router.get('/stream', streamLLMResponseHandler)

export default router