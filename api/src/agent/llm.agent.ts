import 'dotenv/config'
import { Agent, run } from "@openai/agents";
import { stdout } from 'node:process';

import client from '../config/openai';
import tools from './tools';
import { inputGuardrails, outputGuardrails } from './guards';


const agent = new Agent({
    name: "Walter White",
    instructions: `You are an expert waiter for MY restaurant.`,
    model: 'gpt-4o-mini',
    tools,
    inputGuardrails,

   
});

export default agent;






