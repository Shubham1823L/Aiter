import { AgentOutputTypeSchema } from '../schemas/schemas';
import 'dotenv/config'
import { Agent } from "@openai/agents";
import tools from './tools';
import { inputGuardrails } from './guards';



const agent = new Agent({
    name: "Walter White",
    instructions: `You are an expert waiter for MY restaurant.`,
    model: 'gpt-4o-mini',
    tools,
    inputGuardrails,
    outputType: AgentOutputTypeSchema
});

export default agent;






