import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconLogout } from "@tabler/icons-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface LogoutAlertDialogProps {
  onConfirm: () => void;
}

export function LogoutAlertDialog({ onConfirm }: LogoutAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      {/* Prevent dropdown from closing when clicked to ensure the alert dialog remains visible */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leaving so soon?</AlertDialogTitle>
          <AlertDialogDescription>
            You’ll be logged out, but we’ll be right here when you get back.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
