"use client";

import "@/styles/chat.css";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleChat } from "@/redux/slices/chatSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const DynamicChat = dynamic(() => import("./chat").then((mod) => mod.Chat), {
  loading: () => {
    return (
      <Card className="w-[90vw] lg:w-[40vw]">
        <Skeleton className="h-[20vh] lg:h-[22vh]"></Skeleton>
        <Skeleton className="h-[40vh] lg:h-[42vh] mt-5"></Skeleton>
        <div>
          <Skeleton className="h-12 w-full mt-5"></Skeleton>
        </div>
      </Card>
    );
  },
});

const ChatWindow = () => {
  const dispatch = useAppDispatch();
  const { isOpen, messages } = useAppSelector((state) => state.chatSlice);

  const handleToggleChat = () => {
    dispatch(toggleChat());
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && <DynamicChat initialMessages={messages} />}
      <div className="flex items-center justify-end">
        <Button
          className="chat w-14 h-14 mb-2 rounded-full"
          onClick={handleToggleChat}
        ></Button>
      </div>
    </div>
  );
};

export default ChatWindow;
