import type { SortOption, StatusFilter } from "../pages/OrdersPage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Props{
    statusFilter: StatusFilter;
    sortBy: SortOption;
    onStatusChange: (value: StatusFilter) => void;
    onSortChange: (value: SortOption) => void;
}

function OrdersFilters({statusFilter, sortBy, onStatusChange, onSortChange}: Props){
    return (
        <div className="mb-6 flex flex-wrap items-center gap-4">
            <Select value={statusFilter} onValueChange={(val) => onStatusChange(val as StatusFilter)}> 
                <SelectTrigger className="w-48 text-white"> 
                    <SelectValue placeholder="Status" /> 
                </SelectTrigger> 

                <SelectContent> 
                    <SelectItem value="all">Todos</SelectItem> 
                    <SelectItem value="pending">Pendentes</SelectItem> 
                    <SelectItem value="paid">Pagos</SelectItem> 
                    <SelectItem value="cancelled">Cancelados</SelectItem> 
                </SelectContent> 
            </Select>

            <Select value={sortBy} onValueChange={(val) => onSortChange(val as SortOption)}> 
                <SelectTrigger className="w-64 text-white"> 
                    <SelectValue placeholder="Ordenar" /> 
                </SelectTrigger> 
                
                <SelectContent position="popper"> 
                    <SelectItem value="date">Data mais recente</SelectItem> 
                    <SelectItem value="value">Valor mais alto</SelectItem> 
                </SelectContent> 
            </Select> 
        </div>
    )
}

export default OrdersFilters;