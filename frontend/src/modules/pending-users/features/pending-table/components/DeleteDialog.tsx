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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { PendingUserInfo } from "@/modules/pending-users/types";
import { Mail, Trash2, User} from "lucide-react";
import { useDelete } from "../hooks/usePendingMutations";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  user_data: PendingUserInfo;
}

export default function DeleteDialog({ user_data }: Props) {
  const { mutate, isPending } = useDelete({
    email: user_data.email,
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          Delete <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete the request to create this account.
            <div className="flex  gap-2 my-3 ">
              <Mail className="size-4" />
              <Label>{user_data.email}</Label>
              <Separator orientation="vertical" />
              <User className="size-4" />
              <Label className=" text-nowrap truncate">
                {user_data.username}-{user_data.role}
              </Label>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={() =>
              mutate({
                email: user_data.email,
              })
            }
          >
            Confirm {isPending && <Spinner />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
