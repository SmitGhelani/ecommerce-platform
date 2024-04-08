import { ItemInterface } from "./itemInterface";

export interface OrderInterface {
    _id: string,
    shippingAddress: string,
    orderSummary: ItemInterface[],
    orderTotalPrice: number,
    userID: string,
    createdAt: string
}