import { FailureHandler, SuccessHandler } from "./types"

declare global {
    namespace Express {
        interface Response {
            success: SuccessHandler,
            fail: FailureHandler
        }
    }
}

export { }