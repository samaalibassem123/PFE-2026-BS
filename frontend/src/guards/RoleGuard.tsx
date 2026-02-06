import type { AvailableRoles } from "@/utils/Roles"
import type React from "react"
import { Navigate } from "react-router-dom"



interface Props {
    AllowedRoles:AvailableRoles[]
    children:React.ReactNode
}

export default function RoleGuard({AllowedRoles, children}:Props) {
    const UserRole = "ADMIN"
    if(!AllowedRoles.includes(UserRole)){
        return <Navigate to={"*"} replace />
    }
  return (
    children
  )
}
