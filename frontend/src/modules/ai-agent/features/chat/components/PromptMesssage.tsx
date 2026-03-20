import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { GlobeIcon, MicIcon, PaperclipIcon } from "lucide-react";
import {  useState } from "react";
import { useAuth } from "@/modules/auth/hooks";
import type { SendMessageRequest } from "@/modules/ai-agent/types";



const suggestions: string[] = [
  "Generate a monthly attendance KPI report with rates, absences, delays, and overtime.",
  "Show attendance performance by department and highlight the lowest performing team.",
  "Analyze attendance trends over the last 3 months and detect anomalies.",
  "List employees with the most delays and summarize their attendance behavior.",
];


export interface Props {
  sendMessage: (data: SendMessageRequest) => void;
  isLoading: boolean;
  stop:()=>void;
}

export default function PromptMesssage({ sendMessage, isLoading, stop }: Props) {
  const [text, setText] = useState<string>("");

  const { data } = useAuth();
  const handleSubmit = () => {
    sendMessage({
      thread_id: data.id,
      message: text,
    });
    setText("")
  };
  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion);
  };

  return (
    <div className="space-y-2">
      {
        !isLoading &&
          <Suggestions>
        {suggestions.map((suggestion) => (
          <HoverBorderGradient className="p-0" key={suggestion}>
            <Suggestion
              onClick={handleSuggestionClick}
              suggestion={suggestion}
            />
          </HoverBorderGradient>
        ))}
      </Suggestions>
      }

      <PromptInput onSubmit={isLoading ? stop : handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea
            disabled={isLoading}
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </PromptInputBody>
        <PromptInputFooter className=" justify-end">
     {/*     <PromptInputTools>
            <PromptInputButton tooltip="Attach files">
              <PaperclipIcon size={16} />
            </PromptInputButton>
            <PromptInputButton
              tooltip={{ content: "Search the web", shortcut: "⌘K" }}
            >
              <GlobeIcon size={16} />
            </PromptInputButton>
            <PromptInputButton
              tooltip={{
                content: "Voice input",
                shortcut: "⌘M",
                side: "bottom",
              }}
            >
              <MicIcon size={16} />
            </PromptInputButton>
          </PromptInputTools>*/}
          <PromptInputSubmit  status={isLoading ? "streaming" : "ready"}  className=" animate-pulse z-50  cursor-pointer"/>
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
