import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Order, OrderStatus } from "../types/order";
import  type{ User } from "../types/user";
import { fetchData } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";

function OrderDetailPage(){
    const{id} = useParams<{id: string}>();
    const[order, setOrder] = useState<Order | null> (null);
    const[users, setUsers] = useState<User[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null> (null);

    useEffect(() => {
        Promise.all([
            fetchData<Order[]>("/data/orders.json"),
            fetchData<User[]>("/data/users.json")
        ])
        .then(([ordersData, usersData]) =>{
            const found = ordersData.find(o => o.id === Number(id));
            if(!found) throw new Error("Pedido não encontrado");
            setOrder(found);
            setUsers(usersData);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [id]);

    const handleStatusChange = (newStatus: OrderStatus) => {
        setOrder(prev => prev ? {...prev, status: newStatus}: null);
        alert("Status atualizado!");
    };

    const handleRecalculate = () => {
        if(!order) return;
        const newValue = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        setOrder({...order, total: newValue});
        alert("Valores recalculados!");
    };

    
    if(loading) return <Loading message="Carregando pedido..."/>;
    if(error) return <ErrorMessage error={error}/>
    if(!order) return <p>Pedido não encontrado.</p>
    
    const relatedUser = users.find(u => u.id === order.userId);

    return ( 
        <Card className="max-w-2xl mx-auto"> 
            <CardHeader> 
                <CardTitle>Detalhes do pedido #{order.id}</CardTitle> 
            </CardHeader> 

            <CardContent className="space-y-4"> 
                <p><strong>Usuário:</strong> {relatedUser ? relatedUser.name : order.userId}</p> 
                <p><strong>Status:</strong>{" "} 
                    <Badge variant={ order.status === "paid" ? "default" : order.status === "pending" ? "secondary" : "destructive" } > {order.status} </Badge> 
                </p> 
                <p><strong>Valor:</strong> R${order.total}</p> 
                <p><strong>Data:</strong> {order.date}</p> 
                <h3 className="text-lg font-semibold mt-6">Itens</h3> 
                
                <Table> 
                    <TableHeader> 
                        <TableRow>
                            <TableHead>Produto</TableHead> 
                            <TableHead>Quantidade</TableHead> 
                            <TableHead>Preço</TableHead> 
                            <TableHead>Total</TableHead> 
                        </TableRow> 
                    </TableHeader> 

                    <TableBody> {order.items.map((item, idx) => ( 
                        <TableRow key={idx}> 
                            <TableCell>{item.name}</TableCell> 
                            <TableCell>{item.quantity}</TableCell> 
                            <TableCell>R${item.price}</TableCell> 
                            <TableCell>R${item.price * item.quantity}</TableCell> 
                        </TableRow> ))} 
                    </TableBody> 
                </Table> 
            </CardContent> 
            
            <CardFooter className="flex gap-2"> 
                <Button onClick={() => handleStatusChange("paid")}>Marcar como pago</Button> 
                <Button className="text-white" onClick={() => handleStatusChange("cancelled")}> Cancelar Pedido </Button> 
                <Button className="text-white" onClick={handleRecalculate}> Recalcular Valores </Button> 
            </CardFooter> 
        </Card>
    );
}

export default OrderDetailPage;