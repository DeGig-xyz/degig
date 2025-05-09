"use client";

import type React from "react";

import { useState } from "react";
import { UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Contract } from "@/interface";
import { MinimalTiptapEditor } from "@/components/tiptap";

export default function SubmitWorkButton({ contract }: { contract: Contract }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string>("");

  const handleSubmit = async () => {
    console.log("Submitting work:", contract);
  };
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <UploadIcon className="mr-2 h-4 w-4" />
        Submit Work
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full sm:max-w-[80vw] w-screen h-screen sm:h-[80vh] p-6 flex flex-col overflow-y-auto">
          <DialogTitle className="text-lg font-semibold">Submit Work</DialogTitle>
          <div className="pt-2 ring-primary flex rounded-md border has-focus:ring-1">
            <MinimalTiptapEditor
              value={content}
              onChange={(value) => setContent(value?.toString() || "")}
              output="html"
              placeholder="Enter your Terms and conditions description..."
              autofocus={true}
              editable={true}
              className="min-h-[58vh] w-full border-0 text-sm"
              editorContentClassName="p-4 px-2 h-full"
              editorClassName="focus:outline-hidden h-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
