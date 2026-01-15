import { run } from '@openai/agents';
import { RequestHandler } from "express";
import client from "../config/openai";
import agent from '../agent/llm.agent';


export const createConversatonIdHandler: RequestHandler = async (req, res) => {
    const conversation = await client.conversations.create()

    res.success(201, { conversationId: conversation.id }, "New conversation started")
}


export const deleteConversationIdHandler: RequestHandler = async (req, res) => {
    const conversationId = req.params.conversationId

    if (!conversationId || typeof conversationId !== 'string' || !conversationId.startsWith('conv_')) return res.fail(400, "BAD_REQUEST", "Invalid conversation id")

    await client.conversations.delete(conversationId)
    res.sendStatus(204)
}

// export const streamLLMResponseHandler: RequestHandler = (req, res) => {
//     res.set({
//         'Content-Type': 'text/event-stream',
//         "Cache-Control": "no-cache",
//         "Connection": "keep-alive"
//     })
//     res.flushHeaders()



// }


export const streamLLMResponseHandler: RequestHandler = async (req, res) => {

    const prompt: string = req.body.prompt
    const conversationId = req.params.conversationId
    if (!conversationId || typeof conversationId !== 'string' || !conversationId.startsWith('conv_')) return res.fail(400, "BAD_REQUEST", "Invalid Conversation")


    const stream = await run(agent, prompt, { conversationId, stream: true })

    stream.toTextStream({ compatibleWithNodeStreams: true }).on('data', (e) => {
        console.log(e.toString())
        res.write(e.toString())

    }).on('end', () => {
        res.end()
    })
    // res.success(200, { stream: stream.finalOutput })

}
