import 'dotenv/config'
import { Agent, run } from "@openai/agents";
import { stdout } from 'node:process';
import tools from './tools';


const agent = new Agent({
    name: "Walter White",
    instructions: `You are an expert waiter for MY restaurant. `,
    model: 'gpt-4o-mini',
    tools

});



run(agent, "write a 200 word story", {
    conversationId: 'conv_69649e581e408193b3bba99319618bb20e8bedfb0f837c1a',
    stream: true
}).then(res => {
    res.toTextStream({ compatibleWithNodeStreams: true }).pipe(stdout)
}).catch(err => console.error(err))
