import { RequestHandler } from "express";
import prisma from "../config/prisma";
import { getProduct, getProducts } from "../services/menuService";

export const listProductsHandler: RequestHandler = async (req, res) => {
    const categoryId = req.query.categoryId

    const products = await getProducts(typeof categoryId === 'string' ? categoryId : undefined)
    return res.success(200, { products })
}



export const listProductHandler: RequestHandler = async (req, res) => {
    const productId = req.params.productId
    if (typeof productId !== "string" || !productId) return res.fail(400, "BAD_REQUEST", "Invalid data")

    const product = await getProduct(productId)
    if(!product) return res.fail(404,"NOT_FOUND","Product does not exist")
        
    return res.success(200, { product })
}
