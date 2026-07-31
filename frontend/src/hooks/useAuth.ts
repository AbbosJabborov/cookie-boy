import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessToken, clearTokens } from "@/lib/auth";
import { getUserProfile } from "@/services/auth";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = getAccessToken();

  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserProfile,
    enabled: !!token,
    retry: false,
  });

  const logout = () => {
    clearTokens();
    queryClient.setQueryData(["authUser"], null);
    queryClient.invalidateQueries();
    navigate("/login");
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!token && !!user,
    logout,
  };
}
