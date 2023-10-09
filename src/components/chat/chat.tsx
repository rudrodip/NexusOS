"use client";

import { useChat, type Message } from "ai/react";

import { cn } from "@/lib/utils";
import { ChatList } from "@/components/chat/chat-list";
import { ChatPanel } from "@/components/chat/chat-panel";
import { EmptyScreen } from "@/components/chat/empty-screen";
import { ChatScrollAnchor } from "@/components/chat/chat-scroll-anchor";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMessages } from "@/redux/slices/chatSlice";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
      },
      onResponse(response) {
        console.log(response.status)
        if (response.status !== 200) {
          toast({
            variant: "destructive",
            title: `Error ${response.status}`,
            description: response.statusText,
          });
        }
      },
    });

  dispatch(setMessages(messages));

  return (
    <Card className="w-[90vw] lg:w-[40vw]">
      <ScrollArea className="h-[60vh] lg:h-[65vh]">
        <div className="inset-4 my-2">
          <div className={cn("pb-[200px] pt-4 md:pt-10", className)}>
            <EmptyScreen setInput={setInput} />
            <Separator className="my-10" />
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </div>
        </div>
      </ScrollArea>
      <div>
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
        />
      </div>
    </Card>
  );
}
