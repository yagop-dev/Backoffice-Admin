import type { Commission } from "../types/commission";
import type { Order } from "../types/order";
import type { User } from "../types/user";

export function getTotalUsers(users: User[]): number{
    return users.length;
}

export function getActiveUsers(users: User[]): number{
    return users.filter(u => u.status === "active").length;
}

export function getTotalOrders(orders: Order[]): number{
    return orders.length;
}

export function getOrdersValueSum(orders: Order[]): number{
    return orders.reduce((sum, o) => sum + o.total, 0);
}

export function getCommissionsValueSum(commissions: Commission[]): number{
    return commissions.reduce((sum, c) => sum + c.value, 0);
}