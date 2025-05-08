 
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ConfirmContractButton({ txHash }: { txHash: string }) {
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <UploadCloudIcon className="mr-2 h-4 w-4" />
        Submission
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full sm:max-w-[80vw] w-screen h-screen sm:h-[80vh] p-6 flex flex-col overflow-y-auto">
          <div className="pt-2">
            {/* <SubmissionDisplay contract={contract} /> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
