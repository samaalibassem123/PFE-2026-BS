import { useState, useEffect, useRef, useCallback } from "react";
import type {
  AiErrors,
  AiSteps,
  ChatMessage,
  ChunckData,
  SendMessageRequest,
} from "@/modules/ai-agent/types";
import { toast } from "sonner";

export const useAiChat = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
  const [errors, setErrors] = useState<AiErrors>({});
  const [steps, setSteps] = useState<AiSteps>({});
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = async (data: SendMessageRequest) => {
    const UserMessage: ChatMessage = {
      id: data.thread_id,
      role: "user",
      content: data.message,
    };
    const AssistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    // INITIALIZE VALUES
    setLoading(true);
    setNewMessages((prev) => [...prev, UserMessage, AssistantMsg]);
    const controller = new AbortController();
    abortRef.current = controller;

    // FETCH FUNC
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_API_URL}/api/v1/rh-agent/chat`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: data.message,
          thread_id: data.thread_id,
        }),
        signal: controller.signal,
      },
    );

    if (!response.body) return;

    // STREAMIN DATA
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n");
      buffer = parts.pop() || ""; // keep last incomplete chunk

      for (const part of parts) {
        console.log(part);
        if (!part.trim()) continue;

        try {
          const chunkData: ChunckData = JSON.parse(part);

          // STREAM ERROR
          if (chunkData.type === "error") {
            setErrors((prev) => ({
              ...prev,
              [AssistantMsg.id as string]: [
                ...(prev[AssistantMsg.id as string] || []),
                chunkData.content,
              ],
            }));
            toast.error("Server Error Try to send message again");
          }

          // STREAM AGENT STEPS
          if (chunkData.type === "step") {
            setSteps((prev) => ({
              ...prev,
              [AssistantMsg.id as string]: [
                ...(prev[AssistantMsg.id as string] || []),
                chunkData.content,
              ],
            }));
          }

          // STREAM TOKENS / AI RESPONSE
          if (chunkData.type === "token") {
            setTokens((prev) => prev + 1);
            if (chunkData.content) {
              setNewMessages((prev) => {
                return prev.map((m) =>
                  m.id === AssistantMsg.id
                    ? { ...m, content: m.content + chunkData.content }
                    : m,
                );
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
    console.log("new meessage : ", newMessages);
  }, [newMessages]);

  useEffect(() => {
    console.log("errors : ", errors);
  }, [errors]);

  useEffect(() => {
    console.log("steps : ", steps);
  }, [steps]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  return {
    sendMessage,
    newMessages,
    loading,
    tokens,
    stop,
    errors,
    steps,
  };
};
