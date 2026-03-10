import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthMeApifn, LoginApifn, LogoutApifn } from "./auth.api";
import { useNavigate } from "react-router-dom";
import { pend_user_api } from "./pending-user.api";

import { toast } from "sonner";
import { getErrorMessage } from "@/shared/api/backend";
import type { PendingUserData } from "../pending-users/types";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LoginApifn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/user/", { replace: true });

      console.log("user is logged in");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error), { position: "top-center" });
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LogoutApifn,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
      console.log("user is logout");
    },
  });
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: AuthMeApifn,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

// Pending users
export const usePendingUserMutation = () => {
  return useMutation({
    mutationFn: (params: PendingUserData) => pend_user_api(params),
    onSuccess: () => {
      toast.success(
        "Registration successful! Your account is waiting for admin approval.",
        {
          duration: 5000,
          position: "top-center",
        },
      );
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
