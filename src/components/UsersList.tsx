import { Link } from "react-router-dom";
import type {User} from "../types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Props{
    users: User[];
    onToggleStatus: (id: number) => void;
}


function UsersList({users, onToggleStatus}: Props){
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users.map((u) =>(
                    <TableRow key={u.id}>
                        <TableCell>
                            <Link to={`/users/${u.id}`} className="font-medium hover:underline">
                                {u.name}
                            </Link>
                        </TableCell>
                        <TableCell>
                            {u.email}
                        </TableCell>
                        <TableCell>
                            <Badge variant={u.status === "active" ? "default" : "secondary"}>
                                {u.status === "active" ? "Ativo" : "Inativo"}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Button variant={"outline"} className="text-white hover:text-neutral-200" size="sm" onClick={() => onToggleStatus(u.id)}>
                                {u.status === "active" ? "Desativar" : "Ativar"}
                            </Button>
                        </TableCell>
                    </TableRow> 
                ))}
            </TableBody>
        </Table>
    );
}

export default UsersList;