import { userApi } from "@/lib/apiClient";
import type { User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

 export const usetGetUserProfile  =(userId:number , options?:{enabled?:boolean}) =>{
    return useQuery<User , Error>({
        ...options,
        queryKey: ["user", userId],
        queryFn: async () => {
            const response = await userApi.profile(userId);
            if (response.data && response.data.success && response.data.user) {
                return response.data.user;
            }
          
            throw new Error("Failed to fetch user profile: Invalid response format");
        },
    });
 }
