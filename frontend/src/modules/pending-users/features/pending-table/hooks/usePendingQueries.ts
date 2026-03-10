import type { GetPendingsParams, GetPendingUsersData } from "@/modules/pending-users/types"
import { useQuery } from "@tanstack/react-query"
import { get_pendings_fn } from "../api/pendings"

export const usePendings = (params:GetPendingsParams)=>{
    return useQuery<GetPendingUsersData>({
        queryKey:['pending-users', params],
        queryFn:()=>get_pendings_fn(params)
    })
}
