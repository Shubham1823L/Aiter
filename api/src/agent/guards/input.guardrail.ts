import { Agent, run, type InputGuardrail } from "@openai/agents";
import { z } from "zod/v3";

const InputGuardOutputSchema = z.object({
    isAllowed: z.boolean().describe("True if input is related to restaurant query for a waiter and therefore allowed to be passed, else false"),
    reason: z.string().describe('Reason for rejection of input if rejected, otherwise why it was not rejected')
})


const inputGuard = new Agent({
    name: "Restaurant Waiter Input Guard Agent",
    instructions: `Check if user input is STRICTLY related query for a waiter at a restaurant, and nothing completely unrelated to food is mixed in query. The restaurant serves a lot of things, don't assume that it might not have something.
    RULES
    - Reject if something else is mixed with restaurant related query for a waiter.
    - The query can be indirect , but shouldn't be unrelated for food/restaurant/waiter. 
    - User can describe their mood, feeling, occupation,etc . for waiter to suggest them something to eat, THIS IS COMPLETELY FINE because it is related to restaurant food.
    `,
    model: 'gpt-4o-mini',
    outputType: InputGuardOutputSchema
})

const restaurantInputGuardrail: InputGuardrail = {
    name: "Restaurant Waiter Input Guardrail",
    runInParallel: false,
    execute: async ({ input }) => {
        const result = await run(inputGuard, input)
        const output = result.finalOutput as z.infer<typeof InputGuardOutputSchema>


        return {
            tripwireTriggered: !output.isAllowed,
            outputInfo: `Input Guardrail ${!output.isAllowed ? `Triggered - Reason: ${output.reason}` : 'Not Triggered'}`
        }
    }
}

export default restaurantInputGuardrail