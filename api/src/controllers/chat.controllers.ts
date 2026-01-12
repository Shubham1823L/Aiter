import { RequestHandler } from "express";
import client from "../config/openai";


export const createConversatonId: RequestHandler = async (req, res) => {
    const conversationId = await client.conversations.create()
    res.success(201, { conversationId }, "New conversation started")
}


export const deleteConversationId: RequestHandler = async (req, res) => {
    const conversationId = req.body.conversationId
    if (!conversationId || typeof conversationId !== 'string' || !conversationId.startsWith('conv_')) return res.fail(400, "BAD_REQUEST", "Invalid conversation id")

    await client.conversations.delete(conversationId)
    res.sendStatus(204)
}

export const streamLLMResponse: RequestHandler = (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    })
    res.flushHeaders()
    let count = 0
    
    const interval = setInterval(() => {

        if (count > 10) {
            clearInterval(interval)
            return res.end()
        }
        res.write("data: " + "This is some great shit\n\n")
        count++
    }, 2000);

    req.on('close', () => {
        clearInterval(interval)
    })



}
