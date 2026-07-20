import { useMutation } from "@tanstack/react-query";

import { setTokens } from "@/lib/auth";
import { login } from "@/services/auth";

export function useLogin() {
    return useMutation({
        mutationFn: login,

        onSuccess(data) {
            setTokens(
                data.access,
                data.refresh,
            );
        },
    });
}
