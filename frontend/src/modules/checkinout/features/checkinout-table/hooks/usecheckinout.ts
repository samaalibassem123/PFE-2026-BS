import {
  type GetCheckinoutData,
  type GetChekinoutParams,
} from "@/modules/checkinout/types";
import { useQuery } from "@tanstack/react-query";
import { get_checkinouts_fn } from "../api/checkinout";

export const useCheckinout = (params: GetChekinoutParams) => {
  return useQuery<GetCheckinoutData>({
    queryKey: ["checkinouts", params],
    queryFn: () => get_checkinouts_fn(params),
  });
};
