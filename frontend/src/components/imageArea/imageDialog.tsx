"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ImageDialogProps {
  imageUrl: string;
  children: React.ReactNode;
}

export function ImageDialog({ imageUrl, children }: ImageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-2xl flex flex-col items-center gap-4">
        <DialogTitle className="text-lg font-semibold"></DialogTitle>
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl}
            alt="Full Image"
            fill
            className="object-contain rounded"
          />
        </div>
        <a
          href={imageUrl}
          download={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="text-blue font-bold border hover:cursor-pointer">
            Open Image
          </Button>
        </a>
      </DialogContent>
    </Dialog>
  );
}
