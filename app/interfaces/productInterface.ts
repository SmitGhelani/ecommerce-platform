export interface ProductInterface {
    productId: string,
    features: {
        Color: string,
        Size: string,
        Material: string
    }
    product_name: string,
    description: string,
    price: number,
    category: string,
    image: string,
    addedBy: string,
    createdAt: string
}