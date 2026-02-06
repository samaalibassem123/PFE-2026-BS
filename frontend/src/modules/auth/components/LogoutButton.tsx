import { Button } from '@/components/ui/button'
import { useLogoutMutation } from '../hooks'

export default function LogoutButton() {
  const logout = useLogoutMutation()

  const handleLogout = ()=>{
    logout.mutate()
  }
  return (  
    <Button disabled={logout.isPending} onClick={handleLogout}>Logout</Button>
  )
}
