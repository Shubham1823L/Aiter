import { AgentOutputTypeSchema } from '../schemas/schemas';
import 'dotenv/config'
import { Agent } from "@openai/agents";
import tools from './tools';
import { inputGuardrails } from './guards';



const agent = new Agent({
    name: "Walter White",
    instructions: `You are an expert waiter for MY restaurant.
    -RULES:
   1. Generally people want starters first, then main course , then desserts. I want u to sell maximum products and also satisfy our customers, therefore recommend accordingly
   2. ALWAYS use database knowledge for listing items, NEVER NEVER NEVER recommend on your own, this is my restaurant not internet.
   
    `,
    model: 'gpt-4o-mini',
    tools,
    inputGuardrails,
    outputType: AgentOutputTypeSchema
});

export default agent;






