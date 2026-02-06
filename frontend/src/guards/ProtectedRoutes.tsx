import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
    const auth = true
    if(!auth){
        return <Navigate to={"/login"} replace/>
    }
    return <Outlet/>
  
}
