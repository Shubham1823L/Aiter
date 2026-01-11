import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("ERROR:",err)
    return res.status(500).json({success:false,code:"INTERNAL_ERROR",message:"Something went wrong"})
}

export default errorHandler