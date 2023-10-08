import { useSession } from "next-auth/react"
import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SuggestedText } from "./suggested-text";
import { CodeBlock } from "@/components/ui/codeblock";
import { MemoizedReactMarkdown } from "@/components/chat/markdown";
import { IconOpenAI, IconUser } from "@/components/ui/icons";
import { Icons } from "@/components/icons";
import { ChatMessageActions } from "@/components/chat/chat-message-action";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const { data: session, status } = useSession()

  return (
    <div className={cn("group relative mb-4 flex items-start")} {...props}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md shadow",
          message.role === "user"
            ? "bg-background border"
            : "text-primary-foreground"
        )}
      >
        {message.role === "user" ? (
          session?.user?.image ? (
            <Image src={session.user.image} alt="user" width={30} height={30} />
          ) : (
            <IconUser />
          )
        ) : (
          <Icons.bot />
        )}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="break-words prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            h1: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h1
                className={cn(
                  "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                  className
                )}
                {...props}
              />
            ),
            h2: ({
              className,
              children,
              ...props
            }: React.HTMLAttributes<HTMLHeadingElement>) => (
              <SuggestedText text={String(children)} />
            ),
            h3: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h3
                className={cn(
                  "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                  className
                )}
                {...props}
              />
            ),
            h4: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h4
                className={cn(
                  "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                  className
                )}
                {...props}
              />
            ),
            h5: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h5
                className={cn(
                  "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                  className
                )}
                {...props}
              />
            ),
            h6: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h6
                className={cn(
                  "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                  className
                )}
                {...props}
              />
            ),
            a: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLAnchorElement>) => (
              <a
                className={cn(
                  "font-medium underline underline-offset-4",
                  className
                )}
                {...props}
              />
            ),
            p: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLParagraphElement>) => (
              <p
                className={cn(
                  "leading-7 [&:not(:first-child)]:mt-6",
                  className
                )}
                {...props}
              />
            ),
            ul: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLUListElement>) => (
              <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
            ),
            ol: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLOListElement>) => (
              <ol
                className={cn("my-6 ml-6 list-decimal", className)}
                {...props}
              />
            ),
            li: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLLIElement>) => (
              <li className={cn("mt-2", className)} {...props} />
            ),
            blockquote: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLQuoteElement>) => (
              <blockquote
                className={cn(
                  "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
                  className
                )}
                {...props}
              />
            ),
            hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
            table: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLTableElement>) => (
              <div className="my-6 w-full overflow-y-auto">
                <table className={cn("w-full", className)} {...props} />
              </div>
            ),
            tr: ({
              className,
              ...props
            }: React.HTMLAttributes<HTMLTableRowElement>) => (
              <tr
                className={cn("m-0 border-t p-0 even:bg-muted", className)}
                {...props}
              />
            ),
            th: ({ className, ...props }) => (
              <th
                className={cn(
                  "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                  className
                )}
                {...props}
              />
            ),
            td: ({ className, ...props }) => (
              <td
                className={cn(
                  "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                  className
                )}
                {...props}
              />
            ),
            code({ node, inline, className, children, ...props }) {
              if (children && children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
