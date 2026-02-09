import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "../types/order";
import type { User } from "../types/user";
import { fetchData } from "../services/api";
import OrdersList from "../components/OrdersList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import OrdersFilters from "../components/OrdersFilters";

export type StatusFilter = "all" | OrderStatus;
export type SortOption = "date" | "value";

function OrdersPage(){
    const[orders, setOrders] = useState<Order[]>([]);
    const[statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const[sortBy, setSortBy] = useState<SortOption>("date");
    const[users, setUsers] = useState<User[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            fetchData<Order[]>("/data/orders.json"),
            fetchData<User[]>("/data/users.json")
        ])
        .then(([ordersData, usersData]) => {
            setOrders(ordersData);
            setUsers(usersData);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    const filteredOrders = orders
    .filter(o => statusFilter === "all" || o.status === statusFilter)
    .sort((a, b) => {
        if(sortBy === "date"){
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.total - a.total;
    });

    if(loading) return <Loading message = "Carregando pedidos..."/>;
    if(error) return <ErrorMessage error = {error}/>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">PEDIDOS</h2>
            
            <p className="text-muted-foreground mb-6">Clique no número do pedido para editar</p>

            <OrdersFilters statusFilter={statusFilter} sortBy={sortBy} onStatusChange={setStatusFilter} onSortChange={setSortBy}/>
            <OrdersList orders = {filteredOrders} users = {users}/>
        </div>
    );
}

export default OrdersPage;