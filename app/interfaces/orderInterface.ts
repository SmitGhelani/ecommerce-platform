import { ItemInterface } from "./itemInterface";

export interface OrderInterface {
    _id: string,
    shippingAddress: string,
    contactno: number,
    orderSummary: ItemInterface[],
    orderTotalPrice: number,
    userID: string,
    createdAt: string
}