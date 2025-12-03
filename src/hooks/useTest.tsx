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
export const useTestProtected = () => {
    return useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const response = await testApi.protected();
            if (response.data) {
                return response.data;
            }
            throw new Error("Failed to fetch protected: Invalid response format");
        },
    })
}
export const useTestAdmin = () => {
    return useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const response = await testApi.admin();
            if (response.data) {
                return response.data;
            }
            throw new Error("Failed to fetch admin: Invalid response format");
        },
    })
}
export const useTestOwnership = (id: number) => {
    return useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const response = await testApi.ownership(id);
            if (response.data) {
                return response.data;
            }
            throw new Error("Failed to fetch ownership: Invalid response format");
        },
    })
}
export const useTestPublic = () => {
    return useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const response = await testApi.public();
            if (response.data) {
                return response.data;
            }
            throw new Error("Failed to fetch public: Invalid response format");
        },
    })
}
