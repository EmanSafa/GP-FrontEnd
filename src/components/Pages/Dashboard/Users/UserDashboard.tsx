"use client"

import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"

import type { User } from "@/types/types"
import { useGetAllUsers, useDeleteUser } from "@/hooks/Admin/useUserAdmin"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from "lucide-react"
import DeleteUserDialog from "./DeleteUserDialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { UserAdminApi } from "@/lib/apiClient"
import DataTable from "../shared/DataTable"

const UserDashboard = () => {
    const [page, setPage] = useState(1)
    const [perPage] = useState(10)
    const { data: userData, isLoading } = useGetAllUsers(page, perPage)

    // Extract users and pagination from the API response structure
    // The hook returns { users: [...], pagination: {...} } or the response.data.data structure
    // Based on the image, response.data.data has { users: [...], pagination: {...} }
    // Our hook returns response.data.data
    const users = userData?.users || []
    const pagination = userData?.pagination || {
        total: 0,
        perPage: perPage,
        page: page,
        totalPages: 0
    }

    const [rowSelection, setRowSelection] = useState({})

    // Dialog states
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isBulkDelete, setIsBulkDelete] = useState(false)

    const queryClient = useQueryClient();

    const { mutateAsync: deleteUser, isPending: isDeletePending } = useDeleteUser(selectedUser ? selectedUser.id : 0)

    const selectedUserIds = users
        ? Object.keys(rowSelection).map(index => users[Number(index)]?.id).filter(id => id !== undefined)
        : [];

    const handleDeleteSelected = () => {
        if (!selectedUserIds.length) return;
        setIsBulkDelete(true);
        setDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = async () => {
        try {
            if (isBulkDelete) {
                // Bulk delete logic
                const deletePromises = selectedUserIds.map(id =>
                    UserAdminApi.delete(id)
                );
                await Promise.all(deletePromises);

                toast.success(`Successfully deleted ${selectedUserIds.length} users`);
                setRowSelection({}); // Clear selection
                queryClient.invalidateQueries({ queryKey: ["users"] })
            } else {
                await deleteUser()
            }
            setDeleteDialogOpen(false)
            setSelectedUser(null)
            setIsBulkDelete(false)
        } catch (error) {
            console.error("Failed to delete user:", error)
            toast.error("Failed to delete user(s)")
        }
    }

    const openDeleteDialog = (user: User) => {
        setIsBulkDelete(false)
        setSelectedUser(user)
        setDeleteDialogOpen(true)
    }

    const columns: ColumnDef<User>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 40,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue("name")}</div>,
            size: 150,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div className="text-gray-500">{row.getValue("email")}</div>,
            size: 200,
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                const role = row.getValue("role") as string;
                return (
                    <Badge variant={role === 'admin' ? 'default' : 'secondary'} className="capitalize shadow-none">
                        {role}
                    </Badge>
                )
            },
            size: 100,
        },
        {
            accessorKey: "created_at",
            header: "Joined At",
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"));
                return <div className="text-gray-500 whitespace-nowrap">{date.toLocaleDateString()}</div>
            },
            size: 150,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
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
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(user)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
            size: 50,
        },
    ]

    if (isLoading) {
        return <div className="p-8 text-center">Loading users...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Users Dashboard</h1>
                <div className="flex items-center gap-2">
                    {selectedUserIds.length > 0 && (
                        <Button onClick={handleDeleteSelected}>
                            Delete Selected ({selectedUserIds.length})
                        </Button>
                    )}
                </div>
            </div>

            <DataTable
                columns={columns}
                data={users}
                pagination={pagination}
                onPageChange={setPage}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />

            {/* Delete User Dialog */}
            <DeleteUserDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                isPending={isDeletePending}
                count={isBulkDelete ? selectedUserIds.length : 1}
            />
        </div>
    )
}

export default UserDashboard
