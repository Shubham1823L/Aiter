import { run } from '@openai/agents';
import { RequestHandler } from "express";
import client from "../config/openai";
import agent from '../agent/llm.agent';


export const createConversatonIdHandler: RequestHandler = async (req, res) => {
    const conversation = await client.conversations.create()
    res.cookie('oai-cid', conversation.id, {
        //Session cookie - will expire when browser/app closes
        sameSite: 'lax',
        httpOnly: true,
        secure: true,
    })
    res.success(201)
}


export const deleteConversationIdHandler: RequestHandler = async (req, res) => {
    const conversationId = req.cookies['oai-cid']

    if (!conversationId || typeof conversationId !== 'string' || !conversationId.startsWith('conv_')) return res.fail(400, "BAD_REQUEST", "Invalid conversation id")

    await client.conversations.delete(conversationId)
    res.clearCookie('oai-cid', {
        //Session cookie - will expire when browser/app closes
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    })
    res.sendStatus(204)
}


export const streamLLMResponseHandler: RequestHandler = async (req, res) => {

    const prompt: string = req.body.prompt
    const conversationId = req.cookies['oai-cid']
    if (!conversationId || typeof conversationId !== 'string' || !conversationId.startsWith('conv_')) return res.fail(400, "BAD_REQUEST", "Invalid Conversation")


    const stream = await run(agent, prompt, { conversationId, stream: true })

    stream.toTextStream({ compatibleWithNodeStreams: true }).on('data', (e) => {
        res.write(e.toString())

    }).on('end', () => {
        res.end()
    })

}
