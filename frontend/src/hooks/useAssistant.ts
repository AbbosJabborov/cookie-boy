import { useMutation } from "@tanstack/react-query";
import { askAssistant, getSubstitution } from "@/services/assistant";

export function useAskAssistant() {
  return useMutation({
    mutationFn: askAssistant,
  });
}

export function useSubstitution() {
  return useMutation({
    mutationFn: getSubstitution,
  });
}
