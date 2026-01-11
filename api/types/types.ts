import { Response } from "express"


export type SuccessHandler = (status?: number, data?: {}, message?: string) => Response
export type FailureHandler = (status?: number, code?: string, message?: string) => Response