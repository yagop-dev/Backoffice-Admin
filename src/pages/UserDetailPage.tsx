import { useParams } from "react-router-dom";
import type { User } from "../types/user";
import React, { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "../components/ui/select";
import { Button } from "../components/ui/button";

function UserDetailPage(){
    const{id} = useParams<{id: string}>();
    const[user, setUser] = useState<User | null>(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null>(null);

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[status, setStatus] = useState<"active" | "inactive">("active");
    const[isEditing, setIsEditing] = useState(false);

    useEffect(() =>{
        fetchData<User[]>("/data/users.json")
        .then(users => {
            const found = users.find(u => u.id === Number(id));
            if(!found) throw new Error("Usuário não encontrado");
            setUser(found);
            setName(found.name);
            setEmail(found.email);
            setStatus(found.status as "active" | "inactive");
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [id]);

    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setUser(prev => prev ? { ...prev, name, email, status}: null);
        
        setIsEditing(false);
        alert("Usuário atualizado com sucesso!");
    }
    
    if(loading) return <Loading message="Carregando usuário..."/>;
    if(error) return <ErrorMessage error={error}/>;
    if(!user) return <p>Usuário não encontrado.</p>;

    return ( 
        <Card className="max-w-xl mx-auto"> 
            <CardHeader>
                <CardTitle className="font-bold text-2xl">Detalhes do Usuário</CardTitle> 
            </CardHeader> 
            <CardContent> 
                {!isEditing ? ( 
                    <div className="space-y-2"> 
                        <p><strong>Nome:</strong> {user.name}</p> 
                        <p><strong>Email:</strong> {user.email}</p> 
                        <p><strong>Tipo:</strong> {user.role}</p> 
                        <p><strong>País:</strong> {user.country}</p> 
                        <p><strong>Status:</strong> {user.status}</p> 
                    </div> ) : ( 
                    <form onSubmit={handleSave} className="space-y-4"> 
                        <div> 
                            <label className="block text-sm font-medium mb-1">Nome</label> 
                            <Input value={name} onChange={(e) => setName(e.target.value)} /> 
                        </div> 

                        <div> 
                            <label className="block text-sm font-medium mb-1">Email</label> 
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} /> 
                        </div> 

                        <div> 
                            <label className="block text-sm font-medium mb-1">Status</label> 
                            <Select value={status} onValueChange={(val) => setStatus(val as "active" | "inactive")}> 
                                <SelectTrigger className="text-white"> 
                                    <SelectValue/> 
                                </SelectTrigger> 

                                <SelectContent> 
                                    <SelectItem value="active">Ativo</SelectItem> 
                                    <SelectItem value="inactive">Inativo</SelectItem> 
                                </SelectContent> 
                            </Select> 
                        </div> 
                        
                        <div className="flex gap-2"> 
                            <Button type="submit">Salvar</Button> 
                            <Button type="button" className="text-white" onClick={() => setIsEditing(false)}> Cancelar </Button> 
                        </div> 
                    </form> )} 
            </CardContent>
                {!isEditing && ( 
                    <CardFooter> 
                        <Button onClick={() => setIsEditing(true)}>Editar Informações</Button> 
                    </CardFooter> 
                )} 
        </Card> 
    );
        
}

export default UserDetailPage;