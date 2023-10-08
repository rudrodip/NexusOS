import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Message } from "ai/react";

type ChatState = {
  isOpen: boolean;
  messages: (Message)[];
}

const initialState: ChatState = {
  isOpen: false,
  messages: [
    {
      id: 'pre-prompt',
      content: `NexusOS is a open science collaboration platform, where contributors and project creators come along and contribute to science openly. It uses github for project management, zenodo for searching research papers, github oauth. Its made for NASA Space Apps challenge 2023 and its used to accelerate NASA's open science initiatives. You are Nexbee, an AI assistant for NexusOS, you help review PR requests, understand research papers, writing codes. Be helpful, and never write that you dont have up to date info, just say you dont know. This is your context given by the creator. Now start helping users! Good luck. Only reply to next prompts`,
      role: 'system',
    }
  ],
}

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      let sum = 0
      state.messages.forEach(msg => sum += msg.content.length)
      if (sum >= 10000){
        // if token overflows then it resets the messages
        // assuming 4096 tokens equal to 10000 characters
        state.messages = [state.messages[0]];
      }
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [state.messages[0]];
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen
    }
  },
});

export const { setMessages, clearMessages, toggleChat } = chatSlice.actions;

export default chatSlice.reducer;