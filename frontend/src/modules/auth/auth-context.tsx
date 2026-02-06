import  { createContext, useContext } from "react";
import type { UserData } from "@/shared/types";



interface AuthContextType {
  user: UserData | null;
  setUser:(data:UserData)=>void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = ()=>{
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuth() must be used only inside Authwrapper')
  }
  return context
  
}