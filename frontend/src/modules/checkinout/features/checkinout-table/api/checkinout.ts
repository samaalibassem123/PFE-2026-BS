import type {
  GetCheckinoutData,
  GetChekinoutParams,
} from "@/modules/checkinout/types";
import api from "@/shared/api/backend";

export const get_checkinouts_fn = async (params: GetChekinoutParams) => {
  const { data } = await api.get<GetCheckinoutData>("/api/v1/checkinout/", {
    params,
  });
  return data;
};
