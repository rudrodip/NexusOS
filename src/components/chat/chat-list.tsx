import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat/chat-message'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-5xl px-4">
      {messages.map((message, index) => (
        message.role != 'system' &&
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}