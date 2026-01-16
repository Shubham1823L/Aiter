import { RequestHandler } from "express";
import prisma from "../config/prisma";
import { getProduct, getProducts } from "../services/menuService";
import * as z from "zod";
import embed from "../utils/embed";

export const listProductsHandler: RequestHandler = async (req, res) => {
    const categoryId = req.query.categoryId

    const products = await getProducts(typeof categoryId === 'string' ? categoryId : undefined)
    return res.success(200, { products })
}



export const listProductHandler: RequestHandler = async (req, res) => {
    const productId = req.params.productId
    if (typeof productId !== "string" || !productId) return res.fail(400, "BAD_REQUEST", "Invalid data")

    const product = await getProduct(productId)
    if (!product) return res.fail(404, "NOT_FOUND", "Product does not exist")

    return res.success(200, { product })
}

export const createProduct: RequestHandler = async (req, res) => {
    const ProductSchema = z.object({
        name: z.string(),
        price: z.int(),
        categoryId: z.string()
    })

    const parsedData = ProductSchema.safeParse(req.body)
    if (!parsedData.success) return res.fail(400, "BAD_REQUEST", "Invalid details")

    const productData = parsedData.data

    const product = await prisma.product.create({
        data: productData
    })
    const embedding = await embed(product.name)

    await prisma.$executeRaw`
    UPDATE "Product"
    SET "embedding" = ${embedding}::vector
    WHERE id = ${product.id};
    `

    res.success(201)

}
