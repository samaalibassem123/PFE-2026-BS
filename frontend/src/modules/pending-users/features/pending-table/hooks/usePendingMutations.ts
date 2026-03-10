import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approve_fn } from "../api/pendings";
import type { ApproveRequest } from "@/modules/pending-users/types";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/api/backend";

export const useApproving = (data:ApproveRequest) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (params: ApproveRequest) => approve_fn(params),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["pending-users"] });

      if (data.status === "APPROVED") {
        toast.success(
          `User with email ${data.email} was approved successfully`,
          {
            description: "The account creation request has been approved.",
            position: "top-center",
          },
        );
      } else {
        toast.success(
          `User with email ${data.email} was declined successfully`,
          {
            description: "The account creation request has been declined.",
            position: "top-center",
          },
        );
      }
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
