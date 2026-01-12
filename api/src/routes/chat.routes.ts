import express from 'express'
import asyncHandler from '../middlewares/asyncHandler'
import { createConversatonId, deleteConversationId, streamLLMResponse } from '../controllers/chat.controllers'

const router = express.Router()

router.post('/', asyncHandler(createConversatonId))

router.delete('/', asyncHandler(deleteConversationId))

router.get('/stream',streamLLMResponse)

export default router