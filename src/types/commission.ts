export type CommissionStatus = "pending" | "paid";

export interface Commission{
    id: number;
    userId: number;
    orderId: number;
    value: number;
    status: CommissionStatus;
}