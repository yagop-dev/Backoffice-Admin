import { useEffect, useState } from "react";
import type { User } from "../types/user";
import type { Order } from "../types/order";
import type { Commission } from "../types/commission";
import { fetchData } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getActiveUsers, getCommissionsValueSum, getOrdersValueSum, getTotalOrders, getTotalUsers } from "../utils/stats";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

function DashboardPage(){
    const[users, setUsers] = useState<User[]>([]);
    const[orders, setOrders] = useState<Order[]>([]);
    const[commissions, setCommissions] = useState<Commission[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            fetchData<User[]>("/data/users.json"),
            fetchData<Order[]>("/data/orders.json"),
            fetchData<Commission[]>("/data/commissions.json")
        ])
        .then(([usersData, ordersData, commissionsData]) => {
            setUsers(usersData);
            setOrders(ordersData);
            setCommissions(commissionsData);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    if(loading) return <Loading message = "Carregando dashboard..."/>;
    if(error) return <ErrorMessage error = {error}/>;

    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold tracking-tight">DASHBOARD</h2>

            <p className="text-muted-foreground mb-6">Visão geral do sistema</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{getTotalUsers(users)}</p>
                        <p className="text-sm text-muted-foreground">cadastrados</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Usuários Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{getActiveUsers(users)}</p>
                        <p className="text-sm text-muted-foreground">Ativos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total de Pedidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{getTotalOrders(orders)}</p>
                        <p className="text-sm text-muted-foreground">registrados</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Soma do Valor dos Pedidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">R${getOrdersValueSum(orders)}</p>
                        <p className="text-sm text-muted-foreground">em reais</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Soma das Comissões</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">R${getCommissionsValueSum(commissions)}</p>
                        <p className="text-sm text-muted-foreground">em reais</p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default DashboardPage;