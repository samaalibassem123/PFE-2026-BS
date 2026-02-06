import {  AlertTriangle } from "lucide-react";


export default function PageUnauthorized() {

  return (
    <div className="h-lvh w-full flex items-center justify-center ">    
        <div className="flex items-center gap-2">
            <AlertTriangle/> 
            <p className="mt-1">This page is not authorized for you</p>
        </div>
    </div>
  )
}
