export type UserStatus = "active" | "inactive";
export type UserRole = "admin" | "manager" | "customer";

export interface User{
    id: number;
    name: string;
    email: string;
    role: UserRole;
    country: string;
    status: UserStatus;
}