import { RequestHandler } from "express";
import { getCategories } from "../services/menuService";
import embed from "../utils/embed";
import prisma from "../config/prisma";

export const listCategoriesHandler: RequestHandler = async (req, res) => {
    const categories = await getCategories()
    return res.success(200, { categories })
}

export const createCategory: RequestHandler = async (req, res) => {
    const name = req.body.name
    if (!name || typeof name !== 'string') return res.fail(400, "BAD_REQUEST", "Invalid details")

    const embedding = await embed(name)

    const tempCategory = await prisma.category.create({
        data: { name }
    })
    const { id } = tempCategory

    await prisma.$executeRaw`
    UPDATE "Category"
    SET embedding = ${embedding}::vector
    WHERE id = ${id};
    `
    res.success(201)
}
