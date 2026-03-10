import type { ApproveRequest, GetPendingsParams, GetPendingUsersData } from "@/modules/pending-users/types";
import api from "@/shared/api/backend";

export const get_pendings_fn = async (params:GetPendingsParams)=>{
    const { data } = await api.get<GetPendingUsersData>("/api/pending-users/", {params});
    return data
}


export const approve_fn = async (params:ApproveRequest)=>{
    const {data} =  await api.post('/api/pending-users/approve', params)
    return data
}
