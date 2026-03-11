
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useApproving } from "../hooks/usePendingMutations";
import type { PendingUserInfo } from "@/modules/pending-users/types";
import { Spinner } from "@/components/ui/spinner";



interface Props{
  user_data:PendingUserInfo
}

export default function ApproveDialog({ user_data }: Props) {

  const { mutate, isPending } = useApproving({
    email: user_data.email,
    status: "APPROVED",
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"default"} className="flex-1">
          Approve <Check />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            variant={"confirme"}
            onClick={() => mutate({ email: user_data.email, username: user_data.username, status: "APPROVED" })}
          >
            Confirm {isPending && <Spinner />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
