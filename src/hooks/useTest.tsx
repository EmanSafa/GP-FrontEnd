import { testApi } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useTest = () => {
    return useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const response = await testApi.session();
            if (response.data) {
                return response.data;
            }
            throw new Error("Failed to fetch session: Invalid response format");
        },
    })
}
