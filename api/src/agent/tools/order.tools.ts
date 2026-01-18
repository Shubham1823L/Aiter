import { tool } from "@openai/agents";
import { z } from 'zod/v3'

export const addToCartTool = tool({
    name: 'add_to_cart_tool',
    description: 'Adds selected item to cart for sending to the kitchen.',
    parameters: z.object({
        cart_before_updating: z.array(z.object({ productId: z.string(), count: z.number().int() })).describe('Cart before addition of new item'),
        productId: z.string().describe('Product id of new item to be added to cart'),
        count: z.number().int().describe('Count of the item to be added'),
    }),
    execute: async () => {
        // For this project/case we don't need to do anything tbh
        return `Acknowledege addition of product and make an appropriate response asking to select something more(whatever suits according to current selections) if it makes sense ALONG WITH UI OPTIONS(compulsory when asking more), otherwise ask for confirmation for finalizing order.
        IMPORTANT:
        Generally people want starters first, then main course , then desserts. I want u to sell maximum products and also satisfy our customers, therefore recommend accordingly`
    }
})
