import { Link } from "react-router-dom";
import type { Order } from "../types/order";
import type { User } from "../types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

interface Props{
    orders: Order[];
    users: User[];
}

function OrdersList({orders, users}:Props){
    const getUserName = (userId: number) => {
        const user = users.find(u=>u.id === userId);
        return user ? user.name : "Usuário desconhecido";
    };
    
    return (
        <Table> 
            <TableHeader> 
                <TableRow> 
                    <TableHead>ID</TableHead> 
                    <TableHead>Cliente</TableHead> 
                    <TableHead>Status</TableHead> 
                    <TableHead>Valor</TableHead> 
                    <TableHead>Data</TableHead> 
                </TableRow> 
            </TableHeader> 
            
            <TableBody> 
                {orders.map((o) => ( 
                    <TableRow key={o.id}> 
                        <TableCell> 
                            <Link to={`/orders/${o.id}`} className="text-blue-600 hover:underline"> #{o.id} </Link> 
                        </TableCell> 
                        <TableCell>{getUserName(o.userId)}</TableCell> 
                        <TableCell> 
                            <Badge variant={o.status === "paid" ? "default" : o.status === "pending" ? "secondary" : "destructive"} > 
                                {o.status} 
                            </Badge> 
                        </TableCell> 
                        <TableCell>R${o.total}</TableCell> 
                        <TableCell>{o.date}</TableCell> 
                    </TableRow> 
                ))} 
            </TableBody>
        </Table>
    );
}

export default OrdersList;