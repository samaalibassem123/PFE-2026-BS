import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useDeleteUser } from "../hooks/user";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function DeleteUser({ user_id }: { user_id: string }) {
  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isPending, isError } = useDeleteUser();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="w-full cursor-pointer justify-between"
        >
          Delete <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            account and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            cancel
          </Button>

          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={() => {
              mutate(user_id);
              if (!isError && !isPending) setOpen(false);
            }}
          >
            {isPending && <Spinner />} confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
