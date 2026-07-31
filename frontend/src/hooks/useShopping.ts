import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getShoppingLists,
  addMissingIngredientsFromRecipe,
  toggleShoppingItemBought,
  deleteShoppingItem,
} from "@/services/shopping";

export function useShoppingLists() {
  return useQuery({
    queryKey: ["shoppingLists"],
    queryFn: getShoppingLists,
  });
}

export const useShopping = useShoppingLists;

export function useAddFromRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMissingIngredientsFromRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
  });
}

export function useToggleItemBought() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, isBought }: { itemId: number; isBought: boolean }) =>
      toggleShoppingItemBought(itemId, isBought),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
  });
}

export function useDeleteShoppingItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShoppingItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
  });
}
