import {useEffect, useState} from "react";
import type { User, UserRole, UserStatus } from "../types/user";
import { fetchData } from "../services/api";
import UsersList from "../components/UsersList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import UsersFilters from "../components/UsersFilters";

export type StatusFilter = "all" | UserStatus;
export type RoleFilter = "all" | UserRole;

function UsersPage(){
    const[users, setUsers] = useState<User[]>([]);
    const[statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const[roleFilter, setRoleFilter] = useState<RoleFilter>("all");
    const[search, setSearch] = useState("");
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData<User[]>("/data/users.json")
            .then(setUsers)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [])

    const filteredUsers = users.filter(u => {
        const matchesStatus = statusFilter === "all" || u.status === statusFilter;
        const matchesRole = roleFilter === "all" || u.role === roleFilter;
        const matchesSearch = 
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
            
        return matchesStatus && matchesRole && matchesSearch;
    })
    
    const toggleStatus = (id: number) => {
        setUsers(users.map(u => 
            u.id === id ? {...u, status: u.status === "active" ? "inactive" : "active"} : u
        ))
    }

    if(loading) return <Loading message = "Carregando usuários..."/>;
    if(error) return <ErrorMessage error = {error}/>;

    return(
        <div>
            <h2 className="mb-6 text-2xl font-bold">USUÁRIOS</h2>

            <p className="text-muted-foreground mb-6">Clique no nome do usuário para editar</p>
            
            <UsersFilters search={search} statusFilter={statusFilter} roleFilter={roleFilter} onSearchChange={setSearch} onStatusChange={setStatusFilter} onRoleChange={setRoleFilter}/>

            {filteredUsers.length === 0 ? (
                <p className="mt-6 text-muted-foreground">Nenhum usuário encontrado.</p>
            ): (
                <UsersList users={filteredUsers} onToggleStatus={toggleStatus}/>
            )}
        </div>
    );
}

export default UsersPage;