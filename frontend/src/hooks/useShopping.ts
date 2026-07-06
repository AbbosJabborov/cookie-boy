import { useQuery } from "@tanstack/react-query";

import { getShopping } from "@/api/shopping";

export function useShopping(recipeId: number) {
  return useQuery({
    queryKey: ["shopping", recipeId],
    queryFn: () => getShopping(recipeId),
    enabled: !!recipeId,
  });
}
