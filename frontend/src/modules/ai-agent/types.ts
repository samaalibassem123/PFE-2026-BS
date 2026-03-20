export interface SendMessageRequest{
    message:string
    thread_id:string
}

type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  id?: string;
  role: Role;
  content: string;
}
