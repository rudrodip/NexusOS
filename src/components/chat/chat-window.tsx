"use client";

import "@/styles/chat.css";
import { Text, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chat } from "./chat";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleChat } from "@/redux/slices/chatSlice";

const ChatWindow = () => {
  const dispatch = useAppDispatch();
  const { isOpen, messages } = useAppSelector((state) => state.chatSlice);

  const handleToggleChat = () => {
    dispatch(toggleChat());
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex items-center justify-end">
        <Button
          className="chat w-14 h-14 mb-2 border-primary cursor-pointer rounded-full"
          onClick={handleToggleChat}
        >
        </Button>
      </div>
      {isOpen && <Chat initialMessages={messages} />}
    </div>
  );
};

export default ChatWindow;
