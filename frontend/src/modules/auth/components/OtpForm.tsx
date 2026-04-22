import { Button } from '@/components/ui/button';
import { FieldDescription, FieldError, FieldLegend, FieldSet } from '@/components/ui/field'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from 'react';
import { Link,  useSearchParams } from 'react-router-dom';
import { useVerifyOtpMutation } from '../hooks';
import { getErrorMessage } from '@/shared/api/backend';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';

export default function OtpForm() {
    const [otp_code ,setOtp] = useState<string>("")

    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState<string>(() => searchParams.get("email") ?? "")
    console.log("email", email)
    const {mutate, isError , error, isPending} = useVerifyOtpMutation()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if (email === ''){
            toast.error('Email undefined')
            return
        }

        mutate({
            email:email,
            otp:otp_code
        })
    }
  return (
    <form
      onSubmit={handleSubmit}
      className=" z-50 backdrop-blur-sm border  rounded-2xl bg-transparent   p-5 w-fit   "
    >
      <FieldSet className="  flex flex-col items-center bg-transparent justify-center text-center  ">
        <FieldLegend className=" text-2xl">OTP Verification</FieldLegend>
        <FieldDescription className="  text-center">
          Verify your account
        </FieldDescription>
        <FieldDescription className=" p-5 sm:w-sm text-center text-wrap">
          Check your spam folder or make sure your number/email is correct.
        </FieldDescription>
        {email && <Badge variant={"outline"}>{email}</Badge>}
        <InputOTP onChange={setOtp} required maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        {isError && <FieldError>{getErrorMessage(error)}</FieldError>}
        <div className="text-xs space-y-2">
          <span>Didn’t receive the code?</span>
          <div className=" cursor-pointer underline">Resend</div>
        </div>
        <Button className="w-[200px]" disabled={isPending}>
          {isPending && <Spinner />} submit
        </Button>

        <Button
          asChild
          variant={"outline"}
          className=" w-[200px]"
          disabled={isPending}
        >
          <Link to="/login">Cancel</Link>
        </Button>
      </FieldSet>
    </form>
  );
}
