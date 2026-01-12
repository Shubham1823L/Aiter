import { RequestHandler } from "express";
import client from "../config/openai";


export const createConversatonIdHandler: RequestHandler = async (req, res) => {
    const conversationId = await client.conversations.create()
    res.success(201, { conversationId }, "New conversation started")
}


export const deleteConversationIdHandler: RequestHandler = async (req, res) => {
    const conversationId = req.body.conversationId
    if (!conversationId || typeof conversationId !== 'string' || !conversationId.startsWith('conv_')) return res.fail(400, "BAD_REQUEST", "Invalid conversation id")

    await client.conversations.delete(conversationId)
    res.sendStatus(204)
}

export const streamLLMResponseHandler: RequestHandler = (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    })
    res.flushHeaders()




}
