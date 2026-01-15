import { Tool } from "@openai/agents"
import { getCategoriesTool, getProductsTool } from "./menu.tools"


const tools: Tool[] = [
    getCategoriesTool, getProductsTool
]

export default tools