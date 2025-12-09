import { UserAdminApi } from "@/lib/apiClient"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetAllUsers = (page: number = 1, per_page: number = 10) => {
    return useQuery({
        queryKey: ["users", page, per_page],
        queryFn: async () => {
            const response = await UserAdminApi.list({ page, per_page })
            if (response.data && response.data.success) {
                return response.data.data;
            }
            return { users: [], pagination: { total: 0, perPage: per_page, page: page, totalPages: 0 } };
        },
        placeholderData: (previousData) => previousData,
    })
}
export const useDeleteUser = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const response = await UserAdminApi.delete(id)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'user deleted successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete user")
        }
    })
}
