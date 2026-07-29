import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

export function useShopping(id: number) {
    return useQuery({
        queryKey: ["shopping", id],
        queryFn: async () => {
            const res = await api.get(`shopping/${id}/`);
            return res.data;
        },
    });
}
