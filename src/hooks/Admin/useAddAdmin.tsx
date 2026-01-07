import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { AddAdmin } from "@/lib/apiClient"
import { type AddAdminFormData } from "@/types/types"

export const useAddAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: AddAdminFormData) => {
            const response = await AddAdmin.add(data)
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Admin added successfully')
                return response.data;
            }
        }
        , onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to add admin")
        }
    })
}