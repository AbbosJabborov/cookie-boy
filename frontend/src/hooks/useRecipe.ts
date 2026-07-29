import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useRecipe(id: number) {
    return useQuery({
        queryKey: ["recipe", id],
        queryFn: async () => {
            const res = await api.get(`recipes/${id}/`);
            return res.data;
        },
    });
}
