import { tool } from "@openai/agents";
import { getCategories, getProducts } from "../../services/menuService";
import * as z from "zod";
import prisma from "../../config/prisma";
import embed from "../../utils/embed";

export const getCategoriesTool = tool({
    name: "get_menu_categories",
    description: "Returns the list of categories available in the restaurant menu",
    parameters: z.object({}),
    execute: async () => {
        try {
            const categories = await getCategories()
            return categories
        } catch (error) {
            console.error(error)
            return "ERROR OCCURED"
        }

    }
})

export const getProductsTool = tool({
    name: "get_products",
    description: "Returns the list of products available in the relevant category",
    parameters: z.object({
        category: z.string().describe("Possible Name of category in menu")
    }),
    execute: async ({ category }) => {
        const embedding = await embed(category)

        const categories = await prisma.$queryRaw<{ id: string, similarity: number }[]>`
        SELECT id, 1 - ("embedding" <=> ${embedding}::vector) AS similarity from "Category"
        WHERE embedding IS NOT NULL
        ORDER BY similarity DESC
        LIMIT 1
        `

        if (categories[0].similarity < .75) return `Sorry we dont have that`
        const { id } = categories[0]

        try {
            const products = await getProducts(id)
            return products
        } catch (error) {
            console.error('Something went wrong')
            return "Sorry, nothing found"
        }
    }
})