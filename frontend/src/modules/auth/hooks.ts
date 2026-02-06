import { useMutation } from "@tanstack/react-query";
import { LoginApifn, LogoutApifn } from "./auth.api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: LoginApifn,
    onSuccess: () => {
      console.log("user is logged in");
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: LogoutApifn,
    onSuccess: () => {
      console.log("user is logout");
    },
  });
};
