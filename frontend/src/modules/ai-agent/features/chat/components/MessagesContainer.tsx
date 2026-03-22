import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageAction,

  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Task, TaskContent, TaskItem, TaskTrigger } from "@/components/ai-elements/task";
import OnHoverText from "@/components/OnHoverText";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import type { AiErrors, AiSteps, ChatMessage } from "@/modules/ai-agent/types";
import { Copy, MessageSquareIcon, Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ChatProps {
  messages: ChatMessage[];
  loading?: boolean;
  Errors?: AiErrors;
  steps?:AiSteps
}

export default function MessagesContainer({
  messages,
  loading,
  Errors,
  steps
}: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, steps]);
  console.log(Errors)
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
              <div key={crypto.randomUUID()} className=" flex flex-col  gap-3">
                 {message.role !== "user" && (
                    <HoverBorderGradient>
                      <Sparkle className="size-4" />
                    </HoverBorderGradient>
                  )}
                <Message from={message.role} className=" pl-2" >

                  {/** STEPS */}
                  {message.role !== "user" && steps && steps[message.id as string] && (
                    <Task>
                      <TaskTrigger
                        title={
                          steps[message.id as string][
                            steps[message.id as string].length - 1 // get the last step
                          ] || "Loading..."
                        }
                      />
                      <TaskContent>
                        {steps[message.id as string].map((s,index) => (
                          <TaskItem key={index}>{i === messages.length - 1 && loading ?<Shimmer>{s}</Shimmer> : s}</TaskItem>
                        ))}
                      </TaskContent>
                    </Task>
                  )}
                  {/** MESSAGE */}
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
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </ConversationContent>
      </Conversation>
    </ScrollArea>
  );
}
