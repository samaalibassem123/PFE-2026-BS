import type { AvailableRoles } from "@/utils/Roles";

export interface PendingUserInfo {
  email: string;
  username: string;
  password: string;
  role: AvailableRoles;
}

export interface PendingUserData {
  id?: string;
  email: string;
  user: PendingUserInfo;
  status: PendingUsersStatus;
  created_at?: Date;
  approved_at?: Date;
}



export interface GetPendingUsersData{
    total:number
    data:PendingUserData[]
}

export interface GetPendingsParams {
  limit: number;
  offset: number;
  role:AvailableRoles | null
}



export type PendingUsersStatus = "PENDING" | "APPROVED" | "DECLINED";

export interface ApproveRequest{
    email:string
    status:PendingUsersStatus
}
