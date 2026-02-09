import type { Commission } from "../types/commission";
import type { Order } from "../types/order";
import type { User } from "../types/user";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Props{
    commissions: Commission[];
    orders: Order[];
    users: User[];
}

function CommissionList({commissions, orders, users}:Props){
    const getUserName = (userId: number) =>{
        const user = users.find(u => u.id === userId);
        return user ? user.name : "Usuário desconhecido";
    };

    const getOrderInfo = (orderId: number) => {
        const order = orders.find(o => o.id === orderId);
        return order ? `Pedido #${order.id}` : "Pedido desconhecido";
    };

    return (
        <Table> 
            <TableHeader> 
                <TableRow> 
                    <TableHead>ID</TableHead> 
                    <TableHead>Usuário</TableHead> 
                    <TableHead>Pedido</TableHead> 
                    <TableHead>Valor</TableHead> 
                    <TableHead>Status</TableHead> 
                </TableRow> 
            </TableHeader> 

            <TableBody> 
                {commissions.map((c) => ( 
                    <TableRow key={c.id}> 
                        <TableCell>#{c.id}</TableCell> 
                        <TableCell>{getUserName(c.userId)}</TableCell> 
                        <TableCell>{getOrderInfo(c.orderId)}</TableCell> 
                        <TableCell>R${c.value}</TableCell> 
                        <TableCell> 
                            <Badge variant={ c.status === "paid" ? "default" : c.status === "pending" ? "secondary" : "destructive" } > 
                                {c.status} 
                            </Badge> 
                        </TableCell> 
                    </TableRow> 
                ))} 
            </TableBody> 
        </Table>
    );
}

export default CommissionList;