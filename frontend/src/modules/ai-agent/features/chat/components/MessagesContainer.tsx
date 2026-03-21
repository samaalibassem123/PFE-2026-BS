import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import OnHoverText from "@/components/OnHoverText";
import { Badge } from "@/components/ui/badge";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import type { ChatMessage } from "@/modules/ai-agent/types";
import { Copy, MessageSquareIcon, Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ChatProps {
  messages: ChatMessage[];
  loading?: boolean;
  Errors?: string[];
}

export default function MessagesContainer({
  messages,
  loading,
  Errors,
}: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  console.log("Errors", Errors);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <ScrollArea className="h-[45svh]">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              description="Messages will appear here as the conversation progresses."
              icon={<MessageSquareIcon className="size-6" />}
              title="Start a conversation"
            />
          ) : (
            messages?.map((message, i) => (
              <>
                <Message key={crypto.randomUUID()} from={message.role}>
                  {message.role !== "user" && (
                    <HoverBorderGradient>
                      <Sparkle className="size-4" />
                    </HoverBorderGradient>
                  )}
                  <MessageContent className=" font-extralight select-text flex  max-w-[80%] overflow-auto h-fit  ">
                    <MessageResponse>{message.content}</MessageResponse>
                  </MessageContent>
                  {
                    // Message Actions
                    message.role === "assistant" && (
                      <div className=" flex w-full justify-end ">
                        {!loading && (
                          <OnHoverText msg="Copy Ai response">
                            <MessageAction
                              onClick={() => {
                                navigator.clipboard.writeText(message.content);
                                toast.success("Copied", {
                                  position: "top-center",
                                });
                              }}
                              variant={"outline"}
                              className=" rounded-md p-4"
                            >
                              <Copy />
                            </MessageAction>
                          </OnHoverText>
                        )}
                      </div>
                    )
                  }
                  {i === messages.length - 1 && loading && <Spinner />}
                </Message>
              </>
            ))
          )}
          <div ref={bottomRef} />
        </ConversationContent>
      </Conversation>
    </ScrollArea>
  );
}
