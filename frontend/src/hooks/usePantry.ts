import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPantryItems,
  addPantryItem,
  deletePantryItem,
} from "@/services/pantry";

export function usePantry() {
  return useQuery({
    queryKey: ["pantry"],
    queryFn: getPantryItems,
  });
}

export function useAddPantryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPantryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pantry"] });
    },
  });
}

export function useDeletePantryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePantryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pantry"] });
    },
  });
}
