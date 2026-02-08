import { Spinner } from "@/components/ui/spinner";

export default function LoadingPage() {
  return (
    <div className=" flex items-center justify-center gap-2 animate-pulse h-svh w-full">
      <Spinner className=" size-5" />
      Please wait for me...
    </div>
  );
}
