import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, SendMessageRequest } from "@/modules/ai-agent/types";
import { toast } from "sonner";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
  const [errors, setErrors] = useState<string[]>([])
  const abortRef = useRef<AbortController | null>(null)
  const sendMessage = async (data: SendMessageRequest) => {
    setLoading(true);

    const UserMessage:ChatMessage = {
      id:data.thread_id,
      role:"user",
      content:data.message
    }
    const AssistantMsg:ChatMessage = {
      id:crypto.randomUUID(),
      role:"assistant",
      content:""
    }

    setNewMessages((prev)=>[...prev, UserMessage, AssistantMsg])


    const controller = new AbortController()
    abortRef.current = controller
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_API_URL}/api/v1/rh-agent/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: data.message,
          thread_id: data.thread_id,
        }),
        signal:controller.signal
      }
    );

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode chunk safely
      buffer += decoder.decode(value, { stream: true });

      // Split on newline (assumes NDJSON from backend)
      const parts = buffer.split("\n");
      buffer = parts.pop() || ""; // keep last incomplete chunk

      for (const part of parts) {
        console.log(part)
        if (!part.trim()) continue;

        try {

          const chunkData: { type: string; content: string } = JSON.parse(part);

          if (chunkData.type === "error") {
            setErrors([chunkData.content]);
            toast.error("Server Error Try to send message again")
          }

          if (chunkData.type === "token") {
            setTokens((prev) => prev + 1);
            if(chunkData.content){
            setNewMessages((prev) => {
              return prev.map((m)=> m.id === AssistantMsg.id ? {...m, content:m.content + chunkData.content}:m)
            });
          }
        }
        } catch (err) {
          console.error("Failed to parse chunk JSON:", part, err);
        }
      }
    }

    setLoading(false);
  };

  // Log newMessages after it updates
  useEffect(() => {
    console.log(newMessages);
  }, [newMessages]);

  useEffect(()=>{
    console.log(errors)
  },[errors])
  const stop = useCallback(() => {
    abortRef.current?.abort()
    setLoading(false)
  }, [])

  return { loading, sendMessage, newMessages, tokens, stop, errors };
};
