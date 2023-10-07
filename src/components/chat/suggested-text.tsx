"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button, } from "@/components/ui/button";
import { IconCheck, IconCopy } from "@/components/ui/icons";

type SuggestedTextProps = {
  text: string;
};

export const SuggestedText = ({ text }: SuggestedTextProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(text);
  };
  return (
    <div className="flex justify-between bg-primary-foreground rounded-md p-5 border-primary">
      <p className="flex-1">{text}</p>
      <div className="flex w-20">
        <Button
          variant="ghost"
          size="icon"
          className="text-xs"
          onClick={onCopy}
        >
          {isCopied ? <IconCheck /> : <IconCopy />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
    </div>
  );
};
