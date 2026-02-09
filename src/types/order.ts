export type OrderStatus = "pending" | "paid" | "cancelled";

export interface OrderItem{
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface Order{
    id: number;
    userId: number;
    status: OrderStatus;
    total: number;
    date: string;
    items: OrderItem[];
}