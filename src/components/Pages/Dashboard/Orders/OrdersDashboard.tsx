"use client"

import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import DataTable from "../shared/DataTable"
import type { Order, OrderFormData, PaginationData } from "@/types/types"
import { useGetAllOrders, useUpdateOrder } from "@/hooks/Admin/useOrdersAdmin"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit2 } from "lucide-react"
import OrderDialog from "./OrderDialog"
import { Badge } from "@/components/ui/badge"

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
        case 'processing': return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
        case 'shipped': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
        case 'delivered': return 'bg-green-100 text-green-800 hover:bg-green-100';
        case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-100';
        default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
}

const OrdersDashboard = () => {
    const { data: orders, isLoading } = useGetAllOrders()
    const [page, setPage] = useState(1)
    const [perPage] = useState(10)

    // Dialog states
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const [rowSelection, setRowSelection] = useState({})

    const { mutateAsync: updateOrder, isPending: isUpdatePending } = useUpdateOrder(selectedOrder ? parseInt(selectedOrder.id) : 0)

    // Client-side pagination logic
    const totalOrders = orders?.length || 0;
    const totalPages = Math.ceil(totalOrders / perPage);

    // Ensure current page is valid
    const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

    const paginatedOrders = orders?.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    ) || [];

    const pagination: PaginationData = {
        total: totalOrders,
        perPage: perPage,
        page: currentPage,
        totalPages: totalPages
    };

    const handleUpdateSubmit = async (data: OrderFormData) => {
        try {
            await updateOrder(data)
            setEditDialogOpen(false)
            setSelectedOrder(null)
        } catch (error) {
            console.error("Failed to update order:", error)
        }
    }

    const openEditDialog = (order: Order) => {
        setSelectedOrder(order)
        setEditDialogOpen(true)
    }

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "order_number",
            header: "Order #",
            cell: ({ row }) => <div className="font-medium text-gray-900">#{row.getValue("order_number")}</div>,
            size: 100,
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => <div className="font-medium text-gray-900">${parseFloat(row.getValue("total")).toFixed(2)}</div>,
            size: 100,
        },
        {
            accessorKey: "payment_status",
            header: "Payment",
            cell: ({ row }) => {
                const status = row.getValue("payment_status") as string;
                return (
                    <div className={`text-sm ${status === 'paid' ? 'text-green-600' : 'text-yellow-600'} font-medium capitalize`}>
                        {status}
                    </div>
                )
            },
            size: 120,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant="secondary" className={`capitalize shadow-none ${getStatusColor(status)}`}>
                        {status}
                    </Badge>
                )
            },
            size: 120,
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"));
                return <div className="text-gray-500 whitespace-nowrap">{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            },
            size: 180,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEditDialog(order)}>
                                <Edit2 className="mr-2 h-4 w-4" /> Update Status
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
            size: 50,
        },
    ]

    if (isLoading) {
        return <div className="p-8 text-center">Loading orders...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Orders Dashboard</h1>
            </div>

            <DataTable
                columns={columns}
                data={paginatedOrders}
                pagination={pagination}
                onPageChange={setPage}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />

            {/* Edit Order Dialog */}
            {selectedOrder && (
                <OrderDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    order={selectedOrder}
                    onSubmit={handleUpdateSubmit}
                    isPending={isUpdatePending}
                />
            )}
        </div>
    )
}

export default OrdersDashboard