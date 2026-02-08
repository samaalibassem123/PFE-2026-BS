import {
  Stat,
  StatLabel,
  StatValue,
  StatIndicator,
  StatDescription,
  StatSeparator,
} from "@/components/ui/stat";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string;
  desc: string;
  icon: React.ReactNode;
  loading?: boolean;
}

export default function ActiveUsersCard({ ...cardInfo }: Props) {
  return (
    <Stat className={cn("flex-1")}>
      <StatLabel>{cardInfo.title}</StatLabel>
      <StatIndicator variant="icon" color="info">
        {cardInfo.icon}
      </StatIndicator>
      <StatValue>{cardInfo.value}</StatValue>
      <StatSeparator />
      <StatDescription>{cardInfo.desc}</StatDescription>
    </Stat>
  );
}
