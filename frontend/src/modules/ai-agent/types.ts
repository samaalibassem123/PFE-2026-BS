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


export interface AiSteps{
  [parent_id:string]:string[]
}
export interface  AiErrors{
  [parent_id:string]:string[]
}

export interface ChunckData{
  type:"error" | "token" | "step"
  content:string
}
