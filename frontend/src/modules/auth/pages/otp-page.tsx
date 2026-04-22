
import { ConstellationBackground } from '@/components/ui/constellation'
import OtpForm from '../components/OtpForm'

export default function OtpPage() {
  return (
    <main className='flex items-center justify-center min-h-dvh'><OtpForm/>
          <ConstellationBackground/>
    </main>
  )
}
