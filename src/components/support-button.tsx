'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";
import Link from "next/link";

export default function SupportButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <LifeBuoy className="h-8 w-8 text-primary-foreground" />
          <span className="sr-only">Support</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Support Information</AlertDialogTitle>
          <AlertDialogDescription className="py-4">
            The SNBD HOST beta application does not have a built-in support module. Please refer to our main homepage for chat, live support, and other contact details. Thank you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-start gap-2">
            <AlertDialogAction asChild>
                <Link href="https://snbdhost.com/support">Go to Support</Link>
            </AlertDialogAction>
            <AlertDialogAction asChild variant="outline">
                <Link href="/">Stay Here</Link>
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
