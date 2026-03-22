import {
  Drawer,

  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import { MessageCircle, Sparkles } from "lucide-react"
import MessagesContainer from './MessagesContainer';
import PromptMesssage from "./PromptMesssage";
import { useAiChat } from "../hooks/useAiChat";
import { Badge } from '@/components/ui/badge';


export default function ChatBox() {

  const {
    sendMessage,
    loading,
    newMessages,
    tokens,
    stop,
    errors,
    steps
   } =
    useAiChat();

  return (
    <Drawer >
      <div className=" fixed  bottom-10 right-10">
        <HoverBorderGradient>
          <DrawerTrigger className="relative  cursor-pointer text-sm flex items-center gap-2 rounded-lg">
            Chat With Ai <MessageCircle className="size-4" />
          </DrawerTrigger>
        </HoverBorderGradient>
      </div>
      <DrawerContent className=" sm:px-10 w-full  bg-transparent backdrop-blur-2xl">
        <DrawerHeader className="flex flex-col items-center gap-2.5">
          <DrawerTitle>
            <div className="flex   items-center justify-center gap-2  w-full text-center">
              <Sparkles className="size-4" /> Ask Your Data
            </div>
          </DrawerTitle>

          <DrawerDescription className="text-center">
            Use AI to explore attendance data, detect patterns, and generate
            reports in seconds.
          </DrawerDescription>
          <Badge variant={"pending"}>used tokens : {tokens}</Badge>
        </DrawerHeader>

        <MessagesContainer steps={steps} Errors={errors} loading={loading} messages={newMessages} />

        <DrawerFooter>
          <PromptMesssage
            stop={stop}
            sendMessage={sendMessage}
            isLoading={loading}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
