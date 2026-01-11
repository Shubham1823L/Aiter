import { RequestHandler } from "express"

const responseHandler: RequestHandler = (req, res, next) => {
    res.success = (status, data, message) => res.status(status).json({ success: true, data, message })
    res.fail = (status, code, message) => res.status(status).json({ success: false, code, message })
    next()
}

export default responseHandler