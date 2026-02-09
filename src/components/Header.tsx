import { NavLink } from "react-router-dom";

function Header(){
    return (
        <header className="bg-neutral-800 text-white shadow-md h-16 w-screen flex items-center">
            <div className="container mx-auto flex items-center justify-between px-6">
                <h2 className="text-lg font-bold tracking-wide">BACKOFFICE ADMINISTRATIVO</h2>
                <nav className="flex gap-6">
                    <NavLink to="/dashboard" className="text-white!">Dashboard</NavLink>
                    <NavLink to="/users" className="text-white!">Usuários</NavLink>
                    <NavLink to="/orders" className= "text-white!">Pedidos</NavLink>
                    <NavLink to="/commissions" className= "text-white!">Comissões</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header;