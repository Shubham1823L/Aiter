import { RequestHandler } from "express";
import prisma from "../config/prisma";

export const getCategories: RequestHandler = async (req, res) => {
    const categories = await prisma.category.findMany({})

    return res.success(200, { categories })
}
