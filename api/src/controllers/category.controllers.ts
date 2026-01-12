import { RequestHandler } from "express";
import { getCategories } from "../services/menuService";

export const listCategoriesHandler: RequestHandler = async (req, res) => {
    const categories = await getCategories()
    return res.success(200, { categories })
}
