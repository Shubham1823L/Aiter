import 'dotenv/config'
import OpenAI from "openai";
import env from './env';

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY })

export default client
