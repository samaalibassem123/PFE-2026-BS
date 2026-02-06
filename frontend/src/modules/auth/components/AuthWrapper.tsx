import type { UserData } from "@/shared/types";
import { useState, useMemo } from "react";
import { AuthContext } from "../auth-context";


export function AuthWrapper({ children  }: { children: React.ReactNode  } ) {

    const [user, setUser] = useState<UserData | null>(null);

    const values = useMemo(()=>({user, setUser}), [user])

    return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}