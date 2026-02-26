import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React from "react";

interface Props {
  children: React.ReactNode;
  msg: string;
}

export default function OnHoverText({ ...props }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>{props.children}</HoverCardTrigger>
      <HoverCardContent>{props.msg}</HoverCardContent>
    </HoverCard>
  );
}
