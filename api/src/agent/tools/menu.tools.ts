import { tool } from "@openai/agents";
import { getCategories } from "../../services/menuService";
import * as z from "zod";

export const getCategoriesTool = tool({
    name: "get_menu_categories",
    description: "Returns the list of categories available in the restaurant menu",
    parameters: '',
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
    description: "Returns the list of products available , and in the particular category if mentioned",
    parameters: z.object({
        category:z.string().optional().describe("Name of category in menu if mentioned")
    }),
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