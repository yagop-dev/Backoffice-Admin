import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import type{ Commission, CommissionStatus } from "../types/commission";
import type { User } from "../types/user";
import type { Order } from "../types/order";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import CommissionList from "../components/CommissionsList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

type StatusFilter = "all" | CommissionStatus;

function CommissionsPage(){
    const[commissions, setCommissions] = useState<Commission[]>([]);
    const[orders, setOrders] = useState<Order[]>([]);
    const[users, setUsers] = useState<User[]>([]);
    const[statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            fetchData<Commission[]>("/data/commissions.json"),
            fetchData<Order[]>("/data/orders.json"),
            fetchData<User[]>("/data/users.json")
        ])
        .then(([commissionsData, ordersData, usersData])=>{
            setCommissions(commissionsData);
            setOrders(ordersData);
            setUsers(usersData);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    const filteredCommissions = commissions.filter(
        (c) => statusFilter === "all" || c.status === statusFilter
    );

    const totalValue = filteredCommissions.reduce((sum, c) => sum + c.value, 0);

    if(loading) return <Loading message = "Carregando comissões..."/>;
    if(error) return <ErrorMessage error = {error}/>;

    return (
        <div> 
            <h2 className="text-2xl font-bold mb-6">Comissões</h2> 
            
            <div className="mb-6 flex gap-4"> 
                <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as StatusFilter)}> 
                    <SelectTrigger className="w-48 text-white"> 
                        <SelectValue/> 
                    </SelectTrigger> 

                    <SelectContent> 
                        <SelectItem value="all">Todas</SelectItem> 
                        <SelectItem value="pending">Pendentes</SelectItem> 
                        <SelectItem value="paid">Pagas</SelectItem> 
                    </SelectContent> 
                </Select> 
            </div> 

            <CommissionList commissions={filteredCommissions} users={users} orders={orders} /> 
            <p className="mt-4 font-semibold"> <strong>Total:</strong> R${totalValue} </p> 
        </div>
    );
}

export default CommissionsPage;