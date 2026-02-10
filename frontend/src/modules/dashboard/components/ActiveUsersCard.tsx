import { Skeleton } from "@/components/ui/skeleton";
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
  value: number;
  desc: string;
  icon: React.ReactNode;
  loading?: boolean;
  color?:
    | "default"
    | "success"
    | "info"
    | "warning"
    | "error"
    | null
    | undefined;
}

export default function ActiveUsersCard({ ...cardInfo }: Props) {
  return (
    <Stat className={cn("flex-1")}>
      <StatLabel>{cardInfo.title}</StatLabel>
      <StatIndicator variant="icon" color={cardInfo.color ?? "warning"}>
        {cardInfo.icon}
      </StatIndicator>
      <StatValue>
        {" "}
        {cardInfo.loading ? (
          <Skeleton className="h-10 rounded-md w-10 text-center flex items-center justify-center">
            0
          </Skeleton>
        ) : (
          cardInfo.value
        )}
      </StatValue>
      <StatSeparator />
      <StatDescription>{cardInfo.desc}</StatDescription>
    </Stat>
  );
}
