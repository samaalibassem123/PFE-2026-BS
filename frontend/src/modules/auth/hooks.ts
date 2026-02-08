import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthMeApifn, LoginApifn, LogoutApifn } from "./auth.api";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LoginApifn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/user/dashboard", { replace: true });
      console.log("user is logged in");
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LogoutApifn,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
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
