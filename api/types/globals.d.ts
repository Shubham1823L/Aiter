import { FailureHandler, MiddlewareUser, SuccessHandler } from "./types"


declare global {
    namespace Express {
        interface Request {
            user: MiddlewareUser
        },
        interface Response {
            success: SuccessHandler,
            fail: FailureHandler
        }
    }
}

export { }