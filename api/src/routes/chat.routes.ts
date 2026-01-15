import express from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import { createConversatonIdHandler, deleteConversationIdHandler, streamLLMResponseHandler } from '../controllers/chat.controllers'

const router = express.Router()

router.post('/', asyncHandler(createConversatonIdHandler))

router.delete('/:conversationId', asyncHandler(deleteConversationIdHandler))

router.post('/stream/:conversationId', asyncHandler(streamLLMResponseHandler))



export default router