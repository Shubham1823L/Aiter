import { z } from 'zod/v3'

export const AgentOutputTypeSchema = z.object({
    greeting_message_without_items: z.string().describe(`This ONLY and ONLY contains a general narrative starting sentence , 
        CORRECT: Here are your drinks, what would u like to order? ,
        INCORRECT : Here are your drinks: Pepsi, Coke, what would u like to order?
        BASICALLY: This SHOULD NOT INCLUDE any actual items, if u need to show any items , then use ui field for that
        `),
    ui: z.object({
        type: z.enum(["single_select", "multi_select"]).describe("Decides the type of form to be rendered by frontend for showing to user"),
        options: z.array(z.object({
            product_id: z.string().describe("product_id"),
            product_name: z.string().describe("Name of product"),
            product_price: z.string().describe('Price of product formatted with rupee sign in string'),
        })),
    }).nullable().describe("This will be used when options are to be displayed, basically anything where user can select something")
})