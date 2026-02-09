import type { RoleFilter, StatusFilter } from "../pages/UsersPage";
import {Input} from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue  } from "./ui/select";


interface Props{
    search: string;
    statusFilter: StatusFilter;
    roleFilter: RoleFilter;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: StatusFilter) => void;
    onRoleChange: (value: RoleFilter) => void;
}

function UsersFilters({search, statusFilter, roleFilter, onSearchChange, onStatusChange, onRoleChange}: Props){
    return (
        <div className="mb-6 flex flex-wrap items-center gap-4">
            <Input type="text" placeholder="Pesquisar por nome ou email" value={search} onChange={e => onSearchChange(e.target.value)} className="w-64"/>

            <Select value={statusFilter} onValueChange={(val) => onStatusChange(val as StatusFilter)}>
                <SelectTrigger className="w-40 text-white">
                    <SelectValue/>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
            </Select>
            
            <Select value={roleFilter} onValueChange={(val) => onRoleChange(val as RoleFilter)}>
                <SelectTrigger className="w-40 text-white">
                    <SelectValue/>
                </SelectTrigger>
                
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="customer">Cliente</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default UsersFilters;