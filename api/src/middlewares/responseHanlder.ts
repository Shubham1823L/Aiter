import { RequestHandler } from "express"

const responseHandler: RequestHandler = (req, res, next) => {
    res.success = (status = 200, data = {}, message = "Successful Request") => res.status(status).json({ success: true, data, message })
    res.fail = (status = 500, code = "INTERNAL_ERROR", message = "Something went wrong") => res.status(status).json({ success: false, code, message })
    next()
}

export default responseHandler