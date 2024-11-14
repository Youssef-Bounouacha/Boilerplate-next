import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "../../../../../../types/User";

export function UserDialog({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: User;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 rounded-lg">
              <AvatarImage
                style={{ borderRadius: "50%" }}
                src={data?.image || ""}
                alt={data?.name || ""}
              />
              <AvatarFallback className="rounded-lg">
                {data?.name?.slice(0, 2).toUpperCase() || "CN"}
              </AvatarFallback>
            </Avatar>
            <span>{data?.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-2">
          <p>Role:</p>
          <p>{data?.role}</p>
          <p>Company:</p>
          <p>{data?.company}</p>
          <p>Email:</p>
          <p>{data?.email}</p>
          <p>Phone:</p>
          <p>{data?.phone}</p>
          <p>Address:</p>
          <p>{data?.address}</p>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
