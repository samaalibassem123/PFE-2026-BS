import { ConstellationBackground } from "@/components/ui/constellation";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex  flex-col space-y-2 items-center h-lvh w-full justify-center">
      <img src="/company-logo.png" alt="company logo" className="mb-4 z-50" />
      <RegisterForm />

      <ConstellationBackground />
    </div>
  );
}
