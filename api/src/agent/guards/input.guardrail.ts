import { OrderState } from './../../../../shared/types';
import { Agent, run, RunContext, type InputGuardrail } from "@openai/agents";
import { z } from "zod/v3";

const InputGuardOutputSchema = z.object({
    isAllowed: z.boolean().describe("True if input is related to restaurant query for a waiter and therefore allowed to be passed, else false"),
    reason: z.string().describe('VERY ACCURATE AND DESCRIPTIVE atleast 30 words long Reason for rejection of input if rejected, otherwise why it was not rejected'),
    message: z.string().describe("UPON REJECTION, Appropriate concise message for user to let them know that something is wrong ,WITHOUT REVEALING TECHNICALITY, a simple polite answer. The answer should preferrably be like `Sorry i cant do that...` ,etc. manner shaped").optional()
})


const inputGuard = new Agent({
    name: "Restaurant Waiter Input Guard Agent",
    instructions: `Check if user input is related query/answer for a waiter at a restaurant, and nothing completely unrelated to food is mixed in query. The restaurant serves a lot of things, don't assume that it might not have something. ALWAYS REDIRECT vague queries towards food.
    RULES:
    - Refer to local context to know what kind of input it is, it has orderId and action(intent)
    - ALLOW VAGUE queries/answers like hmm, uhh, etc.. and hi, what is your name, etc. Such question CAN be asked from a waiter, just see if this question/answer can be given to a waiter by a customer/new customer and ALLOW IT, assuming that nothing else is intermixed like math,etc. AND THEN REDIRECT them towards our products in the same response politely
     - User can describe their mood, feeling, occupation,etc., for waiter to suggest them something to eat, THIS IS COMPLETELY FINE because it is related to restaurant food.
    - Allow follow up queries like Yes, No that could make sense in response to previous query/response
    - Reject if something else is mixed with allowed query/answer(s).
    - The query can be indirect .
   
    `,
    model: 'gpt-4o-mini',
    outputType: InputGuardOutputSchema
})

const restaurantInputGuardrail: InputGuardrail = {
    name: "Restaurant Waiter Input Guardrail",
    runInParallel: false,
    execute: async ({ input, context }) => {
        const result = await run(inputGuard, input, { context: context.context, conversationId: (context as RunContext<{ conversationId: string, orderState: OrderState }>).context.conversationId })
        const output = result.finalOutput as z.infer<typeof InputGuardOutputSchema>
        console.log(result.finalOutput)


        return {
            tripwireTriggered: !output.isAllowed,
            outputInfo: {
                outcome: `Input Guardrail ${!output.isAllowed ? `Triggered - Reason: ${output.reason}` : 'Not Triggered'}`,
                message: output.message
            }
        }
    }
}

export default restaurantInputGuardrail