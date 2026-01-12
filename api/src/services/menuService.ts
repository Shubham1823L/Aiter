import prisma from "../config/prisma"

export const getCategories = async () => {
    const categories = await prisma.category.findMany({})
    return categories
}

export const getProducts = async (categoryId?: string) => {
    const products = await prisma.product.findMany({
        where: {
            categoryId
        },
        orderBy: {
            category: {
                name: 'asc'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export const getProduct = async (productId: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    return product
}


