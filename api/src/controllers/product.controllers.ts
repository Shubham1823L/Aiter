import { RequestHandler } from "express";
import prisma from "../config/prisma";

export const getProducts: RequestHandler = async (req, res) => {
    const categoryId = req.query.categoryId

    const where: any = {}
    if (typeof categoryId === 'string') where.categoryId = categoryId

    const products = await prisma.product.findMany({
        where,
        orderBy: {
            category: {
                name: 'asc'
            }
        },
        include: {
            category: true
        }
    })

    return res.success(200, { products })
}



export const getProduct: RequestHandler = async (req, res) => {
    const productId = req.params.productId
    if (typeof productId !== "string" || !productId) return res.fail(400, "BAD_REQUEST", "Invalid data")

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    return res.success(200, { product })
}
